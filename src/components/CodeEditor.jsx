import { useState } from 'react';

// Monaco Editor import
import Editor from '@monaco-editor/react';
import { postCode } from '../store/postCode';


const CodeEditor = () => {
    const [code, setCode] = useState();

    const encode = () => {
        const formatted = code
        .split('\n')
        .filter(line => line.trim() !== '') // Remove empty lines
        .map(line => line.replace(/"/g, '\\"')) // Escape double quotes
        .join('\\n'); // Replace newlines with \n
        //   .replace(/\n/g, '\\n')
        //   .replace(/"/g, '\\"')
        //   .replace(/\\n\s+/g, '\\n'); // Handles indentation spaces after newline
        console.log(formatted);
    };

    const handleChange = (value) => {
        setCode(value.trim());
        // const format = formatCode(code);
        // console.log(format);
    };

    const handleRun = async (e) => {
        e.preventDefault();

        const formData = {
            uid: "exampleUid",
            code: "#include <stdio.h>\n#include <signal.h>\nint main() {\n    int a;\n    scanf(\"%d\", &a);\n    printf(\"%d\", a);\n    for(int i = 0; i < 10; i++) {\n        printf(\"%d\\n\", i);\n    }\n    return 0;\n}",
            input: "5",
            expectedOutput: "5\n0\n1\n2\n...\n999\n"
        };

        try {
            const response = await postCode('http://10.70.2.34:4444/api/v1/c/compile', formData);
            console.log('Response:', response);
        } catch (error) {
            console.error('Failed to submit data:', error);
        }
    };

    return (
        <div className=" flex flex-col gap-2 bg-black border-none m-5 h-full">
            <div className=" flex flex-row justify-end">
                <button onClick={handleRun} className=' bg-green-700 text-black p-2 px-3 font-semibold rounded-2xl'>Run Code</button>
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