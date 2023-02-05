import Header from '@/components/Header';
import { SideBarLinksComponent } from '@/components/Sidebar';

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex w-screen border-2 border-cyan p-2 sm:px-4 md:px-10 lg:px-[100px]">
        <div className="flex-col gap-[4px] w-[250px] hidden md:block h-[100vh] overflow-y-scroll">
          <SideBarLinksComponent />
        </div>
      </div>
    </>
  );
}
