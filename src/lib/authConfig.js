const region = process.env.REACT_APP_COGNITO_REGION;
const poolId = process.env.REACT_APP_COGNITO_USER_POOL_ID;
const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;

// https://us-east-1mcxc30l9k.auth.us-east-1.amazoncognito.com
const authConfig = {
  authority: `https://cognito-idp.${region}.amazonaws.com/${poolId}`, // Fixed missing backtick`
  // authority:  `https://us-east-1mcxc30l9k.auth.us-east-1.amazoncognito.com`, // Added missing backtick`
  client_id: clientId,
  redirect_uri: redirectUri,
  response_type: "code", // Updated response type to "code"
  scope: "openid email profile",
};

console.log("Cognito Authority:", authConfig.authority);


export default authConfig;
