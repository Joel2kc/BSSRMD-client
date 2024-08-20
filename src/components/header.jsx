import { Link } from "wouter";
import Logo from "../assets/logo1.png";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { GoInfo } from "react-icons/go";
import { FaServicestack } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";
import { MdJoinRight } from "react-icons/md";
import { useState } from "react";
import SLink from "./slink.jsx";

export default function Header({ hideList = false }) {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <header className="center w-full fixed top-0 inset-x-0 z-20 bg-neutral">
      {show && (
        <ul className="absolute  inset-x-0 flex flex-col justify-start items-center top-[100%] min-h-screen bg-primary md:hidden">
          <div className="w-[90%] pt-10 space-y-12">
            {[
              {
                name: "Home",
                url: "/#home",
                icon: GoHome,
              },
              {
                name: "Features",
                to: "features",
                icon: FaServicestack,
              },
              {
                name: "How it works",
                to: "howitworks",
                icon: GoInfo,
              },
              {
                name: "Contact",
                to: "contact",
                icon: MdContactSupport,
                offset: -300,
              },

              {
                name: "Register",
                url: "/register",
                icon: MdJoinRight,
              },
            ].map((v, i) => {
              const Icon = v.icon;

              if (v.to) {
                return (
                  <SLink
                    key={i}
                    to={v.to}
                    offset={v.offset || -50}
                    onClick={() => {
                      setShow(false);
                    }}
                    className="flex cursor-pointer justify-start space-x-2  text-4xl text-neutral "
                    activeClass=" border-b-2 pb-2  "
                  >
                    <Icon className="" />
                    <span className="">{v.name}</span>
                  </SLink>
                );
              }
              return (
                <Link
                  className="flex justify-start space-x-2  text-4xl text-neutral"
                  key={i}
                  to={v.url}
                >
                  <Icon className="" />
                  <span className="">{v.name}</span>
                </Link>
              );
            })}
          </div>
        </ul>
      )}

      <div className="w-[90%]">
        <nav className="w-full flex flex-row justify-between items-center pt-4 pb-4 ">
          <Link
            to="/"
            className="flex justify-center items-start   space-x-2 md:space-x-1 self-stretch "
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

          {!hideList && (
            <ul className="self-center list-none  flex-row justify-center items-start  space-x-8 hidden md:flex">
              {[
                {
                  name: "Home",
                  url: "/#home",
                },
                {
                  name: "How it works",
                  to: "howitworks",
                },
                {
                  name: "Features",
                  to: "features",
                },
                {
                  name: "Contact",
                  to: "contact",
                },
              ].map((v, i) => {
                if (v.to) {
                  return (
                    <SLink
                      key={i}
                      to={v.to}
                      offset={-200}
                      className="block cursor-pointer font-medium px-2 pb-2 hover:text-secondary"
                      activeClass=" text-secondary "
                    >
                      <span className="">{v.name}</span>
                    </SLink>
                  );
                }

                return (
                  <Link
                    className="block font-medium px-2 pb-2 hover:text-secondary"
                    key={i}
                    to={v.url}
                  >
                    <span className="">{v.name}</span>
                  </Link>
                );
              })}
            </ul>
          )}

          <div className=" self-stretch hidden md:block">
            <Link to="/register">
              <button className="btn-1 ">Register</button>
            </Link>
          </div>

          <div
            onClick={toggleShow}
            className="md:hidden self-center p-1 border border-primary "
          >
            {show ? (
              <IoClose className="text-primary text-2xl" />
            ) : (
              <HiMenuAlt2 className="text-primary text-2xl" />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
