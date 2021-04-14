import { MENU_QUERY } from "./layout/menuQuery"

import { getApolloClient, getPosts } from '@wpengine/headless';


export const appGetStaticProps = async (context, props = {}) => {
    const client = getApolloClient(context);
    const posts = await getPosts(client);

    const menuData = await client.query({
        query: MENU_QUERY,
    });

    return {
        ...props,
        posts,
        menuData
    }
}

export default appGetStaticProps;


