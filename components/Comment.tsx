import { Button, HStack, Input, Textarea } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import HeartEmpty from "@/assets/images/heart.svg";
import HeartFilled from "@/assets/images/heart-filled.svg";
import Comment from "@/assets/images/comment.svg";
import { useMutation, useQueryClient } from "react-query";
import { createComment, likeComment } from "@/lib/commonApi";
import { useSessionCustom } from "@/lib/next-auth-react-query";

type Props = {
  commentData: any;
  postId: string;
};

type CommentsProps = {
  comments: any[];
  postId: string;
  userImageLink?: string;
};

type CommentInputProps = {
  value: string;
  setValue: (val: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  userImageLink?: string;
  placeHolder?: string;
};

const CommentInputField = ({
  value = "",
  setValue = () => {},
  onSubmit = () => {},
  onCancel = () => {},
  userImageLink = "",
  placeHolder = "Reply...",
}: CommentInputProps) => {
  return (
    <div className="flex gap-4 w-full">
      {userImageLink && (
        <Image
          src={userImageLink}
          alt={"comment-author"}
          height={40}
          width={40}
          className="rounded-full h-[40px] w-[40px] mt-4 "
          style={{ border: "1px solid #e9e9e9" }}
        />
      )}
      <div className="flex flex-col gap-2 w-full">
        <Textarea
          className="w-full min-h-[100px] border-[1px] border-grey-200"
          placeholder={placeHolder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <HStack>
          <Button
            className="text-sm font-normal h-max p-2 text-white px-4"
            variant="primary"
            isDisabled={value?.length == 0}
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
    </div>
  );
};

function SingleComment({ commentData, postId }: Props) {
  const { session } = useSessionCustom();
  const [isLiked, setIsLiked] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log(
      session,
      "heeello",
      commentData,
      session?.user?.likedCommentsId?.some((i: string) => i == commentData.id)
    );
    if (session?.user) {
      setIsLiked(
        session.user.likedCommentsId.some((i: string) => i == commentData.id)
      );
    }
  }, [session?.user?.likedCommentsId, commentData]);

  const { mutate: submitReplyHandler } = useMutation(
    "create-reply-comment",
    createComment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post-details", postId]);
        setReplyText("");
        setShowInput(false);
      },
    }
  );
  const { mutate: likeCommentHandler } = useMutation(
    "like-comment",
    () => likeComment(commentData?.id, { value: !isLiked }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post-details", postId]);
        queryClient.invalidateQueries("session");
        setIsLiked(!isLiked);
      },
    }
  );
  return (
    <div className="flex gap-2 w-full items-start p-4 py-2">
      <Image
        src={commentData?.author?.image}
        alt={"comment-author"}
        height={40}
        width={40}
        className="rounded-full h-[40px] w-[40px] mt-4 "
        style={{ border: "1px solid #e9e9e9" }}
      />
      <div className="flex flex-col w-full gap-2 bg-white">
        <div className="flex flex-col gap-2 w-full ">
          <div className="flex flex-col gap-2 w-full border-[1px] rounded-md border-grey-200 p-4 relative">
            <Button
              variant={"ghost"}
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
                onClick={() => {
                  likeCommentHandler();
                }}
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
      <div className={`pl-10`} key={i}>
        <SingleComment commentData={comment} postId={postId} />
        {comment.childComments && (
          <CommentRenderer comments={comment.childComments} postId={postId} />
        )}
      </div>
    );
  });

  return <>{items}</>;
}

function CommentSection({ comments, postId, userImageLink }: CommentsProps) {
  const [commentValue, setCommentValue] = useState("");
  const queryClient = useQueryClient();
  const { mutate: submitComment } = useMutation(
    "create-main-comment",
    createComment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post-details", postId]);
        setCommentValue("");
      },
    }
  );

  return (
    <div className="flex flex-col gap-2 border-t-[1px] border-grey-100 pt-5">
      <div className="pl-12 pr-4">
        <CommentInputField
          onSubmit={() => {
            submitComment({
              content: commentValue,
              postId: postId,
            });
          }}
          onCancel={() => {}}
          value={commentValue}
          setValue={setCommentValue}
          userImageLink={userImageLink}
          placeHolder="Add to discussion..."
        />
      </div>
      <div className="flex flex-col">
        <CommentRenderer comments={comments} postId={postId} />
      </div>
    </div>
  );
}

export default CommentSection;
