import { ToeicPart } from '../toeic-part.enum';
import { RequestType } from '../request-type.model';

export interface ToeicTestQuestionRequest {
  id?: string;
  question: string;
  options: { [key: string]: string };
  correctAnswer: string;
  explanation?: string;
  part: ToeicPart;
  action?: RequestType;
  imageName?: string;
  audioName?: string;
}
