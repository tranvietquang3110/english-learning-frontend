import { Component } from '@angular/core';
import { LoadingService } from '../../services/LoadingService ';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="loadingService.loading$ | async"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        class="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"
      ></div>
    </div>
  `,
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
