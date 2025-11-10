import { StudyTime } from './user-profile-update-request.model';

export enum Level {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export interface PlanIntentRequest {
  target: number;
  description: string;
  level: Level;
  studyTime: StudyTime;
  jwt: string;
}
