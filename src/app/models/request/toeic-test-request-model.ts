import { ToeicTestQuestionRequest } from './toeic-test-question-request.model';

export interface ToeicTestRequest {
  name: string;
  questions: ToeicTestQuestionRequest[];
  
}
