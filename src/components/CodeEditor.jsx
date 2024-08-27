import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { postCode } from '../store/postCode';
import { useCompiler } from '../context/Compiler';

const CodeEditor = ({ setActiveTab }) => {
    const [liveCode, setLiveCode] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const { code, updateCode, input, updateOutput } = useCompiler();

    const encode = (codeToEncode) => {
        const formatted = codeToEncode
            .split('\n')
            .filter(line => line.trim() !== '') 
            .map(line => line.replace(/"/g, '\\"')) 
            .join('\\n');
        updateCode(formatted);
    };

    const handleChange = (value) => {
        setLiveCode(value?.trim() || '');
    };

    const handleRun = async (e) => {
        e.preventDefault();
        setIsLoading(true); 

        encode(liveCode);

        const formData = {
            uid: "exampleUid",
            code: liveCode, 
            input: input,
            expectedOutput: ""
        };

        try {
            const response = await postCode('http://10.70.2.34:4444/api/v1/c/compile', formData);
            updateOutput(response.output);
        } catch (error) {
            updateOutput(error.errorOutput);
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
                    value={liveCode} 
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
