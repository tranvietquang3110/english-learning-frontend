import { ItemTypeEnum } from '../item-type-enum';

export interface PlanDetailResponse {
  id: string;
  topicType: ItemTypeEnum;
  topicId: string;
  topicName: string;
  description: string;
  startDate: string;
  endDate: string;
}
