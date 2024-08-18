import { createContext, useContext, useState } from "react";


const Compiler = createContext();

export const CompilerProvider = ({ children }) => {

    const [ isTestCase, setIsTestCase ] = useState(true);
    const [ code, setCode ] = useState('');
    const [ input, setInput ] = useState('');
    const [ output, setOutput ] = useState('');
    const [ rawOutput, setRawOutput ] = useState('');
    const [ testCase, setTestCase ] = useState('');
    const [ testCaseStatus, setTestCaseStatus ] = useState();

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

    return (
        <Compiler.Provider value={{ testCaseStatus, testCase, code, isTestCase, input, output, updateCode, updateTestCase, updateInput, updateOutput, showTestCase, updateRawOutput, updateTestCaseStatus }}>
            {children}
        </Compiler.Provider>
    )
}

export const useCompiler = () => useContext(Compiler);