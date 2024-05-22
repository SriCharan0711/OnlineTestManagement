

import AceEditor from 'react-ace';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import 'ace-builds/src-noconflict/mode-c_cpp'; // Importing C++ mode
import 'ace-builds/src-noconflict/mode-python'; // Importing Python mode
import 'ace-builds/src-noconflict/theme-monokai'; // Importing a theme

function CodeEditor() {
    const [language, setLanguage] = useState<string>('c_cpp');
    const initialCodeCPlusPlus = `#include <iostream>\nusing namespace std;\n\nint main() {\ncout << "Hello, World!";\n  return 0;\n}`;
    const initialCodePython = `print("Hello, World!")`;
    const [code, setCode] = useState<string>(initialCodeCPlusPlus);
    const [output, setOutput] = useState<string>('');

    const handleChange = (value: string) => {
        setCode(value);
    };

    const handleRun = async () => {
        try {
            // Get the input value from the text area
            const inputTextArea = document.getElementById('inputTextArea') as HTMLTextAreaElement;
            const input = inputTextArea.value;

            // Make an HTTP POST request to the backend server based on selected language
            const url = language === 'c_cpp' ? '/compile/cpp' : '/compile/python';
            const response: AxiosResponse<{ output: string }> = await axios.post<{ output: string }>(url, { code, input });

            // Set the output received from the server
            setOutput(response.data.output);
            console.log(response);
        } catch (error) {
            console.error('Error while running the code:', error);
            setOutput('Error: ' + error);
        }
    };

    const handleReset = () => {
        // Reset code and output based on selected language
        setCode(language === 'c_cpp' ? initialCodeCPlusPlus : initialCodePython);
        setOutput('');
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value);
        setCode(event.target.value === 'c_cpp' ? initialCodeCPlusPlus : initialCodePython);
    };

    return (
        <div>
            <h1>{language === 'c_cpp' ? 'C++' : 'Python'} Code Editor</h1>
            <div>
                <select value={language} onChange={handleLanguageChange}>
                    <option value="c_cpp">C++</option>
                    <option value="python">Python</option>
                </select>
                
                <button onClick={handleReset}>Reset</button>
            </div>
            <AceEditor
                mode={language}
                theme="monokai"
                value={code}
                onChange={handleChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                style={{ width: '100%', height: '500px' }}
            />
            <h2>Input</h2>
            <textarea id="inputTextArea" className="form-control"></textarea>
            <button onClick={handleRun}>Run</button>
            <h2>Output:</h2>
            <p>{output}</p>
        </div>
    );
}

export default CodeEditor;
