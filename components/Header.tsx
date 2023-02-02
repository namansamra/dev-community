import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { RiNotification3Line } from 'react-icons/ri';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';
import DevLogo from '@/assets/images/dev-general-icon.png';
import AnonymousUser from '@/assets/images/user-line.svg';
import Image from 'next/image';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
const SideDrawer = ({ isOpen, onClose }: SideDrawerProps) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create your account</DrawerHeader>

        <DrawerBody>
          <h1>Hello Hello!!</h1>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <header className="w-full">
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
            <Input placeholder="Search..." border={'1px solid #e8e8e8'} />
            <InputRightElement>
              <FiSearch size={24} />
            </InputRightElement>
          </InputGroup>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={'ghost'}
            p="4px"
            className="md:hidden"
            onClick={() => {}}
          >
            <FiSearch size={24} />
          </Button>
          <Button
            variant={'outline'}
            className="border-[1px] border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white"
            onClick={() => {}}
          >
            Create Post
          </Button>
          <Button variant={'ghost'} p="4px" onClick={() => {}}>
            <RiNotification3Line size={24} />
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              className="rounded-full p-2 border-[1px] border-[#e8e8e8]"
            >
              <Image src={AnonymousUser} alt="user" />
            </MenuButton>
            <MenuList className="mt-1 border-[1px] border-[#e9e9e9] rounded-md shadow-md w-[250px]">
              <MenuItem>New Tab</MenuItem>
              <MenuItem>New Window</MenuItem>
              <MenuItem>Open Closed Tab</MenuItem>
              <MenuItem>Open File...</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
