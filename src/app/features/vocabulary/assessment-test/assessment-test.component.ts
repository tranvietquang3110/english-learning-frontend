import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VocabularyService } from '../../../services/VocabularyService';
import { VocabularyTestQuestion } from '../../../models/vocabulary/vocabulary-test-question.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import {
  faCheckCircle,
  faChevronLeft,
  faChevronRight,
  faArrowLeft,
  faXmarkCircle,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { QuestionGridComponent } from '../../../shared/question-grid-component/question-grid.component';
import { HistoryService } from '../../../services/HistoryService';
import { ItemTypeEnum } from '../../../models/item-type-enum';
import { ExamHistoryResponse } from '../../../models/response/exam-history-response.model';
import { CommonUtils } from '../../../shared/utils/common';

@Component({
  selector: 'app-assessment-test',
  standalone: true,
  templateUrl: './assessment-test.component.html',
  styleUrls: ['./assessment-test.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    QuestionGridComponent,
  ],
})
export class AssessmentTestComponent implements OnDestroy {
  questions: VocabularyTestQuestion[] = [];
  currentQuestion = 0;
  selectedAnswers: (string | undefined)[] = [];
  showResults = false;
  timeRemaining = 300;
  startDate = CommonUtils.getNow();
  endDate = CommonUtils.getNow();
  // icons
  faChevronRight = faChevronRight;
  faCheckCircle = faCheckCircle;
  faChevronLeft = faChevronLeft;
  faArrowLeft = faArrowLeft;
  faXmarkCircle = faXmarkCircle;
  faStar = faStar;
  faRegularStar = faRegularStar;

  private timerId: any = null;
  testId = '';
  topicName = 'Assessment Test';
  markedQuestions: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vocabService: VocabularyService,
    private historyService: HistoryService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.testId = params.get('testId') || '';
      if (this.testId) {
        this.loadQuestions(this.testId);
      }
    });
  }

  loadQuestions(testId: string) {
    this.vocabService.getTestQuestionsByTestId(testId).subscribe({
      next: (data) => {
        console.log('Loaded questions:', data);
        this.questions = data.questions;
        this.topicName = data.topicName;
        this.timeRemaining = data.duration * 60;

        this.currentQuestion = 0;
        this.selectedAnswers = new Array(this.questions.length).fill(undefined);
        this.showResults = false;
        this.startTimer();
      },
      error: (err) => {
        console.error('Failed to load questions', err);
      },
    });
    // this.questions = this.sampleQuestions;
    // this.topicName = 'Sample Topic';
    // this.timeRemaining = 5 * 60; // 5 minutes for sample
    // this.currentQuestion = 0;
    // this.selectedAnswers = new Array(this.questions.length).fill(undefined);
    // this.showResults = false;
    // this.startTimer();
  }

  startTimer() {
    this.clearTimer();
    this.timerId = setInterval(() => {
      if (this.timeRemaining > 0 && !this.showResults) {
        this.timeRemaining--;
      } else {
        this.clearTimer();
        if (!this.showResults) this.handleFinish();
      }
    }, 1000);
  }

  handleAnswerSelect(key: string) {
    this.selectedAnswers[this.currentQuestion] = key;

    console.log(this.questions[this.currentQuestion].options[key]);
  }

  handleNext() {
    if (this.currentQuestion < this.questions.length - 1) {
      this.currentQuestion++;
    }
  }

  handlePrevious() {
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
  }

  handleFinish() {
    this.showResults = true;
    this.clearTimer();
    this.historyService
      .addHistory({
        testType: ItemTypeEnum.VOCABULARY,
        testId: this.testId,
        score: this.calculateScore().percentage,
        answers: this.selectedAnswers.map((answer, index) => ({
          questionId: this.questions[index].id,
          selectedAnswer: answer || '',
          correct: this.questions[index].correctAnswer === answer,
        })),
        takenAt: this.startDate,
        submittedAt: CommonUtils.getNow(),
      })
      .subscribe({
        next: (data: ExamHistoryResponse) => {
          console.log('History added:', data);
        },
        error: (err: any) => {
          console.error('Failed to add history', err);
        },
      });
  }

  calculateScore() {
    let correct = 0;
    this.questions.forEach((q, i) => {
      if (this.selectedAnswers[i] === q.correctAnswer) correct++;
    });
    return {
      correct,
      total: this.questions.length,
      percentage: Math.round((correct / this.questions.length) * 100),
    };
  }

  formatTime(sec: number) {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  goBack() {
    this.router.navigate(['/vocabulary/topics']);
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  retakeTest() {
    this.showResults = false;
    this.currentQuestion = 0;
    this.selectedAnswers = new Array(this.questions.length).fill(undefined);
    this.startTimer();
  }

  private clearTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  toggleMark(questionIndex: number) {
    if (this.markedQuestions.includes(questionIndex)) {
      // bỏ mark
      this.markedQuestions = this.markedQuestions.filter(
        (q) => q !== questionIndex
      );
    } else {
      // mark
      this.markedQuestions.push(questionIndex);
    }
  }

  handleQuestionJump(index: number) {
    if (index >= 0 && index < this.questions.length) {
      this.currentQuestion = index;
    }
  }
}
