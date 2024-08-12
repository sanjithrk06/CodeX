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
        <div className=" bg-black border-none rounded-xl overflow-hidden m-5 mb-[3vh] mt-[7vh]">
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
    )
}

export default CodeEditor;