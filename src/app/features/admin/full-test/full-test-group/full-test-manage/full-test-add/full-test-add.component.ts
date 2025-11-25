import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSave,
  faTimes,
  faFileAlt,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ToeicTestRequest } from '../../../../../../models/request/toeic-test-request-model';
import { ToeicTestResponse } from '../../../../../../models/response/toeict-test-response.model';
import { ToeicPart } from '../../../../../../models/toeic-part.enum';
import { ToeicTestService } from '../../../../../../services/ToeicTestService';
import { RequestType } from '../../../../../../models/request-type.model';
import { AudioPlayerComponent } from '../../../../../../shared/audio-player/audio-player.component';

@Component({
  selector: 'app-full-test-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AudioPlayerComponent,
  ],
  templateUrl: './full-test-add.component.html',
  styleUrl: './full-test-add.component.scss',
})
export class FullTestAddComponent implements OnInit {
  @Input() initialData: ToeicTestResponse | null = null;
  @Input() isEditMode: boolean = false;
  @Input() groupId: string = '';
  @Output() save = new EventEmitter<ToeicTestRequest>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;
  isSubmitting = false;
  error: string | null = null;

  // FontAwesome icons
  faSave = faSave;
  faTimes = faTimes;
  faFileAlt = faFileAlt;
  faPlus = faPlus;
  faTrash = faTrash;

  // TOEIC Parts
  ToeicPart = ToeicPart;
  toeicParts = [
    { value: ToeicPart.PART_1, label: 'Part 1' },
    { value: ToeicPart.PART_2, label: 'Part 2' },
    { value: ToeicPart.PART_3, label: 'Part 3' },
    { value: ToeicPart.PART_4, label: 'Part 4' },
    { value: ToeicPart.PART_5, label: 'Part 5' },
    { value: ToeicPart.PART_6, label: 'Part 6' },
  ];

  // Options keys
  optionKeys = ['a', 'b', 'c', 'd'];

  // Track original question IDs for edit mode
  originalQuestionIds: Set<string> = new Set();

  // File uploads for each question
  questionFiles: {
    imageFile: File | null;
    audioFile: File | null;
    imagePreviewUrl: string | null;
    audioPreviewUrl: string | null;
    imageName: string | null;
    audioName: string | null;
  }[] = [];

  // Track deleted question IDs
  deletedQuestionIds: string[] = [];

  constructor(
    private fb: FormBuilder,
    private toeicTestService: ToeicTestService
  ) {}

  ngOnInit(): void {
    this.isEditMode = this.isEditMode || !!this.initialData;
    this.initializeForm();
  }

  get questionsFormArray(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: [
        this.initialData?.name || '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200),
        ],
      ],
      questions: this.fb.array([]),
    });

    // Load questions if editing
    if (this.initialData?.questions && this.initialData.questions.length > 0) {
      this.initialData.questions.forEach((q) => {
        this.addQuestion(q);
        if (q.id) {
          this.originalQuestionIds.add(q.id);
        }
      });
    } else {
      // Add one empty question by default
      this.addQuestion();
    }
  }

  addQuestion(questionData?: any): void {
    const questionGroup = this.fb.group({
      id: [questionData?.id || null], // Track question ID for edit mode
      question: [questionData?.question || '', Validators.required],
      options: this.fb.group({
        a: [questionData?.options?.['a'] || '', Validators.required],
        b: [questionData?.options?.['b'] || '', Validators.required],
        c: [questionData?.options?.['c'] || '', Validators.required],
        d: [questionData?.options?.['d'] || '', Validators.required],
      }),
      correctAnswer: [questionData?.correctAnswer || '', Validators.required],
      part: [questionData?.part || ToeicPart.PART_1, Validators.required],
      explanation: [questionData?.explanation || ''],
    });

    this.questionsFormArray.push(questionGroup);

    // Initialize file uploads for this question
    this.questionFiles.push({
      imageFile: null,
      audioFile: null,
      imagePreviewUrl: questionData?.imageUrl || null,
      audioPreviewUrl: questionData?.audioUrl || null,
      imageName: questionData?.imageUrl
        ? this.extractFileName(questionData.imageUrl)
        : null,
      audioName: questionData?.audioUrl
        ? this.extractFileName(questionData.audioUrl)
        : null,
    });
  }

  removeQuestion(index: number): void {
    if (this.questionsFormArray.length > 1) {
      const questionGroup = this.getQuestionFormGroup(index);
      const questionId = questionGroup.get('id')?.value;

      // If editing and question has ID, mark it for deletion
      if (
        this.isEditMode &&
        questionId &&
        this.originalQuestionIds.has(questionId)
      ) {
        this.deletedQuestionIds.push(questionId);
        this.originalQuestionIds.delete(questionId);
      }

      // Clean up file preview URLs
      if (this.questionFiles[index]?.imagePreviewUrl) {
        URL.revokeObjectURL(this.questionFiles[index].imagePreviewUrl!);
      }
      if (this.questionFiles[index]?.audioPreviewUrl) {
        URL.revokeObjectURL(this.questionFiles[index].audioPreviewUrl!);
      }

      this.questionsFormArray.removeAt(index);
      this.questionFiles.splice(index, 1);
    }
  }

  getQuestionFormGroup(index: number): FormGroup {
    return this.questionsFormArray.at(index) as FormGroup;
  }

  getOptionsFormGroup(index: number): FormGroup {
    return this.getQuestionFormGroup(index).get('options') as FormGroup;
  }

  getQuestionControl(index: number, controlName: string): FormControl {
    return this.getQuestionFormGroup(index).get(controlName) as FormControl;
  }

  getOptionControl(index: number, optionKey: string): FormControl {
    return this.getOptionsFormGroup(index).get(optionKey) as FormControl;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.questionsFormArray.length === 0) {
      this.error = 'Vui lòng thêm ít nhất một câu hỏi.';
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    const formValue = this.form.value;
    const imageFiles: File[] = [];
    const audioFiles: File[] = [];

    // Build questions with actions and file names
    const questions = formValue.questions.map((q: any, index: number) => {
      const questionId = q.id;
      const fileInfo = this.questionFiles[index];

      // Determine action
      let action: RequestType;
      if (!questionId) {
        // New question
        action = RequestType.ADD;
      } else if (this.originalQuestionIds.has(questionId)) {
        // Existing question being updated
        action = RequestType.UPDATE;
      } else {
        // This shouldn't happen, but default to ADD
        action = RequestType.ADD;
      }

      // Collect files for upload
      if (fileInfo.imageFile) {
        imageFiles.push(fileInfo.imageFile);
      }
      if (fileInfo.audioFile) {
        audioFiles.push(fileInfo.audioFile);
      }

      return {
        id: questionId || undefined,
        question: q.question.trim(),
        options: {
          a: q.options.a.trim(),
          b: q.options.b.trim(),
          c: q.options.c.trim(),
          d: q.options.d.trim(),
        },
        correctAnswer: q.correctAnswer.toLowerCase().trim(),
        part: q.part,
        explanation: q.explanation?.trim() || undefined,
        action: action,
        imageName: fileInfo.imageFile
          ? fileInfo.imageFile.name
          : fileInfo.imageName || undefined,
        audioName: fileInfo.audioFile
          ? fileInfo.audioFile.name
          : fileInfo.audioName || undefined,
      };
    });

    // Add deleted questions
    this.deletedQuestionIds.forEach((id) => {
      questions.push({
        id: id,
        action: RequestType.DELETE,
      } as any);
    });

    const request: ToeicTestRequest = {
      name: formValue.name.trim(),
      questions: questions,
    };

    // TODO: Implement API call
    if (this.isEditMode && this.initialData) {
      this.toeicTestService
        .updateTest(request, this.initialData.id, imageFiles, audioFiles)
        .subscribe({
          next: (response) => {
            this.isSubmitting = false;
            this.save.emit(response);
          },
          error: (error) => {
            this.isSubmitting = false;
            this.error = 'Không thể cập nhật bài test. Vui lòng thử lại.';
            console.error('Error updating test:', error);
          },
        });
    } else {
      this.toeicTestService
        .addTest(request, this.groupId, imageFiles, audioFiles)
        .subscribe({
          next: (response) => {
            this.isSubmitting = false;
            this.save.emit(response);
          },
          error: (error) => {
            this.isSubmitting = false;
            this.error = 'Không thể tạo bài test. Vui lòng thử lại.';
            console.error('Error creating test:', error);
          },
        });
    }
  }

  // File upload handlers
  onImageSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Clean up previous preview URL
      if (this.questionFiles[index].imagePreviewUrl) {
        URL.revokeObjectURL(this.questionFiles[index].imagePreviewUrl!);
      }

      this.questionFiles[index].imageFile = file;
      this.questionFiles[index].imagePreviewUrl = URL.createObjectURL(file);
      this.questionFiles[index].imageName = file.name;
    }
  }

  onAudioSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Clean up previous preview URL
      if (this.questionFiles[index].audioPreviewUrl) {
        URL.revokeObjectURL(this.questionFiles[index].audioPreviewUrl!);
      }

      this.questionFiles[index].audioFile = file;
      this.questionFiles[index].audioPreviewUrl = URL.createObjectURL(file);
      this.questionFiles[index].audioName = file.name;
    }
  }

  removeImageFile(index: number): void {
    // Clean up preview URL
    if (this.questionFiles[index].imagePreviewUrl) {
      URL.revokeObjectURL(this.questionFiles[index].imagePreviewUrl!);
    }

    this.questionFiles[index].imageFile = null;
    this.questionFiles[index].imagePreviewUrl = null;
    this.questionFiles[index].imageName = null;
  }

  removeAudioFile(index: number): void {
    // Clean up preview URL
    if (this.questionFiles[index].audioPreviewUrl) {
      URL.revokeObjectURL(this.questionFiles[index].audioPreviewUrl!);
    }

    this.questionFiles[index].audioFile = null;
    this.questionFiles[index].audioPreviewUrl = null;
    this.questionFiles[index].audioName = null;
  }

  extractFileName(url: string): string {
    // Extract filename from URL
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
