import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCompiler } from '../context/Compiler';

const IOBox = ({ tabs, activeTab, setActiveTab }) => {
    const { input, output, updateInput, rawOutput } = useCompiler();
    const [showRawOutput, setShowRawOutput] = useState(false);

    const handleCheckboxChange = (e) => {
        setShowRawOutput(e.target.checked);
    };

    const handleInput = (e) => {
        updateInput(e.target.value);
    };

    return (
        <div className='m-4'>
            <div className="mb-4 flex flex-row justify-between border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-nowrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    {tabs.map((tab) => (
                        (tab.id === 'input' || tab.id === 'output') && (
                            <li key={tab.id} className="me-2">
                                <button
                                    className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${activeTab === tab.id ? 'text-sky-400 border-sky-400 dark:text-sky-500 dark:border-sky-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group'}`}
                                    onClick={() => setActiveTab(tab.id)}
                                    aria-current={activeTab === tab.id ? 'page' : undefined}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            </li>
                        )
                    ))}
                </ul>
            </div>
            <div>
                {activeTab === 'input' ? (
                    <textarea
                        className="resize-none block p-4 w-full text-sm text-gray-900 bg-gray-900 rounded-lg border-none outline-none dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter your input here..."
                        rows={10}
                        value={input}
                        onChange={handleInput}
                    />
                ) : (
                    <>
                    <label className="flex justify-end items-center space-x-2 mb-4 cursor-pointer">
                        <input 
                            type="checkbox" 
                            value="" 
                            className="sr-only peer"
                            checked={showRawOutput} 
                            onChange={handleCheckboxChange} 
                        />
                        <div 
                            className="relative w-[1.9rem] h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2.1px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-slate-800"
                        ></div>
                        <span className="ms-3 leading-3 text-sm font-medium text-gray-900 dark:text-gray-300">Raw Output</span>
                    </label>
                    <div className="resize-none block p-4 w-full max-h-[22rem] overflow-y-scroll text-sm text-gray-900 bg-gray-900 rounded-lg border-none outline-none dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white custom-scrollbar whitespace-pre-wrap">
                        {showRawOutput ? (rawOutput || "Your raw output will appear here...") : (output || "Your output will appear here...")}
                    </div>
                    </>
                )}
            </div>
        </div>
    );
};

IOBox.propTypes = {
    tabs: PropTypes.array.isRequired,
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired
};

export default IOBox;
