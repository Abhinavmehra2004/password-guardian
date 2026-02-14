// Note: This function assumes you have a local Ollama server running
// and the 'mistral' model is available.

interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

export async function getAISuggestions(password: string): Promise<string> {
  if (!password) {
    return "Please provide a password.";
  }

  const prompt = `You are a password security expert. A user has provided the following password: "${password}". 
Analyze it and provide 2-3 concise, actionable suggestions to improve its strength. 
Focus on concepts like entropy, character variety, and length, but explain them simply. 
Do not repeat the password in your response. Do not use markdown.
Your entire response should be a single paragraph.`;

  try {
    const response = await fetch('/ollama-api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'ministral-3:8b', // Updated model name based on user input.
        prompt: prompt,
        stream: false, // We will not stream for simplicity, will get the full response at once
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API request failed with status: ${response.status}`);
    }

    const data: OllamaResponse = await response.json();
    return data.response.trim();

  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
    return "Could not get AI suggestions. Make sure your local Ollama server is running and the 'mistral' model is available.";
  }
}
