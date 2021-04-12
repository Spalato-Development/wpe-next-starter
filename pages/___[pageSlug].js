import React from 'react';
import { getApolloClient } from '@wpengine/headless';
import { useGeneralSettings } from '@wpengine/headless/react';
import { usePost } from '@wpengine/headless/next';
import {
  getNextStaticPaths,
  getNextStaticProps,
} from '@wpengine/headless/next';

const Page = () => {
  const page = usePost();
  const settings = useGeneralSettings();
  console.log('page', page, 'settings', settings);

  return (
    <div>
      <h1>{page?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page?.content }} />
    </div>
  );
};

export default Page;

export const getStaticProps = async (context) => {

  if (context.preview) {
    console.log("Showing preview??? ")
  }
  console.log('context', context);
  //   const client = getApolloClient(context);

  const props = await getNextStaticProps(context);
  props.revalidate = 1;

  return props;
};

export function getStaticPaths() {
  return getNextStaticPaths();
}
