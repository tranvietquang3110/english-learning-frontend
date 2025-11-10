import { Level } from './plan-intent-request.model';

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
