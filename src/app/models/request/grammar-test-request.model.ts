import { GrammarTestQuestionRequest } from './grammar-test-question-request.model';

export interface GrammarTestRequest {
  name: string;
  duration: number;
  questions: GrammarTestQuestionRequest[];
}
