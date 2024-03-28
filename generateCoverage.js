import { $ } from "bun";

const [key, fileContent] = Bun.argv.slice(2);
// const apiKey = process.env.ANTHROPIC_API_KEY;

// Asegurarse de que el contenido del archivo se pasa correctamente como una cadena JSON válida.
const contentEscaped = JSON.stringify(fileContent);

const response = await $`curl -k -X POST https://api.anthropic.com/v1/messages \
--header "x-api-key: ${key}" \
--header "anthropic-version: 2023-06-01" \
--header "content-type: application/json" \
--data \
'{
  "model": "claude-3-opus-20240229",
  "temperature": 0,
  "system": "Your task is to perform a code review on the provided code snippet, focusing on improvements and suggestions to ensure the use of the latest features and avoidance of deprecated elements. Provide the response in the specified programming language with minimal explanations and without adding comments to the code itself. Only provide code improvements or suggestions as necessary.",
  "messages": [
    {"role": "user", "content": "Code to review: ${contentEscaped}"}
  ],
  "max_tokens": 1024
}'`.text();

const jsonResponse = JSON.parse(response);
console.log(jsonResponse);
