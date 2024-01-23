import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {

  const { data: session } = useSession()
  if(session) {
    return <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }

  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center max-w-4xl m-auto">
        <h1 className="text-4xl font-bold max-w-lg text-center">
          Welcome to the admin of the website
        </h1>
        <p className="font-medium my-4">
          Beautifully designed cessible. Customizable. Open Source.
        </p>
        <button
          className="inline-block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
           onClick={() => signIn()}
        >
          Sign in with Google
        </button>
      </div>
    </>
  );
}
