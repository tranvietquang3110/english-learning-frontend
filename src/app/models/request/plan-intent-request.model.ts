export enum Level {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export interface PlanIntentRequest {
  target: number;
  description: string;
  level: Level;
  jwt: string;
}
