import { PlanGroupRequest } from './plan-group-request.model';

export interface PlanRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  target: number;
  planGroups: PlanGroupRequest[];
}
