import { Component } from '@angular/core';
import { SideBarComponent } from '../../shared/side-bar/side-bar.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SideBarComponent, HeaderComponent, RouterOutlet, CommonModule],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  isSidebarCollapsed = false;

  onSidebarCollapseChange(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
