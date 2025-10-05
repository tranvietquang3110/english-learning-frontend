import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VocabularyService } from '../../../services/VocabularyService';
import { VocabTopic } from '../../../models/vocabulary/vocab-topic.model';
import { VocabularyTest } from '../../../models/vocabulary/vocabulary-test.model';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { environment } from '../../../../environments/environment';
import { Page } from '../../../models/page.model';
import { Subject, takeUntil } from 'rxjs';
import {
  TestFormComponent,
  TestFormData,
  TestFormConfig,
  TestType,
} from '../../../shared/test-form/test-form.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { TopicBase } from '../../../models/topic-base';
import { TopicTestCardGridComponent } from '../../../shared/topic-test-card-grid/topic-test-card-grid.component';
import { TestListComponent } from '../../../shared/test-list/test-list.component';
import { TestBase } from '../../../models/test-base';

enum State {
  View,
  Create,
}

@Component({
  selector: 'app-vocabulary-tests-manage',
  standalone: true,
  imports: [
    PaginationComponent,
    CommonModule,
    TestFormComponent,
    ConfirmDialogComponent,
    TopicTestCardGridComponent,
    TestListComponent,
  ],
  templateUrl: './vocabulary-tests-manage.component.html',
  styleUrl: './vocabulary-tests-manage.component.scss',
})
export class VocabularyTestsManageComponent implements OnInit {
  State = State;
  currentState = State.View;
  topics: VocabTopic[] = [];
  topicsBase: TopicBase[] = [];
  selectedTopic: VocabTopic | null = null;
  tests: VocabularyTest[] = [];
  currentPage = 1;
  totalPages = 0;
  readonly PAGE_SIZE = environment.PAGE_SIZE;
  private destroy$ = new Subject<void>();
  showDeleteConfirm = false;
  testToDelete: VocabularyTest | null = null;
  testsBase: TestBase[] = [];
  vocabularyTestConfig: TestFormConfig = {
    testType: TestType.VOCABULARY,
    topicName: '',
    showImageUpload: false, // No test-level images
    showAudioUpload: false,
    supportsImage: true, // Enable individual question images
    supportsAudio: false,
    correctAnswerType: 'index',
    maxOptions: 4,
  };

  constructor(
    private vocabService: VocabularyService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    console.log('VocabularyTestsManageComponent ngOnInit');
    this.loadTopics();
  }
  loadTopics() {
    this.vocabService
      .getTopics(this.currentPage - 1, this.PAGE_SIZE) // Load all topics for selection
      .subscribe({
        next: (data) => {
          this.topics = data.content;
          this.topicsBase = data.content.map((topic) => ({
            id: topic.id,
            name: topic.name,
            description: topic.description,
            imageUrl: topic.imageUrl,
          }));
        },
        error: (error) => {
          console.error('Error loading topics:', error);
        },
      });
  }
  onTopicSelect(topic: TopicBase) {
    this.selectedTopic = this.topics.find((t) => t.id === topic.id) || null;
    this.vocabularyTestConfig.topicName = topic.name; // Update config
    this.tests = []; // Clear previous tests
    this.currentPage = 1; // Reset pagination
    this.totalPages = 0; // Reset total pages
    this.loadTestsForTopic(topic.id);
  }
  loadTestsForTopic(topicId: string) {
    this.vocabService
      .getTestsByTopicId(topicId, this.currentPage - 1, this.PAGE_SIZE)
      .subscribe({
        next: (data) => {
          this.tests = data.vocabularyTests.content;
          this.currentPage = data.vocabularyTests.pageable.pageNumber + 1;
          this.totalPages = data.vocabularyTests.totalPages;
          this.testsBase = data.vocabularyTests.content.map((test) => ({
            id: test.id,
            name: test.name,
            duration: test.duration,
            createdAt: test.createdAt,
          }));
        },
        error: (error) => {
          console.error('Error loading tests:', error);
        },
      });
  }
  onPageChange(page: number) {
    this.currentPage = page;
    if (this.selectedTopic) {
      this.loadTestsForTopic(this.selectedTopic.id);
    }
  }
  onCreateTest() {
    this.currentState = State.Create;
  }

  onSaveTest(testData: TestFormData) {
    if (!this.selectedTopic) {
      console.error('No topic selected');
      return;
    }

    const formData = new FormData();

    // Convert TestFormData to API format
    const testDataForAPI = {
      name: testData.name,
      duration: testData.duration,
      questions: testData.questions.map((question, index) => ({
        question: question.question,
        options: {
          a: question.options[0] || '',
          b: question.options[1] || '',
          c: question.options[2] || '',
          d: question.options[3] || '',
        },
        correctAnswer: this.convertIndexToLetter(
          question.correctAnswer as number
        ),
        questionOrder: index + 1,
        explaination: question.explaination || '',
      })),
    };
    console.log('testDataForAPI', testDataForAPI);
    console.log(
      'Questions with correct answers:',
      testDataForAPI.questions.map((q) => ({
        question: q.question,
        correctAnswer: q.correctAnswer,
        options: q.options,
      }))
    );
    // Add test data as JSON
    formData.append(
      'test',
      new Blob([JSON.stringify(testDataForAPI)], { type: 'application/json' })
    );

    // Add question images to images array for @RequestPart
    const questionImages: File[] = [];
    testData.questions.forEach((question, index) => {
      if (question.image) {
        questionImages.push(question.image);
      }
    });

    // Add all question images to FormData with name "images"
    questionImages.forEach((image: File) => {
      formData.append('images', image);
    });

    this.vocabService
      .createTest(this.selectedTopic.id, testDataForAPI, questionImages)
      .subscribe({
        next: (response) => {
          console.log('Test created successfully:', response);
          this.currentState = State.View;
          // Reload tests for the current topic
          this.loadTestsForTopic(this.selectedTopic!.id);
        },
        error: (error) => {
          console.error('Error creating test:', error);
        },
      });
  }
  onCancelCreate() {
    this.currentState = State.View;
  }

  private convertIndexToLetter(index: number): string {
    const letters = ['a', 'b', 'c', 'd'];
    return letters[index] || 'a';
  }
  onViewTest(test: TestBase) {
    // Navigate to test detail or edit page
    this.router.navigate(['/admin/vocabulary/tests', test.id]);
  }
  onDeleteTest(test: TestBase) {
    this.testToDelete = this.tests.find((t) => t.id === test.id) || null;
    this.showDeleteConfirm = true;
  }

  onConfirmDelete() {
    if (this.testToDelete) {
      this.vocabService
        .deleteTest(this.testToDelete.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            // Reload tests for the current topic
            if (this.selectedTopic) {
              this.loadTestsForTopic(this.selectedTopic.id);
            }
            this.showDeleteConfirm = false;
            this.testToDelete = null;
          },
          error: (error) => {
            console.error('Error deleting test:', error);
            alert('Không thể xóa bài test');
            this.showDeleteConfirm = false;
            this.testToDelete = null;
          },
        });
    }
  }

  onCancelDelete() {
    this.showDeleteConfirm = false;
    this.testToDelete = null;
  }
  onEditTest(test: TestBase) {
    // Navigate to edit test page
    this.router.navigate(['/admin/vocabulary/tests/edit', test.id]);
  }
  goBackToTopics() {
    this.selectedTopic = null;
    this.tests = [];
    this.testsBase = [];
    this.currentPage = 1;
    this.totalPages = 0;
    this.currentState = State.View;
  }
}
