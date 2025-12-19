import { ListeningTopic } from './listening-topic.model';

export interface ListeningTest {
  id: string;
  topicId: string;
  name: string;
  duration: number;
  createdAt: string;
  questions?: ListeningTestQuestion[];
}

export interface ListeningTestQuestion {
  id: string;
  testId: string;
  audioUrl: string;
  imageUrl: string;
  transcript: string;
  question: string;
  options: { [key: string]: string };
  correctAnswer: string;
  explaination: string;
  createdAt: string;
}
