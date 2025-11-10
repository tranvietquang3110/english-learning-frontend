import { Level } from '../level.enum';

export interface GrammarTopic {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  status: string;
  progress: number;
  favoriteId?: string;
  level: Level;
}
