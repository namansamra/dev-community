import { Button, Flex, HStack, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import HeartEmpty from '@/assets/images/heart.svg';
import Comment from '@/assets/images/comment.svg';
import Save from '@/assets/images/save.svg';

function Post() {
  return (
    <div className="flex flex-col border-grey-300 bg-white border-[1px] rounded-md w-full">
      <Image
        src={
          'https://res.cloudinary.com/practicaldev/image/fetch/s--IIDpjQAP--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/c7fmu14cvmpp1ws1d7ss.jpg'
        }
        alt={'post-image'}
        width="650"
        height={'275'}
        className="rounded-md rounded-b-none w-full"
      />
      <div className="flex flex-col p-4 rounded-md rounded-t-none justify-start">
        <HStack>
          <Image
            src={
              'https://res.cloudinary.com/practicaldev/image/fetch/s--JxpSE_U3--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1023197/1eac8764-2daf-4dee-a404-6184b8befcd7.jpeg'
            }
            height="32"
            width={'32'}
            alt="user-image"
            className="rounded-full"
          />
          <VStack>
            <Button
              variant={'ghost'}
              className="text-sm text-grey-800 m-0 p-0 h-max"
            >
              Naman Samra
            </Button>
            <span className="text-grey-500 text-xs !mt-0">
              {new Date().toDateString()}
            </span>
          </VStack>
        </HStack>
        <div className="flex flex-col gap-2 w-full md:pl-10 mt-4">
          <h2 className="text-[20px] leading-[25px] md:leading-[45px] md:text-[30px] text-grey-800 font-bold break-words ">
            VS Code Setup for Frontend Devs
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
                5 <span className="hidden md:block ml-1">Reactions</span>
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
                2 <span className="hidden md:block ml-1">Comments</span>
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
