import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronDown,
  faChevronRight,
  faChevronLeft,
  faHome,
  faNewspaper,
  faBookOpen,
  faVolumeUp,
  faFileAlt,
  faUser,
  faHeart,
  faDatabase,
  faPerson,
  faHistory,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';

interface SidebarItem {
  label: string;
  href?: string;
  children?: SidebarItem[];
  icon?: any;
}

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent {
  isCollapsed = false;
  expandedItems: string[] = ['Learning', 'Word'];

  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;

  sidebarItems: SidebarItem[] = [
    { label: 'Home', href: '/', icon: faHome },
    { label: 'News', href: '/news', icon: faNewspaper },
    {
      label: 'Learning',
      icon: faBookOpen,
      children: [
        {
          label: 'Word',
          icon: faFileAlt,
          href: '/vocabulary/topics',
        },
        {
          label: 'Listening',
          icon: faVolumeUp,
          href: '/listening/topics',
        },
        {
          label: 'Grammar',
          icon: faFileAlt,
          href: '/grammar/topics',
        },
        {
          label: 'Pronunciation',
          icon: faVolumeUp,
          href: '/pronunciation',
        },
      ],
    },
    {
      label: 'You',
      icon: faUser,
      children: [
        { label: 'Profile', href: '/profile', icon: faPerson },
        { label: 'My Favorites', href: '/favorite', icon: faHeart },
        { label: 'Wordbank', href: '/wordbank', icon: faDatabase },
      ],
    },
    {
      label: 'History',
      icon: faHistory,
      href: '/history',
    },
    {
      label: 'Planning',
      icon: faCalendarAlt,
      href: '/planning',
    },
  ];

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleExpanded(label: string) {
    if (this.expandedItems.includes(label)) {
      this.expandedItems = this.expandedItems.filter((i) => i !== label);
    } else {
      this.expandedItems.push(label);
    }
  }

  isExpanded(label: string) {
    return this.expandedItems.includes(label);
  }
}
