import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

/**
 * Renders a 404 Not Found page containing a large "404" heading, a descriptive message, and a button that navigates to the home page.
 *
 * @returns A JSX element representing the 404 Not Found page.
 */
export default function NotFound() {
  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">This page could not be found.</p>
      </div>
      <Button asChild variant="default">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  )
}