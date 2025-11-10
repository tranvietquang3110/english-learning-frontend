import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminSideBarComponent } from '../../features/admin/admin-side-bar/admin-side-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, AdminSideBarComponent, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  isSidebarCollapsed = false;

  onSidebarCollapseChange(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
