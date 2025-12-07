import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { ToeicTestGroupResponse } from '../../../models/response/toeic-test-group-response.model';
import { ToeicTestService } from '../../../services/ToeicTestService';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-full-test-group',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './full-test-group.component.html',
  styleUrl: './full-test-group.component.scss',
})
export class FullTestGroupComponent implements OnInit {
  readonly COLOR_LIST = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#FF33A1',
    '#A133FF',
    '#FFA133',
  ];
  toeicGroups: ToeicTestGroupResponse[] = [];
  isLoading = false;
  error: string | null = null;
  expandedGroups: Set<string> = new Set();

  // FontAwesome icons
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faArrowRight = faArrowRight;

  currentPage = 1;
  readonly GROUPS_PER_PAGE = environment.PAGE_SIZE;
  totalPages = 1;
  totalElements = 0;

  constructor(private toeicTestService: ToeicTestService) {}
  ngOnInit(): void {
    this.fetchToeicTestGroups();
  }

  fetchToeicTestGroups(): void {
    this.isLoading = true;
    this.error = null;

    this.toeicTestService
      .getGroup(this.currentPage - 1, this.GROUPS_PER_PAGE)
      .subscribe({
        next: (groups) => {
          this.toeicGroups = groups.content;
          this.totalPages = groups.totalPages;
          this.totalElements = groups.totalElements;
          this.currentPage = groups.number + 1;
          this.isLoading = false;
        },
        error: (error) => {
          this.error =
            'Không thể tải danh sách nhóm bài test. Vui lòng thử lại.';
          this.isLoading = false;
        },
      });
  }

  toggleGroup(groupId: string): void {
    if (this.expandedGroups.has(groupId)) {
      this.expandedGroups.delete(groupId);
    } else {
      this.expandedGroups.add(groupId);
    }
  }

  isGroupExpanded(groupId: string): boolean {
    return this.expandedGroups.has(groupId);
  }

  formatNumber(num: number): string {
    return num.toLocaleString('vi-VN');
  }

  loadMoreGroups(): void {
    this.currentPage++;
    this.fetchToeicTestGroups();
  }
}
