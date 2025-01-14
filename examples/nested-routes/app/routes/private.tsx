import { Outlet } from '@remix-run/react'
import type { ActionFunction, LoaderFunction } from 'remix'
import { Form, Link, json, useLoaderData } from 'remix'
import { authenticator, supabaseStrategy } from '~/auth.server'

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
  const { email } = useLoaderData<LoaderData>()
  return (
    <>
      <h1>Hello {email}</h1>
      <h2>Welcome in Private index</h2>
      <Link to ="profile">Profile</Link>

      Outlet:
      <Outlet />

      <Form method="post">
        <button>Log Out</button>
      </Form>
    </>
  )
}
