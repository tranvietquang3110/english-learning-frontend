import { VocabularyTestQuestionRequest } from './vocabulary-test-question-request.model';

export interface VocabularyTestRequest {
  name: string;
  duration: number;
  questions: VocabularyTestQuestionRequest[];
}
