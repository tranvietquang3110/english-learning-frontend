import { Options } from '../options.model';
import { RequestType } from '../request-type.model';

export interface ListeningTestQuestionRequest {
  id: string;
  question: string;
  options: Options;
  correctAnswer: string;
  explaination: string;
  imageName: string;
  audioName: string;
  action: RequestType;
}
