import AllPosts from '../../components/examples/AllPosts';
import { getApolloClient, getPosts } from '@wpengine/headless';
import { gql, useQuery } from '@apollo/client';
/**
 * Example getting with usePosts SSR.
 *
 * - This is "SSR".
 * - We need to use getStaticProps to fetch and pass the context (__APOLLO_STATE__ & queries)
 * to the Blog component
 * - If the component receives that, the hook usePosts will work "SSR" instead of doing a
 * client side request
 * - We dont need the "posts && " guard as the posts are passed on build time-
 * - Video explaining this: https://www.loom.com/share/dc720e6d4dd14ef38a011b7a995ad56a
 */

const MENU_QUERY = gql`
  query {
    menu(id: "header", idType: NAME) {
      menuItems {
        nodes {
          label
        }
      }
    }
  }
`;
const Blog = (props) => {
  console.log('Blog props', props);

  return (
    <div>
      <h1>AllPosts example with global data</h1>
      <AllPosts />
    </div>
  );
};

export const getStaticProps = async (context) => {
  const client = getApolloClient(context);
  const posts = await getPosts(client);
  const menuData = await client.query({
    query: MENU_QUERY,
  });

  return {
    props: {
      posts,
      menuData,
    },
  };
};

export default Blog;
