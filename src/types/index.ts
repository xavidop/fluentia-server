/* eslint-disable @typescript-eslint/no-unused-vars */
type RequestInput = {
  input: string;
  language: string;
  sessionId: string;
  userId: string;
  scenarioId: string;
};

/* eslint-disable @typescript-eslint/no-unused-vars */
type SummarizeInput = {
  sessionId: string;
  userId: string;
};

type Scenario = {
  systemPrompt: string;
  examples: string;
};
