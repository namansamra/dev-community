import { Button, Flex, HStack, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import HeartEmpty from '@/assets/images/heart.svg';
import Comment from '@/assets/images/comment.svg';
import Save from '@/assets/images/save.svg';
import { Post } from '@/types';
import { useRouter } from 'next/router';

function Post({ postData }: { postData: Post }) {
  const router = useRouter();
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
            {Array(4)
              .fill(-1)
              .map((item, i) => (
                <Button
                  variant={'ghost'}
                  key={i}
                  className="p-1 h-max w-max text-sm border-[1px] border-grey-100 font-normal px-2"
                >
                  #React
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
              >
                {postData.likes}
                <span className="hidden md:block ml-1">Comments</span>
              </Button>
            </HStack>

            <HStack>
              <span className="text-grey-600 text-xs">4 min read</span>
              <Button variant={'ghost'} p="2">
                <Image
                  src={Save}
                  height={20}
                  width={20}
                  alt="save"
                  className="opacity-70"
                />
              </Button>
            </HStack>
          </Flex>
        </div>
      </div>
    </div>
  );
}

export default Post;
