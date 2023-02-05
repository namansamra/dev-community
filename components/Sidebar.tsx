import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import House from '@/assets/images/twemoji/house.svg';
import ReadingList from '@/assets/images/twemoji/drawer.svg';
import Listing from '@/assets/images/twemoji/listing.svg';
import Podcast from '@/assets/images/twemoji/mic.svg';
import Video from '@/assets/images/twemoji/camera.svg';
import Tag from '@/assets/images/twemoji/tag.svg';
import FAQ from '@/assets/images/twemoji/tag.svg';
import Sponsors from '@/assets/images/twemoji/heart.svg';
import About from '@/assets/images/twemoji/organization.svg';
import Contact from '@/assets/images/twemoji/contact.svg';
import Guide from '@/assets/images/twemoji/handshake.svg';
import SoftwareComparisons from '@/assets/images/twemoji/thinking.svg';
import CodeOfConduct from '@/assets/images/twemoji/thumb-up.svg';
import PrivacyPolicy from '@/assets/images/twemoji/smart.svg';
import TermsOfUse from '@/assets/images/twemoji/look.svg';
import Twitter from '@/assets/images/twitter.svg';
import Github from '@/assets/images/github.svg';
import Facebook from '@/assets/images/facebook.svg';
import Instagram from '@/assets/images/instagram.svg';
import Twitch from '@/assets/images/twitch.svg';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

const sideBarLinks = [
  {
    name: 'Home',
    link: '/home',
    icon: House,
  },
  {
    name: 'Reading List',
    link: '/reading-list',
    icon: ReadingList,
  },
  {
    name: 'Listings',
    link: '/listings',
    icon: Listing,
  },
  {
    name: 'Podcasts',
    link: '/podcasts',
    icon: Podcast,
  },
  {
    name: 'Videos',
    link: '/videos',
    icon: Video,
  },
  {
    name: 'Tags',
    link: '/tags',
    icon: Tag,
  },
  {
    name: 'FAQ',
    link: '/faq',
    icon: FAQ,
  },
  {
    name: 'Sponsors',
    link: '/sponsors',
    icon: Sponsors,
  },
  {
    name: 'About',
    link: '/about',
    icon: About,
  },
  {
    name: 'Contact',
    link: '/contact',
    icon: Contact,
  },
  {
    name: 'Guides',
    link: '/guides',
    icon: Guide,
  },
  {
    name: 'Software Comparisons',
    link: '/software-comparisons',
    icon: SoftwareComparisons,
  },
];

const sideBarOthers = [
  {
    name: 'Code of Conduct',
    link: '/code-of-conduct',
    icon: CodeOfConduct,
  },
  {
    name: 'Privacy Policy',
    link: '/privacy-policy',
    icon: PrivacyPolicy,
  },
  {
    name: 'Terms of Use',
    link: '/terms-of-use',
    icon: TermsOfUse,
  },
];

const sideBarSocialLinks = [
  {
    name: 'twitter',
    icon: Twitter,
    link: 'https://www.twitter.com',
  },
  {
    name: 'github',
    icon: Github,
    link: 'https://www.github.com',
  },
  {
    name: 'facebook',
    icon: Facebook,
    link: 'https://www.facebook.com',
  },
  {
    name: 'instagram',
    icon: Instagram,
    link: 'https://www.instagram.com',
  },
  {
    name: 'twitch',
    icon: Twitch,
    link: 'https://www.twitch.com',
  },
];

export const SideBarLinksComponent = () => {
  return (
    <>
      {sideBarLinks.map((menuItem) => (
        <Link
          key={menuItem.name}
          href={menuItem.link}
          className="flex items-center gap-2 w-full hover:bg-grey-200 hover:underline hover:text-primaryBlue text-md text-grey-700 rounded-md p-2"
        >
          <Image
            src={menuItem.icon}
            alt={menuItem.name}
            className="h-[24px] w-[24px]"
          />
          {menuItem.name}
        </Link>
      ))}
      <>
        <h2 className="text-md font-bold text-grey-900 px-[20px] pt-5 pb-2">
          Other
        </h2>
        {sideBarOthers.map((menuItem) => (
          <Link
            key={menuItem.name}
            href={menuItem.link}
            className="flex items-center gap-2 w-full hover:bg-grey-200 hover:underline hover:text-primaryBlue text-md text-grey-700 rounded-md p-2"
          >
            <Image
              src={menuItem.icon}
              alt={menuItem.name}
              className="h-[24px] w-[24px]"
            />
            {menuItem.name}
          </Link>
        ))}
      </>
      <div className="flex items-center justify-around my-4">
        {sideBarSocialLinks.map((social) => (
          <a
            key={social.name}
            href={social.link}
            target="_blank"
            rel="noreferrer"
            className="hover:bg-grey-200 rounded-md p-2"
          >
            <Image
              src={social.icon}
              alt={social.name}
              className="h-[24px] w-[24px]"
            />
          </a>
        ))}
      </div>
    </>
  );
};

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SideDrawer = ({ isOpen, onClose }: SideDrawerProps) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader className="px-[16px] font-bold text-[18px]">
          DEV Community 👩‍💻👨‍💻
        </DrawerHeader>
        <DrawerBody className="flex flex-col w-full px-2">
          <SideBarLinksComponent />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
