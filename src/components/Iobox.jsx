import React, { useState } from 'react';
import { useCompiler } from '../context/Compiler';
import PropTypes from 'prop-types'; 

const Iobox = ({ tabs, name }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const { testCase, testCaseStatus, isTestCase, input, output, updateCode, updateTestCase, updateInput, updateOutput, showTestCase, updateRawOutput } = useCompiler();

  const tabContent = {
    input: 'Enter an input.',
    output: 'This is the output.',
    testCase: 'Toggle the show Testcase to add Testcase.'
  };

  const toggleName = {
    io: 'Raw Output',
    testCase: 'Show TestCase'
  };

  return (
    <div className='m-4'>
      <div className="mb-4 flex flex-row justify-between border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-nowrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {tabs.map((tab) => (
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
          ))}
        </ul>
        <div className="flex flex-nowrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <label className="inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              value="" 
              className="sr-only peer"
            />
            <div 
              className="relative w-10 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[-2.5px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-800"
            ></div>
            <span 
              className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {toggleName[name]}
            </span>
          </label>
        </div>
      </div>
      <div>
        {Object.keys(tabContent).map((key) => (
          <div
            key={key}
            className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-950 border-2 border-slate-900 ${activeTab === key ? 'block' : 'hidden'}`}
          >
            {key == 'input' ? (
                <>
                  <textarea 
                    id="message" 
                    rows="10" 
                    className=" resize-none block p-1 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-none outline-none  dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                    placeholder="Enter Your Input"
                  ></textarea>
                </>
              ) 
              : key == 'testCase' ? ( 
                isTestCase ? (
                <>
                  <div className="mb-2 p-2">
                    <label htmlFor="expectedOutput" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">
                      Expected Output :
                      <span className="inline-flex items-center mx-3 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                      Passed
                    </span>
                    </label>
                    {/* <input 
                      type="text" 
                      id="expectedOutput" 
                      placeholder='Enter a Expected Output' 
                      className="bg-gray-50 outline-none border-2 border-black focus:border-2 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-900 dark:placeholder-gray-400 dark:text-white dark:focus:border-slate-800" 
                    /> */}
                    <textarea 
                    id="message" 
                    rows="4" 
                    className=" resize-none block p-4 w-full text-sm text-gray-900 bg-gray-900 rounded-lg border-none outline-none  dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                    placeholder="Enter Your Input"
                  ></textarea>
                  </div>
                </>
                ) : (
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {tabContent[key]}
                  </p>
                </>
                )
              )
              : (
              <>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {tabContent[key]}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Iobox.propTypes = {
  tabs: PropTypes.array,
  name: PropTypes.string
}

export default Iobox;
