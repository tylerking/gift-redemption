import { createClient } from '@sanity/client'

export const client = createClient({
  apiVersion: '2024-02-14',
  dataset: 'production',
  ignoreBrowserTokenWarning: true,
  projectId: 'bk49q1cd',
  token: import.meta.env.VITE_SANITY_TOKEN ? String(import.meta.env.VITE_SANITY_TOKEN) : undefined,
  useCdn: false,
})
