import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { postCode } from '../store/postCode';
import { useCompiler } from '../context/Compiler';
import { useParams } from 'react-router-dom';

import CodeMirror from "@uiw/react-codemirror";
import { abcdef } from '@uiw/codemirror-theme-abcdef';
import { StreamLanguage } from '@codemirror/language';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';

const CodeEditor = ({ setActiveTab }) => {
    const [isLoading, setIsLoading] = useState(false); 
    const { code, updateCode, input, testCase, updateOutput, updateRawOutput, updateTestCaseStatus } = useCompiler();
    const { lang } = useParams();

    const EXTENSIONS = {
        cpp: [cpp()],
        'c++': [cpp()],
        'c': [cpp()],
        java: [java()],
    };

    const handleChange = (value) => {
        updateCode(value?.trim() || '');
    };    

    function escapeNewlines(str) {
        return str.replace(/\n/g, '\\n');
    };

    const handleRun = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await postCode(`http://10.70.2.34:4444/api/v1/${lang}/compile`, code, input, testCase);
            console.log(response);
            if (response.errorOutput) {
                updateOutput(response.errorOutput);
            } else {
                const dcode = escapeNewlines(response.output);
                updateRawOutput(dcode);
                updateTestCaseStatus(response.testCasePassed);
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
            <div className="flex flex-row justify-between px-3">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">{lang=="java" ? 'Java' : 'C'} Compiler</span>
                <button
                    class="inline-block rounded-full bg-transparent ring-2 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-slate-900 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-slate-900 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-slate-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                    type="button"
                    disabled={isLoading} 
                    onClick={handleRun} 
                >
                    {isLoading ? 
                    (
                        <>
                        <div
                            role="status"
                            class="inline-block h-3 w-3 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        >
                            <span
                            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >
                            Running...
                            </span>
                        </div>
                        Running
                        </>
                    ):
                    'Run Code'
                    }
                </button>
            </div>
            <div className="rounded-xl overflow-hidden">
                <CodeMirror 
                    height="90vh"
                    language={lang}
                    defaultValue="// some comment"
                    onChange={handleChange}
                    theme={abcdef}
                    value={code}
                    extensions={[EXTENSIONS[lang]]}
                    basicSetup={{autocompletion: true}}
                />
            </div>
        </div>
    );
};

export default CodeEditor;
