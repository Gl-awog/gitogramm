import { makeRequest } from '../requests'

export const getStarred = () => {
  return makeRequest({
    url: '/user/starred',
    headers: {
      Authorization: `token ${localStorage.getItem('token')}`
    }
  })
}

export const starRepo = ({ repo, owner }) =>
  makeRequest({
    url: `/user/starred/${owner}/${repo}`,
    method: 'put',
    headers: {
      Authorization: `token ${localStorage.getItem('token')}`
    },
    data: {
      scope: 'repo:status public_repo read:user'
    }
  })

export const unStarRepo = ({ repo, owner }) =>
  makeRequest({
    url: `/user/starred/${owner}/${repo}`,
    method: 'delete',
    headers: {
      Authorization: `token ${localStorage.getItem('token')}`
    }
  })
