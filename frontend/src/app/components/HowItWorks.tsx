// frontend/src/components/HowItWorks.tsx
export default function HowItWorks() {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 mt-16">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">How It Works</h2>
        <div className="bg-gray-800 p-6 rounded-lg space-y-4 text-gray-300">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Pre-Trained Foundation Model</h3>
            <p>This tool leverages <span className="font-semibold text-cyan-400">Code Llama</span>, a state-of-the-art Large Language Model (LLM) pre-trained by Meta on a massive dataset of code and text. We are not training the model from scratch but are skillfully guiding it.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">In-Context Learning via Prompt Engineering</h3>
            <p>The core of this project lies in <span className="font-semibold text-cyan-400">prompt engineering</span>. By providing a detailed, structured prompt that includes a persona, core security principles, and examples of high-quality audits (a technique called "few-shot prompting"), we guide the AI to perform a specialized security analysis without modifying the model itself.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Local and Private</h3>
            <p>The entire process runs locally on your machine using <span className="font-semibold text-cyan-400">Ollama</span>. Your code is never sent to an external server, ensuring complete privacy and control.</p>
          </div>
        </div>
      </div>
    );
  }