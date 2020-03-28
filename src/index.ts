import { CustomAuthorizerHandler, CustomAuthorizerResult } from "aws-lambda";
import JustAuthenticateMe from "justauthenticateme-node";

const unauthorized = "Unauthorized";

const createPolicy = (
  principalId: string,
  resource: string,
  allow: boolean,
  context: any
): CustomAuthorizerResult => {
  return {
    principalId,
    context,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: allow ? "Allow" : "Deny",
          Resource: resource
        }
      ]
    }
  };
};

const authHandler = (
  appId: string,
  options?: {
    jamBaseUrl?: string;
  }
): CustomAuthorizerHandler => {
  const jam = new JustAuthenticateMe(appId, options);
  const handler: CustomAuthorizerHandler = async (
    event
  ): CustomAuthorizerResult => {
    const resource = event.methodArn;

    console.log("headers", event.headers);
    const { Authorization } = event.headers;
    if (!Authorization) {
      throw unauthorized;
    }
    // cut off "Bearer "
    const idToken = Authorization.substring(7);
    console.log("idToken", idToken);

    try {
      const email = await jam.verify(idToken);
      return createPolicy(email, resource, true, { email });
    } catch (err) {
      console.error(err);
      throw unauthorized;
    }
  };
  return handler;
};

export default authHandler;
