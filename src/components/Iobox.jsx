import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCompiler } from '../context/Compiler';

const IOBox = ({ tabs, activeTab, setActiveTab }) => {
    const { input, output, updateInput, updateRawOutput } = useCompiler();

    const toggleName = {
        io: 'Raw Output'
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
                <div className="flex flex-nowrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    <label className="inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            value="" 
                            className="sr-only peer"
                            onChange={updateRawOutput}
                        />
                        <div 
                            className="relative w-10 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[-2.5px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-800"
                        ></div>
                        <span 
                            className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            {toggleName.io}
                        </span>
                    </label>
                </div>
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
                    <div className="resize-none block p-4 w-full text-sm text-gray-900 bg-gray-900 rounded-lg border-none outline-none dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                        {output || "Your output will appear here..."}
                    </div>
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
