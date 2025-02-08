import "reflect-metadata";
import "../factories/LLMProvider";
import express from "express";
import testCaseRoutes from "@routes/testCaseRoute";

import { logger_custom } from "@utilities/custom_logger";
import { LLMFactory, LLMType } from "@factories/LLMFactory";

async function main() {
    const app = express();
    app.use(express.json()); // ✅ Enable JSON body parsing

    // ✅ Mount the test case generation routes under `/api`
    app.use("/api", testCaseRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

main().catch(console.error);