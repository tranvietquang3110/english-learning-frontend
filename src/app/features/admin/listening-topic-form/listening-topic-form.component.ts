import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListeningTopic } from '../../../models/listening/listening-topic.model';

@Component({
  selector: 'app-listening-topic-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listening-topic-form.component.html',
  styleUrl: './listening-topic-form.component.scss',
})
export class ListeningTopicFormComponent {
  @Output() submit = new EventEmitter<ListeningTopic>();
  @Output() cancel = new EventEmitter<void>();

  topic: Partial<ListeningTopic> = {
    name: '',
    description: '',
    imageUrl: '',
  };

  imageFile: File | null = null;

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      this.topic.imageUrl = file;
    }
  }

  onSubmit() {
    if (this.topic.name && this.topic.description) {
      this.submit.emit(this.topic as ListeningTopic);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
