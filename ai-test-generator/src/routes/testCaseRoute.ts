import express, {Router, Request, Response } from "express";
import { OllamaService } from "@services/LLM";


const router:Router = express.Router();
const ollamaService = new OllamaService();

router.post("/generate-test-cases", async (req: Request, res: Response) => { 
    try {
        const { appMetaData } = req.body;
        if (!appMetaData) {
            return res.status(400).json({ error: "Application metadata is required" });
        }

        const testCases = await ollamaService.generateTestCase(appMetaData);
        return res.status(200).json({ testCases });
    } catch (error: unknown) {  
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        return res.status(500).json({ error: errorMessage });
    }
});

export default router;