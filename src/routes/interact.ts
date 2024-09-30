import { Request, Response } from "express";
import { interactService } from "../services/interact";

export const interact = async (req: Request, res: Response) => {
  const input = req.query.input as string;
  const language = req.query.language as string;

  const result = await interactService(input, language);

  res.status(200).json({
    input,
    answer: result,
  });
};
