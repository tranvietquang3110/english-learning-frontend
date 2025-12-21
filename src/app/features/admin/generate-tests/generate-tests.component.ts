import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-generate-tests',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './generate-tests.component.html',
  styleUrl: './generate-tests.component.scss',
})
export class GenerateTestsComponent {
  @Input() isOpen = true;
  @Input() isLoading = false;
  @Input() topicType = 'Vocabulary';
  @Input() topicDescription = '';
  @Input() topicLevel = '';
  @Output() closed = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<{
    topicType: string;
    description: string;
  }>();

  description = '';
  faWandMagicSparkles = faWandMagicSparkles;
  topicTypeOptions = [
    { value: 'Vocabulary', label: 'Vocabulary' },
    { value: 'Grammar', label: 'Grammar' },
    { value: 'Listening', label: 'Listening' },
  ];

  closeModal() {
    this.closed.emit();
  }

  handleSubmit() {
    if (this.isLoading) return;
    const desc = this.description.trim();
    if (!desc) return;

    this.submitted.emit({
      topicType: this.topicType,
      description:
        'Description topic: ' +
        this.topicDescription +
        ' User Description: ' +
        desc +
        ' Level: ' +
        this.topicLevel,
    });
  }
}
