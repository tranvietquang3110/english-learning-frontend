import { PlanDetailResponse } from './plan-detail-response.model';

export interface PlanGroupResponse {
  id: string;
  name: string;
  description: string;
  planDetails: PlanDetailResponse[];
  startDate: string;
  endDate: string;
}
