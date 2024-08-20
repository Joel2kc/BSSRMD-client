import FolderIcon from "../assets/icons/icons8-opened-folder-96.png";
import { endpoints } from "../utils/fetchhelpers";
import { useQuery } from "react-query";
import { createFetcher } from "../utils/fetchhelpers";
import FetchErrorView from "./fetcherrorview";
import FetchLoadingView from "./fetchloadingview";
import { mapFileExtensionToIcon } from "../utils/ui";
import cn from "classnames";

function QuickAccess({ token }) {
  const { isLoading, refetch, isError, data } = useQuery({
    queryKey: [endpoints.getRecent, "GET"],
    queryFn: createFetcher({
      method: "GET",
      url: endpoints.getRecent,
      auth: token,
    }),

    refetchInterval: 15000,

    onSuccess: (data) => {
      // console.log(data);
    },
  });

  if (data && data.length === 0) return null;

  return (
    <div className="py-4 px-4  space-y-4 ">
      <h1 className="text-sm font-semibold">Quick Access</h1>

      {isLoading && !data && <FetchLoadingView />}

      {isError && !isLoading && (
        <FetchErrorView
          retry={refetch}
          error="Something went wrong, try again."
        />
      )}

      {data && data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {data.map((v, i) => {
            return (
              <div
                key={i}
                className={
                  "min-w-[200px] py-2 px-2 rounded bg-secondary/5 hover:bg-secondary/10 cursor-default border border-contrast/10  flex-row justify-start items-center space-x-4 " +
                  cn(i > 2 && "hidden md:flex", i < 3 && "flex")
                }
              >
                <div className="bg-primary/10 rounded p-1 center w-max min-w-[15%]">
                  <img
                    src={
                      v.cid ? mapFileExtensionToIcon(v.extension) : FolderIcon
                    }
                    alt="folder"
                    className="w-[28px] "
                  />
                </div>

                <div className="w-full">
                  <h2 className="text-sm text-primary truncate break-words w-full max-w-[80%]">
                    {" "}
                    {v.cid ? v.filename : v.name}{" "}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default QuickAccess;
