import { GetStaticPropsContext } from 'next';
import { getApolloClient } from '@wpengine/headless';
import { useQuery, gql } from '@apollo/client';
import { getNextStaticProps } from '@wpengine/headless/next';

const GET_PROPERTIES = gql`
  query {
    properties(first: 100) {
      nodes {
        id
        title
        content
        slug
        uri
      }
    }
  }
`;

const Properties = (props) => {
  console.log('props: ', props);
  const { data } = useQuery(GET_PROPERTIES);
  console.log('data', data);
  const properties = data?.properties?.nodes;
  return (
    <div>
      <h1>Properties</h1>
      {properties?.map((property) => {
        return (
          <div key={property.id}>
            <h2>{property.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: property.content }} />
          </div>
        );
      })}
    </div>
  );
};

export async function getStaticProps(context) {
  const client = getApolloClient(context);
  await client.query({
    query: GET_PROPERTIES,
  });

  const props = await getNextStaticProps(context);
  props.revalidate = 1;

  return props;
}

export default Properties;
