// IMPORTANT!
/*
This script contains a few unique elements: 

A: A `DYNAMIC` function to send prompts to Perplexity AI and receive responses. 
- The function is designed to be flexible, allowing for dynamic specification of the AI model used for generating responses. 
This enables users to switch between different models at runtime without modifying the function's code, catering to various 
needs and conditions.

B: The function includes detailed error handling to catch and report various types of exceptions that may occur during the API request process.

C: The function provides two options [Options (1), or (2)], for sending prompts to Perplexity AI, each with different levels of control over the response generation process.

---

A: DYNAMIC FUNCTION TO SEND PROMPTS TO PERPLEXITY AI
Function: sendPromptToPerplexity
- Purpose: Sends a textual prompt to Perplexity AI and retrieves the AI-generated response.
- Parameters:
  - prompt (string): The textual prompt to send to the AI.
  - maxTokens (number): Optional; specifies the maximum number of tokens the AI should generate. Defaults to 1000.
  - model (string): Optional; specifies the AI model to use. Defaults to 'llama-3-70b-instruct', which can be changed dynamically when the function is called.
- Returns: The AI-generated response as a string, or null if an error occurs.

Usage:
- Default model: Call the function without specifying the model parameter to use the default model.
- Specifying a different model: Pass the desired model's name as an argument to change the AI model dynamically.

Example:
const response = sendPromptToPerplexity("Explain quantum physics.");
console.log(response);

# More detailed model information and pricing can be found in the documentation:
# https://docs.perplexity.ai/docs/pricing

# Supported models include various configurations with different token pricing and request costs, suitable for different use cases and budget considerations.
*/
require('dotenv').config();
const axios = require('axios');

// DEFAULT PROMPT: Option (1) - Send a prompt to Perplexity AI with default parameters.
async function sendPromptToPerplexity(prompt, maxTokens = 1000, model = 'llama-3-70b-instruct', temperature = 1.0, topP = 1.0, stream = false) {
// ALTERNATIVE OPTION: Option (2) - Send a prompt to Perplexity AI with detailed control over the generation process.
// async function sendPromptToPerplexity(prompt, maxTokens = 1000, model = 'llama-3-70b-instruct',
//                                         temperature = 1.0, topP = 1.0, topK = 0, stream = false,
//                                         presencePenalty = 0.0, frequencyPenalty = 0.0) {
    /*
    DEFAULT PROMPT: Option (1) - Send a prompt to Perplexity AI and receive a processed response.

    Parameters:
    - prompt (string): The text prompt to send to Perplexity AI.
    - maxTokens (number, optional): Maximum number of tokens to generate. Default is 1000.
    - model (string, optional): Model to use for generating responses. Default is 'llama-3-70b-instruct'.
    Additional Parameters:
    - temperature (number): Controls randomness in the response. Lower values are more deterministic.
    - topP (number): Nucleus sampling threshold. Lower values mean only the most likely tokens are considered.
    - stream (boolean): If true, responses are streamed incrementally. Default is false.
    Enhanced error handling to catch validation errors and provide meaningful feedback.
    # Function body remains the same, with added parameters included in the API request where needed.
    # Handle streaming logic if stream is true.

    Returns:
    - string: The AI's response text if successful, null otherwise.

    OR;

    ALTERNATIVE PROMPT: Option (2) - Send a prompt to the Perplexity AI API and receive a response with detailed control over the generation process.

    Parameters:
    - prompt (string): Text prompt to send to the AI.
    - maxTokens (number): Maximum number of tokens to generate in the response. Defaults to 1000.
    - model (string): Model used for generating the response. Defaults to 'llama-3-70b-instruct'.
    - temperature (number): Controls the randomness in the response, where higher values are more random.
    - topP (number): Nucleus sampling threshold that controls the breadth of possible responses.
    - topK (number): Controls the number of highest probability vocabulary tokens kept for top-k filtering.
    - stream (boolean): If true, the response is incrementally streamed back as it is generated.
    - presencePenalty (number): Adjusts likelihood of new topics based on their presence in the conversation so far.
    - frequencyPenalty (number): Decreases the likelihood of repeated phrases based on their frequency.

    Returns:
    - string: AI-generated response text if successful, null otherwise.

    Throws:
    - Error: Detailed error messages are printed if the API request fails for any reason including validation errors.

    Example:
    const response = await sendPromptToPerplexity("Describe the solar system.", 0.5, 0.9, true);
    console.log(response);

    ---

    Detailed Model Information and Pricing (as of 24.04.22):
    - 'llama-3-70b-instruct': $1.00 per 1M tokens, Context Length: 8192, Chat Completion
    - 'llama-3-8b-instruct': $0.20 per 1M tokens, Context Length: 8192, Chat Completion  # Commented out
    - 'codellama-70b-instruct': $1.00 per 1M tokens, Context Length: 16384, Chat Completion  # Commented out
    - 'sonar-small-chat': $0.20 per 1M tokens, Context Length: 16384, Chat Completion  # Commented out
    - 'sonar-medium-chat': $0.60 per 1M tokens, Context Length: 16384, Chat Completion  # Commented out
    - 'sonar-small-online': $5 per 1000 requests, $0.20 per 1M tokens, Context Length: 12000, Chat Completion  # Commented out
    - 'sonar-medium-online': $5 per 1000 requests, $0.60 per 1M tokens, Context Length: 12000, Chat Completion  # Commented out

    More details on pricing: https://docs.perplexity.ai/docs/pricing
    */

    // OPTION 1 - API endpoint and headers
    const url = 'https://api.perplexity.ai/chat/completions';
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
    };
    const body = {
        'model': model,
        'messages': [
            {'role': 'system', 'content': 'Be precise and concise.'},
            {'role': 'user', 'content': prompt}
        ],
        'max_tokens': maxTokens
    };

    try {
        const response = await axios.post(url, body, { headers });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
    return null;

    // OPTION 2 - API endpoint and headers with additional parameters
    // const url = 'https://api.perplexity.ai/chat/completions';
    // const headers = {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`
    // };
    // const body = {
    //     'model': model,
    //     'messages': [
    //         {'role': 'system', 'content': 'Be precise and concise.'},
    //         {'role': 'user', 'content': prompt}
    //     ],
    //     'max_tokens': maxTokens,
    //     'temperature': temperature,
    //     'top_p': topP,
    //     'top_k': topK,
    //     'stream': stream,
    //     'presence_penalty': presencePenalty,
    //     'frequency_penalty': frequencyPenalty
    // };

    // try {
    //     const response = await axios.post(url, body, { headers });
    //     if (stream) {
    //         response.data.on('data', chunk => {
    //             console.log(chunk.toString());
    //         });
    //     } else {
    //         return response.data.choices[0].message.content;
    //     }
    // } catch (error) {
    //     if (error.response) {
    //         console.error(`HTTP error occurred: ${error.response.status} - ${error.response.data}`);
    //     } else {
    //         console.error(`An error occurred: ${error.message}`);
    //     }
    // }
    // return null;
}

// Example function call
(async () => {
    const prompt = "How many stars are in the universe?";
    const result = await sendPromptToPerplexity(prompt);
    console.log("Received from Perplexity AI:", result);
})();
