import { usePosts } from '@wpengine/headless/react';

/**
 * Example getting with usePosts.
 * 
 * - This is "Client Side".
 * - We use the usePosts to get "Dynamically" all posts in an easy query.
 * - Check that it rerendeers twitce, so you need to add the "posts &&" on the map
 */
const Blog = () => {
    const posts = usePosts();
    console.log('posts', posts);

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


export default Blog;
