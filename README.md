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

[JustAuthenticateMe](https://www.justauthenticate.me) offers simple magic link based authentication as a service for web apps.
This is a AWS API Gateway Custom Authorizer function that you can drop into your serverless backend to authenticate incoming
requests. It uses the [JustAuthenticateMe Node SDK](https://https://github.com/CoalesceSoftware/justauthenticateme-node) under
the hood to verify incoming requests and pass the user's email on to your endpoint handler.

If you're using the [Serverless Framework](https://serverless.com/), you can get started using JustAuthenticateMe even faster
with the [Serverless JustAuthenticateMe Plugin](https://github.com/CoalesceSoftware/serverless-justauthenticateme-plugin).

## Getting Started

### Installing via npm or yarn

```
npm install --save justauthenticateme-apigateway-auth
yarn add justauthenticateme-apigateway-auth
```

### Generating the Authorizer

Pass your App ID from the JustAuthenticateMe dashboard to the function. The result is your JustAuthenticateMe authorizer lambda!

```js
import authHandler from "justauthenticateme-apigateway-auth";
const appId = "dcd6555e-edff-4f3d-83c9-3af79ea8f895";
export const handler = authHandler(appId);
```

### Using the Authorizer

#### Configuring

You'll then want to configure this handler as a
[Lambda Authorizer](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html)
for any of your API Gateway Endpoints that you'd like to only be accessible by authenticated users.

When configuring the authorizer, be sure to select the `REQUEST` type.

#### Sending requests

When sending requests to endpoints that are protected by this authorizer, include the ID token you get from JustAuthenticateMe in
the `Authorization` header after the keywork `Bearer`. It should look something like this:

```
Authorization: Bearer eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCIsImtpZCI6IjJlYjQwMTA0LWRjNDUtNGYzNy1iNjljLTkzN2I2Mzg2YjlmNiJ9.eyJlbWFpbCI6InN1cHBvcnRAanVzdGF1dGhlbnRpY2F0ZS5tZSIsInN1YiI6InN1cHBvcnRAanVzdGF1dGhlbnRpY2F0ZS5tZSIsImF1ZCI6ImIxOWEyMWI0LWFkOWQtNGZkNy04OGMxLTFiNjhiODI1YzY3MSIsImlzcyI6Imh0dHBzOi8vZGV2LWFwaS5qdXN0YXV0aGVudGljYXRlLm1lL2IxOWEyMWI0LWFkOWQtNGZkNy04OGMxLTFiNjhiODI1YzY3MSIsImp0aSI6IjZhMjJjOTEyLWYwMzYtNGU0Mi1iZjM5LTQ3N2ZhM2ExOGY2ZCIsInRva2VuX3VzZSI6ImlkIiwiaWF0IjoxNTgzNjk1NDM5LCJuYmYiOjE1ODM2OTU0MzksImV4cCI6MTU4MzY5NzIzOX0.AZqvVWSXn4zwP4WhYOL-nQEDDEMa4Cmpyx8HGJ-6uc3wLeZVfvil6RyAlUExnd6JpteaAImOrKo5fnv93SSGkP-eAN9igGRg0GmXpIeGno_sY_4rMLXDa6RtABL1lz5LCYMxD79oIYIflWJ-LVqmCF90msq-PysFZcgKVLa8oki8ZlKI
```

#### Handling requests

When a request is authenticated successfully, this lambda returns a policy allowing the user access to any resource protected by
this authorizer. It also passes along the email address of the authenticated user to the handler of the API endpoint.

Specifically, a lambda handling an endpoint protected by this authorizer can access the user's email at
`event.requestContext.authorizer.email`.

## License

[MIT](http://opensource.org/licenses/MIT)
