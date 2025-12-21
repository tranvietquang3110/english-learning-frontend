import { Level } from '../level.enum';

export interface VocabTopic {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt?: string;
  status: string;
  progress: number;
  favoriteId?: string;
  level?: Level;
}
