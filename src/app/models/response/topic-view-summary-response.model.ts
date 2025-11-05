import { TopicType } from '../topic-type.enum';

export interface TopicViewSummaryResponse {
  topicId: string;
  topicName: string;
  topicType: TopicType;
  totalViews: number;
}
