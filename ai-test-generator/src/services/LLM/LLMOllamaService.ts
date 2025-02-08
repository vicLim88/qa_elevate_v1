import * as dotenv from "dotenv";
import { injectable } from "tsyringe";
import axios from "axios";

import { URL_OLLAMA_STAGING } from "@configs/env";
import { LLMService } from "@services/LLM";
import { logger_custom } from "@utilities/custom_logger";

dotenv.config();

@injectable()
export class OllamaService implements LLMService {
    private readonly ollamaURL: string = URL_OLLAMA_STAGING!;
    async generateTestCase(appMetaData: any): Promise<string[]> {

        // ToDo : all Services uses formattedMetaData, and prompt. Will need to refactor.
        const formattedMetaData = `
            Application Name: ${appMetaData.AppName}
            Platform: ${appMetaData.Platform}
            Features: ${appMetaData.Features.join(", ")}
            User Actions: ${appMetaData.UserAction.join(", ")}
        `;
        
        const prompt = `
            Generate a set of test cases in Gherkin syntax based on the following application metadata:

            ${formattedMetaData}

            Output the test cases in this JSON format:

            {
                "features": [
                    {
                        "feature": "[Feature Name]",
                        "scenarios": [
                            {
                                "scenario": "[Test Scenario]",
                                "given": "[Precondition]",
                                "when": "[User action]",
                                "then": "[Expected outcome]"
                            }
                        ]
                    }
                ]
            }

            As each scenario checks for one outcome, ensure that there's only one \`then\`. If required, create a seprate scenario.
        `;

        // todo - to think how shall I create sub-objects
        const response = await axios.post(this.ollamaURL, {
            model: "mistral",
            prompt: prompt,
            stream: false,
        });

        let testCasesJson;
    
        try {
            let rawResponse = response.data.response.trim();
    
            // 🔥 Fix: Remove unwanted backticks (` ``` `) from the response
            rawResponse = rawResponse.replace(/```json/g, "").replace(/```/g, "").trim();
    
            // 🔥 Fix: Extract valid JSON from response
            const firstCurlyIndex = rawResponse.indexOf("{");
            const lastCurlyIndex = rawResponse.lastIndexOf("}");
    
            if (firstCurlyIndex === -1 || lastCurlyIndex === -1) {
                throw new Error("Invalid JSON response from Ollama.");
            }
    
            const validJson = rawResponse.substring(firstCurlyIndex, lastCurlyIndex + 1);
            testCasesJson = JSON.parse(validJson);
        } catch (error) {
            console.error("❌ Error parsing JSON from Ollama:", error);
            throw new Error("Generated test cases are not in valid JSON format.");
        }
    
        return testCasesJson;
    }
    
}