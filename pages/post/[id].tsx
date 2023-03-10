import Header from '@/components/Header';
import {
  followUser,
  getDetailedPost,
  likePost,
  savePost,
} from '@/lib/commonApi';
import { Button, Icon } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { useMutation, useQuery } from 'react-query';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import remarkGfm from 'remark-gfm';
import { useEffect, useState } from 'react';
import HeartFilled from '@/assets/images/heart-filled.svg';
import HeartEmpty from '@/assets/images/heart.svg';
import Comment from '@/assets/images/comment.svg';
import SavedFilled from '@/assets/images/save-filled.svg';
import SavedEmpty from '@/assets/images/save.svg';
import { useSessionCustom } from '@/lib/next-auth-react-query';

function PostDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isAuthorFollowed, setIsAuthorFollowed] = useState(false);
  const { session } = useSessionCustom();

  const { isLoading, data, error, refetch } = useQuery(
    ['post-details', id],
    () => {
      return getDetailedPost(id as string);
    }
  );

  const postData = data?.data?.data?.post;

  const { mutate: likePostHandler } = useMutation(
    'like-post',
    () => likePost(id as string, { value: !isLiked }),
    {
      onSuccess: () => {
        refetch();
        setIsLiked((prev) => !prev);
      },
    }
  );

  const { mutate: savePostHandler } = useMutation(
    ['save-post', id],
    () => savePost(id as string, { value: !isSaved }),
    {
      onSuccess: () => {
        refetch();
        setIsSaved((prev) => !prev);
      },
    }
  );

  const { mutate: followUserHandler } = useMutation(
    ['follow-user', postData?.authorId],
    () =>
      followUser(postData?.authorId as string, { value: !isAuthorFollowed }),
    {
      onSuccess: () => {
        setIsAuthorFollowed((prev) => !prev);
      },
    }
  );

  useEffect(() => {
    if (session?.user) {
      const userAlreadyLiked = session?.user?.likedPosts?.some(
        (p: any) => p.id == id
      );
      if (userAlreadyLiked) {
        setIsLiked(userAlreadyLiked);
      }

      const userAlreadySaved = session?.user?.savedPostsId?.some(
        (postId: any) => postId == id
      );
      console.log(userAlreadySaved, 'save hu');

      if (userAlreadySaved) {
        setIsSaved(userAlreadySaved);
      }

      const authorAlreadyFollowed = session?.user?.following?.some(
        (userId: any) => userId == postData?.authorId
      );

      if (authorAlreadyFollowed) {
        setIsAuthorFollowed(authorAlreadyFollowed);
      }
    }
  }, [session, id, data?.data?.data?.post]);

  console.log(postData);

  return (
    <div className="flex flex-col w-screen relative">
      <Header />
      {isLoading ? (
        <div className="bg-black text-white text-2xl">Loading...</div>
      ) : (
        <div className="flex justify-between mt-[80px] sm:px-4 md:px-6 xl:mx-[80px] xl:px-0 gap-4">
          <div className="flex-col h-max justify-center items-center gap-6 w-[50px] hidden sm:flex py-20">
            <Button
              onClick={() => likePostHandler()}
              variant={'unstyled'}
              className="text-sm text-grey-500 flex-col justify-center items-center "
            >
              {isLiked ? (
                <Image
                  src={HeartFilled}
                  width={25}
                  height={25}
                  alt="heart-filled"
                />
              ) : (
                <Image
                  src={HeartEmpty}
                  width={25}
                  height={25}
                  alt="heart-empty"
                />
              )}
              {postData?.likes}
            </Button>
            <Button
              onClick={() => setIsLiked((prev) => !prev)}
              variant={'unstyled'}
              className="text-sm text-grey-500 flex-col justify-center items-center "
            >
              <Image src={Comment} width={25} height={25} alt="comment" />
              {postData?.comments?.length}
            </Button>
            <Button
              variant={'unstyled'}
              onClick={() => savePostHandler()}
              className="text-sm text-grey-500 flex-col justify-center items-center "
            >
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
              {postData?.saved}
            </Button>
          </div>
          <div className="flex-1 w-full lg:w-[650px] border-[1px] border-grey-300 rounded-lg bg-white">
            <Image
              src={postData?.coverImage}
              alt={'cover-image'}
              className="w-full rounded-t-md h-[350px]"
              width={800}
              height={350}
            />
            <div className="flex flex-col w-full px-16 py-8">
              <div className="w-full flex gap-2">
                <Image
                  src={postData?.author?.image}
                  alt={postData?.author?.name}
                  className="w-[40] h-[40] rounded-full"
                  width={40}
                  height={40}
                />
                <div className="flex flex-col leading-5">
                  <span className="text-md font-semibold text-grey-800">
                    {postData?.author?.name}
                  </span>
                  <span className="text-sm text-grey-400">
                    posted on {new Date(postData?.createdAt).toDateString()}
                  </span>
                </div>
              </div>
              <h2 className="text-5xl text-grey-800 font-[800] break-words mt-4 leading-tight">
                {postData?.title}
              </h2>
              <div className="flex gap-2 items-center">
                {postData?.tags?.map((item: any, i: number) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="text-grey-600 text-sm p-2 h-max font-normal"
                  >
                    #{item.name}
                  </Button>
                ))}
              </div>
              <ReactMarkdown
                components={ChakraUIRenderer()}
                remarkPlugins={[remarkGfm]}
                className="markdown-render"
              >
                {postData?.body}
              </ReactMarkdown>
            </div>
          </div>
          <div className="w-[350px] h-max hidden lg:block rounded-md border-[1px] border-grey-200 border-t-[40px] border-t-black relative p-6 pb-10 bg-grey-50">
            <div className="flex items-end gap-2 absolute top-[-10px] left-5">
              <Image
                src={postData?.author?.image}
                alt="user-image"
                width={50}
                height={50}
                className="rounded-full h-[50px] w-[50px]"
              />
              <span className="text-xl font-bold text-grey-800">
                {postData?.author?.name}
              </span>
            </div>
            <div className="flex flex-col gap-4 w-full mt-10">
              {postData?.authorId === session?.user?.id ? (
                <Button
                  variant={'primary'}
                  className="w-full"
                  onClick={() => {
                    router.push('/profile');
                  }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  variant={isAuthorFollowed ? 'outline' : 'primary'}
                  className="w-full"
                  onClick={() => followUserHandler()}
                >
                  {isAuthorFollowed ? 'Following' : 'Follow'}
                </Button>
              )}
              <div className="text-grey-500 text-md">
                {postData?.author?.bio}
              </div>
              <div className="flex flex-col w-full gap-1">
                <span className="text-xs text-grey-700 font-bold">JOINED</span>
                <span className="text-sm">
                  {new Date(postData?.author?.createdAt).toDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
