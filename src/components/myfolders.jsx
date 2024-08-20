import FolderIcon from "../assets/icons/icons8-opened-folder-96.png";
import { endpoints } from "../utils/fetchhelpers";
import { useQuery } from "react-query";
import { createFetcher } from "../utils/fetchhelpers";
import { useState } from "react";
import FetchErrorView from "./fetcherrorview";
import FetchLoadingView from "./fetchloadingview";
import { convertBytesToHigherUnit } from "../utils/ui";
import EmptyDataView from "./emptydataview";

export default function MyFolders({ token }) {
  const [viewAll, setViewAll] = useState(false);

  const { isLoading, refetch, isError, data, isSuccess } = useQuery({
    queryKey: [endpoints.getFolders, "GET"],
    queryFn: createFetcher({
      method: "GET",
      url: endpoints.getFolders,
      auth: token,
    }),
  });

  const folders = Array.isArray(data)
    ? viewAll
      ? data
      : data.slice(0, 5)
    : data;

  return (
    <div className="py-4 px-4  space-y-4 ">
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="text-sm font-semibold"> My Folders</h1>

        {isSuccess && data && data.length > 5 && (
          <span
            onClick={() => setViewAll(!viewAll)}
            className="cursor-pointer hover:underline text-primary text-right text-sm"
          >
            {viewAll ? "View less" : "View all"}
          </span>
        )}
      </div>

      {isLoading && !data && <FetchLoadingView />}

      {isError && !isLoading && (
        <FetchErrorView
          retry={refetch}
          error="Unable to fetch your folders, try again"
        />
      )}

      {data && data.length === 0 && !isLoading && (
        <EmptyDataView
          actionText="Refresh"
          action={refetch}
          msg="You do not have any folders yet"
        />
      )}

      {data && data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {folders.map((v, i) => {
            return (
              <div
                key={i}
                className="min-w-[200px] py-2 px-2 rounded bg-secondary/5 hover:bg-secondary/10 cursor-default border border-contrast/10 flex flex-row justify-start items-center space-x-4"
              >
                <div className="bg-primary/10 rounded p-1 center w-max min-w-[15%]">
                  <img src={FolderIcon} alt="folder" className="w-[28px]" />
                </div>

                <div className="min-w-[85%]">
                  <h2 className="text-sm text-primary truncate max-w-[95%]">
                    {v.name}
                  </h2>

                  <p className="text-[10px]  text-contrast/50">
                    {v.numberOfFiles + v.numberOfFolders} Items |{" "}
                    {convertBytesToHigherUnit(v.estimatedSize)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
