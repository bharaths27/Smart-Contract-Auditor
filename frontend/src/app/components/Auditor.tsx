// frontend/src/components/Auditor.tsx
'use client';

import { useState } from 'react';

// Define the component's props
interface AuditorProps {
  code: string;
  onCodeChange: (newCode: string) => void;
}

export default function Auditor({ code, onCodeChange }: AuditorProps) {
  const [results, setResults] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setResults('');

    try {
      const response = await fetch('http://localhost:8000/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code }),
      });

      const data = await response.json();
      setResults(data.audit_results);
    } catch (error) {
      console.error('Error submitting code for audit:', error);
      setResults('An error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-2 text-white">AI Smart Contract Auditor</h1>
      <p className="text-center text-gray-400 mb-6">Test the limits of local AI for security analysis.</p>
      <textarea
        className="w-full h-80 p-4 border border-gray-600 rounded-md bg-gray-800 text-gray-200 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        placeholder="Paste your Solidity smart contract here or select an example below..."
      />
      <button
        className="w-full mt-4 py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-500"
        onClick={handleSubmit}
        disabled={isLoading || !code}
      >
        {isLoading ? 'Auditing...' : 'Audit Contract'}
      </button>
      {results && (
        <div className="mt-8 p-6 border border-gray-700 rounded-lg bg-gray-800 text-left">
          <h2 className="text-2xl font-semibold mb-4 text-white">Audit Report</h2>
          <div 
            className="prose prose-invert prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:rounded-md" 
            dangerouslySetInnerHTML={{ __html: results.replace(/\n/g, '<br />') }} 
          />
        </div>
      )}
    </div>
  );
}