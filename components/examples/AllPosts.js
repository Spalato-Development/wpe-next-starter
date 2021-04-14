import { useGlobalData } from '../../lib/context/globalDataContext';

const AllPosts = (props) => {
    const globalData = useGlobalData();

    const { posts, properties } = globalData
    console.log("--> AllPosts globalData: ", globalData);
    console.log("--> AllPosts properties: ", properties);

    return (
        <div>
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

export default AllPosts;