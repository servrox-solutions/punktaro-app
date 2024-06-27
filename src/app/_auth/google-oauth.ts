export const oauthSignIn = (nonce: string): void => {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Parameters to pass to OAuth 2.0 endpoint
  var params = {
    'client_id': '855032964499-3p4ps1u1h0g9jassbdg8ua90lpc1oqbb.apps.googleusercontent.com',
    'redirect_uri': `${window.location.origin}/auth`,
    'response_type': 'id_token',
    'scope': 'openid',
    'nonce': nonce
  };

  // Construct the full URL with query parameters
  var url = oauth2Endpoint + '?' + new URLSearchParams(params).toString();

  // Redirect the user to the OAuth 2.0 endpoint
  window.location.href = url;
}