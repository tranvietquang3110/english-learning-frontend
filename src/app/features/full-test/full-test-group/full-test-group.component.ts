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

@Component({
  selector: 'app-full-test-group',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './full-test-group.component.html',
  styleUrl: './full-test-group.component.scss',
})
export class FullTestGroupComponent implements OnInit {
  toeicGroups: ToeicTestGroupResponse[] = [];
  isLoading = false;
  error: string | null = null;
  expandedGroups: Set<string> = new Set();

  // FontAwesome icons
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faArrowRight = faArrowRight;

  ngOnInit(): void {
    this.fetchToeicTestGroups();
  }

  fetchToeicTestGroups(): void {
    this.isLoading = true;
    this.error = null;

    // TODO: Implement service method to fetch groups
    // For now, using mock data
    setTimeout(() => {
      this.toeicGroups = [
        {
          id: '1',
          name: 'TEST ĐẦU VÀO (1)',
          releaseDate: '2025-01-01',
          createdAt: '2025-01-01',
          tests: [
            {
              id: '1',
              name: 'Bài test 1',
              questions: [],
              totalCompletion: 30719,
              createdAt: '2025-01-01',
            },
            {
              id: '2',
              name: 'Bài test 2',
              questions: [],
              totalCompletion: 25000,
              createdAt: '2025-01-01',
            },
          ],
        },
        {
          id: '2',
          name: 'TEST ĐẦU VÀO (2)',
          releaseDate: '2025-01-01',
          createdAt: '2025-01-01',
          tests: [
            {
              id: '3',
              name: 'Bài test 3',
              questions: [],
              totalCompletion: 20000,
              createdAt: '2025-01-01',
            },
          ],
        },
        {
          id: '3',
          name: 'TEST BEGINNER',
          releaseDate: '2025-01-01',
          createdAt: '2025-01-01',
          tests: [
            {
              id: '4',
              name: 'Bài test 4',
              questions: [],
              totalCompletion: 20568,
              createdAt: '2025-01-01',
            },
          ],
        },
      ];
      this.isLoading = false;
    }, 500);
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
}
