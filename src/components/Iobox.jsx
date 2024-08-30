// React Hooks & Context Api
import { useState } from 'react';
import { useCompiler } from '../context/Compiler';

// PropType to define props type
import PropTypes from 'prop-types';

const IOBox = ({ tabs, activeTab, setActiveTab }) => {
    const [showRawOutput, setShowRawOutput] = useState(false);
    const { 
        input, 
        output, 
        updateInput, 
        rawOutput 
    } = useCompiler();

    // Show Raw Output Handler
    const handleCheckboxChange = (e) => {
        setShowRawOutput(e.target.checked);
    };

    // Update Input Handler
    const handleInput = (e) => {
        updateInput(e.target.value);
    };

    return (
        <div className='m-4'>
            <div className="mb-4 flex flex-row justify-between border-b border-tertiary-bdr">
                <ul className="flex flex-nowrap -mb-px text-sm font-medium text-center text-tertiary-inactive">
                    {tabs.map((tab) => (
                        (tab.id === 'input' || tab.id === 'output') && (
                            <li key={tab.id} className="me-2">
                                <button
                                    className={`inline-flex items-center leading-normal justify-center p-4 border-b-2 rounded-t-lg ${activeTab === tab.id ? 'text-secondary border-secondary' : 'border-transparent hover:text-inactive hover:border-tertiary-400 hover:text-tertiary-400 group'}`}
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
                        className="resize-none block p-4 w-full text-sm rounded-lg border-none outline-none bg-tertiary-900 dark:border-tertiary-600 placeholder-tertiary-400 text-textColor"
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
                        <span className="ms-3 leading-3 text-sm font-medium text-textColor">Raw Output</span>
                    </label>
                    <div className="resize-none block p-4 w-full max-h-[22rem] overflow-y-scroll text-sm text-textColor bg-tertiary-900 rounded-lg border-none outline-none placeholder-tertiary-400 custom-scrollbar whitespace-pre-wrap">
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
