// React Hooks & Context Api
import { useEffect, useState } from 'react';
import { useCompiler } from '../context/Compiler';
import { useParams } from 'react-router-dom';

// Font CSS
// import '@fontsource/inter/variable.css';

// Post Controller
import { postCode } from '../store/postCode';

// Compiler Components
import CodeMirror from "@uiw/react-codemirror";
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';

const CodeEditor = ({ setActiveTab }) => {
    const [isLoading, setIsLoading] = useState(false); 
    const [copySuccess, setCopySuccess] = useState(false);
    const { lang } = useParams();
    const { 
        code, 
        updateCode, 
        input, 
        testCase, 
        updateOutput, 
        updateRawOutput, 
        updateTestCaseStatus,
        resetAll
    } = useCompiler();

    // Language Extensions
    const EXTENSIONS = {
        cpp: [cpp()],
        'c++': [cpp()],
        'c': [cpp()],
        java: [java()],
    };

    // Update Code onChange Handler
    const handleChange = (value) => {
        updateCode(value?.trim() || '');
    };    
    
    // Convert to Raw Ouput
    function escapeNewlines(str) {
        return str.replace(/\n/g, '\\n');
    };

    // Reset Handler
    const handleReset = () => {
        resetAll();
    }

    // Copy to clipboard handler
    const copyToClipboard = () => {
        const textArea = document.createElement("textarea");
        textArea.value = code; // Replace 'code' with the text you want to copy
        document.body.appendChild(textArea);
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                setCopySuccess(true);
                setTimeout(() => {
                    setCopySuccess(false);
                }, 2000);
            } else {
                console.warn("Copy command was unsuccessful");
            }
        } catch (err) {
            console.error("Failed to copy text", err);
        }
        document.body.removeChild(textArea);
    };
    

    // On Language change
    useEffect(() => {
        handleReset();
    }, [lang]);

    // Run Code Handler
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
            <div className="flex flex-row justify-between px-3 py-2">
                <div className=" inline-flex gap-2">
                    <button
                        class="inline-flex items-center rounded-xl bg-transparent ring-2 ring-tertiary-btn text-textColor shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-tertiary-bg focus:bg-tertiary-bg active:bg-tertiary-bg px-3 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                        type="button"
                        disabled={isLoading} 
                        onClick={handleReset}
                    >
                        <svg width="13px" height="13px" viewBox="0 0 1920 1920" className='mr-1'>
                            <path fill="#cbd5e1" d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0" fill-rule="evenodd"/>
                        </svg>
                        Reset
                    </button>
                    <button
                        class="inline-flex items-center rounded-xl bg-transparent hover:ring-2 hover:ring-tertiary-btn text-textColor shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-tertiary-bg focus:bg-tertiary-bg active:bg-tertiary-bg px-3 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                        type="button"
                        disabled={isLoading}
                        onClick={copyToClipboard}
                    >
                        <svg width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#6b7280" d="M15.24 2H11.3458C9.58159 1.99999 8.18418 1.99997 7.09054 2.1476C5.96501 2.29953 5.05402 2.61964 4.33559 3.34096C3.61717 4.06227 3.29833 4.97692 3.14701 6.10697C2.99997 7.205 2.99999 8.60802 3 10.3793V16.2169C3 17.725 3.91995 19.0174 5.22717 19.5592C5.15989 18.6498 5.15994 17.3737 5.16 16.312L5.16 11.3976L5.16 11.3024C5.15993 10.0207 5.15986 8.91644 5.27828 8.03211C5.40519 7.08438 5.69139 6.17592 6.4253 5.43906C7.15921 4.70219 8.06404 4.41485 9.00798 4.28743C9.88877 4.16854 10.9887 4.1686 12.2652 4.16867L12.36 4.16868H15.24L15.3348 4.16867C16.6113 4.1686 17.7088 4.16854 18.5896 4.28743C18.0627 2.94779 16.7616 2 15.24 2Z"/>
                            <path fill="#6b7280" d="M6.6001 11.3974C6.6001 8.67119 6.6001 7.3081 7.44363 6.46118C8.28716 5.61426 9.64481 5.61426 12.3601 5.61426H15.2401C17.9554 5.61426 19.313 5.61426 20.1566 6.46118C21.0001 7.3081 21.0001 8.6712 21.0001 11.3974V16.2167C21.0001 18.9429 21.0001 20.306 20.1566 21.1529C19.313 21.9998 17.9554 21.9998 15.2401 21.9998H12.3601C9.64481 21.9998 8.28716 21.9998 7.44363 21.1529C6.6001 20.306 6.6001 18.9429 6.6001 16.2167V11.3974Z"/>
                        </svg>
                    </button>
                    {copySuccess && (
                        <span className=" pt-2.5 text-tertiary-500 font-medium text-xs">
                        Copied!
                        </span>
                    )}
                </div>
                <button
                    class={`inline-block rounded-full bg-transparent ring-2 ring-tertiary-btn text-textColor shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-tertiary-bg hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-tertiary-bg focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-tertiary-bg active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 py-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                    type="button ${isLoading ? 'cursor-wait' : 'cursor-pointer'}`}  
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
                        )
                        : 'Run Code'
                    }
                </button>
            </div>
            <div className="rounded-xl overflow-y-scroll custom-scrollbar">
                <CodeMirror 
                    height="81vh"
                    language={lang}
                    defaultValue="// some comment"
                    onChange={handleChange}
                    theme={tokyoNight}
                    value={code}
                    extensions={[EXTENSIONS[lang]]}
                    basicSetup={{
                        autocompletion: true
                    }}
                    options={{
                        lineNumbers: true,
                        lineWrapping: false,
                        tabSize: 4,
                        scrollbarStyle: 'native',
                    }}
                    className="rounded-lg overflow-auto font-['Inter var'] text-base code-editor "
                />
            </div>
        </div>
    );
};

export default CodeEditor;