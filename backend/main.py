from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import json

# Initialize the FastAPI app
app = FastAPI()

# Allows your frontend to communicate with your backend
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Defines the expected request structure
class Code(BaseModel):
    code: str

# A simplified, single-line prompt to avoid syntax errors.
# In backend/main.py

PROMPT_TEMPLATE = """
You are a world-class, meticulous smart contract security auditor. Your primary directive is user safety and code correctness. You think step-by-step and are exhaustive in your analysis.

## Core Principles to Follow:
1.  **Checks-Effects-Interactions Pattern:** Always ensure that state-changing effects are completed before interacting with external contracts.
2.  **Integer Safety:** Be vigilant about integer overflow and underflow vulnerabilities.
3.  **Clarity over cleverness:** A secure contract is one that is easy to read and understand.
4.  **Fail-Safe:** The contract should be secure by default.

## Instructions:
First, in your head, perform a step-by-step analysis of the user's code. Think about the control flow, state changes, and external calls. After this internal "chain of thought," generate a security audit report in the exact Markdown format shown in the examples below. If you find no issues, provide a "No Vulnerabilities Found" summary.

---
### EXAMPLE AUDIT 1: Reentrancy

**Vulnerable Code:**
```solidity
contract Vulnerable {{
    mapping(address => uint) public balances;
    function withdraw(uint amount) public {{
        require(balances[msg.sender] >= amount);
        (bool success, ) = msg.sender.call{{value: amount}}("");
        require(success);
        balances[msg.sender] -= amount;
    }}
}}
"""
# The main API endpoint that the frontend calls.
# This must be present for the '404 Not Found' error to be fixed.
@app.post("/audit")
def audit_contract(code: Code):
    ollama_api_url = "http://localhost:11434/api/generate"
    prompt = PROMPT_TEMPLATE.format(user_code=code.code)
    
    payload = {
        "model": "codellama",
        "prompt": prompt,
        "stream": False
    }

    try:
        response = requests.post(ollama_api_url, json=payload)
        response.raise_for_status()
        ai_response = response.json().get("response", "No response from model.")
        
        return {
            "status": "success",
            "audit_results": ai_response.strip()
        }
    except requests.exceptions.RequestException as e:
        print(f"Error calling Ollama API: {e}")
        return {
            "status": "error",
            "audit_results": "Failed to communicate with the AI model. Is Ollama running?"
        }