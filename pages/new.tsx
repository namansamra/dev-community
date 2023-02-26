import Editor from '@/components/Editor';
import React, { useRef, useState } from 'react';

function NewPost() {
  const [selectedView, setSelectedView] = useState<'edit' | 'preview'>('edit');
  return (
    <div className="flex flex-col gap-2 w-full h-screen">
      <div className="flex mx-auto gap-4">
        <Editor selectedView={selectedView} setSelectedView={setSelectedView} />
        <div className="flex flex-col border-primaryBlue w-[350px] mt-16 gap-4 p-2 pt-20">
          <h2 className="text-xl font-semibold text-grey-800">
            Writing a Great Post Title
          </h2>
          <span className="text-grey-500 text-base">
            Think of your post title as a super short (but compelling!)
            description — like an overview of the actual post in one short
            sentence. Use keywords where appropriate to help ensure people can
            find your post by search.
          </span>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
