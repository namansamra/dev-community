import Editor from '@/components/Editor';
import React, { useRef, useState } from 'react';

function NewPost() {
  const [selectedView, setSelectedView] = useState<'edit' | 'preview'>('edit');
  return (
    <div className="flex flex-col gap-2 w-full h-screen">
      <div className="flex mx-auto">
        <Editor selectedView={selectedView} setSelectedView={setSelectedView} />
      </div>
    </div>
  );
}

export default NewPost;
