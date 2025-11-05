import { PlanDetailRequest } from './plan-detail-request.model';

export interface PlanGroupRequest {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  planDetails: PlanDetailRequest[];
  newPlanDetail?: PlanDetailRequest; // Optional field for form management
}
