import { Button, Flex, HStack, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import HeartEmpty from '@/assets/images/heart.svg';
import Comment from '@/assets/images/comment.svg';
import SavedFilled from '@/assets/images/save-filled.svg';
import SavedEmpty from '@/assets/images/save.svg';
import { Post } from '@/types';
import { useRouter } from 'next/router';
import { useSessionCustom } from '@/lib/next-auth-react-query';
import { useMutation } from 'react-query';
import { savePost } from '@/lib/commonApi';

function Post({ postData }: { postData: Post }) {
  const router = useRouter();
  const { session } = useSessionCustom();
  const user = session?.user;
  const handleActionButtons = () => {
    router.push(`/post/${postData.id}`);
  };
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const value = user?.savedPostsId?.some((i: any) => i == postData.id);
    setIsSaved(value);
  }, [postData, user?.savedPostsId]);

  const { mutate: savePostHandler } = useMutation(
    ['save-post', postData.id],
    (e: any) => savePost(postData.id, { value: !isSaved }),
    {
      onSuccess: () => {
        setIsSaved((prev) => !prev);
      },
    }
  );

  return (
    <div className="flex flex-col border-grey-300 bg-white border-[1px] rounded-md w-full">
      {postData.coverImage && (
        <Image
          src={postData.coverImage}
          alt={'post-image'}
          width="650"
          height={'275'}
          className="rounded-md rounded-b-none w-full"
        />
      )}
      <div className="flex flex-col p-4 rounded-md rounded-t-none justify-start">
        <HStack>
          <Image
            src={postData.author.image}
            height="32"
            width={'32'}
            alt="user-image"
            className="rounded-full"
          />
          <VStack alignItems={'start'}>
            <Button
              variant={'ghost'}
              className="text-sm text-grey-800 m-0 p-0 h-max"
            >
              {postData.author.name}
            </Button>
            <span className="text-grey-500 text-xs !mt-0">
              {new Date(postData.createdAt).toDateString()}
            </span>
          </VStack>
        </HStack>
        <div className="flex flex-col gap-2 w-full md:pl-10 mt-4">
          <h2
            className="text-[20px] leading-[25px] md:leading-[45px] md:text-[30px] text-grey-800 font-bold break-words cursor-pointer hover:underline hover:text-primaryBlue"
            onClick={() => router.push(`/post/${postData.id}`)}
          >
            {postData.title}
          </h2>
          <Flex gap={'5px'}>
            {postData.tags.map((tag, i) => (
              <Button
                variant={'ghost'}
                key={i}
                className="p-1 h-max w-max text-sm border-[1px] border-grey-100 font-normal px-2"
              >
                {tag}
              </Button>
            ))}
          </Flex>

          <Flex className="justify-between items-center">
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
                onClick={handleActionButtons}
              >
                {postData.likes}{' '}
                <span className="hidden md:block ml-1">Reactions</span>
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
                onClick={handleActionButtons}
              >
                {postData.comments.length}
                <span className="hidden md:block ml-1">Comments</span>
              </Button>
            </HStack>

            <HStack>
              <span className="text-grey-600 text-xs">4 min read</span>
              <Button variant={'ghost'} p="2" onClick={savePostHandler}>
                {isSaved ? (
                  <Image
                    src={SavedFilled}
                    width={25}
                    height={25}
                    alt="save-filled"
                  />
                ) : (
                  <Image
                    src={SavedEmpty}
                    width={25}
                    height={25}
                    alt="save-empty"
                  />
                )}
              </Button>
            </HStack>
          </Flex>
        </div>
      </div>
    </div>
  );
}

export default Post;
