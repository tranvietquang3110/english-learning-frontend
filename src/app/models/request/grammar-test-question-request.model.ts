import { RequestType } from '../request-type.model';

export interface GrammarTestQuestionRequest {
  question: string;
  options: { [key: string]: string };
  correctAnswer: string;
  questionOrder: number;
  explaination?: string;
  action?: RequestType;
}
