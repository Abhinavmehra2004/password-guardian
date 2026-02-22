<div align="center">
  <h1>🛡️ Password Guardian</h1>
  <p>
    <strong>A privacy-first, AI-powered credential auditing and strength analysis tool.</strong>
  </p>
  <p>
    <a href="https://github.com/Abhinavmehra2004/password-guardian"><img src="https://img.shields.io/badge/React-18.0+-61DAFB.svg?logo=react&logoColor=black" alt="React" /></a>
    <a href="https://github.com/Abhinavmehra2004/password-guardian"><img src="https://img.shields.io/badge/TypeScript-Ready-3178C6.svg?logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://ollama.com/"><img src="https://img.shields.io/badge/AI_Engine-Ollama-white.svg?logo=ollama&logoColor=black" alt="Ollama" /></a>
    <a href="https://github.com/Abhinavmehra2004/password-guardian/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" /></a>
  </p>
</div>

---

## 📖 About the Project

**Password Guardian** is an advanced web application designed to analyze password strength, estimate cryptographic crack times, and provide both rule-based and AI-driven suggestions for improvement. 

Unlike standard cloud-based password meters that risk transmitting your sensitive data over the internet, Password Guardian leverages a **Zero-Cloud Architecture**. By utilizing local AI models via Ollama, it provides penetration-tester-level insights and contextual advice while ensuring your keystrokes never leave your machine.

## ✨ Key Features

* **⚡ Real-Time Heuristic Analysis:** Get instant, low-latency visual feedback on your password's entropy as you type.
* **✅ Comprehensive Security Checklist:** Automatically verify if your password meets critical structural criteria (length, uppercase, lowercase, numbers, and symbols).
* **⏱️ Crack Time Estimation:** Understand the theoretical time required for an attacker to brute-force your password using modern hardware.
* **💡 Actionable Insights:** Receive clear, rule-based, and actionable tips to incrementally improve your credential resilience.
* **🧠 Local AI-Powered Auditing:** Leverage a local Large Language Model (LLM) to get nuanced, context-aware advice on semantic predictability (e.g., detecting keyboard walks or predictable substitutions).

## 🛠️ Tech Stack

* **Core:** [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
* **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
* **Local AI Integration:** [Ollama](https://ollama.com/)

---

## 🚀 Getting Started

Follow these instructions to set up a local development environment.

### Prerequisites
* **Node.js:** (v18.0 or higher recommended)
* **Git:** To clone the repository

### Local Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abhinavmehra2004/password-guardian.git
   cd password-guardian

```

2. **Install dependencies:**
```bash
npm install

```


3. **Run the development server:**
```bash
npm run dev

```


*The application will now be running and accessible at `http://localhost:8080`.*

---

## 🤖 AI Feature Setup (Ollama)

To ensure maximum privacy, the "Analyze with AI" feature requires a localized AI engine. You must have a local Ollama server running to utilize this functionality.

1. **Install Ollama:**
Download and install the Ollama engine for your operating system from the official website: [https://ollama.com/](https://ollama.com/)
2. **Download the AI Model:**
This project is specifically configured to use the `ministral-3:8b` model. Pull it into your local environment by running:
```bash
ollama pull ministral-3:8b

```


3. **Initialize the Engine:**
Ensure the Ollama application is running in the background before requesting AI analysis in the web app. The app will automatically connect to Ollama's default local port (`11434`).

> **🔒 Privacy Note:** Because the LLM runs entirely on your local hardware, your passwords are *never* transmitted to external third-party APIs.

---

## 🛡️ Architecture & Security

* **Zero-Cloud Footprint:** All calculations, regular expression matching, and AI inferences are performed locally in the browser and on the host machine.
* **Ephemeral State:** Password data is managed strictly within React's volatile state. It is never persisted to `localStorage`, `sessionStorage`, or external databases.

---

<div align="center">
<i>This project was bootstrapped with a Vite template and significantly enhanced to build the custom Password Guardian application architecture.</i>
</div>
