# IMPORTANT!
"""
This script contains a few unique elements: 

A: A `DYNAMIC` function to send prompts to Perplexity AI and receive responses. 
- The function is designed to be flexible, allowing for dynamic specification of the AI model used for generating responses. 
This enables users to switch between different models at runtime without modifying the function's code, catering to various 
needs and conditions.

B: The function includes detailed error handling to catch and report various types of exceptions that may occur during the API request process.

C: The function provides two options [Options (1), or (2)], for sending prompts to Perplexity AI, each with different levels of control over the response generation process.

---

A: DYNAMIC FUNCTION TO SEND PROMPTS TO PERPLEXITY AI
Function: send_prompt_to_perplexity
- Purpose: Sends a textual prompt to Perplexity AI and retrieves the AI-generated response.
- Parameters:
  - prompt (str): The textual prompt to send to the AI.
  - max_tokens (int): Optional; specifies the maximum number of tokens the AI should generate. Defaults to 1000.
  - model (str): Optional; specifies the AI model to use. Defaults to 'llama-3-70b-instruct', which can be changed dynamically when the function is called.
- Returns: The AI-generated response as a string, or None if an error occurs.

Usage:
- Default model: Call the function without specifying the model parameter to use the default model.
- Specifying a different model: Pass the desired model's name as an argument to change the AI model dynamically.

Example:
response = send_prompt_to_perplexity("Explain quantum physics.")
print(response)

# More detailed model information and pricing can be found in the documentation:
# https://docs.perplexity.ai/docs/pricing

# Supported models include various configurations with different token pricing and request costs, suitable for different use cases and budget considerations.
"""
from perplexityai import Perplexity
import requests
import json

# DEFAULT PROMPT: Option (1) - Send a prompt to Perplexity AI with default parameters.
def send_prompt_to_perplexity(prompt, max_tokens=1000, model='llama-3-70b-instruct', temperature=1.0, top_p=1.0, stream=False):

# ALTERNATIVE OPTION: Option (2) - Send a prompt to Perplexity AI with detailed control over the generation process.
# def send_prompt_to_perplexity(prompt, max_tokens=1000, model='llama-3-70b-instruct', 
#                              temperature=1.0, top_p=1.0, top_k=0, stream=False, 
#                              presence_penalty=0.0, frequency_penalty=0.0):
    """
    DEFAULT PROMPT: Option (1) - Send a prompt to Perplexity AI and receive a processed response.

    Parameters:
    - prompt (str): The text prompt to send to Perplexity AI.
    - max_tokens (int, optional): Maximum number of tokens to generate. Default is 1000.
    - model (str, optional): Model to use for generating responses. Default is 'llama-3-70b-instruct'.
    Additional Parameters:
    - temperature (float): Controls randomness in the response. Lower values are more deterministic.
    - top_p (float): Nucleus sampling threshold. Lower values mean only the most likely tokens are considered.
    - stream (bool): If True, responses are streamed incrementally. Default is False.
    Enhanced error handling to catch validation errors and provide meaningful feedback.
    # Function body remains the same, with added parameters included in the API request where needed.
    # Handle streaming logic if stream is True.

    Returns:
    - str: The AI's response text if successful, None otherwise.

    OR;

    ALTERNATIVE PROMPT: Option (2) - Send a prompt to the Perplexity AI API and receive a response with detailed control over the generation process.

    Parameters:
    - prompt (str): Text prompt to send to the AI.
    - max_tokens (int): Maximum number of tokens to generate in the response. Defaults to 1000.
    - model (str): Model used for generating the response. Defaults to 'llama-3-70b-instruct'.
    - temperature (float): Controls the randomness in the response, where higher values are more random.
    - top_p (float): Nucleus sampling threshold that controls the breadth of possible responses.
    - top_k (int): Controls the number of highest probability vocabulary tokens kept for top-k filtering.
    - stream (bool): If True, the response is incrementally streamed back as it is generated.
    - presence_penalty (float): Adjusts likelihood of new topics based on their presence in the conversation so far.
    - frequency_penalty (float): Decreases the likelihood of repeated phrases based on their frequency.

    Returns:
    - str: AI-generated response text if successful, None otherwise.

    Raises:
    - Exception: Detailed error messages are printed if the API request fails for any reason including validation errors.

    Example:
    response = send_prompt_to_perplexity("Describe the solar system.", temperature=0.5, top_p=0.9, stream=True)
    print(response)

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
    """
    # OPTION 1 - API endpoint and headers
    url = 'https://api.perplexity.ai/chat/completions'
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
    }
    body = {
        'model': model,
        'messages': [
            {'role': 'system', 'content': 'Be precise and concise.'},
            {'role': 'user', 'content': prompt}
        ],
        'max_tokens': max_tokens
    }

    try:
        response = requests.post(url, headers=headers, json=body)
        response.raise_for_status()
        data = response.json()
        return data['choices'][0]['message']['content']
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
    return None

    # OPTION 2 - API endpoint and headers with additional parameters
    # url = 'https://api.perplexity.ai/chat/completions'
    # headers = {
    #     'Accept': 'application/json',
    #     'Content-Type': 'application
    #    body = {
    #    'model': model,
    #    'messages': [{'role': 'system', 'content': 'Be precise and concise.'},
    #                 {'role': 'user', 'content': prompt}],
    #    'max_tokens': max_tokens,
    #    'temperature': temperature,
    #    'top_p': top_p,
    #    'top_k': top_k,
    #    'stream': stream,
    #    'presence_penalty': presence_penalty,
    #    'frequency_penalty': frequency_penalty
    #}

    #try:
    #    response = requests.post(url, headers=headers, json=body)
    #    response.raise_for_status()  # This will raise an HTTPError for bad requests (400 or 500 level errors)
    #    if stream:
    #        for line in response.iter_lines():
    #            if line:
    #                print(line.decode('utf-8'))
    #    else:
    #        data = response.json()
    #        return data['choices'][0]['message']['content']
    #except requests.exceptions.HTTPError as e:
    #    print(f"HTTP error occurred: {e.response.status_code} - {e.response.text}")
    #except requests.exceptions.RequestException as e:
    #    print(f"An error occurred: {e}")
    #return None

# Example function call
if __name__ == "__main__":
    prompt = "How many stars are in the universe?"
    result = send_prompt_to_perplexity(prompt)
    print("Received from Perplexity AI:", result)
