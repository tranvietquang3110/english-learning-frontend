import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Level } from '../../../models/request/plan-intent-request.model';
import { StudyTime } from '../../../models/request/user-profile-update-request.model';

export interface GenerateData {
  target: number;
  description: string;
  level: Level;
  studyTime: StudyTime;
  useAccountInfo: boolean;
}

@Component({
  selector: 'app-ai-planning-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './ai-planning-modal.component.html',
  styleUrl: './ai-planning-modal.component.scss',
})
export class AiPlanningModalComponent {
  @Input() isOpen = false;
  @Input() isLoading = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onGenerate = new EventEmitter<GenerateData>();

  target = 0;
  description = '';
  level: Level = Level.BEGINNER;
  studyTime: StudyTime = StudyTime.MORNING;
  faWandMagicSparkles = faWandMagicSparkles;
  closeModal() {
    this.isOpen = false;
    this.resetForm();
    this.onClose.emit();
  }

  handleGenerateWithInputs() {
    if (this.target === 0 || !this.description.trim()) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }
    this.onGenerate.emit({
      target: Number(this.target),
      description: this.description,
      level: this.level,
      studyTime: this.studyTime,
      useAccountInfo: false,
    });
  }

  handleGenerateWithAccountInfo() {
    this.onGenerate.emit({
      target: 0,
      description: '',
      level: Level.BEGINNER,
      studyTime: StudyTime.MORNING,
      useAccountInfo: true,
    });
  }

  private resetForm() {
    this.target = 0;
    this.description = '';
    this.level = Level.BEGINNER;
    this.studyTime = StudyTime.MORNING;
  }
}
