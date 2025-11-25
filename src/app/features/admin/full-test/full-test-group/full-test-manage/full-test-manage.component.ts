import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFileAlt,
  faEye,
  faPlus,
  faArrowLeft,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { ToeicTestResponse } from '../../../../../models/response/toeict-test-response.model';
import { ToeicTestGroupResponse } from '../../../../../models/response/toeic-test-group-response.model';
import { ToeicTestRequest } from '../../../../../models/request/toeic-test-request-model';
import { FullTestAddComponent } from './full-test-add/full-test-add.component';
import { ToeicTestService } from '../../../../../services/ToeicTestService';

enum Status {
  ADD = 'ADD',
  VIEW = 'VIEW',
  EDIT = 'EDIT',
}

@Component({
  selector: 'app-full-test-manage',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    DatePipe,
    FullTestAddComponent,
  ],
  templateUrl: './full-test-manage.component.html',
  styleUrl: './full-test-manage.component.scss',
})
export class FullTestManageComponent implements OnInit {
  groupId: string = '';
  group: ToeicTestGroupResponse | null = null;
  tests: ToeicTestResponse[] = [];
  isLoading = false;
  error: string | null = null;
  currentStatus: Status = Status.VIEW;
  // FontAwesome icons
  faFileAlt = faFileAlt;
  faEye = faEye;
  faPlus = faPlus;
  faArrowLeft = faArrowLeft;
  faClock = faClock;
  Status = Status;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toeicTestService: ToeicTestService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.groupId = params['groupId'];
      if (this.groupId) {
        this.loadTests();
      }
    });
  }

  loadTests(): void {
    this.isLoading = true;
    this.error = null;

    this.toeicTestService.getGroupById(this.groupId).subscribe({
      next: (group) => {
        this.group = group;
        this.tests = group.tests;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading group:', error);
        this.isLoading = false;
        this.error = 'Không thể tải danh sách bài test. Vui lòng thử lại.';
      },
    });
  }

  viewTestDetail(testId: string): void {
    this.router.navigate(['/admin/full-test/groups', this.groupId, testId]);
  }

  goBack(): void {
    this.router.navigate(['/admin/full-test/groups']);
  }

  getQuestionCount(test: ToeicTestResponse): number {
    return test.questions?.length || 0;
  }

  addTest(): void {
    this.currentStatus = Status.ADD;
  }

  onSaveTest(request: ToeicTestRequest): void {
    this.currentStatus = Status.VIEW;
    this.loadTests();
  }

  onCancelTest(): void {
    this.currentStatus = Status.VIEW;
  }
}
