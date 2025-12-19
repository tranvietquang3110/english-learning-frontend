// src/environments/environment.ts
export const environment = {
  production: false,
  apiUserServiceUrl: 'http://localhost:8080/api/user-service',
  apiContentServiceUrl: 'http://localhost:8080/api/content-service',
  apiLearningServiceUrl: 'http://localhost:8080/api/learning-service',
  apiAgentServiceUrl: 'http://localhost:8080/api/agent-service',
  excelVocabularyTestsTemplate: 'vocabulary_test.xlsx',
  excelVocabularyTemplate: 'vocabulary_upload.xlsx',
  excelListeningTemplate: 'listening_import_template.xlsx',
  excelListeningTestsTemplate: 'listening_test_import_template.xlsx',
  excelGrammarTestsTemplate: 'grammar_test_template.xlsx',
  excelToeicTestsTemplate: 'toeic_test_import_sample.xlsx',
  PAGE_SIZE: 10,
  PADDING_MIN_TIME: 1,
  PADDING_MAX_TIME: 3,
};
