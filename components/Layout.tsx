import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import Header from './Header';
import Post from './Post';
import { SideBarLinksComponent } from './Sidebar';

const discussSection = [
  {
    text: 'Will ChatGPT break internet',
    isNew: false,
    comments: '4',
  },
  {
    text: 'What was your win this week?',
    isNew: false,
    comments: '5',
  },
  {
    text: 'Share your ChatGPT cringe moments 👇 🤖🧠',
    isNew: false,
    comments: '1',
  },
  {
    text: 'React vs Svelte',
    isNew: false,
    comments: '6',
  },
  {
    text: '🍀What is the difference between the algorithm and technique? 🍁',
    isNew: false,
    comments: '10',
  },
];

function Layout() {
  return (
    <div className="flex flex-col w-screen relative">
      <Header />
      <div className="mt-[80px] px-2 sm:px-4 md:px-6 xl:mx-[80px] xl:px-0 relative flex gap-2">
        <div className="flex-col gap-[4px] w-[250px] hidden md:block h-[100vh] overflow-y-scroll">
          <SideBarLinksComponent />
        </div>
        <div className="flex flex-col w-full lg:w-[650px]  gap-4">
          <Post />
          <Post />
          <Post />
        </div>
        <aside className="flex-col max-w-[350px] ml-4 h-max hidden lg:block bg-grey-50 rounded-md">
          <div className="p-4 cursor-pointer text-grey-800 text-lg font-bold hover:text-primaryBlue">
            #discuss
          </div>

          {discussSection.map((item, i) => (
            <Link href={'/new'} key={i}>
              <div className="flex flex-col gap-[2px] p-6 px-4 w-full text-grey-800 text-base hover:text-primaryBlue hover:bg-white border-t-[1px] border-grey-100">
                <span>{item.text}</span>
                <span className="text-[14px] text-grey-600">
                  {item.comments} comments
                </span>
              </div>
            </Link>
          ))}
        </aside>
      </div>
    </div>
  );
}

export default Layout;
