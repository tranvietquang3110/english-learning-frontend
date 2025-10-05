import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface VocabularyTestFormData {
  name: string;
  duration: number;
  questions: VocabularyTestQuestion[];
  images: File[];
}

export interface VocabularyTestFormDataForAPI {
  name: string;
  duration: number;
  questions: VocabularyTestQuestionForAPI[];
  images: File[];
}

export interface VocabularyTestQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  imageUrl?: string;
}

export interface VocabularyTestQuestionForAPI {
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correctAnswer: string; // A, B, C, or D
  questionOrder: number;
  explaination?: string;
}

@Component({
  selector: 'app-vocabulary-test-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vocabulary-test-form.component.html',
  styleUrl: './vocabulary-test-form.component.scss',
})
export class VocabularyTestFormComponent {
  @Input() topicName: string = '';
  @Output() save = new EventEmitter<VocabularyTestFormDataForAPI>();
  @Output() cancel = new EventEmitter<void>();

  testData: VocabularyTestFormData = {
    name: '',
    duration: 30,
    questions: [],
    images: [],
  };

  newQuestion: VocabularyTestQuestion = {
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  };

  selectedImages: File[] = [];

  addQuestion() {
    if (
      this.newQuestion.question.trim() &&
      this.newQuestion.options.every((opt) => opt.trim()) &&
      this.newQuestion.correctAnswer >= 0
    ) {
      // Convert correctAnswer to number if it's a string
      const questionToAdd = {
        ...this.newQuestion,
        correctAnswer:
          typeof this.newQuestion.correctAnswer === 'string'
            ? parseInt(this.newQuestion.correctAnswer)
            : this.newQuestion.correctAnswer,
      };

      this.testData.questions.push(questionToAdd);

      // Reset form
      this.newQuestion = {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      };
    }
  }

  removeQuestion(index: number) {
    this.testData.questions.splice(index, 1);
  }

  onImageSelected(event: any) {
    const files = event.target.files;
    if (files) {
      this.selectedImages = Array.from(files);
      this.testData.images = this.selectedImages;
    }
  }

  onSave() {
    if (this.testData.name.trim() && this.testData.questions.length > 0) {
      // Convert questions to API format
      const convertedData: VocabularyTestFormDataForAPI = {
        ...this.testData,
        questions: this.convertQuestionsToAPIFormat(this.testData.questions),
      };
      this.save.emit(convertedData);
    }
  }

  private convertQuestionsToAPIFormat(
    questions: VocabularyTestQuestion[]
  ): VocabularyTestQuestionForAPI[] {
    return questions.map((question, index) => ({
      question: question.question,
      options: {
        a: question.options[0] || '',
        b: question.options[1] || '',
        c: question.options[2] || '',
        d: question.options[3] || '',
      },
      correctAnswer: this.convertIndexToLetter(question.correctAnswer),
      questionOrder: index + 1,
      explaination: '',
    }));
  }

  private convertIndexToLetter(index: number): string {
    const letters = ['a', 'b', 'c', 'd'];
    return letters[index] || 'a';
  }

  onCancel() {
    this.cancel.emit();
  }
}
