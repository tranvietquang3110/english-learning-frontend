export interface UserScoreResponse {
  /** key = yyyy-MM-dd, value = điểm trung bình */
  scores: Record<string, number>;
}
