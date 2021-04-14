import { GetStaticPropsContext } from 'next';
import { getApolloClient } from '@wpengine/headless';
import { useQuery, gql } from '@apollo/client';
import { placeToStayFragment } from '../../lib/fragments';
import {
  getNextStaticPaths,
  getNextStaticProps,
} from '@wpengine/headless/next';

const GET_ALL_PTS = gql`
  query() {
    placeToStay() {
      title,
      uri, 
      slug,
      id
    }
  }

`;


export default PlaceToStay;

export const getStaticProps = async (context) => {
  const client = getApolloClient(context);
  const ptsData = await client.query({
    query: GET_ALL_PTS
  });

  console.log('context', context, 'ptsData', ptsData);

  return {
    props: {
      ptsData,
    },
  };
  //TODO: why it doesn't work this way on singles ?
  // const props = await getNextStaticProps(context);
  // props.revalidate = 1;
  // return props;
};

export function getStaticPaths() {
  return getNextStaticPaths();
}
