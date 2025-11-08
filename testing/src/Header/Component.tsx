import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

/**
 * Render the HeaderClient component using header data loaded from the application's cached global.
 *
 * Fetches the global entry for 'header' (version 1) and passes the resulting Header object as the `data` prop to HeaderClient.
 *
 * @returns A JSX element of HeaderClient rendered with the fetched header data.
 */
export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  return <HeaderClient data={headerData} />
}