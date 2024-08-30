// React Hooks & Context Api Components
import { createContext, useContext, useState } from "react";

// Creating Context
const Compiler = createContext();

export const CompilerProvider = ({ children }) => {
    // useState
    const [ isTestCase, setIsTestCase ] = useState(true);
    const [ code, setCode ] = useState('// Type your code here');
    const [ input, setInput ] = useState('');
    const [ output, setOutput ] = useState('');
    const [ rawOutput, setRawOutput ] = useState('');
    const [ testCase, setTestCase ] = useState('');
    const [ testCaseStatus, setTestCaseStatus ] = useState(null);

    // Setter func
    const updateTestCase = (state) => {
        setTestCase(state);
    }
    
    const updateCode = (code) => {
        setCode(code);
    }

    const updateInput = (code) => {
        setInput(code);
    }

    const updateOutput = (code) => {
        setOutput(code);
    }

    const updateRawOutput = (code) => {
        setRawOutput(code);
    }

    const updateTestCaseStatus = (code) => {
        setTestCaseStatus(code);
    }

    const showTestCase = () => {
        setIsTestCase(!isTestCase);
    }

    // Reset Controller
    const resetAll = () => {
        setIsTestCase(true);
        setCode('// Type your code here');
        setInput('');
        setOutput('');
        setRawOutput('');
        setTestCase('');
        setTestCaseStatus(null);
    }

    return (
        <Compiler.Provider 
            value={
                { 
                    testCaseStatus, 
                    testCase, 
                    code, 
                    isTestCase, 
                    input, 
                    output, 
                    rawOutput,
                    updateCode, 
                    updateTestCase, 
                    updateInput, 
                    updateOutput, 
                    showTestCase, 
                    updateRawOutput, 
                    updateTestCaseStatus,
                    resetAll
                }
            }
        >
            {children}
        </Compiler.Provider>
    )
}

export const useCompiler = () => useContext(Compiler);