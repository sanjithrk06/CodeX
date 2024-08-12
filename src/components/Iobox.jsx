import React, { useState } from 'react';

const Iobox = () => {
  const [activeTab, setActiveTab] = useState('input');

  const tabs = [
    { 
      id: 'input', 
      label: 'Input', 
      icon: (
        <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 11h-7.586l2.293-2.293a1 1 0 0 0-1.414-1.414l-4 4a1 1 0 0 0 0 1.414l4 4a1 1 0 1 0 1.414-1.414L11.414 13H19a1 1 0 1 0 0-2z"/>
        </svg>
      )
    },
    { 
      id: 'output', 
      label: 'Output', 
      icon: (
        <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5 13h7.586l-2.293 2.293a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414l-4-4a1 1 0 0 0-1.414 1.414L12.586 11H5a1 1 0 0 0 0 2z"/>
        </svg>
      ) 
    },
    { 
      id: 'testCase', 
      label: 'Test Case', 
      icon: (
        <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 19H8c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3h5a1 1 0 1 1 0 2H8c-.552 0-1 .449-1 1v8c0 .551.448 1 1 1h8c.552 0 1-.449 1-1v-3a1 1 0 1 1 2 0v3c0 1.654-1.346 3-3 3zm-2.834-4.167c-.35 0-.689-.139-.941-.391l-2.668-2.667a1.334 1.334 0 0 1 1.887-1.885l1.416 1.417 3.475-5.455a1.334 1.334 0 1 1 2.332 1.294l-4.334 7a1.332 1.332 0 0 1-.98.673l-.187.014z"/>
        </svg>
      ) 
    }
  ];

  const tabContent = {
    input: 'Enter a valid input.',
    output: 'This is the output.',
    testCase: 'Testcase has not been passed.'
  };

  return (
    <div className='m-4'>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {tabs.map((tab) => (
            <li key={tab.id} className="me-2">
              <button
                className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${activeTab === tab.id ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group'}`}
                onClick={() => setActiveTab(tab.id)}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                {tab.icon}
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {Object.keys(tabContent).map((key) => (
          <div
            key={key}
            className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab === key ? 'block' : 'hidden'}`}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {tabContent[key]} Clicking another tab will toggle the visibility of this one for the next.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Iobox;
