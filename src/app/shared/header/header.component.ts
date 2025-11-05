import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { TopicType } from '../../models/topic-type.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule, FormsModule],
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

  // Search properties
  searchQuery: string = '';
  selectedTopicType: string = TopicType.VOCABULARY.toString();
  topicTypes = [
    { value: TopicType.VOCABULARY.toString(), label: 'Từ vựng' },
    { value: TopicType.GRAMMAR.toString(), label: 'Ngữ pháp' },
    { value: TopicType.LISTENING.toString(), label: 'Nghe' },
  ];

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

  onSearch(): void {
    if (!this.searchQuery.trim()) return;

    // Navigate to search page with query params
    const queryParams: any = {
      q: this.searchQuery.trim(),
      type: this.selectedTopicType,
    };
    this.router.navigate(['/search'], { queryParams });
  }

  onSearchKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}
