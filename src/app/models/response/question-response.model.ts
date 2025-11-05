export interface QuestionResponse {
  question: string;
  options: { [key: string]: string };
  correctAnswer: string;
  questionOrder: number;
  audioUrl: string;
  userAnswer: string;
  explanation: string;
}
