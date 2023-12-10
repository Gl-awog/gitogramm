import { makeRequest } from '../requests'
import env from '../../../env'

export const sendUserToAuthPage = () => {
  const githubAuthApi = 'https://github.com/login/oauth/authorize'
  const params = new URLSearchParams()
  params.append('client_id', env.clientId)
  params.append('scope', 'repo:status read:user')

  window.location.href = `${githubAuthApi}?${params}`
}

export const getAccessTokenByPersonalCode = (code) => makeRequest({
  url: 'https://webdev-api.loftschool.com/github',
  method: 'post',
  data: {
    code,
    clientId: env.clientId,
    clientSecret: env.clientSecret
  }
})

export const getUser = () => {
  return makeRequest({
    url: '/user',
    headers: {
      Authorization: `token ${localStorage.getItem('token')}`
    }
  })
}
