import { ItemTypeEnum } from '../item-type-enum';
import { UserAnswerRequest } from './user-answer-request.model';

export interface ExamHistoryRequest {
  testType: ItemTypeEnum;
  testId: string;
  score: number;
  answers: UserAnswerRequest[];
  takenAt: string;
  submittedAt: string;
}
