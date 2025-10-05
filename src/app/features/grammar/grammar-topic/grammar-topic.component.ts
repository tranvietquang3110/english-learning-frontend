import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faBookOpen,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';
import { GrammarTopic } from '../../../models/grammar/grammar-topic.model';
import { GrammarService } from '../../../services/GrammarService';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { environment } from '../../../../environments/environment';
import { TopicCardComponent } from '../../../shared/topic-card/topic-card.component';
import { TopicBase } from '../../../models/topic-base';

@Component({
  selector: 'app-grammar-topic',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    PaginationComponent,
    TopicCardComponent,
  ],
  templateUrl: './grammar-topic.component.html',
})
export class GrammarTopicComponent implements OnInit {
  faBookOpen = faBookOpen;
  faFileAlt = faFileAlt;
  faArrowLeft = faArrowLeft;
  grammarTopics: GrammarTopic[] = [];
  topics: TopicBase[] = [];
  currentPage = 1;
  totalPages = 1;
  readonly TOPICS_PER_PAGE = environment.PAGE_SIZE;
  constructor(private router: Router, private grammarService: GrammarService) {}

  ngOnInit(): void {
    this.loadData();
  }

  onLearn(topic: TopicBase) {
    console.log(`Learning grammar: ${topic.name}`);
    this.router.navigate(['/grammar/topics', topic.id.toString()]);
  }

  badgeClass(status: GrammarTopic['status']) {
    if (status === 'Completed') return 'bg-primary text-primary-foreground';
    if (status === 'In Progress') return 'bg-muted text-foreground';
    return 'border border-primary text-primary';
  }

  loadData() {
    this.grammarService
      .getAllTopics(this.currentPage - 1, this.TOPICS_PER_PAGE)
      .subscribe({
        next: (data) => {
          data.content.forEach((topic) => {
            this.topics.push({
              description: topic.description,
              id: topic.id,
              imageUrl: topic.imageUrl,
              name: topic.name,
              progress: 0,
              status: 'Complete',
            });
          });
          this.totalPages = data.totalPages;
        },
      });
  }

  handlePageChange(newPage: number) {
    this.currentPage = newPage;
    this.loadData();
  }
}
