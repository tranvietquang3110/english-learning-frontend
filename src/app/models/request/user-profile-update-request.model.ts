import { Level } from './plan-intent-request.model';

export enum StudyTime {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  EVENING = 'EVENING',
  NIGHT = 'NIGHT',
}

export interface UserProfileUpdateRequest {
  fullname: string;
  studyTime: StudyTime;
  level: Level;
  target: string;
}
