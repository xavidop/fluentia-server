import { Request, Response } from "express";
import { summarizeService } from "../services/summarize";

export const summarize = async (req: Request, res: Response) => {

  const sessionId = req.body.sessionId as string;
  const userId = req.body.userId as string;

  const summarizeInput: SummarizeInput = {
    sessionId,
    userId,
  };

  const result = await summarizeService(summarizeInput);

  res.status(200).json({
    result,
  });
};
