import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TopicBase } from '../../models/topic-base';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-topic-test-card-grid',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './topic-test-card-grid.component.html',
  styleUrl: './topic-test-card-grid.component.scss',
})
export class TopicTestCardGridComponent {
  @Input() topics: TopicBase[] = [];
  @Output() topicSelect = new EventEmitter<TopicBase>();
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  onTopicSelect(topic: TopicBase) {
    this.topicSelect.emit(topic);
  }
  onPageChange(page: number) {
    this.pageChange.emit(page);
  }
}
