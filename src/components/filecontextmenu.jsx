import { useClickAway } from "react-use";
import { useRef } from "react";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { MdOutlinePreview } from "react-icons/md";
import { LiaShareAltSolid } from "react-icons/lia";
import useAtom from "../utils/hooks/useatom";
import { mediaPreviewState, renameDialogState } from "../utils/state/atoms";
import { useMutation, useQueryClient } from "react-query";
import { createFetcher, endpoints } from "../utils/fetchhelpers";
import { toast } from "react-toastify";
import cn from "classnames";

const contextOptions = [
  {
    name: "Preview",
    value: "preview",
    icon: MdOutlinePreview,
  },
  {
    name: "Rename",
    value: "rename",
    icon: MdDriveFileRenameOutline,
  },

  {
    name: "Share",
    value: "share",
    icon: LiaShareAltSolid,
  },
  {
    name: "View Activity",
    value: "acivity",
    icon: FiActivity,
  },
  {
    name: "Trash",
    value: "delete",
    icon: MdDelete,
  },
];

export default function FileContextMenu({
  show,
  setShow,
  onSelect,
  file,
  token,
}) {
  const ref = useRef(null);

  //  mutations for actions
  const queryClient = useQueryClient();

  const {
    isLoading: trashingFile,
    mutate: trashFile,
    reset: resetTrashFile,
  } = useMutation({
    mutationKey: ["DELETE", endpoints.trashFile],

    mutationFn: createFetcher({
      url: endpoints.trashFile,
      method: "DELETE",
      auth: token,
      surfix: `/${file.uid}`,
    }),

    onSuccess: () => {
      queryClient.invalidateQueries(endpoints.getFiles);
      queryClient.invalidateQueries(endpoints.getTrash);
      setShow(null);
      toast.success("File trashed.");
    },

    onError: (err) => {
      resetTrashFile();
      console.log(err);
      toast.error("Failed to trash file. Please try again.");
    },
  });

  const { setState: setMediaPreviewState } = useAtom(mediaPreviewState);

  const { setState: setRenameDialogState } = useAtom(renameDialogState);

  useClickAway(ref, () => {
    setShow(null);
  });

  function getActionHandler(v) {
    return () => {
      setShow(null);

      if (v.value === "preview") {
        setMediaPreviewState({
          show: true,
          data: {
            extension: file.extension,
            uid: file.uid,
          },
        });
      } else if (v.value === "delete") {
        trashFile();
      } else if (v.value === "rename") {
        setRenameDialogState({
          show: true,
          resourceUid: file.uid,
          isFolder: false,
          currentName: file.filename,
        });
      } else {
        onSelect(v);
      }
    };
  }

  if (!show) return;

  return (
    <div
      ref={ref}
      className={
        "overflow-y-scroll w-full max-w-[250px] custom-scrollbar max-h-[300px] absolute z-40 top-0 right-0 min-w-[200px] bg-neutral  py-2 shadow shadow-black/40  " +
        cn(trashingFile && " opacity-50 pointer-events-none")
      }
    >
      {contextOptions.map((v, i) => {
        const Icon = v.icon;
        return (
          <div
            onClick={getActionHandler(v)}
            key={i}
            className="text-primary text-sm cursor-pointer px-4 border-b border-primary/20 py-3 hover:bg-black/5   flex flex-row justify-start space-x-4"
          >
            {v.icon && <Icon className="text-xl " />}

            <span className="whitespace-nowrap"> {v.name} </span>
          </div>
        );
      })}
    </div>
  );
}
