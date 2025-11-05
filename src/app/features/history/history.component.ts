import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HistoryService } from '../../services/HistoryService';
import { FilterType } from '../../models/request/filter-type';
import { ExamHistoryResponse } from '../../models/response/exam-history-response.model';
import { environment } from '../../../environments/environment';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  constructor(private historyService: HistoryService) {}

  history: ExamHistoryResponse[] = [];
  currentPage = 1;
  readonly PAGE_SIZE = environment.PAGE_SIZE;
  totalPages = 1;
  selectedFilter: FilterType = FilterType.ALL;
  isLoading = false;

  // Filter options
  filterOptions = [
    { value: FilterType.ALL, label: 'Tất cả' },
    { value: FilterType.GRAMMAR, label: 'Ngữ pháp' },
    { value: FilterType.LISTENING, label: 'Nghe' },
    { value: FilterType.VOCABULARY, label: 'Từ vựng' },
  ];

  ngOnInit(): void {
    this.loadHistory(this.currentPage - 1);
  }

  handlePageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadHistory(page - 1);
    }
  }

  onFilterChange(filter: FilterType) {
    this.selectedFilter = filter;
    this.currentPage = 1; // Reset to first page when filter changes
    this.loadHistory(0);
  }

  loadHistory(page: number) {
    this.historyService
      .getHistory(page, this.PAGE_SIZE, this.selectedFilter)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.history = data.content;
          this.totalPages = data.totalPages;
        },
        error: (error) => {
          console.error('Error loading history:', error);
        },
      });
  }

  getTestTypeLabel(testType: string): string {
    switch (testType) {
      case 'GRAMMAR':
        return 'Ngữ pháp';
      case 'LISTENING':
        return 'Nghe';
      case 'VOCABULARY':
        return 'Từ vựng';
      case 'FULL_TEST':
        return 'Bài thi đầy đủ';
      default:
        return testType;
    }
  }

  getSelectedFilterLabel(): string {
    const option = this.filterOptions.find(
      (f) => f.value === this.selectedFilter
    );
    return option ? option.label : 'Tất cả';
  }

  getScoreColor(score: number): string {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  }

  formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
