import { StudyTime } from './user-profile-update-request.model';
import { Level } from '../../models/level.enum';
export interface PlanIntentRequest {
  target: number;
  description: string;
  level: Level;
  studyTime: StudyTime;
  jwt: string;
}
