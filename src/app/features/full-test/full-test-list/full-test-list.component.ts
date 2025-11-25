import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faFileAlt,
  faUsers,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ToeicTestResponse } from '../../../models/response/toeict-test-response.model';
import { ToeicTestGroupResponse } from '../../../models/response/toeic-test-group-response.model';
import { Page } from '../../../models/page.model';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-full-test-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    PaginationComponent,
    DatePipe,
  ],
  templateUrl: './full-test-list.component.html',
  styleUrl: './full-test-list.component.scss',
})
export class FullTestListComponent implements OnInit {
  groupId: string = '';
  group: ToeicTestGroupResponse | null = null;
  tests: ToeicTestResponse[] = [];
  currentPage = 1;
  totalPages = 1;
  totalElements = 0;
  isLoading = false;
  error: string | null = null;
  readonly TESTS_PER_PAGE = environment.PAGE_SIZE || 12;

  // FontAwesome icons
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faFileAlt = faFileAlt;
  faUsers = faUsers;
  faCalendarAlt = faCalendarAlt;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.groupId = params['groupId'];
      if (this.groupId) {
        this.loadGroup();
        this.loadTests(this.currentPage - 1);
      }
    });
  }

  loadGroup(): void {
    // TODO: Implement API call to get group by ID
    // For now, using mock data
    this.group = {
      id: this.groupId,
      name: 'TEST ĐẦU VÀO (1)',
      releaseDate: '2025-01-01',
      createdAt: '2025-01-01',
      tests: [],
    };
  }

  loadTests(page: number): void {
    this.isLoading = true;
    this.error = null;

    // TODO: Implement API call to get tests by group ID with pagination
    // this.toeicTestService.getTestsByGroupId(this.groupId, page, this.TESTS_PER_PAGE).subscribe({
    //   next: (response: Page<ToeicTestResponse>) => {
    //     this.tests = response.content;
    //     this.totalPages = response.totalPages;
    //     this.totalElements = response.totalElements;
    //     this.currentPage = response.number + 1;
    //     this.isLoading = false;
    //   },
    //   error: (error) => {
    //     this.error = 'Không thể tải danh sách bài test. Vui lòng thử lại.';
    //     this.isLoading = false;
    //     console.error('Error loading tests:', error);
    //   }
    // });

    // Mock data for now
    setTimeout(() => {
      const mockTests: ToeicTestResponse[] = Array.from(
        { length: 20 },
        (_, i) => ({
          id: `${i + 1}`,
          name: `Bài test ${i + 1}`,
          questions: [],
          totalCompletion: Math.floor(Math.random() * 50000) + 10000,
          createdAt: new Date(
            Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
          ).toISOString(),
        })
      );

      const startIndex = page * this.TESTS_PER_PAGE;
      const endIndex = startIndex + this.TESTS_PER_PAGE;
      this.tests = mockTests.slice(startIndex, endIndex);
      this.totalPages = Math.ceil(mockTests.length / this.TESTS_PER_PAGE);
      this.totalElements = mockTests.length;
      this.currentPage = page + 1;
      this.isLoading = false;
    }, 500);
  }

  handlePageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadTests(page - 1);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  handleTestClick(testId: string): void {
    this.router.navigate(['/full-test/groups', this.groupId, testId]);
  }

  goBack(): void {
    this.router.navigate(['/full-test/groups']);
  }

  formatNumber(num: number): string {
    return num.toLocaleString('vi-VN');
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
