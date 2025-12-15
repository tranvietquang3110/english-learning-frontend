import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestType } from '../../models/request-type.model';

export enum TestType {
  VOCABULARY = 'vocabulary',
  GRAMMAR = 'grammar',
  LISTENING = 'listening',
}

export interface TestQuestion {
  question: string;
  options: string[];
  correctAnswer: string; // Now always stores letter (a, b, c, d)
  imageUrl?: string;
  audioUrl?: string;
  explaination?: string;
  image?: File; // For new questions being added
  audio?: File; // For new questions being added
  imageName?: string;
  audioName?: string;
  requestType?: RequestType; // Optional for backward compatibility
  id?: string; // For existing questions
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
  maxOptions?: number;
}

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss',
})
export class TestFormComponent implements OnInit {
  @Input() config!: TestFormConfig;
  @Input() editData?: TestFormData; // Data for editing
  @Input() testToEdit?: any; // Test object for editing
  @Input() isEditMode = false; // Flag to indicate edit mode
  @Output() save = new EventEmitter<TestFormData>();
  @Output() cancel = new EventEmitter<void>();
  RequestType = RequestType;
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
    correctAnswer: 'a', // Default to option A
    explaination: '',
    image: undefined,
    requestType: RequestType.ADD,
  };

  selectedAudios: File[] = [];

  ngOnInit() {
    console.log('Test to edit:', this.testToEdit);
    // Initialize based on config
    if (this.config) {
      this.newQuestion.correctAnswer = 'a'; // Default to option A
      if (this.config.maxOptions) {
        this.newQuestion.options = new Array(this.config.maxOptions).fill('');
      }
    }

    // Load edit data if in edit mode
    if (this.isEditMode && this.editData) {
      this.testData = { ...this.editData };
      console.log('Loaded edit data:', this.testData);
    }

    // Load test data for editing
    if (this.testToEdit) {
      this.loadTestData();
    }
  }

  loadTestData() {
    if (this.testToEdit) {
      this.testData = {
        name: this.testToEdit.testName || this.testToEdit.name || '',
        duration: this.testToEdit.duration || 30,
        questions:
          this.testToEdit.questions?.map((q: any) => ({
            question: q.question || '',
            options: [
              q.options?.a || '',
              q.options?.b || '',
              q.options?.c || '',
              q.options?.d || '',
            ],
            correctAnswer: q.correctAnswer || 'a',
            explaination: q.explaination || '',
            imageUrl: q.imageUrl,
            audioUrl: q.audioUrl,
            id: q.id,
            requestType: q.requestType,
          })) || [],
        images: [],
        audios: [],
      };
      console.log('Loaded test data for editing:', this.testData);
    }
  }

  getFormTitle(): string {
    if (this.testToEdit || this.isEditMode) {
      return 'Chỉnh sửa bài test';
    }
    return 'Tạo bài test mới';
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
    if (
      !this.newQuestion.correctAnswer ||
      !['a', 'b', 'c', 'd'].includes(
        this.newQuestion.correctAnswer.toLowerCase()
      )
    ) {
      alert('Vui lòng chọn đáp án đúng (A, B, C, hoặc D)');
      return;
    }

    // Store the question with letter-based correct answer
    const questionToAdd = {
      ...this.newQuestion,
      correctAnswer: this.newQuestion.correctAnswer.toLowerCase(), // Ensure lowercase
      requestType: RequestType.ADD, // New question
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
      correctAnswer: 'a', // Default to option A
      explaination: '',
      image: undefined,
      requestType: RequestType.ADD,
    };
  }

  removeQuestion(index: number) {
    const question = this.testData.questions[index];
    question.requestType = RequestType.DELETE;
    // Keep in array but mark for deletion
    console.log('Question marked for deletion:', question);
  }

  editQuestion(index: number) {
    console.log('Edit question11:', this.testData.questions[index]);
    const question = this.testData.questions[index];
    this.newQuestion = {
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      explaination: question.explaination || '',
      image: undefined, // Reset file input
      audio: undefined, // Reset file input
      id: question.id, // Preserve existing question ID
      requestType: question.id ? RequestType.UPDATE : RequestType.ADD, // Set based on whether question has ID
    };
    console.log('New question11:', this.newQuestion);
    // Remove the question from the list temporarily
    this.testData.questions.splice(index, 1);
  }

  updateQuestion() {
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
    if (
      !this.newQuestion.correctAnswer ||
      !['a', 'b', 'c', 'd'].includes(
        this.newQuestion.correctAnswer.toLowerCase()
      )
    ) {
      alert('Vui lòng chọn đáp án đúng (A, B, C, hoặc D)');
      return;
    }

    // Store the question with letter-based correct answer
    const questionToAdd = {
      ...this.newQuestion,
      correctAnswer: this.newQuestion.correctAnswer.toLowerCase(), // Ensure lowercase
      requestType: this.newQuestion.requestType || RequestType.UPDATE, // Preserve request type
    };

    this.testData.questions.push(questionToAdd);
    console.log('Question updated:', questionToAdd);

    // Reset form
    this.newQuestion = {
      question: '',
      options: this.config.maxOptions
        ? new Array(this.config.maxOptions).fill('')
        : ['', '', '', ''],
      correctAnswer: 'a', // Default to option A
      explaination: '',
      image: undefined,
      requestType: RequestType.ADD,
    };
  }

  cancelEdit() {
    // Reset form without adding question
    this.newQuestion = {
      question: '',
      options: this.config.maxOptions
        ? new Array(this.config.maxOptions).fill('')
        : ['', '', '', ''],
      correctAnswer: 'a', // Default to option A
      explaination: '',
      image: undefined,
      requestType: RequestType.ADD,
    };
  }

  onSave() {
    console.log('Test data to save:', this.testData);
    if (this.testData.name.trim() && this.testData.questions.length > 0) {
      this.save.emit(this.testData);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  selectOption(index: number) {
    // Convert index to letter (0->a, 1->b, 2->c, 3->d)
    const letters = ['a', 'b', 'c', 'd'];
    this.newQuestion.correctAnswer = letters[index] || 'a';
  }

  getCorrectAnswerDisplay(question: TestQuestion): string {
    // Convert letter to index and get the option text
    const letterToIndex: { [key: string]: number } = { a: 0, b: 1, c: 2, d: 3 };
    const index = letterToIndex[question.correctAnswer.toLowerCase()];
    return question.options[index] || '';
  }

  getCorrectAnswerLabel(question: TestQuestion): string {
    // Return the letter in uppercase
    return `Đáp án ${question.correctAnswer.toUpperCase()}`;
  }

  getOptionLetter(index: number): string {
    // Convert index to letter (0->a, 1->b, 2->c, 3->d)
    const letters = ['a', 'b', 'c', 'd'];
    return letters[index] || 'a';
  }

  // Question image methods
  onQuestionImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newQuestion.image = file;
      this.newQuestion.imageName = file.name;
    }
  }

  removeQuestionImage() {
    this.newQuestion.image = undefined;
    this.newQuestion.imageName = undefined;
  }

  getImagePreview(file: File): string {
    return URL.createObjectURL(file);
  }

  // Question audio methods
  onQuestionAudioSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newQuestion.audio = file;
      this.newQuestion.audioName = file.name;
    }
  }

  removeQuestionAudio() {
    this.newQuestion.audio = undefined;
    this.newQuestion.audioName = undefined;
  }

  isEditingQuestion(): boolean {
    console.log('Is editing question11:', this.testData.questions.length);
    console.log('Test data questions11:', this.testData.questions);
    // Check if we're in the middle of editing a question
    // This happens when newQuestion has content but we're not adding a new question
    return (
      this.newQuestion.question.trim() !== '' &&
      this.testData.questions.length > 0 &&
      this.newQuestion.options.some((opt) => opt.trim() !== '')
    );
  }

  getSaveButtonText(): string {
    return this.isEditMode ? 'Cập nhật' : 'Lưu';
  }

  // Helper methods for request type management
  getQuestionsByRequestType(requestType: RequestType): TestQuestion[] {
    return this.testData.questions.filter((q) => q.requestType === requestType);
  }

  getQuestionsToCreate(): TestQuestion[] {
    return this.getQuestionsByRequestType(RequestType.ADD);
  }

  getQuestionsToUpdate(): TestQuestion[] {
    return this.getQuestionsByRequestType(RequestType.UPDATE);
  }

  getQuestionsToDelete(): TestQuestion[] {
    return this.getQuestionsByRequestType(RequestType.DELETE);
  }

  // Method to get summary of changes
  getChangeSummary(): { create: number; update: number; delete: number } {
    return {
      create: this.getQuestionsToCreate().length,
      update: this.getQuestionsToUpdate().length,
      delete: this.getQuestionsToDelete().length,
    };
  }

  get visibleQuestions() {
    return this.testData.questions.filter(
      (q) => q.requestType !== RequestType.DELETE
    );
  }
}
