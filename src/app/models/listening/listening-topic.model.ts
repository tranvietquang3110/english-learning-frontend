import { Level } from '../level.enum';

export interface ListeningTopic {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  favoriteId?: string;
  level?: Level;
}
