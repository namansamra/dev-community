import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import DevLogo from '@/assets/images/dev-general-icon.png';
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
    <header>
      <div className="flex items-center p-2 z-50 w-full h-[56px] shadow-sm shadow-[#e8e8e8]">
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
          className="h-[40px] w-[50px] rounded-[3px]"
        />

        <InputGroup>
          <Input placeholder="Search..." />
          <InputRightElement>
            <AiOutlineSearch />
          </InputRightElement>
        </InputGroup>
      </div>
    </header>
  );
}

export default Navbar;
