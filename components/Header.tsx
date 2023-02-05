import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { RiNotification3Line } from 'react-icons/ri';
import DevLogo from '@/assets/images/dev-general-icon.png';
import AnonymousUser from '@/assets/images/user-line.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSessionCustom } from '@/lib/next-auth-react-query';
import { signOut } from 'next-auth/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react';
import { SideDrawer } from './Sidebar';

const MenuItemsList = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Create Post',
    href: '/createpost',
  },
  {
    title: 'Reading List',
    href: '/reading-list',
  },
  {
    title: 'Settings',
    href: '/settings',
  },
];

const UserMenuButton = ({ user }: { user: any }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        className="rounded-full h-[40px] w-[40px] border-[1px] border-[#e8e8e8] p-0 "
      >
        <Image
          src={user.image ? user.image : AnonymousUser}
          alt="user"
          width={40}
          height={40}
          className="overflow-hidden rounded-full"
        />
      </MenuButton>
      <MenuList className="mt-1 border-[1px] border-[#e9e9e9] rounded-md shadow-md w-[250px]">
        <MenuItem>
          <Link href={'/signout-confirm'} className="flex flex-col w-full">
            <span className="font-semibold">{user.name}</span>
            <span>@{user.name}</span>
          </Link>
        </MenuItem>
        <MenuDivider />
        <MenuGroup>
          {MenuItemsList.map((item) => (
            <MenuItem key={item.title}>
              <Link href={item.href} className="w-full">
                {item.title}
              </Link>
            </MenuItem>
          ))}
        </MenuGroup>
        <MenuDivider />
        <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

const NoUserButtons = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        href={'/enter'}
        className="hidden md:block px-4 py-2 rounded-md hover:bg-[#EDF2F7]"
      >
        Login
      </Link>
      <Link
        href={'/enter?state=newuser'}
        className="min-w-[160px] w-[160px] border-[1px] border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white px-4 py-2 rounded-md font-semibold"
      >
        Create Account
      </Link>
    </div>
  );
};
function Header({ containerStyles = '' }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const { session, status } = useSessionCustom();
  console.log(session);
  const router = useRouter();
  return (
    <header className={`w-full ${containerStyles} bg-white`}>
      <div className="flex items-center p-2 z-50 w-full h-[56px] border-b-[1px] border-[#ede7e7] shadow-sm sm:px-4 md:px-10 lg:px-[100px] justify-between">
        <div className="flex items-center">
          <Button
            variant={'ghost'}
            p="4px"
            className="md:hidden mr-2"
            onClick={onOpen}
          >
            <AiOutlineMenu size={24} />
          </Button>
          <SideDrawer isOpen={isOpen} onClose={onClose} />
          <Image
            src={DevLogo}
            alt="DEV"
            className="h-[40px] w-[50px] rounded-[3px] mr-3"
          />

          <InputGroup className="hidden md:w-[400px] md:max-w-[500px] md:block">
            <Input
              placeholder="Search..."
              border={'1px solid #e8e8e8'}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputRightElement
              onClick={() =>
                searchTerm && router.push(`/search?q=${searchTerm}`)
              }
              className="cursor-pointer hover:bg-[#EDF2F7] rounded-md h-[38px] mt-[1px]"
            >
              <FiSearch size={22} />
            </InputRightElement>
          </InputGroup>
        </div>

        <div className="flex items-center gap-2 ml-10">
          <Link
            className="md:hidden p-2 rounded-md hover:bg-[#EDF2F7] ml-2"
            href={`/search`}
          >
            <FiSearch size={24} />
          </Link>
          {session && session.user ? (
            <>
              <Button
                variant={'outline'}
                className="min-w-[120px] hidden md:block border-[1px] border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white"
                onClick={() => {}}
              >
                Create Post
              </Button>
              <Button variant={'ghost'} p="4px" onClick={() => {}}>
                <RiNotification3Line size={24} />
              </Button>
              <UserMenuButton user={session.user} />
            </>
          ) : (
            <NoUserButtons />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
