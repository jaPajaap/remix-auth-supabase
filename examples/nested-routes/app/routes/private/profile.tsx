import type { ActionFunction, LoaderFunction } from 'remix'
import { json, useLoaderData } from 'remix'
import { authenticator, supabaseStrategy } from '~/auth.server'

type LoaderData = { email?: string }

export const action: ActionFunction = async({ request }) => {
  await authenticator.logout(request, { redirectTo: '/login' })
}

export const loader: LoaderFunction = async({ request }) => {
  const session = await supabaseStrategy.checkSession(request, {
    failureRedirect: '/login?redirectTo=/private/profile',
  })

  return json<LoaderData>({ email: session.user?.email })
}

export default function Screen() {
  const { email } = useLoaderData<LoaderData>()
  return (
    <>
      <h3>Welcome in Nested Private Profile { email }</h3>
    </>
  )
}
