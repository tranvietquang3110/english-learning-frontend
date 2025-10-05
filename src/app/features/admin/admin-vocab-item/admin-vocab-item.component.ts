import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vocabulary } from '../../../models/vocabulary/vocabulary.model';

@Component({
  selector: 'app-admin-vocab-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-vocab-item.component.html',
})
export class AdminVocabItemComponent {
  @Input() vocab!: Vocabulary;

  @Output() edit = new EventEmitter<Vocabulary>();
  @Output() delete = new EventEmitter<string>();

  onEdit() {
    this.edit.emit(this.vocab);
  }

  onDelete() {
    this.delete.emit(this.vocab.id);
  }
}
