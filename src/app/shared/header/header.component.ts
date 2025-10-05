import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBell,
  faSearch,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/UserService';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  faBell: IconProp = faBell;
  faUser: IconProp = faUser;
  faSearch: IconProp = faSearch;
  faSignOutAlt = faSignOutAlt;
  avatarUrl: string = '';
  isDropdownOpen = false;
  constructor(private userService: UserService, private router: Router) {}
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      if (user) {
        this.avatarUrl = user.avartarUrl || '';
        console.log('Header avatarUrl:', this.avatarUrl);
      }
    });
  }
  handleLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
