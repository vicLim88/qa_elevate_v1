import express, { Router, Request, Response } from "express";
import { PlaywrightService } from "@services/playwright/PlaywrightService";
import { MongoService } from "@services/database/MongoService";
import { container } from "tsyringe";

const router:Router = express.Router();
const playwrightService = container.resolve(PlaywrightService);
const mongoService = container.resolve(MongoService);

router.post("/analyze-webpage", async (req: Request, res: Response) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        const { screenshotPath, pageMetadata } = await playwrightService.analyzePage(url);
        await mongoService.savePageMetadata(url, screenshotPath, pageMetadata);

        res.status(200).json({
            message: "Webpage analyzed successfully",
            screenshotPath,
            metadata: pageMetadata,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
