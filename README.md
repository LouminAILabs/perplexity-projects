### perplexity-projects
repo of projects related to Generative AI and Perplexity.ai
---

# LouminAI Labs: Open-Source Contributions for Perplexity.ai

Welcome to the official GitHub repository for LouminAI Labs' open-source contributions to Perplexity.ai! This repository hosts a collection of tools, scripts, and integrations developed by LouminAI Labs to enhance and extend the functionalities of Perplexity.ai, an advanced AI-driven search engine and chatbot. 

## About Perplexity.ai

Perplexity AI leverages large language models, including OpenAI's GPT technology, to deliver accurate, context-aware answers to user queries. With its natural language processing capabilities, Perplexity AI provides immediate answers along with relevant sources and citations, making it a powerful tool for information discovery and decision-making.

## LouminAI Labs

LouminAI Labs, a division of [LouminAI.com](https://louminai.com), is dedicated to empowering humanity through generative AI. Our mission is to align technology with human needs to create transformative AI solutions that enhance individual and organizational capabilities. We are pioneers in the field, committed to open-source and collaborative initiatives that promote the adoption and understanding of AI technologies.

### Our Approach
- **Discover**: Understand unique needs and goals.
- **Strategize**: Develop customized AI implementation plans.
- **Implement**: Integrate cutting-edge AI solutions into workflows.
- **Optimize**: Continuously refine AI applications to maximize benefits.

### Leadership
LouminAI Labs is led by David Youngblood, a visionary committed to integrating AI with human potential to achieve groundbreaking advancements.

### LEMA Initiative
Our flagship project, LEMA (Learning Model Adaptability), is designed to evolve with human progress, providing adaptable and intuitive AI support across various sectors.

## Repository Contents

This repository includes:
- **Python Scripts**: Tools and scripts for interacting dynamically with Perplexity.ai's API, offering robust error handling and customizable parameters.
- **Integration Examples**: Demonstrations of how to integrate Perplexity.ai into various applications and systems.
- **Documentation and Guides**: Detailed guides on using our tools and contributing to the repository.

## Getting Started
To get started with our tools:
1. Clone this repository.
2. Install the required dependencies.
3. Explore the examples to see how to integrate and extend Perplexity.ai's capabilities.

---

# SPECIFIC REPO ELEMENTS

## # README for Perplexity.ai Integration Script

## Introduction

This repository houses a dynamic Python script designed for interacting with Perplexity AI's advanced API. Developed by LouminAI Labs, the script exemplifies how to leverage AI to generate responsive and contextual text based on user prompts. This script facilitates seamless interaction with Perplexity AI, allowing users to switch between different AI models dynamically and control the response generation process comprehensively.

## Features

### Dynamic AI Model Interaction
The script includes a function, `send_prompt_to_perplexity`, which allows for the dynamic specification of the AI model used for generating responses. This feature enables users to adjust their AI model choice on-the-fly without needing to alter the script's codebase, making it highly adaptable to various needs and conditions.

### Robust Error Handling
Comprehensive error handling is embedded within the function to ensure that any exceptions occurring during the API request process are caught and reported accurately. This ensures that users can understand and rectify issues quickly, enhancing reliability.

### Flexible Response Control
The script offers two options for sending prompts to Perplexity AI:
- **Option 1**: Sends a prompt with default parameters.
- **Option 2**: Provides detailed control over the response generation process through additional parameters such as `temperature`, `top_p`, `top_k`, `stream`, `presence_penalty`, and `frequency_penalty`.

## Usage

### Basic Usage
To use the script with the default settings:
```python
response = send_prompt_to_perplexity("Explain quantum physics.")
print(response)
```

### Advanced Usage
For detailed control over the AI's response, you can specify additional parameters:
```python
response = send_prompt_to_perplexity("Describe the solar system.", temperature=0.5, top_p=0.9, stream=True)
print(response)
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LouminAI/perplexity-ai-integration.git
   ```
2. Install required dependencies:
   ```bash
   pip install requests
   ```

## Documentation

Detailed model information and pricing can be found at [Perplexity AI Pricing Documentation](https://docs.perplexity.ai/docs/pricing). The script supports various models with different token pricing and request costs, suitable for diverse use cases and budget considerations.

## Supported Models

The script allows interaction with several models from Perplexity AI, including but not limited to:

Detailed Model Information and Pricing (as of 24.04.22):
    - 'llama-3-70b-instruct': $1.00 per 1M tokens, Context Length: 8192, Chat Completion  # Default  
    - 'llama-3-8b-instruct': $0.20 per 1M tokens, Context Length: 8192, Chat Completion  # Commented out  
    - 'codellama-70b-instruct': $1.00 per 1M tokens, Context Length: 16384, Chat Completion  # Commented out  
    - 'sonar-small-chat': $0.20 per 1M tokens, Context Length: 16384, Chat Completion  # Commented out  
    - 'sonar-medium-chat': $0.60 per 1M tokens, Context Length: 16384, Chat Completion  # Commented out  
    - 'sonar-small-online': $5 per 1000 requests, $0.20 per 1M tokens, Context Length: 12000, Chat Completion  # Commented out  
    - 'sonar-medium-online': $5 per 1000 requests, $0.60 per 1M tokens, Context Length: 12000, Chat Completion  # Commented out  

Other models are available but commented out within the script for ease of use and customization.

## Error Handling

Errors are managed within the script to provide clear and actionable feedback, particularly focusing on HTTP and validation errors that might occur during API interactions.

---

## How to Contribute

We encourage contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is welcome. Please see our `CONTRIBUTING.md` for guidelines on how to make contributions.

## License

All contributions made to this repository are licensed under the MIT License. See `LICENSE` for more details.

## Connect with Us

Join our vibrant community of developers and AI enthusiasts! Connect with us through our [website](https://louminai.com/contact) or participate in our forums to discuss AI development, share ideas, and collaborate on projects.

Together, let's drive the future of AI, making technology accessible and beneficial for everyone!
