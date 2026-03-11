import { GoogleLogin, GoogleOAuthProvider, type CredentialResponse } from '@react-oauth/google'
import { googlelogin } from '../services/authService';
import { useNavigate } from 'react-router';

function GoogleButton() {

  const navigate = useNavigate();

    async function handleGoogleSuccess(credentialResponse : CredentialResponse) {
        const credential = credentialResponse.credential;

        const response = await googlelogin(credential!)
        const jwt = response.data.token;

        localStorage.setItem('token', jwt)

        navigate('/')
    }
  return (
    <div className='m-2'>
      <GoogleOAuthProvider clientId="438696075915-137f725khl7ii6k5qk6b18pji653nd1a.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log('Login Failed')}
        />
      </GoogleOAuthProvider>
    </div>
  )
}

export default GoogleButton
