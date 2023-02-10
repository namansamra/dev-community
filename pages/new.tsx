import Editor from '@/components/Editor';
import React, { useRef } from 'react';

function NewPost() {
  const ref: React.MutableRefObject<any> = useRef();
  return (
    <div className="">
      <div className="flex flex-col w-full">
        <div className="flex item-center gap-2">
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default NewPost;
