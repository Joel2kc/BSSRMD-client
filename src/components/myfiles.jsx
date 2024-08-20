import { IoMdArrowDropdown } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import cn from "classnames";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { endpoints } from "../utils/fetchhelpers";
import { useQuery } from "react-query";
import { createFetcher } from "../utils/fetchhelpers";
import { useState } from "react";
import FetchErrorView from "./fetcherrorview";
import FetchLoadingView from "./fetchloadingview";
import { convertBytesToHigherUnit, mapFileExtensionToIcon } from "../utils/ui";
import moment from "moment";
import FilterList from "./filterlist";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegFileImage } from "react-icons/fa";
import { MdOutlineVideoLibrary, MdSearch } from "react-icons/md";
import { MdAudiotrack } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import { FaRegFileArchive } from "react-icons/fa";
import { RxReset } from "react-icons/rx";
import EmptyDataView from "./emptydataview";
import FileContextMenu from "./filecontextmenu";

const publishedTimelines = [
  {
    name: "All",
    value: null,
  },

  {
    name: "Last 30 mins",
    value: "LAST_30_MINS",
  },
  {
    name: "Today",
    value: "TODAY",
  },

  {
    name: "Yesterday",
    value: "YESTERDAY",
  },

  {
    name: "Last 7 days",
    value: "LAST_7_DAYS",
  },

  {
    name: "Last 30 days",
    value: "LAST_30_DAYS",
  },

  //   {
  //     name: "Last 90 days",
  //     value: "LAST_90_DAYS",
  //   },
];

const fileTypes = [
  {
    name: "All",
    value: null,
    icon: RxReset,
  },
  {
    name: "Documents",
    value: "DOCUMENT",
    icon: IoDocumentTextOutline,
  },

  {
    name: "Images",
    value: "IMAGE",
    icon: FaRegFileImage,
  },
  {
    name: "Videos",
    value: "VIDEO",
    icon: MdOutlineVideoLibrary,
  },

  {
    name: "Audio",
    value: "AUDIO",
    icon: MdAudiotrack,
  },

  {
    name: "Archives",
    value: "ARCHIVE",
    icon: FaRegFileArchive,
  },

  {
    name: "Others",
    value: "OTHER",
    icon: FaFile,
  },
];

export default function MyFiles({ token, user }) {
  const [showFilter1, setShowFilter1] = useState(false);
  const [showFilter2, setShowFilter2] = useState(false);

  const [showContextMenu, setShowContextMenu] = useState(null);

  const [params, setParams] = useState({
    page: 1,
    limit: 6,
    sortBy: "filename",
    asc: true,
    published: null,
    fileType: null,
  });

  //   strip away null values

  const tempParams = params;

  Object.keys(params).forEach(
    (key) => tempParams[key] === null && delete tempParams[key]
  );

  const search = new URLSearchParams(tempParams).toString();

  const { isLoading, refetch, isError, data, isSuccess } = useQuery({
    queryKey: [endpoints.getFiles, "GET", params],
    queryFn: createFetcher({
      method: "GET",
      url: `${endpoints.getFiles}?${search}`,
      auth: token,
    }),

    onSuccess(data) {
      //   console.log(data);
    },
  });

  function loadNext() {
    if (isLoading) return;
    setParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }

  function loadPrev() {
    if (isLoading) return;

    setParams((prev) => ({ ...prev, page: prev.page - 1 }));
  }

  return (
    <div className="pb-4 px-4 min-h-[50vh] ">
      <div className="flex py-4  sticky top-0 bg-neutral z-10 flex-row justify-between items-center w-full">
        <div className="flex flex-row justify-start items-center space-x-4">
          <h1 className="text-base lg:text-lg font-semibold whitespace-nowrap">
            {" "}
            All Files
          </h1>

          <div className="center hidden lg:flex p-2 hover:bg-contrast/5 rounded-full hover:cursor-pointer">
            <MdSearch className="text-2xl" />
          </div>
        </div>

        <div className="flex flex-row justify-start items-center space-x-4">
          <div className="relative">
            <div
              onClick={() => setShowFilter1(true)}
              className="  rounded-lg px-4 py-2  flex flex-row justify-center space-x-2 text-sm font-medium cursor-pointer hover:bg-c4/10  "
            >
              <span className="inline-block self-center">
                {params.fileType
                  ? fileTypes.find((v) => v.value === params.fileType).name
                  : "Type"}
              </span>
              <IoMdArrowDropdown className="text-xl text-c4/70 self-center" />
            </div>

            <FilterList
              setShow={setShowFilter1}
              show={showFilter1}
              items={fileTypes}
              onSelect={(v) => {
                setParams({
                  ...params,
                  fileType: v.value,
                });
                setShowFilter1(false);
              }}
            />
          </div>

          <div className="relative">
            <div
              onClick={() => setShowFilter2(true)}
              className="rounded-lg px-4 py-2  flex flex-row justify-center space-x-2 text-sm font-medium cursor-pointer hover:bg-c4/10"
            >
              <span className="inline-block self-center">
                {params.published
                  ? publishedTimelines.find((v) => v.value === params.published)
                      .name
                  : "Published"}
              </span>
              <IoMdArrowDropdown className="text-xl text-c4/70 self-center" />
            </div>

            <FilterList
              setShow={setShowFilter2}
              show={showFilter2}
              items={publishedTimelines}
              onSelect={(v) => {
                setParams({
                  ...params,
                  published: v.value,
                });
                setShowFilter2(false);
              }}
            />
          </div>
          {isSuccess && data.numPages > 1 && (
            <div className="hidden md:flex flex-row justify-center font-medium items-center space-x-2">
              {data.hasPrev && (
                <div
                  onClick={loadPrev}
                  className="center p-2  hover:bg-contrast/10 rounded-full hover:cursor-pointer"
                >
                  <FaArrowLeft />
                </div>
              )}

              <div className="w-6 h-6 center bg-contrast  rounded-full">
                <span className=" text-sm  text-white "> {data.page} </span>
              </div>

              {data.hasNext && (
                <div
                  onClick={loadNext}
                  className="center p-2  hover:bg-contrast/10 rounded-full hover:cursor-pointer"
                >
                  <FaArrowRight />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {isLoading && !data && <FetchLoadingView />}

      {isError && !isLoading && (
        <FetchErrorView
          retry={refetch}
          error="Unable to fetch your files, try again"
        />
      )}

      {data && data.numItems === 0 && !isLoading && (
        <EmptyDataView
          actionText="Refresh"
          action={refetch}
          msg={
            data.unfilteredEntries > 0
              ? "No file matched your filters"
              : "No files found, upload a file to see it here"
          }
        />
      )}

      {data && data.numItems > 0 && (
        <div className="">
          <div className="w-full  hidden md:block  top-14 z-10 bg-neutral">
            <div className="grid grid-cols-3 lg:grid-cols-4 w-full py-4 border-b border-contrast/10">
              {[
                "Name",
                "Published",
                // "Size",
                "Owner",
                // "Permissions",
                "Members",
              ].map((v) => (
                <div
                  key={v}
                  className={
                    " w-full " + cn(v === "Permissions" && "hidden lg:block")
                  }
                >
                  <h2 className={" text-base font-bold text-primary "}>{v}</h2>
                </div>
              ))}
            </div>
          </div>
          {data.items.map((v, i) => {
            return (
              <>
                <div
                  key={v.uid + i}
                  className="pr-4 hidden md:block w-full hover:bg-primary/5 group relative"
                >
                  {/* more menu  */}

                  {((showContextMenu && showContextMenu === v.uid) ||
                    !showContextMenu) && (
                    <div className="absolute top-1/2 -translate-y-1/2 right-2 z-30">
                      <div
                        onClick={() => setShowContextMenu(v.uid)}
                        className="opacity-0 group-hover:opacity-100 center p-2 hover:bg-contrast/5 rounded-full hover:cursor-pointer "
                      >
                        <BsThreeDotsVertical className="text-2xl text-primary/50" />
                      </div>

                      <FileContextMenu
                        file={v}
                        show={showContextMenu === v.uid}
                        setShow={setShowContextMenu}
                        token={token}
                        onSelect={() => {
                          setShowContextMenu(null);
                        }}
                      />
                    </div>
                  )}
                  {/* more menu  */}

                  <div className="grid grid-cols-3 lg:grid-cols-4 w-full py-4 border-b border-contrast/10">
                    {/* 1 */}
                    <div className="flex flex-row justify-start items-start space-x-2 w-full  ">
                      <img
                        src={mapFileExtensionToIcon(v.extension)}
                        className="w-[32px] min-w-[15%]"
                        alt=""
                      />

                      <div className="flex flex-col justify-start items-start min-w-[85%]">
                        <h2 className="text-sm font-bold text-primary break-words truncate w-min max-w-[90%]">
                          {v.filename}
                        </h2>
                        <span className="text-xs text-primary/50">
                          {convertBytesToHigherUnit(v.fileSize)}
                        </span>
                      </div>
                    </div>

                    {/* 2 */}

                    <div className="text-sm font-medium w-full ">
                      <h3 className="  text-primary">
                        {moment(new Date(v.createdAt * 1000)).fromNow()}
                      </h3>
                      <p className="text-primary/40">By Me </p>
                    </div>

                    {/* 3 */}

                    {/* <div className="text-sm font-medium  w-full ">
                      <h3 className="  text-primary">{i + 1 * 0.34} KB</h3>
                    </div> */}

                    {/* 4 */}

                    <div className="text-sm font-medium flex flex-row justify-start items-start space-x-2 w-full ">
                      <div className="w-8 h-8  bg-primary/20 rounded-full self-center"></div>
                      <h3 className="  text-primary self-center">
                        {v.userId === user.uid ? "You" : "Others"}
                      </h3>
                    </div>

                    {/* 5 */}

                    {/* <div className="  grid-cols-3  gap-1   w-max hidden lg:grid self-start  ">
                      <div className="text-[10px] center font-medium capitalize px-1 py-[2px] border border-primary text-primary rounded ">
                        <span>Read</span>
                      </div>

                    
                      <div className="text-[10px] center font-medium capitalize px-1 py-[2px] border border-primary text-primary rounded ">
                        <span>Download</span>
                      </div>
                    </div> */}

                    {/* 6 */}

                    <div className="flex flex-row justify-start items-center space-x-2 w-full ">
                      <div className="flex flex-row justify-center items-center -space-x-4">
                        {Array(3)
                          .fill(3)
                          .map((v, i) => {
                            return (
                              <div
                                key={v + i}
                                className="w-8 h-8 hover:z-10 bg-primary rounded-full"
                              ></div>
                            );
                          })}
                      </div>

                      <div className="">
                        <span className="text-primary/60 text-xs font-bold">
                          + 2
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-c4/20"></div>
                </div>

                <div
                  key={v.uid + "-mobile"}
                  className="pr-4  md:hidden w-full hover:bg-primary/5 group relative"
                >
                  <div className="grid grid-cols-2 w-full py-4 border-b border-contrast/10">
                    {/* 1 */}
                    <div className="flex flex-row justify-start items-start space-x-2 w-full ">
                      <img
                        src={mapFileExtensionToIcon(v.extension)}
                        className="w-[24px] min-w-[15%]"
                        alt=""
                      />

                      <div className="flex flex-col justify-start items-start w-full max-w-[80%]">
                        <h2 className="text-sm font-medium text-primary truncate max-w-[90%]">
                          {v.filename}
                        </h2>
                        <span className="text-xs text-primary/50">
                          {convertBytesToHigherUnit(v.fileSize)}
                        </span>

                        <div className="">
                          <span className="text-primary/60 text-xs font-bold">
                            2 Members
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 4 */}

                    <div className="flex flex-col  space-y-2">
                      <div className="text-sm font-medium flex flex-row justify-end items-start space-x-1 w-full   self-start  ">
                        <h3 className="  text-primary self-center">Owned by</h3>
                        <h3 className="  text-primary self-center">
                          {v.userId === user.uid ? "You" : "Others"}
                        </h3>
                      </div>

                      <div className="text-xs  w-full flex flex-row justify-end items-start">
                        <h3 className="  text-primary/60">
                          Uploaded{" "}
                          {moment(new Date(v.createdAt * 1000)).fromNow()}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}
