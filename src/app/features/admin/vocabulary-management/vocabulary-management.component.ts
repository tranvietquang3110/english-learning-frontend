import { Component, OnInit } from '@angular/core';

import { VocabularyService } from '../../../services/VocabularyService';
import { TopicBase } from '../../../models/topic-base';
import { TopicCardComponent } from '../../../shared/topic-card/topic-card.component';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VocabTopicFormComponent } from '../vocab-topic-form/vocab-topic-form.component';
import { VocabTopic } from '../../../models/vocabulary/vocab-topic.model';

enum State {
  View,
  Edit,
  Create,
}

@Component({
  selector: 'app-vocabulary-management',
  standalone: true,
  imports: [
    TopicCardComponent,
    PaginationComponent,
    CommonModule,
    VocabTopicFormComponent,
  ],
  templateUrl: './vocabulary-management.component.html',
  styleUrl: './vocabulary-management.component.scss',
})
export class VocabularyManagementComponent implements OnInit {
  State = State;
  currentState = State.View;
  topics: TopicBase[] = [];
  currentPage = 1;
  totalPages = 0;
  readonly PAGE_SIZE = environment.PAGE_SIZE;
  constructor(
    private vocabService: VocabularyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.vocabService
      .getTopics(this.currentPage - 1, this.PAGE_SIZE)
      .subscribe((data) => {
        console.log(data);
        const result = data.content;
        result.forEach((item) => {
          const vocabTopic: TopicBase = {
            id: item.id,
            name: item.name,
            description: item.description,
            imageUrl: item.imageUrl,
          };
          this.topics.push(vocabTopic);
        });
        this.currentPage = data.pageable.pageNumber + 1;
        this.totalPages = data.totalPages;
      });
  }

  onViewDetail(topic: TopicBase) {
    this.router.navigate(['/admin/vocabulary/manage', topic.id]);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadData();
  }

  changeToCreate() {
    this.currentState = State.Create;
  }

  changeToView() {
    this.currentState = State.View;
  }

  onCreateTopic(topic: VocabTopic) {
    console.log(topic);
    this.vocabService
      .createTopic(topic, topic.imageUrl as any)
      .subscribe((res) => {
        console.log(res);
        this.topics = this.topics.concat(res);
        this.changeToView();
      });
  }

  onCancel() {
    this.changeToView();
  }
}
