import { Request, Response } from "express";
import { interactService } from "../services/interact";

export const interact = async (req: Request, res: Response) => {
  const input = req.body.input as string;
  const language = req.body.language as string;
  const sessionId = req.body.sessionId as string;
  const userId = req.body.userId as string;

  const requestInput: RequestInput = {
    input,
    language,
    sessionId,
    userId,
  };

  const result = await interactService(requestInput);

  res.status(200).json({
    result,
  });
};
