import axios from 'axios'
import { Buffer } from 'buffer';

const domain = import.meta.env.VITE_AWS_DOMAIN
const clientId = import.meta.env.VITE_AWS_CLIENT_ID
const redirectUri = import.meta.env.VITE_AWS_REDIRECT_URI
const clientSecret = import.meta.env.VITE_AWS_CLIENT_SECRET
const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

export const exchangeCodeForToken = async (code: string) => {
  const body = new URLSearchParams()
  body.append('grant_type', 'authorization_code')
  body.append('client_id', clientId)
  body.append('code', code)
  body.append('redirect_uri', redirectUri)

  try {
    const response = await axios.post(
      `${domain}/oauth2/token`,
      body.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${basicAuth}`,
        },
      }
    )
    console.log("RESPONSE", response.data)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Token exchange failed:', error.response?.data || error.message)
    } else {
      console.error('Token exchange failed:', error)
    }
    throw error
  }
}
