import { $ } from "bun";

const [fileName, fileContent] = Bun.argv.slice(2);
const apiKey = process.env.ANTHROPIC_API_KEY;

const welcome = await $`curl -k https://api.anthropic.com/v1/complete \
--header "x-api-key: ${apiKey}" \
--header "anthropic-version: 2023-06-01" \
--header "content-type: application/json" \
--data \
'{
"model": "claude-3-opus-20240229"
"system": "Your task is to perform a code review on the provided code snippet, focusing on improvements and suggestions to ensure the use of the latest features and avoidance of deprecated elements. Provide the response in the specified programming language with minimal explanations and without adding comments to the code itself. Only provide code improvements or suggestions as necessary."
"max_tokens_to_sample": 1024,
"stream": false,
"messages": [
  {"role": "user", "content": "Please review this code ${fileContent} "}
]
}'`.text();

const JSONwelcome = JSON.parse(welcome);
console.log(JSONwelcome);
