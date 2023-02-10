import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { Button } from '@chakra-ui/react';
import type { SetStateAction } from 'react';
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const insertToTextArea = (intsertString: string) => {
  const textarea = document.querySelector('textarea');
  if (!textarea) {
    return null;
  }

  let sentence = textarea.value;
  const len = sentence.length;
  const pos = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const front = sentence.slice(0, pos);
  const back = sentence.slice(pos, len);

  sentence = front + intsertString + back;

  textarea.value = sentence;
  textarea.selectionEnd = end + intsertString.length;

  return sentence;
};

const onImagePasted = async (
  dataTransfer: DataTransfer,
  setMarkdown: React.Dispatch<React.SetStateAction<string>>
) => {
  console.log('inside fun');
  const files: File[] = [];
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index);
    if (file) {
      files.push(file);
    }
  }

  try {
    const res: any = await fetch(
      'https://api.imgbb.com/1/upload?key=94f6d49f39909f732c07bfdb072b50e2',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: files[0],
      }
    );

    const insertedMarkdown = insertToTextArea(`![](${res?.data?.image?.url})`);
    if (!insertedMarkdown) {
      return;
    }
    setMarkdown(insertedMarkdown);
  } catch (error) {
    console.log(error);
  }
};

export default function App() {
  const [value, setValue] = React.useState(
    'Hello Markdown! `Tab` key uses default behavior'
  );
  const [selectedView, setSelectedView] = useState<'edit' | 'preview'>('edit');
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
        onPaste={async (event) => {
          await onImagePasted(event.clipboardData, setValue);
        }}
        onDrop={async (event) => {
          await onImagePasted(event.dataTransfer, setValue);
        }}
      />
    </div>
  );
}
