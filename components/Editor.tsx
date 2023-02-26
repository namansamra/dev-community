import React, { useEffect, useRef, useState } from 'react';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import { Button, Input } from '@chakra-ui/react';
import Image from 'next/image';
import DEVLogo from '@/assets/images/dev-general-icon.png';
import UploadImage from '@/assets/images/image.svg';
import { IoMdClose } from 'react-icons/io';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import { createPost } from '@/lib/commonApi';
import { useSessionCustom } from '@/lib/next-auth-react-query';
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
  const files: File[] = [];
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index);
    if (file) {
      files.push(file);
    }
  }

  try {
    const formData = new FormData();
    formData.append('image', files[0]);
    const res = await fetch('http://localhost:3000/api/upload/image', {
      method: 'POST',
      body: formData,
    });
    const jsonres = await res.json();
    const insertedMarkdown = insertToTextArea(`![](${jsonres?.data?.url})`);
    if (!insertedMarkdown) {
      return;
    }
    setMarkdown(insertedMarkdown);
  } catch (error) {
    console.log(error);
  }
};

interface Props {
  selectedView: 'edit' | 'preview';
  setSelectedView: React.Dispatch<React.SetStateAction<'edit' | 'preview'>>;
}

export default function Editor({ selectedView, setSelectedView }: Props) {
  const [value, setValue] = React.useState(
    'Hello Markdown! `Tab` key uses default behavior'
  );
  const [title, setTitle] = useState('');

  const { mutate, isLoading, error, data } = useMutation(
    'create-post',
    createPost
  );
  const { session } = useSessionCustom();

  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex items-center justify-between pt-[10px] w-[850px]">
        <div className="flex items-center font-semibold">
          <Image
            src={DEVLogo}
            alt={'dev-logo'}
            className="h-[40px] w-[50px] rounded-[3px] mr-3"
          />
          <h2>Create Post</h2>
        </div>

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

          <Button
            className="absolute top-2 right-10"
            onClick={() => router.push('/')}
          >
            <IoMdClose size={20} />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4  pl-[80px] pb-10">
        <div className="flex flex-col w-[850px]  h-[600px] overflow-y-scroll rounded-lg relative">
          <div className="flex flex-col gap-4 w-full rounded-md shadow-sm shadow-grey-400 rounded-br-none rounded-bl-none bg-white p-10">
            <Button variant={'outline'} className="bg-white w-[200px]">
              Add Cover Image
            </Button>
            <Input
              variant={'unstyled'}
              placeholder="New post title here..."
              className="text-5xl font-bold"
              title={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input variant={'unstyled'} placeholder="Add upto 4 tags..." />
          </div>

          <div className="flex w-full relative">
            <MDEditor
              value={value}
              onChange={(val) => {
                setValue(val!);
              }}
              style={{
                width: '850px',
                fontSize: '18px !important',
                borderTop: '0px !important',
              }}
              visiableDragbar={false}
              enableScroll={false}
              toolbarHeight={56}
              preview={selectedView}
              onPaste={async (event) => {
                await onImagePasted(event.clipboardData, setValue);
              }}
              onDrop={async (event) => {
                await onImagePasted(event.dataTransfer, setValue);
              }}
            />
            <div className="flex items-center justify-center h-[30px] w-[30px] absolute right-[44%] top-3">
              {/* <Button className="bg-[#f6f6f6] h-[40px] w-[40px] p-2">
                <Image src={UploadImage} alt="upload" />
              </Button> */}
              {/** buttons can be added here */}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Button
            variant={'primary'}
            onClick={() =>
              mutate({
                slug: 'new-post-' + Math.random() * 100,
                title: title,
                body: value,
                coverImage:
                  'https://tkdodo.eu/blog/static/e7fe4197241e1f30c5b0b6f2bc497c64/bbe0c/mutations.jpg',
              })
            }
          >
            Publish
          </Button>
          <Button variant={'ghost'} className="hover:bg-[#d8dbf9] font-normal">
            Save Draft
          </Button>
        </div>
      </div>
    </div>
  );
}
