import { draftMode } from 'next/headers'

/**
 * Disable Next.js draft mode for the current request and return a confirmation response.
 *
 * @returns A Response whose body is the plain text "Draft mode is disabled".
 */
export async function GET(): Promise<Response> {
  const draft = await draftMode()
  draft.disable()
  return new Response('Draft mode is disabled')
}