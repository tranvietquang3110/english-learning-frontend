import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBookOpen,
  faFileAlt,
  faEye,
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { TopicBase } from '../../models/topic-base';

@Component({
  selector: 'app-topic-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './topic-card.component.html',
  styleUrls: [],
})
export class TopicCardComponent {
  @Input() topic!: TopicBase;
  @Input() isFavorite = false;
  @Input() isDark = false;
  @Output() favorite = new EventEmitter<TopicBase>();
  @Output() unfavorite = new EventEmitter<TopicBase>();
  @Output() learn = new EventEmitter<TopicBase>();
  @Output() test = new EventEmitter<TopicBase>();
  @Output() detail = new EventEmitter<TopicBase>();
  @Output() delete = new EventEmitter<TopicBase>();

  faBookOpen = faBookOpen;
  faFileAlt = faFileAlt;
  faEye = faEye;
  faHeartSolid = faHeartSolid;
  faHeartRegular = faHeartRegular;

  badgeClass(status: TopicBase['status']) {
    if (status === 'Completed') return 'bg-primary text-primary-foreground';
    if (status === 'In Progress') return 'bg-muted text-foreground';
    return 'border border-primary text-primary';
  }

  onLearn(e: MouseEvent) {
    e.stopPropagation();
    this.learn.emit(this.topic);
  }

  onTest(e: MouseEvent) {
    e.stopPropagation();
    this.test.emit(this.topic);
  }

  onDetail(e: MouseEvent) {
    e.stopPropagation();
    this.detail.emit(this.topic);
  }

  onDelete(e: MouseEvent) {
    e.stopPropagation();
    this.delete.emit(this.topic);
  }

  toggleFavorite(e: MouseEvent) {
    e.stopPropagation();
    if (this.isFavorite) {
      this.unfavorite.emit(this.topic);
    } else {
      this.favorite.emit(this.topic);
    }
  }
}
