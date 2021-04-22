import { gql } from '@apollo/client';

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

export { MENU_QUERY }