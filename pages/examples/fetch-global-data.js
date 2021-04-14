import AllPosts from '../../components/examples/AllPosts';
// import { getApolloClient, getPosts } from '@wpengine/headless';
// import { gql, useQuery } from '@apollo/client';

import appGetStaticProps from "../../lib/api/appGetStaticProps";

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

    const otherProps = {
        properties: ['fakeProperty1', 'fakeProperty2']
    }
    const props = await appGetStaticProps(context, otherProps);
    console.log("props: ", props)
    return {
        props
    }
};

export default Blog;
