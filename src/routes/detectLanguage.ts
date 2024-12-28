import { Request, Response } from "express";
import { detectLanguageService } from "../services/detectLanguage";

export const detectLanguage = async (req: Request, res: Response) => {
  const input = req.body.input as string;

  const requestInput: RequestDetectLanguage = {
    input,
  };

  const result = await detectLanguageService(requestInput);

  res.status(200).json({
    result,
  });
};
