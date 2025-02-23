import "reflect-metadata";
import "../factories/LLMProvider";
import express from "express";
import {initRoutes} from "@routes/index";

import { logger_custom } from "@utilities/custom_logger";

async function main() {
    const app = express();
    app.use(express.json()); // ✅ Enable JSON body parsing

    // ✅ Mount the test case generation routes under `/api`
    const apiRoute = await initRoutes();
    app.use("/api", apiRoute);


    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

main().catch(console.error);