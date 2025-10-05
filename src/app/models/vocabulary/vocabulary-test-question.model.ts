export interface VocabularyTestQuestion {
  id: string;
  testId: string;
  question: string;
  options: { [key: string]: string };
  correctAnswer: string; // A | B | C | D
  imageUrl?: string;
  explaination?: string;
  questionOrder?: number;
}
