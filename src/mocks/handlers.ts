import { http, HttpResponse } from 'msw'
import { mockAssets } from '../data/mockAssets'

export const handlers = [
  http.get('/api/assets', () => {
    return HttpResponse.json(mockAssets)
  }),
]
