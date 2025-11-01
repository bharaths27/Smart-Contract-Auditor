# AI Smart Contract Auditor

A full-stack application that leverages a local, private Large Language Model (LLM) to perform security audits on Solidity smart contracts. This tool provides a simple interface for users to paste their code and receive a detailed security analysis, ensuring that the code never leaves their machine.

![AI Smart Contract Auditor Screenshot](docs/image_a71abf.jpg)

## How It Works

The application is built with a decoupled architecture, ensuring a clean separation of concerns between the user interface and the AI logic.

* **Frontend (Next.js & React):** A responsive, modern UI built with Next.js provides the main interface for users to paste code, select examples, and view the formatted audit results.
* **Backend (Python & FastAPI):** A simple API server built with FastAPI acts as the bridge. It receives the user's code from the frontend, formats it into a structured prompt, and sends it to the Ollama server.
* **AI Model (Ollama & Code Llama):** The entire AI process runs locally via [Ollama](https://ollama.com/). This tool serves the `codellama` model, exposing a local API that the FastAPI backend calls. This design ensures 100% privacy and control, as your code is never sent to an external server.

The project's intelligence comes from **prompt engineering**. A detailed, multi-part prompt instructs the `codellama` model to act as a "world-class, meticulous smart contract security auditor," providing it with core principles and examples to guide its analysis.

## How to Run (Local Setup)

This project requires three separate services to be running simultaneously: **Ollama**, the **Backend**, and the **Frontend**.

### Prerequisites
* [Ollama](https://ollama.com/) (with the `codellama` model)
* [Python 3.10+](https://www.python.org/)
* [Node.js 18+](https://nodejs.org/)

### Step 1: Start Ollama
Open your first terminal and run the following command to pull and serve the model. Leave this running.

```bash
ollama run codellama
