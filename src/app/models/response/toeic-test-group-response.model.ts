import { ToeicTestResponse } from './toeict-test-response.model';

export interface ToeicTestGroupResponse {
  id: string;
  name: string;
  releaseDate: string;
  createdAt: string;
  tests: ToeicTestResponse[];
}
