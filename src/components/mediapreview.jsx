import FileViewer from "react-file-viewer";
import useAtom from "../utils/hooks/useatom";
import { mediaPreviewState } from "../utils/state/atoms";
import { useEffect } from "react";
import { BiX } from "react-icons/bi";
import { endpoints, makeUrl } from "../utils/fetchhelpers";
import { userState } from "../utils/state/atoms";

export default function MediaPreview() {
  const { state, setState } = useAtom(mediaPreviewState);
  const { show, data } = state;
  const { state: authData } = useAtom(userState);

  const accessToken =
    authData?.token?.accessToken || authData?.token?.access_token;

  function closePreview() {
    setState({
      show: false,
      data: null,
    });
  }

  //   esc cancel

  useEffect(() => {
    function closeOnEsc(e) {
      if (e.key === "Escape") {
        closePreview();
      }
    }
    window.addEventListener("keydown", closeOnEsc);
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, []);

  if (!show) return null;

  const remoteUrl = makeUrl(
    `${endpoints.getFileStream}/${data.uid}?token=${accessToken}`
  );

  if (!accessToken) return null;

  return (
    <>
      <div className="fixed inset-0 min-h-screen w-full bg-black backdrop-blur bg-opacity-50 z-20">
        <div
          onClick={closePreview}
          className="center p-2 bg-white/10 w-max rounded-full absolute top-4 right-4 cursor-pointer hover:bg-white/20"
        >
          <BiX className="text-2xl lg:text-3xl text-white" />
        </div>
      </div>
      <div className=" z-30 center  max-h-[99vh] fixed  left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2  ">
        <FileViewer fileType={data.extension} filePath={remoteUrl} />
      </div>
    </>
  );
}
