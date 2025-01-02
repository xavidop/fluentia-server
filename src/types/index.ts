import { TranscribeScoreOkResponse } from "speechaceapi/dist/services/v9-latest_/models/transcribe-score-ok-response";

export type RequestInput = {
  input: string;
  language: string;
  sessionId: string;
  userId: string;
  scenarioId: string;
  fluencyInfo: TranscribeScoreOkResponse;
};

export type RequestDetectLanguage = {
  input: string;
};

export type SummarizeInput = {
  sessionId: string;
  userId: string;
};

export type Scenario = {
  systemPrompt: string;
  examples: string;
};
