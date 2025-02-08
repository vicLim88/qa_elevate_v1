import * as dotenv from "dotenv";
import { injectable } from "tsyringe";
import OpenAI from "openai";

import { LLMService } from "@services/LLM";

dotenv.config();

@injectable()
export class OpenAIService implements LLMService {
    private readonly openai;

    constructor(){
        this.openai = new OpenAI({
            apiKey:process.env.OPENAI_APIKEY
        });
    }

    async generateTestCase(appMetaData: string): Promise<string[]> {
        
        const prompt = `
        Generate a set of test cases in Gherkin syntax based on the following application metadata:

        ${appMetaData}

        Output the test cases in this format:

        \`\`\`gherkin
        Feature: [Feature Name]

            Scenario: [Test Scenario]
            Given [Precondition]
            When [User action]
            Then [Expected outcome]
        \`\`\`
    `;
    const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini", // Use gpt-3.5-turbo if you want faster responses
        messages: [
          { role: "system", content: "You are an expert in test automation using BDD." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      });

    // todo : create feature file implementation
    const test_dummy_string_arr: string[] = [];
    return test_dummy_string_arr;
    //   return response.choices[0]?.message?.content || "";
    }
    
}