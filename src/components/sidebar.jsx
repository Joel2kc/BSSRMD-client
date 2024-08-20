import Logo from "../assets/logo1.png";
import { Link } from "wouter";
import { MdAdd } from "react-icons/md";
import { RiUserSharedLine } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { GrDocumentCloud } from "react-icons/gr";
import { BsTrash } from "react-icons/bs";
import { useLocation } from "wouter";
import cn from "classnames";
import { userState, uploaderState } from "../utils/state/atoms";
import useAtom from "../utils/hooks/useatom";
import NewDialogBox from "./newdialogbox";
import FilenameDialog from "./filenamedialog";
import { useState } from "react";
import { useSearch } from "wouter";

function Sidebar({ setShowSidebar = null }) {
  const [currentPathname, _] = useLocation();

  const searchParams = new URLSearchParams(useSearch());

  const showNewDialogFromSearchParams =
    searchParams.get("showNewDialog") === "true";

  const [showNewDialog, setShowNewDialog] = useState(
    showNewDialogFromSearchParams
  );
  const [showFilenameDialog, setShowFilenameDialog] = useState(false);
  const { setState: setFileToUpload } = useAtom(uploaderState);

  // (currentPathname.includes(route) || currentPathname.startsWith(route)

  const { state: authData } = useAtom(userState);

  const routeIsActive = (route) =>
    route.length > 1 && currentPathname === route;

  function onSelectFile(file) {
    setFileToUpload({
      file,
      hide: false,
    });
  }

  return (
    <>
      <aside className="  bg-neutral min-h-screen">
        <div className="w-full  flex  flex-col justify-start items-start space-y-8">
          <Link
            to="/"
            className="flex  px-6 w-max justify-center items-start   space-x-2 md:space-x-2 self-stretch "
          >
            <img src={Logo} alt="logo" className="w-8 md:w-10 self-start " />
            <p
              style={{
                fontFamily: "Bebas Neue",
              }}
              className="font-bold text-primary text-xl self-center  "
            >
              BSSPD
            </p>
          </Link>

          <div className="px-6 relative">
            <button
              onClick={() => setShowNewDialog(true)}
              className="btn-1 flex flex-row justify-start items-center space-x-2 py-3"
            >
              <MdAdd className="text-2xl" />

              <span> New</span>
            </button>

            <NewDialogBox
              onClick={() => {
                if (setShowSidebar) setShowSidebar(false);
              }}
              onSelectFolder={() => {
                setShowNewDialog(false);
                setShowFilenameDialog(true);
              }}
              onSelectFile={onSelectFile}
              show={showNewDialog}
              setShow={setShowNewDialog}
            />
            <FilenameDialog
              show={showFilenameDialog}
              setShow={setShowFilenameDialog}
              token={authData.token}
              onSettled={() => {
                if (setShowSidebar) setShowSidebar(false);
              }}
            />
          </div>

          <ul className="center space-y-6 w-full">
            {[
              {
                name: "My Cloud",
                pathname: "/cloud",
                icon: GrDocumentCloud,
              },
              {
                name: "Shared with me",
                pathname: "/cloud/shared",
                icon: RiUserSharedLine,
              },

              {
                name: "Trash",
                pathname: "/cloud/trash",
                icon: BsTrash,
              },
            ].map((v, i) => {
              const Icon = v.icon;
              const active = routeIsActive(v.pathname);
              return (
                <Link
                  to={v.pathname}
                  className={
                    " border-l-4    py-3 pl-12 hover:bg-contrast/5 group font-medium text-contrast/50 text-base w-full flex flex-row justify-start items-center space-x-2 " +
                    cn(
                      active &&
                        "  border-contrast bg-contrast/5 cursor-default ",
                      !active && "  border-transparent cursor-pointer "
                    )
                  }
                  key={i}
                >
                  <Icon
                    className={
                      "text-xl group-hover:text-contrast self-center " +
                      cn(active && " text-contrast  ")
                    }
                  />
                  <span
                    className={
                      "inline-block group-hover:text-contrast " +
                      cn(active && " text-contrast  ")
                    }
                  >
                    {v.name}
                  </span>
                </Link>
              );
            })}

            <div
              onClick={authData.logOut}
              className="cursor-pointer border-l-4 border-transparent   py-3 pl-12 hover:bg-contrast/5 group font-medium text-contrast/50 text-base w-full flex flex-row justify-start items-center space-x-2"
            >
              <MdOutlineLogout className="text-xl group-hover:text-red-500 self-center " />
              <span className="inline-block group-hover:text-red-500 ">
                Log out
              </span>
            </div>
          </ul>
        </div>

        <div className="w-full  flex  flex-col justify-start items-start space-y-8 pt-8">
          <div className="space-y-2 px-6 w-full">
            <h2 className="font-bold text-sm text-contrast">Storage Details</h2>

            <div className="w-full bg-contrast/20 h-[6px] rounded-2xl ">
              <div className="bg-contrast h-[6px] w-[1%] rounded-2xl"></div>
            </div>

            <p className="text-contrast/40 text-xs font-medium">0GB used</p>
          </div>

          <div className="px-6">
            <p className="text-xs font-medium text-contrast/60">
              Welcome to BSSPD, our advanced platform combining blockchain
              technology, CP-ABE encryption, and IPFS for secure, user-centric
              personal data sharing. Read the{" "}
              <span className="text-primary/80 cursor-pointer">
                terms of use.{" "}
              </span>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export function DesktopSidebar() {
  return (
    <div className=" hidden md:block w-[60%]  md:w-[25%] lg:w-[20%]  xl:w-[15%]  pt-4 border-r border-contrast/20">
      <Sidebar />
    </div>
  );
}

export function MobileSidebar({ showSidebar, setShowSidebar }) {
  if (!showSidebar) return null;
  return (
    <>
      <div
        onClick={() => setShowSidebar(false)}
        className="absolute md:hidden w-full h-full z-20 inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
      ></div>
      <div className=" fixed inset-y-0 left-0  z-30  md:hidden w-[60%] pt-4 bg-neutral border-r border-contrast/20">
        <Sidebar setShowSidebar={setShowSidebar} />
      </div>
    </>
  );
}

export default function CombinedSidebar({
  showSidebar = null,
  setShowSidebar = null,
}) {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
    </>
  );
}
