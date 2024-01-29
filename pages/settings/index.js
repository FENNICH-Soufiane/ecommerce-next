import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Settings = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const logout = async () => {
   await router.push('/');
   await signOut();
  }
   
  if (session) {
    return (
      <>
        <header>
          <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-gray-900 sm:text-4xl">

                <div className="sm:flex sm:gap-4 my-4 flex gap-4 items-center">
                    <div className="h-10 w-10">
                      <Image
                        className="h-full w-full rounded-full object-cover object-center"
                        src={session.user.image}
                        alt=""
                        width={50}
                        height={50}
                      />
                    </div>
                  <span className="text-green-700">{session.user.name}</span>!
                  </div>
                  
                </div>

                <p className="mt-1.5 text-md text-gray-500 max-w-lg pl-2">
                {session.user.email} 🎉
                </p>
                
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                <button
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-700 px-5 py-3 text-red-700 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring"
                  onClick={logout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  <span className="text-md font-medium"> Logout </span>
                </button>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }
};
export default Settings;
