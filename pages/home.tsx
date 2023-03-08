import Layout from '@/components/Layout';
import Post from '@/components/Post';
import React from 'react';

function home() {
  return (
    <Layout>
      <div className="flex flex-col w-full lg:w-[650px]  gap-4">Home hu</div>
    </Layout>
  );
}

home.auth = true;
export default home;
