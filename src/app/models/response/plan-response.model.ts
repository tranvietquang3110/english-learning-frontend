import { PlanGroupResponse } from './plan-group-response.model';

export interface PlanResponse {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  startDate: string;
  endDate: string;
  target: number;
  planGroups: PlanGroupResponse[];
}
