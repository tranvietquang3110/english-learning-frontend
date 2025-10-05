import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminSideBarComponent } from '../../features/admin/admin-side-bar/admin-side-bar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, AdminSideBarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {}
