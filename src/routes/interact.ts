import { Request, Response } from "express";
import { interactService } from "../services/interact";

export const interact = async (req: Request, res: Response) => {
  const input = req.body.input as string;
  const language = req.body.language as string;
  const sessionId = req.body.sessionId as string;

  const result = await interactService(input, language, sessionId);

  res.status(200).json({
    result,
  });
};
