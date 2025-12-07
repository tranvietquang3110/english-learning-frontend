import { Level } from '../../models/level.enum';

export enum StudyTime {
  MORNING,
  AFTERNOON,
  EVENING,
  NIGHT,
}

export interface UserProfileUpdateRequest {
  fullname: string;
  studyTime: StudyTime;
  level: Level;
  target: string;
}
