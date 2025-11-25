import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFileAlt,
  faArrowLeft,
  faClock,
  faCheckCircle,
  faImage,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import { ToeicTestResponse } from '../../../../../../models/response/toeict-test-response.model';
import { ToeicTestService } from '../../../../../../services/ToeicTestService';

@Component({
  selector: 'app-full-test-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, DatePipe],
  templateUrl: './full-test-detail.component.html',
  styleUrl: './full-test-detail.component.scss',
})
export class FullTestDetailComponent implements OnInit {
  groupId: string = '';
  testId: string = '';
  test: ToeicTestResponse | null = null;
  isLoading = false;
  error: string | null = null;

  // FontAwesome icons
  faFileAlt = faFileAlt;
  faArrowLeft = faArrowLeft;
  faClock = faClock;
  faCheckCircle = faCheckCircle;
  faImage = faImage;
  faVolumeUp = faVolumeUp;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toeicTestService: ToeicTestService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.groupId = params['groupId'];
      this.testId = params['testId'];
      if (this.testId) {
        this.loadTest();
      }
    });
  }

  loadTest(): void {
    this.isLoading = true;
    this.error = null;

    // TODO: Implement API call
    this.toeicTestService.getTestById(this.testId).subscribe({
      next: (test) => {
        this.test = test;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Không thể tải chi tiết bài test. Vui lòng thử lại.';
        console.error('Error loading test:', error);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/full-test/groups', this.groupId]);
  }

  getPartLabel(part: number): string {
    return `Part ${part}`;
  }

  getPartBadgeClass(part: number): string {
    const partMap: { [key: string]: string } = {
      1: 'bg-blue-100 text-blue-700',
      2: 'bg-green-100 text-green-700',
      3: 'bg-yellow-100 text-yellow-700',
      4: 'bg-purple-100 text-purple-700',
      5: 'bg-red-100 text-red-700',
      6: 'bg-indigo-100 text-indigo-700',
    };
    return partMap[part] || 'bg-slate-100 text-slate-700';
  }

  getOptionKeys(options: { [key: string]: string }): string[] {
    return Object.keys(options).sort();
  }

  isCorrectAnswer(optionKey: string, correctAnswer: string): boolean {
    return optionKey === correctAnswer;
  }
}
