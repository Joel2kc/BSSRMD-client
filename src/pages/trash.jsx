import Sidebar from "../components/sidebar";
import AuthHeader from "../components/authheader";
import cn from "classnames";
import { BsTrash } from "react-icons/bs";
import { useState } from "react";
import { withProtectedAccess } from "../components/auth";
import { useSearch } from "wouter";
import { useLocation } from "wouter";
import FetchLoadingView from "../components/fetchloadingview";
import FetchErrorView from "../components/fetcherrorview";
import EmptyDataView from "../components/emptydataview";
import { createFetcher, endpoints } from "../utils/fetchhelpers";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { convertBytesToHigherUnit, mapFileExtensionToIcon } from "../utils/ui";
import { LiaTrashRestoreAltSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import FilterList from "../components/filterlist";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaRegFileImage } from "react-icons/fa";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { MdAudiotrack } from "react-icons/md";
import { FaFile } from "react-icons/fa";
import { FaRegFileArchive } from "react-icons/fa";
import { RxReset } from "react-icons/rx";
import { IoMdArrowDropdown } from "react-icons/io";

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

const Trash = withProtectedAccess(function A({ user, token }) {
  const searchStr = useSearch();
  const showSidebarFromSearchParams =
    new URLSearchParams(searchStr).get("showSidebar") === "true";

  const [_, setLocation] = useLocation();

  const [showFilter, setShowFilter] = useState(false);

  // console.log("showSidebarFromSearchParams", showSidebarFromSearchParams);

  const [show, setShow] = useState(showSidebarFromSearchParams);

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
      url: `${endpoints.getTrash}?${search}`,
      auth: token,
    }),

    refetchInterval: 30000,

    onSuccess(data) {
      //   console.log(data);
    },
  });

  const queryClient = useQueryClient();

  const {
    isLoading: restoringFile,
    reset: resetRestoring,
    mutate: restoreFile,
  } = useMutation({
    mutationKey: [endpoints.restoreFile, "POST"],
    mutationFn: createFetcher({
      url: endpoints.restoreFile,
      method: "POST",
      auth: token,
    }),

    onSuccess(data) {
      queryClient.invalidateQueries(endpoints.getTrash);
      queryClient.invalidateQueries(endpoints.getFiles);

      toast.success("File restored.");
    },

    onError(err) {
      resetRestoring();
      toast.error(err.message);
    },
  });

  function restoreFileHandler(uid) {
    return () => {
      restoreFile({ uid });
    };
  }

  function controlSidebar(x) {
    setShow(x);

    if (!x) {
      setLocation("?showSidebar=false&showNewDialog=false");
    }
  }

  return (
    <div className="w-full min-h-screen">
      <main className="h-full w-full flex flex-row justify-between items-start bg-neutral ">
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

          <section className="max-h-[90vh] min-h-[80vh] overflow-y-scroll no-scrollbar">
            {/* empty trash button  */}
            <div className="py-4 px-4  space-y-4 ">
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-base lg:text-lg font-semibold"> Trash </h1>

                <div className="flex flex-row justify-start items-center space-x-4">
                  <div className="relative">
                    <div
                      onClick={() => setShowFilter(true)}
                      className="  rounded-lg px-4 py-2  flex flex-row justify-center space-x-2 text-sm font-medium cursor-pointer hover:bg-c4/10  "
                    >
                      <span className="inline-block self-center">
                        {params.fileType
                          ? fileTypes.find((v) => v.value === params.fileType)
                              .name
                          : "Type"}
                      </span>
                      <IoMdArrowDropdown className="text-xl text-c4/70 self-center" />
                    </div>

                    <FilterList
                      setShow={setShowFilter}
                      show={showFilter}
                      items={fileTypes}
                      onSelect={(v) => {
                        setParams({
                          ...params,
                          fileType: v.value,
                        });
                        setShowFilter(false);
                      }}
                    />
                  </div>

                  <div className="rounded-lg px-4 py-2 hover:shadow hover:shadow-black/20 flex flex-row justify-center space-x-2 text-sm  cursor-pointer bg-primary/10">
                    <BsTrash className="text-sm text-c4/70 self-center" />
                    <span className="inline-block self-center">
                      Empty trash
                    </span>
                  </div>
                </div>
              </div>

              {isLoading && !data && <FetchLoadingView />}

              {isError && !isLoading && (
                <FetchErrorView
                  retry={refetch}
                  error="Unable to load trash, try again"
                />
              )}

              {data && data.numItems === 0 && !isLoading && (
                <EmptyDataView
                  actionText="Refresh"
                  action={refetch}
                  msg={
                    data.unfilteredEntries > 0
                      ? "No file matched your filters"
                      : "No files found"
                  }
                />
              )}

              {data && data.numItems > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 ">
                  {data.items.map((v, i) => {
                    return (
                      <div key={v.uid + i} className="space-y-2">
                        <div className="relative min-w-[200px] py-2 px-2 rounded bg-secondary/5 hover:bg-secondary/10 cursor-default border border-contrast/10 flex flex-row justify-start items-center space-x-4 group ">
                          <div className="bg-primary/10 rounded p-1 center w-max min-w-[15%]">
                            <img
                              src={mapFileExtensionToIcon(v.extension)}
                              alt="folder"
                              className="w-[28px] "
                            />
                          </div>

                          <div className="min-w-[85%]">
                            <h2 className="text-sm text-primary max-w-[90%] truncate">
                              {" "}
                              {v.filename}{" "}
                            </h2>

                            <p className="text-[10px]  text-contrast/50">
                              {v.itemsCount > 1 && v.itemsCount + " Items |"}{" "}
                              {convertBytesToHigherUnit(v.fileSize)}
                            </p>
                          </div>
                        </div>

                        <button
                          disabled={restoringFile}
                          onClick={restoreFileHandler(v.uid)}
                          className="flex flex-row justify-start items-center space-x-1 text-primary/90 group border border-primary/50 px-2 py-1 hover:bg-primary/5 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {restoringFile ? (
                            <div className="w-4 h-4 border-t-2 border-primary/90 rounded-full animate-spin"></div>
                          ) : (
                            <>
                              <LiaTrashRestoreAltSolid className="text-base " />
                              <span className="text-xs ">Restore</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
});

export default Trash;
