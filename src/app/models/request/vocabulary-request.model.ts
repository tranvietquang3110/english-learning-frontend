import { RequestType } from '../request-type.model';

export interface VocabularyRequest {
  id: string;
  word: string;
  phonetic: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
  imageName: string;
  audioName: string;
  action: RequestType;
}
