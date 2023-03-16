import { Button, HStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import HeartEmpty from '@/assets/images/heart.svg';
import Comment from '@/assets/images/comment.svg';

type Props = {
  commentData: any;
};

type CommentsProps = {
  comments: any[];
};
function SingleComment({ commentData }: Props) {
  return (
    <div className="flex gap-2 w-full items-start p-4">
      <Image
        src={commentData.author.image}
        alt={'comment-author'}
        height={40}
        width={40}
        className="rounded-full h-[40px] w-[40px] mt-4 "
        style={{ border: '1px solid #e9e9e9' }}
      />
      <div className="flex flex-col gap-2 w-full bg-white">
        <div className="flex flex-col gap-2 w-full border-[1px] rounded-md border-grey-100 p-4 relative">
          <Button
            variant={'ghost'}
            onClick={() => {}}
            className="text-base text-grey-900 w-max p-1 h-max"
          >
            {commentData.author.name}
          </Button>
          <span className="text-lg text-grey-800 break-words">
            {commentData.content}
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <HStack>
            <Button
              className="text-sm font-normal h-max p-2 text-grey-700"
              leftIcon={
                <Image
                  src={HeartEmpty}
                  alt="like"
                  height={20}
                  width={20}
                  className="opacity-70"
                />
              }
              variant="ghost"
              onClick={() => {}}
            >
              {commentData.likes}
              <span className="hidden md:block ml-1">Likes</span>
            </Button>
            <Button
              className="text-sm font-normal h-max p-2 text-grey-700"
              leftIcon={
                <Image
                  src={Comment}
                  alt="comment"
                  height={20}
                  width={20}
                  className="opacity-70"
                />
              }
              variant="ghost"
              onClick={() => {}}
            >
              <span className="hidden md:block ml-1">Reply</span>
            </Button>
          </HStack>
        </div>
      </div>
    </div>
  );
}

function CommentRenderer({ comments }: CommentsProps) {
  console.log(comments);
  let items = comments?.map((comment, i) => {
    return (
      <div className={`border-l pl-6 margin-t-${i + 20}px`} key={i}>
        <SingleComment commentData={comment} />
        {comment.childComments && (
          <CommentRenderer comments={comment.childComments} />
        )}
      </div>
    );
  });

  return <div className="flex flex-col gap-2">{items}</div>;
}

export default CommentRenderer;
