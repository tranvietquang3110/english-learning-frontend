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
  excelToeicTestsTemplate: `
    NAME	ETS 2024
    PART 1
    QUESTION	A	B	C	D	CORRECT ANSWER	EXPLANATION	IMAGE NAME	AUDIO NAME
    PART 2
    QUESTION	A	B	C	D	CORRECT ANSWER	EXPLANATION	IMAGE NAME	AUDIO NAME
    PART 3
    QUESTION	A	B	C	D	CORRECT ANSWER	EXPLANATION	IMAGE NAME	AUDIO NAME
    PART 4
    QUESTION	A	B	C	D	CORRECT ANSWER	EXPLANATION	IMAGE NAME	AUDIO NAME
    PART 5
    QUESTION	A	B	C	D	CORRECT ANSWER	EXPLANATION	IMAGE NAME	AUDIO NAME
    PART 6
    QUESTION	A	B	C	D	CORRECT ANSWER	EXPLANATION	IMAGE NAME	AUDIO NAME
    PART 7
    QUESTION	A	B	C	D	CORRECT ANSWER	EXPLANATION	IMAGE NAME	AUDIO NAME
     `,
  PAGE_SIZE: 10,
  PADDING_MIN_TIME: 1,
  PADDING_MAX_TIME: 3,
};
