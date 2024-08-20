import Sidebar from "../components/sidebar";
import DocIcon from "../assets/icons/icons8-document-96.png";
import cn from "classnames";
import AuthHeader from "../components/authheader";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import { withProtectedAccess } from "../components/auth";

const quickAccess = [
  {
    name: "Resume.pdf",
    isFolder: false,
    itemsCount: 1,
    size: 22,
    fileExtension: "pdf",
  },
  {
    name: "Profile Picture.jpg",
    isFolder: false,
    itemsCount: 1,
    size: 15,
    fileExtension: "jpg",
  },
  {
    name: "Work Documents",
    isFolder: true,
    itemsCount: 10,
    size: 120,
    fileExtension: "",
  },
  {
    name: "Vacation Video.mp4",
    isFolder: false,
    itemsCount: 1,
    size: 150,
    fileExtension: "mp4",
  },
  {
    name: "Project Report.docx",
    isFolder: false,
    itemsCount: 1,
    size: 30,
    fileExtension: "docx",
  },
  {
    name: "Presentation Slides.pptx",
    isFolder: false,
    itemsCount: 1,
    size: 25,
    fileExtension: "pptx",
  },
  {
    name: "Family Photos",
    isFolder: true,
    itemsCount: 8,
    size: 200,
    fileExtension: "",
  },
  {
    name: "Budget Spreadsheet.xlsx",
    isFolder: false,
    itemsCount: 1,
    size: 10,
    fileExtension: "xlsx",
  },
  {
    name: "Music Playlist.mp3",
    isFolder: false,
    itemsCount: 1,
    size: 50,
    fileExtension: "mp3",
  },
  {
    name: "Recipes.pdf",
    isFolder: false,
    itemsCount: 1,
    size: 18,
    fileExtension: "pdf",
  },
];

const SharedWithMe = withProtectedAccess(function A({ user }) {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full min-h-screen">
      <main className="h-full w-full flex flex-row justify-between items-start bg-neutral ">
        <Sidebar showSidebar={show} setShowSidebar={setShow} />

        <div className="w-full  md:w-[75%] lg:w-[80%] xl:w-[85%]      ">
          {/* top header  */}
          <AuthHeader user={user} showSidebar={show} setShowSidebar={setShow} />

          <section className="max-h-[90vh] overflow-y-scroll no-scrollbar">
            {/* shared with me  */}
            <div className="py-4 px-4  space-y-4 ">
              <div className="flex flex-row justify-between items-center w-full">
                <h1 className="text-sm font-semibold"> Shared With Me</h1>

                <div className="flex flex-row justify-center items-center space-x-2">
                  <span className="cursor-pointer hover:underline text-primary text-right text-sm">
                    Prev
                  </span>

                  <div className="w-6 h-6 center bg-primary  cursor-pointer rounded-full">
                    <span className=" text-xs  text-white ">1</span>
                  </div>

                  <span className="cursor-pointer hover:underline text-primary text-right text-sm">
                    Next
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {quickAccess.map((v, i) => {
                  return (
                    <div
                      key={i}
                      className="min-w-[200px] py-2 px-2 rounded bg-secondary/5 hover:bg-secondary/10 cursor-default border border-contrast/10 flex flex-row justify-start items-center space-x-4"
                    >
                      <div className="bg-primary/10 h-max rounded p-1 center w-max">
                        <img
                          src={DocIcon}
                          alt="file"
                          className="w-[28px] h-max"
                        />
                      </div>

                      <div className="">
                        <h2 className="text-sm text-primary"> {v.name} </h2>

                        <p className="text-[10px] pt-1 text-contrast/50">
                          {v.size} MB |{" "}
                          <div className="text-[10px] inline-block center font-medium capitalize px-1  border border-contrast/50 text-contrast/50 rounded ">
                            <span>{i % 2 === 0 ? "Read" : "Write"}</span>
                          </div>
                        </p>

                        <div className="flex flex-row justify-start items-center space-x-1 text-[10px] pt-1 text-primary/70">
                          <FaLock className="text-xs" />
                          <p className="self-center">
                            <span>Shared by </span>
                            <span className="font-semibold"> John Damola </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* shared with others   */}
            <div className="py-4 px-4  space-y-4 ">
              <div className="flex flex-row justify-between items-center w-full">
                <h1 className="text-sm font-semibold"> Shared With Others</h1>

                <div className="flex flex-row justify-center items-center space-x-2">
                  <span className="cursor-pointer hover:underline text-primary text-right text-sm">
                    Prev
                  </span>

                  <div className="w-6 h-6 center bg-primary  cursor-pointer rounded-full">
                    <span className=" text-xs  text-white ">1</span>
                  </div>

                  <span className="cursor-pointer hover:underline text-primary text-right text-sm">
                    Next
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {quickAccess.map((v, i) => {
                  return (
                    <div
                      key={i}
                      className="min-w-[200px] py-2 px-2 rounded bg-secondary/5 hover:bg-secondary/10 cursor-default border border-contrast/10 flex flex-row justify-start items-center space-x-4"
                    >
                      <div className="bg-primary/10 h-max rounded p-1 center w-max">
                        <img
                          src={DocIcon}
                          alt="file"
                          className="w-[28px] h-max"
                        />
                      </div>

                      <div className="">
                        <h2 className="text-sm text-primary"> {v.name} </h2>

                        <p className="text-[10px] pt-1 text-contrast/50">
                          {v.size} MB |{" "}
                          <div className="text-[10px] inline-block center font-medium capitalize px-1  border border-contrast/50 text-contrast/50 rounded ">
                            <span>{i % 2 === 0 ? "Read" : "Write"}</span>
                          </div>
                        </p>

                        <div className="flex flex-row justify-start items-center space-x-1 text-[10px] pt-1 text-primary/70">
                          <FaLock className="text-xs" />
                          <p className="self-center">
                            <span>Shared with </span>
                            <span className="font-semibold"> 4 </span> others
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
});

export default SharedWithMe;
