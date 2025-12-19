import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TopicType } from '../../../../models/topic-type.enum';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topic-generate',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './topic-generate.component.html',
  styleUrl: './topic-generate.component.scss',
})
export class TopicGenerateComponent {
  @Input() isOpen = true;
  @Input() isLoading = false;
  @Input() topicType = 'Vocabulary';
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
      description: desc,
    });
  }
}
