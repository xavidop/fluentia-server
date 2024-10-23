/* eslint-disable @typescript-eslint/no-unused-vars */
type RequestInput = {
  input: string;
  language: string;
  sessionId: string;
  userId: string;
  scenarioId: string;
};

type Scenario = {
  systemPrompt: string;
  examples: string;
};
