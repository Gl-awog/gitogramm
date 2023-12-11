import { makeRequest } from '../requests'

export const getIssues = ({ owner, repo }) => {
  return makeRequest({
    url: `/repos/${owner}/${repo}/issues`,
    headers: {
      Authorization: `token ${localStorage.getItem('token')}`
    }
  })
}
