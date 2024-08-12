import React from 'react'

import Iobox from './iobox';
import CodeEditor from './CodeEditor';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';


const Compiler = () => {
  return (
    <>
    <PanelGroup autoSaveId="persistence" direction="horizontal">
        <Panel minSize={25} order={1} defaultSize={50} >
            <CodeEditor />
        </Panel>
        <PanelResizeHandle className='flex w-px items-center justify-center bg-gray-800'>
            <div className='z-10 flex h-6 w-4 items-center justify-center rounded-md border bg-gray-500 border-gray-950'>
                <DragHandleDots2Icon className='h-4 w-4' />
            </div>
        </PanelResizeHandle>
        <Panel minSize={25} order={2} defaultSize={50} >
            <PanelGroup direction="vertical">
                <Panel minSize={35} order={1} defaultSize={70}>
                    <Iobox />
                </Panel>
                <PanelResizeHandle className='flex h-px items-center justify-center bg-gray-800'>
                    <div className='z-10 flex h-4 w-6 items-center justify-center rounded-md border bg-gray-500 border-gray-950'>
                        <DragHandleDots2Icon className=' rotate-90 h-4 w-4' />
                    </div>
                </PanelResizeHandle>
                <Panel minSize={15} order={2} defaultSize={30}>
                    <Iobox />
                </Panel>
            </PanelGroup>
        </Panel>
    </PanelGroup>
    </>
  )
}

export default Compiler