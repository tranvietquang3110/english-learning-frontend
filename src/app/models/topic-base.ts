import { Level } from './level.enum';

export interface TopicBase {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  status?: string;
  progress?: number;
  favoriteId?: string;
  level?: Level;
}
