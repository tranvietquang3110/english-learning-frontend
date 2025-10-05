import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TopicBase } from '../../models/topic-base';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topic-test-card-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topic-test-card-grid.component.html',
  styleUrl: './topic-test-card-grid.component.scss',
})
export class TopicTestCardGridComponent {
  @Input() topics: TopicBase[] = [];
  @Output() topicSelect = new EventEmitter<TopicBase>();

  onTopicSelect(topic: TopicBase) {
    this.topicSelect.emit(topic);
  }
}
