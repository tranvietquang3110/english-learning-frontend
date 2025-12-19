import { Component, OnInit } from '@angular/core';

import { VocabularyService } from '../../../services/VocabularyService';
import { TopicBase } from '../../../models/topic-base';
import { TopicCardComponent } from '../../../shared/topic-card/topic-card.component';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VocabTopicFormComponent } from '../vocab-topic-form/vocab-topic-form.component';
import { VocabTopic } from '../../../models/vocabulary/vocab-topic.model';
import Config from 'chart.js/dist/core/core.config';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TopicGenerateComponent } from './topic-generate/topic-generate.component';
import { AiButtonComponent } from '../../../shared/ai-button/ai-button.component';
import { TopicType } from '../../../models/topic-type.enum';

enum State {
  View,
  Edit,
  Create,
}

@Component({
  selector: 'app-vocabulary-management',
  standalone: true,
  imports: [
    TopicCardComponent,
    PaginationComponent,
    CommonModule,
    VocabTopicFormComponent,
    ConfirmDialogComponent,
    FontAwesomeModule,
    TopicGenerateComponent,
    AiButtonComponent,
  ],
  templateUrl: './vocabulary-management.component.html',
  styleUrl: './vocabulary-management.component.scss',
})
export class VocabularyManagementComponent implements OnInit {
  State = State;
  currentState = State.View;
  topics: TopicBase[] = [];
  currentPage = 1;
  totalPages = 0;
  readonly PAGE_SIZE = environment.PAGE_SIZE;
  faTrash = faTrash;
  isShowConfirmDialog = false;
  topicToDelete: TopicBase | null = null;
  isShowTopicGenerate = false;
  isLoading = false;
  constructor(
    private vocabService: VocabularyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.vocabService
      .getTopics(this.currentPage - 1, this.PAGE_SIZE)
      .subscribe((data) => {
        this.topics = [];
        console.log(data);
        const result = data.content;
        result.forEach((item) => {
          const vocabTopic: TopicBase = {
            id: item.id,
            name: item.name,
            description: item.description,
            imageUrl: item.imageUrl,
            level: item.level,
          };
          this.topics.push(vocabTopic);
        });
        this.currentPage = data.pageable.pageNumber + 1;
        this.totalPages = data.totalPages;
      });
  }

  onViewDetail(topic: TopicBase) {
    this.router.navigate(['/admin/vocabulary/manage', topic.id]);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadData();
  }

  changeToCreate() {
    this.currentState = State.Create;
  }

  changeToView() {
    this.currentState = State.View;
  }

  onCreateTopic(topic: VocabTopic) {
    console.log(topic);
    this.vocabService
      .createTopic(topic, topic.imageUrl as any)
      .subscribe((res) => {
        console.log(res);
        this.topics = this.topics.concat(res);
        this.changeToView();
      });
  }

  onCancel() {
    this.changeToView();
  }

  onDelete(topic: TopicBase) {
    this.topicToDelete = topic;
    this.isShowConfirmDialog = true;
  }

  onCancelDelete() {
    this.isShowConfirmDialog = false;
  }

  confirmDelete() {
    if (this.topicToDelete) {
      this.vocabService.deleteTopic(this.topicToDelete.id).subscribe({
        next: (res: any) => {
          console.log(res);
          this.topics = this.topics.filter(
            (t) => t.id !== this.topicToDelete!.id
          );
          this.isShowConfirmDialog = false;
          this.changeToView();
        },
      });
    }
  }
  onCloseTopicGenerate() {
    console.log('hehe');
    this.isShowTopicGenerate = false;
  }
  onOpenTopicGenerate() {
    console.log('hihi');
    this.isShowTopicGenerate = true;
  }
  onSubmitTopicGenerate(data: { topicType: string; description: string }) {
    this.isLoading = true;
    this.isShowTopicGenerate = false;
    this.vocabService
      .generateTopic(data.topicType, data.description)
      .subscribe((res) => {
        console.log(res);
        this.isLoading = false;
        this.loadData();
      });
  }
}
