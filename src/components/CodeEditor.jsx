import { useState } from 'react';

// Monaco Editor import
import Editor from '@monaco-editor/react';


const CodeEditor = () => {
    const [code, setCode] = useState();

    const handleChange = (value) => {
        setCode(value.trim());
        console.log(code);
    };

    return (
        <div className=" flex flex-col gap-2 bg-black border-none m-5 h-full">
            <div className=" flex flex-row justify-end">
                <button className=' bg-green-700 text-black p-2 px-3 font-semibold rounded-2xl'>Run Code</button>
            </div>
            <div className="rounded-xl overflow-hidden">
                <Editor 
                    height="90vh" 
                    defaultLanguage="c" 
                    defaultValue="// some comment"
                    onChange={handleChange} 
                    theme='vs-dark'
                    acceptSuggestionOnCommitCharacter= 'true'
                    acceptSuggestionOnEnter= 'on'
                    autoIndent='false'
                    accessibilitySupport='auto'
                    folding='true'
                />
            </div>
        </div>
    )
}

export default CodeEditor;