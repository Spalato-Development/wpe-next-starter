import { gql } from '@apollo/client';

const WP_LOGIN_USER = gql`
  mutation LoginUserMutation(
    $username: String!
    $password: String!
  ) {
    login(input: {
        username: $username,
        password: $password
    }) {
        authToken
        user {
            id
            name
            username 
            email
        }
    }
  }
`;

const WP_REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $password: String!
    $email: String!
  ) {
    registerUser(
      input: {
      username: $username,
      password: $password,
      email: $email
    }) {
      user {
        jwtAuthToken
        jwtRefreshToken
        id
        name
        username 
        email
      }
    }
  }
`


export { WP_LOGIN_USER, WP_REGISTER_USER }




// mutation RefreshAuthToken {
//   refreshJwtAuthToken(
//     input: {
//     clientMutationId: "uniqueId"
//         jwtRefreshToken: "your_refresh_token",
//   }) {
//     authToken
//   }
// }