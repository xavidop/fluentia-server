import { Request, Response } from "express";
import { interactService } from "../services/interact";
import { RequestInput } from "../types";
import { TranscribeScoreOkResponse } from "speechaceapi/dist/services/v9-latest_/models/transcribe-score-ok-response";

export const interact = async (req: Request, res: Response) => {
  const input = req.body.input as string;
  const language = req.body.language as string;
  const sessionId = req.body.sessionId as string;
  const userId = req.body.userId as string;
  const scenarioId = req.body.scenarioId as string;
  const fluencyInfo = req.body.fluencyInfo as TranscribeScoreOkResponse;

  const requestInput: RequestInput = {
    input,
    language,
    sessionId,
    userId,
    scenarioId,
    fluencyInfo,
  };

  const result = await interactService(requestInput);

  res.status(200).json({
    result,
  });
};
