// React Hooks & Context Api
import { useState } from 'react';
import { useCompiler } from '../context/Compiler';

// PropType to define props type
import PropTypes from 'prop-types';

const TestCaseBox = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs.find(tab => tab.id === 'testCase').id);
  const { 
    isTestCase, 
    showTestCase, 
    testCase, 
    updateTestCase, 
    testCaseStatus 
  } = useCompiler();

  // Toggle TestCase Handler
  const handleCheckboxChange = (e) => {
    showTestCase();
  };

  // Update Expected Output Handler
  const handleTestCase = (e) => {
    updateTestCase(e.target.value);
  };

  return (
    <div className='m-4'>
      <div className="mb-4 flex flex-row justify-between border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-nowrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {tabs.map((tab) => (
            tab.id === 'testCase' && (
              <li key={tab.id} className="me-2">
                <button
                  className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${isTestCase ? 'text-sky-400 border-sky-400 dark:text-sky-500 dark:border-sky-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group'}`}
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
              checked={isTestCase}
              onChange={handleCheckboxChange}
            />
            <div 
              className="relative w-10 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[-2.5px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-800"
            ></div>
          </label>
        </div>
      </div>
      <div>
        {isTestCase && activeTab === 'testCase' && (
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-950 border-2 border-slate-900">
            <div className="mb-2 p-2">
            <label htmlFor="expectedOutput" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Expected Output :
                {testCaseStatus === null ? (
                    <span className="inline-flex items-center mx-3 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
                        <span className="w-2 h-2 me-1 bg-gray-500 rounded-full"></span>
                        None
                    </span>
                ) : testCaseStatus === false ? (
                    <span className="inline-flex items-center mx-3 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                        <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                        Failed
                    </span>
                ) : (
                    <span className="inline-flex items-center mx-3 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                        <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                        Passed
                    </span>
                )}
            </label>
              <textarea 
                id="expectedOutput" 
                rows="4" 
                className="resize-none block p-4 w-full text-sm text-gray-900 bg-gray-900 rounded-lg border-none outline-none dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                placeholder="Enter Expected Output"
                value={testCase}
                onChange={handleTestCase}
              ></textarea>
            </div>
          </div>
        )}
        {!isTestCase && (
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-950 border-2 border-slate-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Toggle the show TestCase to add TestCase.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

TestCaseBox.propTypes = {
  tabs: PropTypes.array
};

export default TestCaseBox;
