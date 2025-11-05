import { Options } from '../options.model';
import { RequestType } from '../request-type.model';

export interface VocabularyTestQuestionRequest {
  id: string;
  question: string;
  options: Options;
  correctAnswer: string;
  questionOrder: number;
  explaination: string;
  imageName: string;
  action: RequestType;
}
