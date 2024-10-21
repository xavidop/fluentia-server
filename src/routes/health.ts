import { Request, Response } from "express";
import { healthService } from "../services/health";

export const health = async (req: Request, res: Response) => {

  const result = await healthService();

  res.status(200).json({
    result,
  });
};
