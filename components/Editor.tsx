import React, { useEffect, useRef, useState } from 'react';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { Button } from '@chakra-ui/react';
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function App() {
  const [value, setValue] = React.useState(
    'Hello Markdown! `Tab` key uses default behavior'
  );
  const [selectedView, setSelectedView] = useState<'edit' | 'preview'>('edit');
  const ref: React.MutableRefObject<any> = useRef();

  return (
    <div className="flex flex-col border-2 border-cyan gap-2">
      <div className="flex items-center justify-between w-full px-[20px] pt-[10px]">
        <h3>DEV</h3>
        <div className="flex items-center gap-2">
          <Button
            variant={'outline'}
            className={`bg-white ${
              selectedView == 'edit'
                ? 'border-primaryBlue border-[1px] text-primaryBlue'
                : ''
            }`}
            onClick={() => setSelectedView('edit')}
          >
            Edit
          </Button>
          <Button
            variant={'outline'}
            className={`bg-white ${
              selectedView == 'preview'
                ? 'border-primaryBlue border-[1px] text-primaryBlue'
                : ''
            }`}
            onClick={() => setSelectedView('preview')}
          >
            Preview
          </Button>
        </div>
      </div>
      <MDEditor
        value={value}
        onChange={(val) => {
          setValue(val!);
        }}
        height={400}
        style={{ width: '850px', fontSize: '18px !important' }}
        toolbarHeight={56}
        preview={selectedView}
        ref={ref}
      />
    </div>
  );
}
