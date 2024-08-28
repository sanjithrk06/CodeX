import React, { useState } from 'react';
import { CodeEditor, IOBox, TestCaseBox } from './index';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';

const Compiler = () => {
  const [activeTab, setActiveTab] = useState('input');

  const ioTabs = [
      { 
        id: 'input', 
        label: 'Input', 
        icon: (
          <svg className="w-6 h-6 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 11h-7.586l2.293-2.293a1 1 0 0 0-1.414-1.414l-4 4a1 1 0 0 0 0 1.414l4 4a1 1 0 1 0 1.414-1.414L11.414 13H19a1 1 0 1 0 0-2z"/>
          </svg>
        )
      },
      { 
        id: 'output', 
        label: 'Output', 
        icon: (
          <svg className="w-6 h-6 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 13h7.586l-2.293 2.293a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414l-4-4a1 1 0 0 0-1.414 1.414L12.586 11H5a1 1 0 0 0 0 2z"/>
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

  return (
    <>
    <PanelGroup autoSaveId="persistence" direction="horizontal" className=' h-[90vh]'>
      <Panel minSize={45} order={1} defaultSize={65} >
        <div  >
          <CodeEditor setActiveTab={setActiveTab} />
        </div>
      </Panel>
      <PanelResizeHandle className='flex w-px items-center justify-center bg-gray-800'>
        <div className='z-10 flex h-6 w-4 items-center justify-center rounded-md border bg-gray-500 border-gray-950'>
          <DragHandleDots2Icon className='h-4 w-4' />
        </div>
      </PanelResizeHandle>
      <Panel minSize={25} order={2} className=' h-[90vh]'>
        <PanelGroup direction="vertical">
            <Panel minSize={50} order={1} defaultSize={89} >
              <div  >
                <IOBox tabs={ioTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>
            </Panel>
            <PanelResizeHandle className='flex h-px items-center justify-center bg-gray-800'>
              <div className='z-10 flex h-4 w-6 items-center justify-center rounded-md border bg-gray-500 border-gray-950'>
                <DragHandleDots2Icon className=' rotate-90 h-4 w-4' />
              </div>
            </PanelResizeHandle>
            <Panel minSize={11} order={2} defaultSize={11}>
              <div >
                <TestCaseBox tabs={testCaseTab} activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>
            </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
    </>
  )
}

export default Compiler;
