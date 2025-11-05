import { ItemTypeEnum } from '../item-type-enum';

export interface PlanDetailRequest {
  topicType: ItemTypeEnum;
  topicId: string;
  topicName?: string;
  description?: string;
  startDate: string;
  endDate: string;
}
