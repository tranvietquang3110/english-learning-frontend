export interface DetailScore {
  [key: string]: number;
}

export interface PronunciationResponse {
  message: string;
  score: number;
  ipa: string;
  detail_scores: DetailScore[];
}
