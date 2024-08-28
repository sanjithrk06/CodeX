import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { postCode } from '../store/postCode';
import { useCompiler } from '../context/Compiler';

const CodeEditor = ({ setActiveTab }) => {
    const [liveCode, setLiveCode] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const { code, updateCode, input, updateOutput, updateRawOutput, rawOutput } = useCompiler();

    const handleChange = (value) => {
        updateCode(value?.trim() || '');
    };    

    const escapeNewlines = (str) => {
        return str.replace(/\n/g, '\\n');
    };

    const handleRun = async (e) => {
        e.preventDefault();
        setIsLoading(true); 

        const formData = {
            uid: "exampleUid",
            code: code, 
            input: input,
            expectedOutput: ""
        };

        try {
            const response = await postCode('http://10.70.2.34:4444/api/v1/c/compile', formData);
            if (response.errorOutput) updateOutput(response.errorOutput);
            else {
                const dcode = escapeNewlines(response.output);
                updateRawOutput(dcode);
                updateOutput(response.output);
            }
        } catch (error) {
            updateOutput(error);
        } finally {
            setActiveTab('output');
            setIsLoading(false); 
        }
    };

    return (
        <div className="flex flex-col gap-2 bg-primary border-none mx-5 my-4 h-[85vh]">
            <div className="flex flex-row justify-end">
                <button 
                    onClick={handleRun} 
                    className='bg-green-700 text-black p-2 px-3 font-semibold rounded-2xl'
                    disabled={isLoading} 
                >
                    {isLoading ? 'Running...' : 'Run Code'}
                </button>
            </div>
            <div className="rounded-xl overflow-hidden">
                <Editor 
                    height="90vh" 
                    defaultLanguage="c" 
                    defaultValue="// some comment"
                    onChange={handleChange}
                    value={code} 
                    theme='vs-dark'
                    acceptSuggestionOnCommitCharacter='true'
                    acceptSuggestionOnEnter='on'
                    autoIndent='false'
                    accessibilitySupport='auto'
                    folding='true'
                />
            </div>
        </div>
    );
};

export default CodeEditor;
