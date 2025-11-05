import { ListeningTestQuestionRequest } from './listening-test-question-request.model';

export interface ListeningTestRequest {
  name: string;
  duration: number;
  questions: ListeningTestQuestionRequest[];
}
