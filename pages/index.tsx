import Header from '@/components/Header';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import { SideBarLinksComponent } from '@/components/Sidebar';
import { api } from '@/lib/apiClient';
import { getAllPosts } from '@/lib/commonApi';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

export default function Home() {
  const [postsArr, setPostsArr] = useState([]);
  const { isLoading, data, error } = useQuery('get-posts', getAllPosts);
  const posts = data?.data.data.posts;
  console.log(posts);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <div className="flex flex-col w-full lg:w-[650px]  gap-4">
        {posts.map((post: any) => (
          <Post key={post.id} postData={post} />
        ))}
      </div>
    </Layout>
  );
}
