import { Button, HStack, Input, Textarea } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useState } from 'react';
import HeartEmpty from '@/assets/images/heart.svg';
import HeartFilled from '@/assets/images/heart-filled.svg';
import Comment from '@/assets/images/comment.svg';
import { useSessionCustom } from '@/lib/next-auth-react-query';
import { useMutation, useQueryClient } from 'react-query';
import { createComment } from '@/lib/commonApi';

type Props = {
  commentData: any;
  postId: string;
};

type CommentsProps = {
  comments: any[];
  postId: string;
};

type CommentInputProps = {
  value: string;
  setValue: (val: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

const CommentInputField = ({
  value,
  setValue,
  onSubmit,
  onCancel,
}: CommentInputProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Textarea
        className="w-full min-h-[100px]"
        placeholder="Reply..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <HStack>
        <Button
          className="text-sm font-normal h-max p-2 text-white px-4"
          variant="primary"
          isDisabled={value.length == 0}
          onClick={onSubmit}
        >
          Submit
        </Button>
        <Button
          className="text-sm font-normal h-max p-2 text-grey-700 px-4"
          variant="ghost"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </HStack>
    </div>
  );
};

function SingleComment({ commentData, postId }: Props) {
  const [isLiked, setIsLiked] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const { session } = useSessionCustom();
  const queryClient = useQueryClient();
  const { mutate: submitReplyHandler } = useMutation(
    'create-reply-comment',
    createComment,
    {
      onSuccess: () => {
        queryClient.refetchQueries('post-details');
        setReplyText('');
        setShowInput(false);
      },
    }
  );

  return (
    <div className="flex gap-2 w-full items-start p-4">
      <Image
        src={commentData?.author?.image}
        alt={'comment-author'}
        height={40}
        width={40}
        className="rounded-full h-[40px] w-[40px] mt-4 "
        style={{ border: '1px solid #e9e9e9' }}
      />
      <div className="flex flex-col w-full gap-2 bg-white">
        <div className="flex flex-col gap-2 w-full ">
          <div className="flex flex-col gap-2 w-full border-[1px] rounded-md border-grey-100 p-4 relative">
            <Button
              variant={'ghost'}
              onClick={() => {}}
              className="text-base text-grey-900 w-max p-1 h-max"
            >
              {commentData?.author?.name}
            </Button>
            <span className="text-lg text-grey-800 break-words">
              {commentData?.content}
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <HStack>
              <Button
                className="text-sm font-normal h-max p-2 text-grey-700"
                leftIcon={
                  <Image
                    src={isLiked ? HeartFilled : HeartEmpty}
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
                onClick={() => setShowInput((prev) => !prev)}
              >
                <span className="hidden md:block ml-1">Reply</span>
              </Button>
            </HStack>
          </div>
        </div>
        {showInput && (
          <CommentInputField
            value={replyText}
            setValue={setReplyText}
            onSubmit={() =>
              submitReplyHandler({
                content: replyText,
                parentCommentId: commentData?.id,
                postId: postId,
              })
            }
            onCancel={() => setShowInput(false)}
          />
        )}
      </div>
    </div>
  );
}

function CommentRenderer({ comments, postId }: CommentsProps) {
  let items = comments?.map((comment, i) => {
    return (
      <div className={`pl-6 margin-t-${i + 20}px`} key={i}>
        <SingleComment commentData={comment} postId={postId} />
        {comment.childComments && (
          <CommentRenderer comments={comment.childComments} postId={postId} />
        )}
      </div>
    );
  });

  return <div className="flex flex-col gap-2">{items}</div>;
}

export default CommentRenderer;
