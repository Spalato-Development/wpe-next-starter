import { getApolloClient, getPosts } from '@wpengine/headless';
/**
 * Example getting with getPosts.
 * 
 * - This is "SSR".
 * - We use the usePosts to get "Dynamically" all posts in an easy query.
 * - Check that it rerendeers twitce, so you need to add the "posts &&" on the map
 */
const Blog = ({ posts }) => {
    return (
        <div>
            <h1>usePosts</h1>
            {posts && posts.nodes.map((post) => {
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

    const client = getApolloClient(context);

    const posts = await getPosts(client);
    return {
        props: {
            posts
        }
    };
};



export default Blog;
