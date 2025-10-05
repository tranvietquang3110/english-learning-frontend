import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user/user.model';
import { UserService } from '../../../services/UserService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profile?: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      console.log('Profile user:', user);
      this.profile = user || undefined;
    });
  }

  onAvatarChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.userService.uploadAvatar(file).subscribe({
        next: (url) => {
          if (this.profile) this.profile.avartarUrl = url;
        },
        error: (err) => console.error(err),
      });
    }
  }
}
