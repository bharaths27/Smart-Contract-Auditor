// frontend/src/components/Examples.tsx
'use client';

// Define the structure of an example
interface Example {
  title: string;
  description: string;
  code: string;
  level: 'Simple' | 'Medium' | 'Complex';
}

// Example Contracts
const examples: Example[] = [
  {
    title: 'Integer Overflow',
    level: 'Simple',
    description: 'A basic contract with a potential integer overflow vulnerability if using a Solidity version older than 0.8.0.',
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract Counter {
    uint8 public count = 255;

    // On Solidity <0.8.0, incrementing count when it is 255
    // will cause it to wrap around to 0.
    function increment() public {
        count++;
    }
}`
  },
  {
    title: 'Reentrancy Attack',
    level: 'Medium',
    description: 'The classic reentrancy vulnerability where an external call is made before updating state.',
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EtherStore {
    mapping(address => uint) public balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint bal = balances[msg.sender];
        require(bal > 0);

        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");

        balances[msg.sender] = 0;
    }
}`
  },
  {
    title: 'Unchecked External Call',
    level: 'Complex',
    description: 'A contract that interacts with a partner contract but fails to properly check the return value of the external call.',
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IPartner {
    function receiveFunds() external payable;
}

contract UncheckedCall {
    address payable public partner;
    uint256 public constant SEND_AMOUNT = 1 ether;

    constructor(address payable _partner) {
        partner = _partner;
    }

    // The return value of the .call is not checked.
    // If the partner call fails (e.g., it runs out of gas or reverts),
    // this function will continue executing as if it succeeded.
    function sendToPartner() public {
        partner.call{value: SEND_AMOUNT}("");
    }
}`
  }
];

// Define the props for the component
interface ExamplesProps {
  onSelectExample: (code: string) => void;
}

export default function Examples({ onSelectExample }: ExamplesProps) {
  const levelColor = (level: string) => {
    if (level === 'Simple') return 'text-green-400';
    if (level === 'Medium') return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 mt-16">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">Example Contracts</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {examples.map((example) => (
          <div key={example.title} className="bg-gray-800 p-6 rounded-lg flex flex-col">
            <h3 className="text-xl font-semibold text-white">{example.title}</h3>
            <p className={`font-mono text-sm ${levelColor(example.level)} mb-2`}>{example.level}</p>
            <p className="text-gray-400 mb-4 flex-grow">{example.description}</p>
            <button
              onClick={() => onSelectExample(example.code)}
              className="mt-auto w-full py-2 px-4 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-700"
            >
              Use this Example
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}