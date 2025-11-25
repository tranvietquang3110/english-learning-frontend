import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faClock,
  faCheckCircle,
  faFlag,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { ToeicTestResponse } from '../../../../models/response/toeict-test-response.model';
import { ToeicTestQuestionResponse } from '../../../../models/response/toeic-test-question-response.model';
import { ToeicPart } from '../../../../models/toeic-part.enum';
import { AudioPlayerComponent } from '../../../../shared/audio-player/audio-player.component';
import { QuestionGridComponent } from '../../../../shared/question-grid-component/question-grid.component';

@Component({
  selector: 'app-full-test-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    AudioPlayerComponent,
    QuestionGridComponent,
  ],
  templateUrl: './full-test-detail.component.html',
  styleUrl: './full-test-detail.component.scss',
})
export class FullTestDetailComponent implements OnInit, OnDestroy {
  groupId: string = '';
  testId: string = '';
  isQuestionGridVisible = false;
  test: ToeicTestResponse | null = null;
  questions: ToeicTestQuestionResponse[] = [];
  currentQuestionIndex = 0;
  selectedAnswers: { [key: string]: string } = {};
  markedQuestions: Set<number> = new Set();

  // Timer
  totalTimeInSeconds = 2 * 60 * 60; // 2 hours = 7200 seconds
  timeRemaining = this.totalTimeInSeconds;
  timerInterval: any;

  // Test state
  isTestStarted = false;
  isTestCompleted = false;
  isLoading = false;
  error: string | null = null;

  // Constants
  readonly TOTAL_QUESTIONS = 200;
  readonly PARTS = [
    { part: ToeicPart.PART_1, start: 1, end: 6, name: 'Part 1' },
    { part: ToeicPart.PART_2, start: 7, end: 31, name: 'Part 2' },
    { part: ToeicPart.PART_3, start: 32, end: 70, name: 'Part 3' },
    { part: ToeicPart.PART_4, start: 71, end: 100, name: 'Part 4' },
    { part: ToeicPart.PART_5, start: 101, end: 130, name: 'Part 5' },
    { part: ToeicPart.PART_6, start: 131, end: 200, name: 'Part 6' },
  ];

  // FontAwesome icons
  faArrowLeft = faArrowLeft;
  faClock = faClock;
  faCheckCircle = faCheckCircle;
  faFlag = faFlag;
  faQuestion = faQuestion;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.groupId = params['groupId'];
      this.testId = params['testId'];
      if (this.testId) {
        this.loadTest();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  loadTest(): void {
    this.isLoading = true;
    this.error = null;

    // TODO: Implement API call to get test by ID
    // this.toeicTestService.getTestById(this.testId).subscribe({
    //   next: (test) => {
    //     this.test = test;
    //     this.questions = test.questions || [];
    //     // Ensure we have 200 questions
    //     this.padQuestionsTo200();
    //     this.isLoading = false;
    //   },
    //   error: (error) => {
    //     this.error = 'Không thể tải bài test. Vui lòng thử lại.';
    //     this.isLoading = false;
    //     console.error('Error loading test:', error);
    //   }
    // });

  }

  generateMockQuestions(): ToeicTestQuestionResponse[] {
    const questions: ToeicTestQuestionResponse[] = [];

    this.PARTS.forEach((partInfo) => {
      for (let i = partInfo.start; i <= partInfo.end; i++) {
        const question: ToeicTestQuestionResponse = {
          id: `q${i}`,
          question: `Question ${i}`,
          options: {
            A: `Option A for question ${i}`,
            B: `Option B for question ${i}`,
            C: `Option C for question ${i}`,
            D: `Option D for question ${i}`,
          },
          correctAnswer: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
          part: partInfo.part,
          createdAt: new Date().toISOString(),
        };

        // Add image for Part 1
        if (partInfo.part === ToeicPart.PART_1) {
          question.imageUrl = `https://picsum.photos/400/300?random=${i}`;
        }

        // Add audio for Part 1, 2, 3, 4
        if (
          partInfo.part === ToeicPart.PART_1 ||
          partInfo.part === ToeicPart.PART_2 ||
          partInfo.part === ToeicPart.PART_3 ||
          partInfo.part === ToeicPart.PART_4
        ) {
          question.audioUrl = `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${
            (i % 3) + 1
          }.mp3`;
        }

        questions.push(question);
      }
    });

    return questions;
  }

  startTest(): void {
    this.isTestStarted = true;
    this.startTimer();
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        this.submitTest();
      }
    }, 1000);
  }

  getFormattedTime(): string {
    const hours = Math.floor(this.timeRemaining / 3600);
    const minutes = Math.floor((this.timeRemaining % 3600) / 60);
    const seconds = this.timeRemaining % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  getCurrentQuestion(): ToeicTestQuestionResponse | null {
    if (
      this.questions.length === 0 ||
      this.currentQuestionIndex >= this.questions.length
    ) {
      return null;
    }
    return this.questions[this.currentQuestionIndex];
  }

  selectAnswer(answer: string): void {
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion) {
      this.selectedAnswers[currentQuestion.id] = answer;
    }
  }

  getSelectedAnswer(): string | undefined {
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion) {
      return this.selectedAnswers[currentQuestion.id];
    }
    return undefined;
  }

  toggleMarkQuestion(): void {
    if (this.markedQuestions.has(this.currentQuestionIndex)) {
      this.markedQuestions.delete(this.currentQuestionIndex);
    } else {
      this.markedQuestions.add(this.currentQuestionIndex);
    }
  }

  isQuestionMarked(): boolean {
    return this.markedQuestions.has(this.currentQuestionIndex);
  }

  goToQuestion(index: number): void {
    if (index >= 0 && index < this.questions.length) {
      this.currentQuestionIndex = index;
    }
  }

  goToPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  goToNextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  getCurrentPart(): {
    part: ToeicPart;
    start: number;
    end: number;
    name: string;
  } | null {
    const currentNum = this.currentQuestionIndex + 1;
    return (
      this.PARTS.find((p) => currentNum >= p.start && currentNum <= p.end) ||
      null
    );
  }

  getQuestionsByPart(part: ToeicPart): ToeicTestQuestionResponse[] {
    return this.questions.filter((q) => q.part === part);
  }

  // For QuestionGridComponent
  get questionGridAnswers(): (string | undefined)[] {
    return this.questions.map((q) => this.selectedAnswers[q.id] || undefined);
  }

  get markedQuestionsArray(): number[] {
    return Array.from(this.markedQuestions);
  }

  handleQuestionGridClick(index: number): void {
    this.goToQuestion(index);
  }

  submitTest(): void {
    if (
      confirm(
        'Bạn có chắc chắn muốn nộp bài? Bạn sẽ không thể chỉnh sửa sau khi nộp.'
      )
    ) {
      this.isTestCompleted = true;
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      // TODO: Submit test to API
      // this.toeicTestService.submitTest(this.testId, this.selectedAnswers).subscribe({
      //   next: (result) => {
      //     // Handle result
      //   },
      //   error: (error) => {
      //     console.error('Error submitting test:', error);
      //   }
      // });
    }
  }

  goBack(): void {
    if (this.isTestStarted && !this.isTestCompleted) {
      if (
        confirm(
          'Bạn đang trong quá trình làm bài. Bạn có chắc chắn muốn thoát?'
        )
      ) {
        this.router.navigate(['/full-test/groups', this.groupId, 'tests']);
      }
    } else {
      this.router.navigate(['/full-test/groups', this.groupId, 'tests']);
    }
  }

  getProgress(): string {
    return `${this.currentQuestionIndex + 1}/${this.questions.length}`;
  }

  getAnsweredCount(): number {
    return Object.keys(this.selectedAnswers).length;
  }

  getNumberRange(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  getQuestionAnswer(index: number): string | undefined {
    if (index >= 0 && index < this.questions.length) {
      return this.selectedAnswers[this.questions[index].id];
    }
    return undefined;
  }

  toggleQuestionGrid(): void {
    this.isQuestionGridVisible = !this.isQuestionGridVisible;
  }
}
