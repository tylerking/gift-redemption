import { writable } from 'svelte/store'

import { client } from '../sanity'

export interface Bundle {
  color: string;
  icon: string;
  id: string;
  items: [string, string, string];
  redemptionDate?: string;
  status: 'available' | 'pending' | 'redeemed';
  title: string;
}

function createBundleStore() {
  const { set, subscribe, update } = writable<Bundle[]>([])

  return {
    init: async () => {
      const query = '*[_type == "bundle" && !(_id in path("drafts.**"))] | order(_createdAt asc) {"id": _id, title, icon, color, items, status, redemptionDate}'
      const data = await client.fetch<Bundle[]>(query)
      set(data)

      const listenQuery = '*[_type == "bundle" && !(_id in path("drafts.**"))]'
      client.listen(listenQuery).subscribe((updateEvent) => {
        const result = updateEvent.result as Record<string, unknown> | undefined
        if (result) {
          update(current => {
            const index = current.findIndex(b => b.id === updateEvent.documentId)
            
            const mappedDoc: Bundle = {
              color: result.color as string,
              icon: result.icon as string,
              id: updateEvent.documentId,
              items: result.items as [string, string, string],
              redemptionDate: result.redemptionDate as string | undefined,
              status: result.status as 'available' | 'pending' | 'redeemed',
              title: result.title as string,
            }

            if (index > -1) {
              current[index] = mappedDoc
            } else {
              current.push(mappedDoc)
            }
            return [...current]
          })
        }
      })
    },
    markComplete: async (id: string) => {
      update(bundles => {
        return bundles.map(bundle =>
          bundle.id === id
            ? { ...bundle, status: 'redeemed' }
            : bundle
        )
      })
      await client.patch(id).set({ status: 'redeemed' }).commit()
    },
    redeemBundle: async (id: string, date: string) => {
      update(bundles => {
        return bundles.map(bundle =>
          bundle.id === id
            ? { ...bundle, redemptionDate: date, status: 'pending' }
            : bundle
        )
      })
      await client.patch(id).set({ redemptionDate: date, status: 'pending' }).commit()
    },
    subscribe
  }
}

export const bundles = createBundleStore()
