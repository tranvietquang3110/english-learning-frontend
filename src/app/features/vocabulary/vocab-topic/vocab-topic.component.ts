import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBookOpen, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { VocabularyService } from '../../../services/VocabularyService';
import { FavoriteService } from '../../../services/FavoriteService';
import { TopicCardComponent } from '../../../shared/topic-card/topic-card.component';

import { VocabTopic } from '../../../models/vocabulary/vocab-topic.model';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { environment } from '../../../../environments/environment';
import { ItemTypeEnum } from '../../../models/item-type-enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vocab-topic',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    PaginationComponent,
    TopicCardComponent,
  ],
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
  favoriteTopicIds: Map<string, string> = new Map();
  isLoading = false;
  error: string | null = null;

  constructor(
    private vocabService: VocabularyService,
    private favoriteService: FavoriteService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadData();
    this.loadFavorites();
  }

  loadData() {
    this.isLoading = true;
    this.error = null;

    this.vocabService
      .getTopics(this.currentPage - 1, this.TOPICS_PER_PAGE)
      .subscribe({
        next: (data) => {
          console.log('Loaded vocabulary topics:', data);
          this.vocabTopics = data.content;
          this.currentPage = data.number + 1;
          this.totalPages = data.totalPages;
          this.isLoading = false;
        },
        error: (error) => {
          this.error =
            'Lỗi tải danh sách chủ đề: ' + (error.message || 'Không xác định');
          this.isLoading = false;
        },
      });
  }

  loadFavorites() {
    this.favoriteService.getFavoritesByType(ItemTypeEnum.VOCABULARY).subscribe({
      next: (favorites) => {
        console.log('Favorites:', favorites);
        this.favoriteTopicIds = new Map(
          favorites.map((f) => [f.vocabTopic?.id, f.id])
        );
        console.log('FavoriteTopicIds:', this.favoriteTopicIds);
      },
      error: (error) => {
        console.error('Error loading favorites:', error);
      },
    });
  }
  handlePageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadData();
    }
  }
  onLearn(topic: VocabTopic) {
    console.log(`Learning topic: ${topic.name}`);
    this.router.navigate(['/vocabulary/learn', topic.id.toString()]);
  }
  onTest(topic: VocabTopic) {
    console.log(`Taking test for: ${topic.name}`);
    this.router.navigate(['/vocabulary/topics/tests', topic.id.toString()]);
  }

  // badge style theo status
  badgeClass(status: VocabTopic['status']) {
    if (status === 'Completed') return 'bg-primary text-primary-foreground';
    if (status === 'In Progress') return 'bg-muted text-foreground';
    return 'border border-primary text-primary';
  }

  // Check if topic is favorite
  isFavorite(topic: VocabTopic): boolean {
    return this.favoriteTopicIds.has(topic.id);
  }

  // Handle favorite toggle
  onFavorite(topic: VocabTopic) {
    console.log('Adding to favorites:', topic.name);
    this.favoriteService
      .addFavorite(topic.id, ItemTypeEnum.VOCABULARY)
      .subscribe({
        next: (response) => {
          console.log('Added to favorites:', topic.name, response);
          this.favoriteTopicIds.set(topic.id, response.id);
          // Update the topic with favoriteId
          topic.favoriteId = response.id;
        },
        error: (error) => {
          console.error('Error adding to favorites:', error);
        },
      });
  }

  onUnfavorite(topic: VocabTopic) {
    console.log('Removing from favorites:', topic.name);
    const favoriteId = this.favoriteTopicIds.get(topic.id);
    if (favoriteId) {
      this.favoriteService.deleteFavorite(favoriteId).subscribe({
        next: () => {
          console.log('Removed from favorites:', topic.name);
          this.favoriteTopicIds.delete(topic.id);
          topic.favoriteId = undefined;
        },
        error: (error) => {
          console.error('Error removing from favorites:', error);
        },
      });
    }
  }
}
