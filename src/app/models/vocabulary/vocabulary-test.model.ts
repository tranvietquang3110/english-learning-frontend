import { VocabularyTestQuestion } from './vocabulary-test-question.model';

export interface VocabularyTest {
  id: string;
  topicId: string;
  name: string;
  duration: number;
  createdAt: string;
  questions?: VocabularyTestQuestion[];
}
