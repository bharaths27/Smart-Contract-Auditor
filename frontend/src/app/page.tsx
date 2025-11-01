// frontend/src/app/page.tsx
'use client';

import { useState } from 'react';
import Auditor from './components/Auditor';
import HowItWorks from './components/HowItWorks';
import Examples from './components/Examples';

export default function Home() {
  // The code state is now managed here in the parent component
  const [code, setCode] = useState('');

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 bg-gray-900 text-white">
      {/* Pass the state and the function to update it to the Auditor component */}
      <Auditor code={code} onCodeChange={setCode} />

      {/* The Examples component will use the setCode function to update the Auditor's textarea */}
      <Examples onSelectExample={setCode} />
      
      <HowItWorks />

      <footer className="w-full max-w-4xl mx-auto p-4 mt-16 text-center text-gray-500">
        <p>Built by Bharath Srividhya & Subham Jena</p>
      </footer>
    </main>
  );
}