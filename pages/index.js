import React from 'react';
import Link from 'next/link'
import styles from '../styles/Home.module.css';
import {
  Button,
  Box,
  chakra,
  VStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
} from '@chakra-ui/react';

import { appGetStaticProps } from "../lib/api/appGetStaticProps";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Webstantly WpNext starter!</a>
      </h1>


      <h2>Some examples for getStaticProps</h2>

      <Link href="/examples/use-post-dinamically">
        <a>Get All posts using usePosts (client side rendered)</a>
      </Link>
      <Link href="/examples/get-post-ssr">
        <a>Get All posts using getPosts (SSR)</a>
      </Link>

      <Link href="/examples/use-post-and-get-next-static-props">
        <a>Get All posts using getNextStaticProps (SSR)</a>
      </Link>

      <Link href="/examples/fetch-global-data">
        <a>Get Global Static Data</a>
      </Link>


      <h2>UI Examples</h2>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open Lateral Menu
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
              <Input placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
                </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      {/* <Link href="/examples/get-next-static-props">
          <a>Get All posts using getNextStaticProps (SSR)</a>
        </Link> */}
    </>
  );
}

export const getStaticProps = async (context) => {

  const props = await appGetStaticProps(context);
  return {
    props
  }
};

