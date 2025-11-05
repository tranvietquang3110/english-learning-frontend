import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Level } from '../../../models/request/plan-intent-request.model';

export interface GenerateData {
  target: number;
  description: string;
  level: Level;
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
  faWandMagicSparkles = faWandMagicSparkles;
  closeModal() {
    this.isOpen = false;
    this.resetForm();
    this.onClose.emit();
  }

  handleGenerateWithInputs() {
    console.log(
      'Handle Generate With Inputs:',
      this.target,
      this.description,
      this.level
    );
    if (this.target === 0 || !this.description.trim()) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }
    this.onGenerate.emit({
      target: Number(this.target),
      description: this.description,
      level: this.level,
      useAccountInfo: false,
    });
  }

  handleGenerateWithAccountInfo() {
    this.onGenerate.emit({
      target: 0,
      description: '',
      level: Level.BEGINNER,
      useAccountInfo: true,
    });
  }

  private resetForm() {
    this.target = 0;
    this.description = '';
    this.level = Level.BEGINNER;
  }
}
