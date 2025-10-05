export interface TopicBase {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  status?: string;
  progress?: number;
}
