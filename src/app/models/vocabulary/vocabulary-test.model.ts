import { VocabularyTestQuestion } from './vocabulary-test-question.model';

export interface VocabularyTest {
  id: string;
  testId?: string;
  topicId: string;
  topicName?: string;
  name?: string;
  duration: number;
  createdAt: string;
  questions?: VocabularyTestQuestion[];
}
