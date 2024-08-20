import { IoMdSettings } from "react-icons/io";
import { MdOutlineNotifications, MdSearch } from "react-icons/md";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { Link } from "wouter";

export default function AuthHeader({ showSidebar, setShowSidebar, user }) {
  const avatarUrl = `https://ui-avatars.com/api/?name=${user.fullName}&background=2B6CB0&color=ffffff&size=36&bold=true`;

  const toggleShow = () => setShowSidebar(!showSidebar);

  return (
    <div className="py-4 px-4  border-b  border-contrast/10 w-full flex flex-row justify-between items-center ">
      <div className="flex flex-row justify-start items-center space-x-2">
        <div onClick={toggleShow} className="p-1 bg-primary rounded md:hidden">
          {showSidebar ? (
            <HiX className="text-white text-2xl" />
          ) : (
            <HiMenuAlt4 className="text-white text-2xl" />
          )}
        </div>
        <div>
          <h1 className="text-lg md:text-xl lg:text-2xl">
            Hi{" "}
            <span className="font-semibold lg:font-bold capitalize">
              {" "}
              {user.fullName},{" "}
            </span>{" "}
          </h1>
        </div>
      </div>

      <div className=" flex flex-row justify-end items-center space-x-2 lg:space-x-4 text-contrast/80">
        <div className="center lg:hidden p-2 hover:bg-contrast/5 rounded-full hover:cursor-pointer">
          <MdSearch className="text-2xl" />
        </div>

        <Link
          to="?showNewDialog=true&showSidebar=true"
          className="center lg:hidden p-2 hover:bg-contrast/5 rounded-full hover:cursor-pointer"
        >
          <IoMdAdd className="text-2xl " />
        </Link>

        <div className="center p-2 hover:bg-contrast/5 rounded-full hover:cursor-pointer">
          <MdOutlineNotifications className="text-2xl" />
        </div>

        <div className="center w-[40px] h-[40px] hover:p-1 hover:cursor-pointer border border-c4/60 rounded-xl bg-c4 self-center">
          <img
            src={user.avatarUrl || avatarUrl}
            alt="Avatar"
            className="max-w-[40px] max-h-[40px] rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
