import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faChevronRight,
  faChevronLeft,
  faClock,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { AudioPlayerComponent } from '../../../shared/audio-player/audio-player.component';
import { QuestionGridComponent } from '../../../shared/question-grid-component/question-grid.component';
import { ListeningService } from '../../../services/ListeningService';
import {
  ListeningTest,
  ListeningTestQuestion,
} from '../../../models/listening/listening-test.model';

@Component({
  selector: 'app-listening-test',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    AudioPlayerComponent,
    QuestionGridComponent,
  ],
  templateUrl: './listening-test.component.html',
})
export class ListeningTestComponent {
  // FontAwesome icons
  faArrowLeft = faArrowLeft;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faClock = faClock;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;

  testId = '';
  questions: ListeningTestQuestion[] = [];
  currentQuestionIndex = 0;
  selectedAnswers: { [key: string]: string } = {};
  timeRemaining = 0;
  isTestStarted = false;
  isTestCompleted = false;
  isLoading = false;
  duration = 0;
  title = '';
  topicName = '';
  // For QuestionGridComponent
  get questionGridAnswers(): (string | undefined)[] {
    if (!this.questions) return [];
    return this.questions.map((_, index) => {
      const question = this.questions[index];
      return this.selectedAnswers[question.id] || undefined;
    });
  }

  get markedQuestions(): number[] {
    // Mark questions that have been answered
    if (!this.questions) return [];
    return this.questions
      .map((question, index) =>
        this.selectedAnswers[question.id] ? index : -1
      )
      .filter((index) => index !== -1);
  }

  testResults: {
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    details: Array<{
      questionId: string;
      isCorrect: boolean;
      selectedAnswer: string;
      correctAnswer: string;
    }>;
  } | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listeningService: ListeningService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.testId = params.get('testId') || '';
      if (this.testId) {
        this.loadTestData();
      }
    });
  }

  loadTestData() {
    this.isLoading = true;
    this.listeningService.getTestDetail(this.testId).subscribe({
      next: (testData) => {
        console.log('Test data loaded:', testData);
        this.questions = testData.questions;
        this.resetTest();
        this.duration = testData.duration;
        this.title = testData.name;
        this.topicName = testData.name;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading test data:', err);
        this.isLoading = false;
      },
    });
  }

  get currentQuestion(): ListeningTestQuestion | undefined {
    return this.questions[this.currentQuestionIndex];
  }

  startTest() {
    if (!this.questions) return;
    this.isTestStarted = true;
    this.timeRemaining = this.duration * 60; // Convert minutes to seconds

    const timer = setInterval(() => {
      if (!this.isTestStarted || this.isTestCompleted) {
        clearInterval(timer);
        return;
      }
      if (this.timeRemaining <= 1) {
        this.handleFinishTest();
        clearInterval(timer);
      }
      this.timeRemaining -= 1;
    }, 1000);
  }

  handleAnswerSelect(questionId: string, optionKey: string) {
    if (this.isTestCompleted) return;
    this.selectedAnswers[questionId] = optionKey;
  }

  handleNextQuestion() {
    if (
      this.questions &&
      this.currentQuestionIndex < this.questions.length - 1
    ) {
      this.currentQuestionIndex++;
    }
  }

  handlePreviousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  handleFinishTest() {
    if (!this.questions) return;

    let correctCount = 0;
    const details = this.questions.map((q) => {
      const userAnswer = this.selectedAnswers[q.id] || '';
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        isCorrect,
        selectedAnswer: userAnswer,
        correctAnswer: q.correctAnswer,
      };
    });

    const score = Math.round((correctCount / this.questions.length) * 100);
    this.testResults = {
      score,
      totalQuestions: this.questions.length,
      correctAnswers: correctCount,
      incorrectAnswers: this.questions.length - correctCount,
      details,
    };

    this.isTestCompleted = true;
  }

  resetTest() {
    this.currentQuestionIndex = 0;
    this.selectedAnswers = {};
    this.isTestStarted = false;
    this.isTestCompleted = false;
    this.testResults = null;
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  goBack() {
    this.router.navigate(['/listening/topics']);
  }

  getUserAnswer(q: ListeningTestQuestion, detail: any): string {
    if (!detail?.selectedAnswer) return 'No answer selected';
    return q.options[detail.selectedAnswer] || detail.selectedAnswer;
  }

  getCorrectAnswer(q: ListeningTestQuestion): string {
    return q.options[q.correctAnswer] || q.correctAnswer;
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index); // 65 = A
  }

  getOptionKeys(question: ListeningTestQuestion): string[] {
    return Object.keys(question.options);
  }

  handleQuestionGridClick(questionIndex: number) {
    if (questionIndex >= 0 && questionIndex < this.questions.length) {
      this.currentQuestionIndex = questionIndex;
    }
  }
}
