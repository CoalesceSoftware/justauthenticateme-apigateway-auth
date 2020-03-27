<p align="center"><a href="https://www.justauthenticate.me" target="_blank" rel="noopener noreferrer"><img width="100" src="https://www.justauthenticate.me/favicon.png" alt="JustAuthenticateMe logo"></a></p>
<p align="center">
  <a href="https://prettier.io/">
    <img alt="code style: prettier" src="https://badgen.net/badge/code style/prettier/ff69b4">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img alt="types: typescript" src="https://badgen.net/badge/types/TypeScript/blue">
  </a>
</p>
<h1 align="center">JustAuthenticateMe AWS API Gateway Custom Authorizer Function</h1>

## Introduction

[JustAuthenticateMe](https://www.justauthenticate.me) offers simple magic link based authentication as a service for web apps. This is a AWS API Gateway Custom Authorizer function that you can drop into your serverless backend to authenticate incoming requests. It uses the [JustAuthenticateMe Node SDK](https://https://github.com/CoalesceSoftware/justauthenticateme-node) under the hood to verify incoming requests and pass the user's email on to your endpoint handler.

## Getting Started

### Installing via npm or yarn

```
npm install --save justauthenticateme-apigateway-auth
yarn add justauthenticateme-apigateway-auth
```

### Importing

```js
import authHandler from "justauthenticateme-apigateway-auth";
```

### Using the library

Pass your App ID from the JustAuthenticateMe dashboard to the function. The result is your JustAuthenticateMe auth lambda!

```js
const appId = "dcd6555e-edff-4f3d-83c9-3af79ea8f895";
export const handler = authHandler(appId);
```

TODO Requires Request type, etc.

## How it works

TODO how it passes email to actual endpoint lambda

## License

[MIT](http://opensource.org/licenses/MIT)
