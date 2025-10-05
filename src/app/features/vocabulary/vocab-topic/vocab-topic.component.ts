import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookOpen, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule } from '@angular/router';
import { VocabularyService } from '../../../services/VocabularyService';

import { VocabTopic } from '../../../models/vocabulary/vocab-topic.model';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-vocab-topic',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule, PaginationComponent],
  templateUrl: './vocab-topic.component.html',
})
export class VocabTopicComponent implements OnInit {
  // icon
  faBookOpen = faBookOpen;
  faFileAlt = faFileAlt;
  vocabTopics: VocabTopic[] = [];
  currentPage = 1;
  totalPages = 1;
  readonly TOPICS_PER_PAGE = environment.PAGE_SIZE;
  constructor(
    private router: Router,
    private vocabService: VocabularyService
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.vocabService
      .getTopics(this.currentPage - 1, this.TOPICS_PER_PAGE)
      .subscribe({
        next: (data) => {
          console.log('Loaded vocabulary topics:', data);
          this.vocabTopics = data.content;
          this.currentPage = data.number + 1;
          this.totalPages = data.totalPages;
        },
      });
  }
  handlePageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadData();
    }
  }
  onLearn(topic: VocabTopic, e: MouseEvent) {
    e.stopPropagation();
    console.log(`Learning topic: ${topic.name}`);
    this.router.navigate(['/vocabulary/learn', topic.id.toString()]);
  }
  onTest(topic: VocabTopic, e: MouseEvent) {
    e.stopPropagation();
    console.log(`Taking test for: ${topic.name}`);
    this.router.navigate(['/vocabulary/topics/tests', topic.id.toString()]);
  }

  // badge style theo status
  badgeClass(status: VocabTopic['status']) {
    if (status === 'Completed') return 'bg-primary text-primary-foreground';
    if (status === 'In Progress') return 'bg-muted text-foreground';
    return 'border border-primary text-primary';
  }
}
