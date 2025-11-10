// src/environments/environment.ts
export const environment = {
  production: false,
  apiUserServiceUrl: 'http://localhost:8080/api/user-service',
  apiContentServiceUrl: 'http://localhost:8080/api/content-service',
  apiLearningServiceUrl: 'http://localhost:8080/api/learning-service',
  apiAgentServiceUrl: 'http://localhost:8080/api/agent-service',
  excelVocabularyTestsTemplate: `
     * | name | test1 |
     * | duration | 10 |
     * | question | optionA | optionB | optionC | optionD | correctAnswer | explaination | imageName |
     `,
  excelVocabularyTemplate: `
     * | word | phonetic | meaning | example | exampleMeaning | imageName | audioName |
     `,
  excelListeningTemplate: `
     * | name | description | imageName | audioName |
     `,
  PAGE_SIZE: 10,
};
