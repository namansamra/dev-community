import Header from "@/components/Header";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { SideBarLinksComponent } from "@/components/Sidebar";
import { api } from "@/lib/apiClient";
import { getAllPosts } from "@/lib/commonApi";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import HashLoader from "react-spinners/HashLoader";

export default function Home() {
  const { isLoading, data, error } = useQuery("get-posts", getAllPosts);
  const posts = data?.data.data.posts;
  if (isLoading) {
    return (
      <div className=" w-screen h-screen flex justify-center items-center p-5">
        <HashLoader color="#3B49DF" />
      </div>
    );
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
