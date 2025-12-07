import { Level } from '../level.enum';
import { StudyTime } from '../request/user-profile-update-request.model';

export interface User {
  id: string;
  username: string;
  email: string;
  role: string; // UserRole (enum -> string)
  fullname: string;
  avartarUrl: string;
  target: number; // phút mỗi ngày
  studyTime: StudyTime;
  level: Level;
  createdAt: string;
}
