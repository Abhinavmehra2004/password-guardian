# Password Guardian

A web application to analyze password strength, estimate crack time, and provide both rule-based and AI-powered suggestions for improvement. This tool helps users understand password security and create stronger, more resilient passwords.

## Features

- **Real-time Strength Analysis:** Get instant feedback on your password as you type.
- **Criteria Checklist:** See if your password meets common criteria (length, uppercase, lowercase, numbers, symbols).
- **Crack Time Estimation:** Understand how long it would take an attacker to brute-force your password.
- **Actionable Suggestions:** Receive clear, rule-based tips on how to improve your password's strength.
- **AI-Powered Analysis:** Leverage a local AI model via Ollama to get more nuanced, contextual advice on your password's security.

## Tech Stack

- **Frontend:** Vite, React, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **AI Integration:** Ollama

## Local Setup and Running

Follow these steps to run the project locally:

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Abhinavmehra2004/password-guardian.git
    cd password-guardian
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the development server:**
    The application will be available at `http://localhost:8080`.
    ```sh
    npm run dev
    ```

## AI Feature Setup (Ollama)

To use the "Analyze with AI" feature, you need to have a local Ollama server running.

1.  **Install Ollama:**
    Download and install Ollama from the official website: [https://ollama.com/](https://ollama.com/)

2.  **Download the AI Model:**
    This project is configured to use the `ministral-3:8b` model. Pull it by running the following command in your terminal:
    ```sh
    ollama pull ministral-3:8b
    ```

3.  **Ensure Ollama is running:**
    Make sure the Ollama application is running on your machine before using the AI analysis feature in the web app.

---
*This project was bootstrapped with a template and significantly enhanced to build the Password Guardian application.*