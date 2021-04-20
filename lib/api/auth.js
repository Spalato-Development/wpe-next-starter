import { gql } from '@apollo/client';

const WP_LOGIN = gql`
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


export { WP_LOGIN }


// mutation LoginUser {
//   login(input: {

//     username: "admin",
//     password: "faktory"
//   }) {
//     authToken
//     user {
//       id
//       name
//     }
//   }
// }


// mutation RegisterUser {
//   registerUser(
//     input: {
//     clientMutationId: "uniqueId",
//     username: "your_username",
//     password: "your_password",
//     email: "your_email"
//   }) {
//     user {
//       jwtAuthToken
//       jwtRefreshToken
//     }
//   }
// }

// mutation RefreshAuthToken {
//   refreshJwtAuthToken(
//     input: {
//     clientMutationId: "uniqueId"
//         jwtRefreshToken: "your_refresh_token",
//   }) {
//     authToken
//   }
// }