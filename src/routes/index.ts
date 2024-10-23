import { Router } from "express";
import { interact } from "./interact";
import { health } from "./health";
import nocache from "nocache";
import { summarize } from "./summarize";

const router = Router();

router.post("/v1/interact", nocache(), interact);

router.post("/v1/summarize", nocache(), summarize);

router.get("/v1/health", nocache(), health);

export default router;
