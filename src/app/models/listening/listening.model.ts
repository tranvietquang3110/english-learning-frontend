import { ListeningTopic } from './listening-topic.model';

export interface Listening {
  id: string;
  topic: ListeningTopic;
  name: string;
  audioUrl: string;
  imageUrl: string;
  transcript: string;
  question: string;
  options: { [key: string]: string };
  correctAnswer: string;
  createdAt: string;
}
