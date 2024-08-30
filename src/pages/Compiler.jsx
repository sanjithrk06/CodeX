// React Hooks & Context Api
import { useState, useEffect } from 'react';
import { useCompiler } from '../context/Compiler';

// Page Components
import { CodeEditor, IOBox, TestCaseBox } from '../components/index';

// Resizable panels components
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';

const Compiler = () => {
  const [activeTab, setActiveTab] = useState('input');
  const [testCasePanelSize, setTestCasePanelSize] = useState({ minSize: 11, defaultSize: 11 });
  const { 
    isTestCase 
  } = useCompiler();

  const ioTabs = [
    { 
      id: 'input', 
      label: 'Input', 
      icon: (
        <svg width="16px" height="16px" className=' mr-2' viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="m 2.5 2 c -1.367188 0 -2.5 1.132812 -2.5 2.5 v 7 c 0 1.367188 1.132812 2.5 2.5 2.5 h 11 c 1.367188 0 2.5 -1.132812 2.5 -2.5 v -7 c 0 -1.367188 -1.132812 -2.5 -2.5 -2.5 z m 0 2 h 1 c 0.277344 0 0.5 0.222656 0.5 0.5 v 1 c 0 0.277344 -0.222656 0.5 -0.5 0.5 h -1 c -0.277344 0 -0.5 -0.222656 -0.5 -0.5 v -1 c 0 -0.242188 0.171875 -0.445312 0.398438 -0.488281 c 0.03125 -0.007813 0.066406 -0.011719 0.101562 -0.011719 z m 3 0 h 1 c 0.277344 0 0.5 0.222656 0.5 0.5 v 1 c 0 0.277344 -0.222656 0.5 -0.5 0.5 h -1 c -0.277344 0 -0.5 -0.222656 -0.5 -0.5 v -1 c 0 -0.277344 0.222656 -0.5 0.5 -0.5 z m 3 0 h 1 c 0.277344 0 0.5 0.222656 0.5 0.5 v 1 c 0 0.277344 -0.222656 0.5 -0.5 0.5 h -1 c -0.277344 0 -0.5 -0.222656 -0.5 -0.5 v -1 c 0 -0.277344 0.222656 -0.5 0.5 -0.5 z m 3 0 h 1 c 0.277344 0 0.5 0.222656 0.5 0.5 v 1 c 0 0.277344 -0.222656 0.5 -0.5 0.5 h -1 c -0.277344 0 -0.5 -0.222656 -0.5 -0.5 v -1 c 0 -0.277344 0.222656 -0.5 0.5 -0.5 z m -8 3 h 1 c 0.277344 0 0.5 0.222656 0.5 0.5 v 1 c 0 0.277344 -0.222656 0.5 -0.5 0.5 h -1 c -0.277344 0 -0.5 -0.222656 -0.5 -0.5 v -1 c 0 -0.277344 0.222656 -0.5 0.5 -0.5 z m 3 0 h 1 c 0.277344 0 0.5 0.222656 0.5 0.5 v 1 c 0 0.277344 -0.222656 0.5 -0.5 0.5 h -1 c -0.277344 0 -0.5 -0.222656 -0.5 -0.5 v -1 c 0 -0.277344 0.222656 -0.5 0.5 -0.5 z m 3 0 h 1 c 0.277344 0 0.5 0.222656 0.5 0.5 v 1 c 0 0.277344 -0.222656 0.5 -0.5 0.5 h -1 c -0.277344 0 -0.5 -0.222656 -0.5 -0.5 v -1 c 0 -0.277344 0.222656 -0.5 0.5 -0.5 z m 3 0 h 1 c 0.277344 0 0.5 0.222656 0.5 0.5 v 1 c 0 0.277344 -0.222656 0.5 -0.5 0.5 h -1 c -0.277344 0 -0.5 -0.222656 -0.5 -0.5 v -1 c 0 -0.277344 0.222656 -0.5 0.5 -0.5 z m -10 3 h 1 c 0.277344 0 0.5 0.222656 0.5 0.5 v 1 c 0 0.277344 -0.222656 0.5 -0.5 0.5 h -1 c -0.277344 0 -0.5 -0.222656 -0.5 -0.5 v -1 c 0 -0.277344 0.222656 -0.5 0.5 -0.5 z m 3 0 h 4 c 0.277344 0 0.5 0.222656 0.5 0.5 v 1 c 0 0.277344 -0.222656 0.5 -0.5 0.5 h -4 c -0.277344 0 -0.5 -0.222656 -0.5 -0.5 v -1 c 0 -0.277344 0.222656 -0.5 0.5 -0.5 z m 6 0 h 1 c 0.277344 0 0.5 0.222656 0.5 0.5 v 1 c 0 0.277344 -0.222656 0.5 -0.5 0.5 h -1 c -0.277344 0 -0.5 -0.222656 -0.5 -0.5 v -1 c 0 -0.277344 0.222656 -0.5 0.5 -0.5 z m 0 0" fill="#6b7280"/>
        </svg>
      )
    },
    { 
      id: 'output', 
      label: 'Output', 
      icon: (
        <svg width="16px" height="16px" className=' mr-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 21H17M3 13H21M10 17L9 21M14 17L15 21M6.2 17H17.8C18.9201 17 19.4802 17 19.908 16.782C20.2843 16.5903 20.5903 16.2843 20.782 15.908C21 15.4802 21 14.9201 21 13.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.71569 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3H6.2C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.07989 3 6.2V13.8C3 14.9201 3 15.4802 3.21799 15.908C3.40973 16.2843 3.71569 16.5903 4.09202 16.782C4.51984 17 5.07989 17 6.2 17Z" stroke="#6b7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      ) 
    }        
  ];

  const testCaseTab = [
    { 
      id: 'testCase', 
      label: 'Test Case', 
      icon: (
        <svg className="w-6 h-6 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 19H8c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3h5a1 1 0 1 1 0 2H8c-.552 0-1 .449-1 1v8c0 .551.448 1 1 1h8c.552 0 1-.449 1-1v-3a1 1 0 1 1 2 0v3c0 1.654-1.346 3-3 3zm-2.834-4.167c-.35 0-.689-.139-.941-.391l-2.668-2.667a1.334 1.334 0 0 1 1.887-1.885l1.416 1.417 3.475-5.455a1.334 1.334 0 1 1 2.332 1.294l-4.334 7a1.332 1.332 0 0 1-.98.673l-.187.014z"/>
        </svg>
      ) 
    }
  ];

  // To adjust the testcase box size
  useEffect(() => {
    if (isTestCase) {
      setTestCasePanelSize({ minSize: 35, defaultSize: 45, maxSize: 50 });
    } else {
      setTestCasePanelSize({ minSize: 11, defaultSize: 11, maxSize: 11 });
    }
  }, [isTestCase]);

  return (
    <>
      <PanelGroup direction="horizontal" className='h-[90vh] bg-primary' >
        <Panel minSize={45} order={1} defaultSize={55}>
          <div>
            <CodeEditor setActiveTab={setActiveTab} />
          </div>
        </Panel>
        <PanelResizeHandle className='flex w-px items-center justify-center bg-tertiary-bdr'>
          <div className='z-10 flex h-6 w-4 items-center justify-center rounded-md border bg-tertiary-700 border-primary'>
            <DragHandleDots2Icon className='h-4 w-4' />
          </div>
        </PanelResizeHandle>
        <Panel minSize={25} order={2} className='h-[90vh]'>
          <PanelGroup direction="vertical">
            <Panel minSize={50} order={1} defaultSize={50}>
              <div>
                <IOBox tabs={ioTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>
            </Panel>
            <PanelResizeHandle className='flex h-px items-center justify-center bg-tertiary-bdr'>
              <div className='z-10 flex h-4 w-6 items-center justify-center rounded-md border bg-tertiary-700 border-primary'>
                <DragHandleDots2Icon className='rotate-90 h-4 w-4' />
              </div>
            </PanelResizeHandle>
            <Panel minSize={testCasePanelSize.minSize} order={2} maxSize={testCasePanelSize.maxSize} defaultSize={45}>
              <div>
                <TestCaseBox tabs={testCaseTab} activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </>
  );
};

export default Compiler;
