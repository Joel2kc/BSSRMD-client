import Header from "../components/header";
import LostImage from "../assets/images/lost2.png";
import { Link } from "wouter";

export default function CatchAll() {
  return (
    <div className="w-full h-screen">
      <main className="h-full w-full">
        <Header hideList />

        <div className="pt-16"></div>

        <div className="center justify-start w-full py-16   bg-neutral ">
          <div className="w-[90%] center space-y-4">
            <img src={LostImage} className="w-[200px]" />
            <h1 className="font-bold text-2xl lg:text-3xl text-center">
              {" "}
              Uh oh! Looks like you took the wrong turn.{" "}
            </h1>

            <p className="text-center">
              The page you are looking for doesn&apos;t exist or has been moved.
              Please check the URL or return to the{" "}
              <Link to="/" className="text-primary ">
                homepage
              </Link>
              .
            </p>
            <div className="mt-8">
              <Link
                to="/"
                className="px-4 py-2 bg-primary text-white rounded-md hover:rounded-xl"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>

        <footer className="py-2 fixed inset-x-0 bottom-0 z-10 text-sm  center bg-neutral">
          <div className="w-[90%] center max-w-6xl  space-y-1 ">
            <p>
              &copy; {new Date().getFullYear()} BSSPD - Some rights reserved
            </p>

            <p>Redefining Data Sharing with Security and Trust. </p>
            <p className="text-xs font-medium">
              {" "}
              Developed by Oluwatukesi Joel (CPE/18/6679){" "}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
