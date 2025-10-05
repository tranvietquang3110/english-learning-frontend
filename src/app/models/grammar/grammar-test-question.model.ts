export interface GrammarTestQuestion {
  id: string;
  testId: string;
  question: string;
  options: { [key: string]: string };
  correctAnswer: string;
  questionOrder: number;
}
