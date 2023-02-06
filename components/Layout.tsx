import React from 'react';
import Header from './Header';
import { SideBarLinksComponent } from './Sidebar';

function Layout() {
  return (
    <div className="flex flex-col w-screen relative">
      <Header />
      <div className="mt-[80px] px-2 sm:px-4 md:px-6 xl:mx-[80px] xl:px-0 relative flex gap-2">
        <div className="flex-col gap-[4px] w-[250px] hidden md:block h-[100vh] overflow-y-scroll">
          <SideBarLinksComponent />
        </div>
        <div className="flex flex-col w-full lg:w-[60%] h-[1000px] border-2 border-primaryBlue"></div>
        <div className="flex-col w-[30%] h-[600px] hidden lg:block border-2 border-grey-300"></div>
      </div>
    </div>
  );
}

export default Layout;
