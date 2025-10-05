import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export enum TestType {
  VOCABULARY = 'vocabulary',
  GRAMMAR = 'grammar',
  LISTENING = 'listening',
}

export interface TestQuestion {
  question: string;
  options: string[];
  correctAnswer: number | string; // number for vocabulary (index), string for grammar/listening
  imageUrl?: string;
  audioUrl?: string;
  explaination?: string;
  image?: File; // For new questions being added
  audio?: File; // For new questions being added
}

export interface TestFormData {
  name: string;
  duration: number;
  questions: TestQuestion[];
  images: File[];
  audios?: File[]; // for listening tests
}

export interface TestFormConfig {
  testType: TestType;
  topicName: string;
  showAudioUpload?: boolean;
  showImageUpload?: boolean;
  supportsImage?: boolean; // For individual question images
  supportsAudio?: boolean; // For individual question audio
  correctAnswerType: 'index' | 'text'; // index for vocabulary, text for grammar/listening
  maxOptions?: number;
}

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss',
})
export class TestFormComponent {
  @Input() config!: TestFormConfig;
  @Output() save = new EventEmitter<TestFormData>();
  @Output() cancel = new EventEmitter<void>();

  testData: TestFormData = {
    name: '',
    duration: 30,
    questions: [],
    images: [],
    audios: [],
  };

  newQuestion: TestQuestion = {
    question: '',
    options: ['', '', '', ''],
    correctAnswer: this.config?.correctAnswerType === 'index' ? 0 : '',
    explaination: '',
    image: undefined,
  };

  selectedAudios: File[] = [];

  ngOnInit() {
    // Initialize based on config
    if (this.config) {
      this.newQuestion.correctAnswer =
        this.config.correctAnswerType === 'index' ? 0 : '';
      if (this.config.maxOptions) {
        this.newQuestion.options = new Array(this.config.maxOptions).fill('');
      }
    }
  }

  onAudioSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedAudios = Array.from(event.target.files);
      this.testData.audios = this.selectedAudios;
    }
  }

  addQuestion() {
    console.log('Adding question:', this.newQuestion);
    console.log('Config:', this.config);

    // Validate question text
    if (!this.newQuestion.question.trim()) {
      alert('Vui lòng nhập câu hỏi');
      return;
    }

    // Validate options
    if (!this.newQuestion.options.every((opt) => opt.trim())) {
      alert('Vui lòng điền đầy đủ các lựa chọn');
      return;
    }

    // Validate correct answer
    if (this.config.correctAnswerType === 'index') {
      const correctIndex =
        typeof this.newQuestion.correctAnswer === 'string'
          ? parseInt(this.newQuestion.correctAnswer)
          : this.newQuestion.correctAnswer;

      if (correctIndex < 0 || correctIndex >= this.newQuestion.options.length) {
        alert('Vui lòng chọn đáp án đúng');
        return;
      }
    } else {
      if (!(this.newQuestion.correctAnswer as string).trim()) {
        alert('Vui lòng nhập đáp án đúng');
        return;
      }
    }

    // Convert correctAnswer to number if it's a string for index type
    const questionToAdd = {
      ...this.newQuestion,
      correctAnswer:
        this.config.correctAnswerType === 'index'
          ? typeof this.newQuestion.correctAnswer === 'string'
            ? parseInt(this.newQuestion.correctAnswer)
            : this.newQuestion.correctAnswer
          : this.newQuestion.correctAnswer,
    };

    this.testData.questions.push(questionToAdd);
    console.log('Question added:', questionToAdd);
    console.log('Total questions:', this.testData.questions.length);

    // Reset form
    this.newQuestion = {
      question: '',
      options: this.config.maxOptions
        ? new Array(this.config.maxOptions).fill('')
        : ['', '', '', ''],
      correctAnswer: this.config.correctAnswerType === 'index' ? 0 : '',
      explaination: '',
      image: undefined,
    };
  }

  removeQuestion(index: number) {
    this.testData.questions.splice(index, 1);
  }

  onSave() {
    if (this.testData.name.trim() && this.testData.questions.length > 0) {
      this.save.emit(this.testData);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  selectOption(index: number) {
    if (this.config.correctAnswerType === 'index') {
      this.newQuestion.correctAnswer = index;
    } else {
      this.newQuestion.correctAnswer = this.newQuestion.options[index] || '';
    }
  }

  getCorrectAnswerDisplay(question: TestQuestion): string {
    if (this.config.correctAnswerType === 'index') {
      const index = question.correctAnswer as number;
      return question.options[index] || '';
    } else {
      return question.correctAnswer as string;
    }
  }

  getCorrectAnswerLabel(question: TestQuestion): string {
    if (this.config.correctAnswerType === 'index') {
      const index = question.correctAnswer as number;
      return `Đáp án ${String.fromCharCode(65 + index)}`;
    } else {
      return 'Đáp án đúng';
    }
  }

  // Question image methods
  onQuestionImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newQuestion.image = file;
    }
  }

  removeQuestionImage() {
    this.newQuestion.image = undefined;
  }

  getImagePreview(file: File): string {
    return URL.createObjectURL(file);
  }

  // Question audio methods
  onQuestionAudioSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newQuestion.audio = file;
    }
  }

  removeQuestionAudio() {
    this.newQuestion.audio = undefined;
  }
}
