import Sidebar from "../components/sidebar";
import AuthHeader from "../components/authheader";
import { useState } from "react";
import { withProtectedAccess } from "../components/auth";
import MyFolders from "../components/myfolders";
import MyFiles from "../components/myfiles";
import QuickAccess from "../components/quickaccess";
import { useSearch } from "wouter";
import { useLocation } from "wouter";

const Dashboard = withProtectedAccess(function A({ user, token }) {
  const searchStr = useSearch();
  const showSidebarFromSearchParams =
    new URLSearchParams(searchStr).get("showSidebar") === "true";

  const [_, setLocation] = useLocation();

  // console.log("showSidebarFromSearchParams", showSidebarFromSearchParams);

  const [show, setShow] = useState(showSidebarFromSearchParams);

  function controlSidebar(x) {
    setShow(x);

    if (!x) {
      setLocation("?showSidebar=false&showNewDialog=false");
    }
  }

  return (
    <div key={searchStr} className="w-full min-h-screen">
      <main className="h-full w-full flex flex-row justify-between items-start bg-neutral relative">
        <Sidebar
          showSidebar={!show ? showSidebarFromSearchParams : show}
          setShowSidebar={controlSidebar}
        />

        <div className="w-full  md:w-[75%] lg:w-[80%] xl:w-[85%]      ">
          {/* top header  */}
          <AuthHeader
            user={user}
            showSidebar={show}
            setShowSidebar={controlSidebar}
          />

          <section className="max-h-[90vh] overflow-y-scroll no-scrollbar">
            {/* quick access  */}
            <QuickAccess token={token} />

            {/* my folder  */}
            <MyFolders token={token} />

            {/* all files  */}

            <MyFiles token={token} user={user} />
          </section>
        </div>
      </main>
    </div>
  );
});

export default Dashboard;
