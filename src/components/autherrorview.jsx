import { Link } from "wouter";
import config from "../config";

export default function AuthErrorView({
  internal = false,
  internalError = "",
}) {
  if (internal) {
    console.log("Server Auth Error: ", internalError);
  }
  return (
    <div className="center min-h-screen ">
      <div className="w-[90%] max-w-lg center space-y-6">
        <h1 className="font-semibold text-black   text-xl ">
          {internal
            ? " We are having a tough day "
            : "You do not have permission to view this page."}
        </h1>

        <p className="text-[#535D66] text-left text-sm">
          {internal
            ? "We're sorry, but we are currently experiencing a server issue that is preventing us from confirming your authentication. Please try again later. "
            : "It appears that you do not have the necessary permissions to access this content or the permission expired. Alternatively, return to the homepage and explore other sections."}
        </p>

        <div>
          <Link href={config.namedUrls.signIn}>
            <button role="link" className="btn py-2 text-sm">
              Log In
            </button>
          </Link>
        </div>

        <div className="w-full">
          <Link href="/">
            <button
              role="link"
              className="block bg-white hover:bg-primary/10 border border-primary text-primary py-2 text-sm  rounded-[4px] font-medium text-center w-full disabled:opacity-40 disabled:pointer-events-none"
            >
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
