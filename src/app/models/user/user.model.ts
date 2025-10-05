export interface User {
  id: string;
  username: string;
  email: string;
  role: string; // UserRole (enum -> string)
  fullname: string;
  avartarUrl: string;
  target: number; // phút mỗi ngày
  studyTime: string; // morning | afternoon | evening | night
  level: string; // beginner | intermediate | advanced
  createdAt: string;
}
