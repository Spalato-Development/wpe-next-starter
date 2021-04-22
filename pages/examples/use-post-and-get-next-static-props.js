import { usePosts } from '@wpengine/headless/react';
import { getNextStaticProps } from '@wpengine/headless/next';
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
    const posts = usePosts();
    console.log('posts', posts);
    return (
        <div>
            <h1>usePosts</h1>
            {posts.nodes.map((post) => {
                return (
                    <article key={post.id}>
                        <h2>{post.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    </article>
                );
            })}
        </div>
    );
};


export const getStaticProps = async (context) => {
    const props = await getNextStaticProps(context);
    return props;
};


export default Blog;
