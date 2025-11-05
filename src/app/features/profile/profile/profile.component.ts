import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user/user.model';
import { UserService } from '../../../services/UserService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  UserProfileUpdateRequest,
  StudyTime,
} from '../../../models/request/user-profile-update-request.model';
import { Level } from '../../../models/request/plan-intent-request.model';
import { faCamera, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profile?: User;
  isEditing: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;
  success: string | null = null;
  faCamera = faCamera;
  faPencil = faPencil;
  // Form data
  editForm = {
    fullname: '',
    studyTime: StudyTime.MORNING,
    level: Level.BEGINNER,
    target: '',
  };

  // Options for selects
  studyLevelOptions = [
    { value: StudyTime.MORNING, label: 'Buổi sáng' },
    { value: StudyTime.AFTERNOON, label: 'Buổi chiều' },
    { value: StudyTime.EVENING, label: 'Buổi tối' },
    { value: StudyTime.NIGHT, label: 'Đêm' },
  ];

  levelOptions = [
    { value: Level.BEGINNER, label: 'Bắt đầu' },
    { value: Level.INTERMEDIATE, label: 'Trung bình' },
    { value: Level.ADVANCED, label: 'Nâng cao' },
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      console.log('Profile user:', user);
      this.profile = user || undefined;
      if (this.profile) {
        this.initForm();
      }
    });
  }

  initForm(): void {
    if (!this.profile) return;

    this.editForm.fullname = this.profile.fullname || '';
    this.editForm.target = this.profile.target?.toString() || '';

    // Map studyTime to StudyLevel enum
    const studyTimeUpper = this.profile.studyTime?.toUpperCase();
    if (studyTimeUpper === 'MORNING') {
      this.editForm.studyTime = StudyTime.MORNING;
    } else if (studyTimeUpper === 'AFTERNOON') {
      this.editForm.studyTime = StudyTime.AFTERNOON;
    } else if (studyTimeUpper === 'EVENING') {
      this.editForm.studyTime = StudyTime.EVENING;
    } else if (studyTimeUpper === 'NIGHT') {
      this.editForm.studyTime = StudyTime.NIGHT;
    } else {
      this.editForm.studyTime = StudyTime.MORNING;
    }

    // Map level string to Level enum
    const levelUpper = this.profile.level?.toUpperCase();
    if (levelUpper === 'BEGINNER') {
      this.editForm.level = Level.BEGINNER;
    } else if (levelUpper === 'INTERMEDIATE') {
      this.editForm.level = Level.INTERMEDIATE;
    } else if (levelUpper === 'ADVANCED') {
      this.editForm.level = Level.ADVANCED;
    } else {
      this.editForm.level = Level.BEGINNER;
    }
  }

  onAvatarChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.isLoading = true;
      this.error = null;
      this.success = null;

      this.userService.uploadAvatar(file).subscribe({
        next: (url) => {
          if (this.profile) {
            this.profile.avartarUrl = url;
            this.userService.setUser(this.profile);
          }
          this.isLoading = false;
          this.success = 'Avatar đã được cập nhật thành công!';
          setTimeout(() => (this.success = null), 3000);
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
          this.error = 'Không thể tải avatar. Vui lòng thử lại.';
          setTimeout(() => (this.error = null), 3000);
        },
      });
    }
  }

  startEdit(): void {
    this.isEditing = true;
    this.error = null;
    this.success = null;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.initForm();
    this.error = null;
    this.success = null;
  }

  getStudyLevelLabel(): string {
    const option = this.studyLevelOptions.find(
      (opt) => opt.value === this.editForm.studyTime
    );
    return option?.label || this.profile?.studyTime || '';
  }

  getLevelLabel(): string {
    const option = this.levelOptions.find(
      (opt) => opt.value === this.editForm.level
    );
    return option?.label || this.profile?.level || '';
  }

  onSubmit(): void {
    if (!this.profile) return;

    // Validation
    if (!this.editForm.fullname?.trim()) {
      this.error = 'Vui lòng nhập họ tên';
      return;
    }

    if (!this.editForm.target || parseInt(this.editForm.target) <= 0) {
      this.error = 'Vui lòng nhập mục tiêu hợp lệ (số phút > 0)';
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.success = null;

    const updateData: UserProfileUpdateRequest = {
      fullname: this.editForm.fullname.trim(),
      studyTime: this.editForm.studyTime,
      level: this.editForm.level,
      target: this.editForm.target,
    };

    this.userService.updateProfile(updateData).subscribe({
      next: (updatedUser) => {
        this.profile = updatedUser;
        this.userService.setUser(updatedUser);
        this.isEditing = false;
        this.isLoading = false;
        this.success = 'Hồ sơ đã được cập nhật thành công!';
        setTimeout(() => (this.success = null), 3000);
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        this.isLoading = false;
        this.error =
          err.error?.message || 'Không thể cập nhật hồ sơ. Vui lòng thử lại.';
        setTimeout(() => (this.error = null), 5000);
      },
    });
  }
}
