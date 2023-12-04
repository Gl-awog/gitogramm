import { makeRequest } from '../requests'
import { addLeadingZero } from '@/helpers/helpers'

export const getTrendings = (lang = 'javascript') => {
  const params = new URLSearchParams()

  const weekMS = 7 * 24 * 60 * 60 * 1000
  const weekAgo = new Date(Date.now() - weekMS)

  console.log(weekAgo)

  const formattedDate = [
    weekAgo.getFullYear(),
    addLeadingZero(weekAgo.getMonth() + 1),
    addLeadingZero(weekAgo.getDate())
  ].join('-')

  params.append('order', 'desc')
  params.append('sort', 'stars')
  params.append('per_page', '10')
  params.append('q', `language:${lang} created:>${formattedDate}`)

  return makeRequest({
    url: `/search/repositories?${params}`
  })
}
