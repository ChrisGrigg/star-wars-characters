import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import CharactersPage from "./characters"
import Button from "app/core/components/Button"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <div className="inline mr-5">
          Welcome <code>{currentUser.email}</code>
        </div>
        <Button
          label="Logout"
          onClick={async () => {
            await logoutMutation()
          }}
        />
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div>
      <div className="pl-5 pr-5 pt-5">
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </div>

      <CharactersPage></CharactersPage>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
