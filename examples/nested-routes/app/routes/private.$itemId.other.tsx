import type { ActionFunction, LoaderFunction } from 'remix'
import { json, useLoaderData } from 'remix'
import { authenticator, supabaseStrategy } from '~/auth.server'
import { LinkList } from '~/LinkList'

type LoaderData = { email?: string }

export const action: ActionFunction = async({ request }) => {
  await authenticator.logout(request, { redirectTo: '/login' })
}

export const loader: LoaderFunction = async({ request }) => {
  const session = await supabaseStrategy.checkSession(request, {
    failureRedirect: '/login',
  })

  return json<LoaderData>({ email: session.user?.email })
}

export default function Screen() {
  useLoaderData<LoaderData>()
  return (
    <>
      <h4>Private itemId Other</h4>
      <LinkList />
    </>
  )
}
