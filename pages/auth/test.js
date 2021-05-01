import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useLazyQuery } from "@apollo/client";
import Link from 'next/link'
import Router from 'next/router'
import { AuthContext } from "../../lib/context/authContext";

import { WP_LOGIN_USER } from "../../lib/api/auth";
import { gql } from '@apollo/client';

const WP_TEST = gql`
    query MyQuery {
        user(id: "dXNlcjox") {
            email
            id
            jwtAuthToken
            jwtAuthExpiration
            jwtRefreshToken
            jwtUserSecret
        }
    }   
      
` 


// const ALL_POSTS = gql`
//   query MyQuery {
//     posts {
//       nodes {
//         id
//         title
//       }
//     }
//   }
// `

const ALL_POSTS = gql`
  query MyQuery {
    post(id: "1525", idType: DATABASE_ID) {
      authorId
      title
    }
  }
`

let authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhcnRlci1uZXh0LmdhdHNieS13cC5jb20iLCJpYXQiOjE2MTkzMTI4MjksIm5iZiI6MTYxOTMxMjgyOSwiZXhwIjoxNjE5MzEyODg5LCJkYXRhIjp7InVzZXIiOnsiaWQiOiI0In19fQ.RC9XOaNtcVsTP09Kau4StUyyVsPe7SDvAhsjobuE6-8"

const Test2 = () => {

    const [loggedUser, setLoggedUser] = React.useState(null) 
    const [login, { loading, error }] = useMutation(WP_LOGIN_USER, {
        onCompleted: data => {
           console.log("Login mutation completed: ", data)
        //    authToken = data.login.authToken;
           delete data.login.authToken;
           setLoggedUser(data.login)
        },
        onError: error => {
            console.log("Login mutation errored: ", error)
        }
    });

      useEffect(() => {
          login({
              variables: {
                //   username: "admin",
                //   password: "faktory"
                  username: "carlos",
                  password: "123456"
              }
          })
      }, [])

    const [queryUserInfo, { loading: loading2, data: userInfo,error: error2 }] =  useLazyQuery(
        //WP_TEST,
        ALL_POSTS, 
        {
            context: {
                headers: {
                    authorization: `Bearer ${authToken}`
                }
            },
            onCompleted: data => {
                console.log("test query completed: ", data)
             },
             onError: error => {
                 console.log("Test query errored: ", error)
             }
        }
    )
    console.log("userInfo: ", userInfo)

    console.log("loggedUser: ", loggedUser)
    // console.log("authToken: ", authToken)
    // console.log("error2: ", error2)

    return (
        <>
        <h1>Test</h1>
        <button onClick={() => queryUserInfo()}>query user info!</button>
        {userInfo && userInfo.post && (
            <p>{userInfo.post.title}</p>
        )}
        </>

    )
}

export default Test2;