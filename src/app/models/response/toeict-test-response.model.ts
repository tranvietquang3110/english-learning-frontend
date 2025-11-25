import { ToeicTestQuestionResponse } from './toeic-test-question-response.model';

export interface ToeicTestResponse {
  id: string;
  name: string;
  questions: ToeicTestQuestionResponse[];
  totalCompletion: number;
  createdAt: string;
}
