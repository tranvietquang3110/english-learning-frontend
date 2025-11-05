export interface StatisticResponse {
  totalCount: number;
  newElementsByPeriod: { [key: string]: number };
}
