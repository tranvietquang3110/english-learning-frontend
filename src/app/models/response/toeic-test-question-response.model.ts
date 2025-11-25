import { ToeicPart } from '../toeic-part.enum';

export interface ToeicTestQuestionResponse {
  id: string;
  question: string;
  options: { [key: string]: string };
  correctAnswer: string;
  part: ToeicPart;
  audioUrl?: string;
  imageUrl?: string;
  explanation?: string;
  createdAt: string;
}
