This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Introduction

Boilerplate code for Webstantly NextJS derived applications.

Go to `localhost:3000` to see some examples and check the `/examples`/ directory to check information.

- Some looms:

- [usePost && getNextStaticProps](https://www.loom.com/share/dc720e6d4dd14ef38a011b7a995ad56a)

## Auth

- We will be using `wp-graphql-auth`:

- Install the plugin in wordpress
- Add the tokens

```
** File Changes **
-- .htaccess --

SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1

RewriteEngine on
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]

-- wp-config.php --

define( 'GRAPHQL_JWT_AUTH_SECRET_KEY', 'super-secret-key' );

define('JWT_AUTH_CORS_ENABLE', true);
```

- Allow user's registrations in WP:
  `general/settings/`
- Add npm package


https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
