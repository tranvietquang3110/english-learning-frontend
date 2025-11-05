import { RequestType } from '../request-type.model';

export interface ListeningRequest {
  id?: string;
  name: string;
  transcript: string;
  question: string;
  options: any;
  correctAnswer: string;
  imageName?: string;
  audioName?: string;
  action?: RequestType;
}
