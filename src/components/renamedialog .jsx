import { useClickAway } from "react-use";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createFetcher, endpoints } from "../utils/fetchhelpers";
import { toast } from "react-toastify";
import useAtom from "../utils/hooks/useatom";
import { userState, renameDialogState } from "../utils/state/atoms";

export default function RenameDialog() {
  const { state, setState } = useAtom(renameDialogState);
  const { show, resourceUid, isFolder, currentName } = state;

  const { state: authData } = useAtom(userState);

  const ref = useRef(null);

  const [inputError, setInputError] = useState(false);
  const [fname, setFname] = useState(currentName);

  const queryClient = useQueryClient();

  const { isLoading, reset, mutate } = useMutation({
    mutationKey: [
      isFolder ? endpoints.renameFolder : endpoints.renameFile,
      "POST",
    ],
    mutationFn: createFetcher({
      url: isFolder ? endpoints.renameFolder : endpoints.renameFile,
      method: "PUT",
      auth: authData.token,
      surfix: `/${resourceUid}/rename?newName=${fname}`,
    }),

    onSuccess(data) {
      queryClient.invalidateQueries(
        isFolder ? endpoints.getFolders : endpoints.getFiles
      );

      toast.success(` ${isFolder ? "Folder" : "File"} renamed successfully.`);

      setFname("");

      closeDialog();
    },

    onError(err) {
      reset();
      toast.error(err.message);
    },
  });

  function closeDialog() {
    setState({
      show: false,
      resourceUid: null,
      isFolder: false,
      currentName: "",
    });
  }

  const onFnameChange = (e) => {
    setFname(e.target.value);
    setInputError(null);
  };

  useClickAway(ref, closeDialog);

  function handleSave() {
    if (!fname) {
      setInputError("Name is required");
      return;
    }

    if (fname.length < 3) {
      setInputError("Name must be at least 3 characters");
      return;
    }

    // regex for filename validation, can have letters, numbers and  spaces only

    if (!/^[a-zA-Z0-9 \-_.(){}[\],&@+!|]+$/.test(fname)) {
      setInputError(
        "Name can only contain letters, numbers, spaces, and certain special characters (- _ . ( ) { } [ ] , & @ + ! |)"
      );
      return;
    }

    // must start with a letter
    if (!/^[a-zA-Z]/.test(fname)) {
      setInputError("Name must start with a letter");
      return;
    }

    setInputError("");

    mutate({
      name: fname,
    });
  }

  if (!show) return;

  return (
    <>
      <div className="fixed inset-0 w-full min-h-screen z-30 bg-black opacity-60"></div>
      <div className="fixed z-40  inset-0 min-h-screen w-full center">
        <div
          ref={ref}
          className="bg-neutral w-[300px] px-6 py-4 rounded space-y-2"
        >
          <h1 className=" text-lg">
            {" "}
            {isFolder ? "Rename Folder" : "Rename File"}{" "}
          </h1>

          <input
            value={fname}
            onChange={onFnameChange}
            className="block w-full border-2 border-primary bg-neutral/20 focus:bg-white outline-none rounded px-4 py-2 "
            name="name"
            placeholder={`Enter new ${isFolder ? "folder" : "file"} name`}
          />

          {inputError && <p className="text-red-500 text-xs"> {inputError} </p>}

          <div className="w-full flex flex-row justify-between items-center">
            <button
              onClick={handleSave}
              className="outline-none disabled:pointer-events-none disabled:opacity-20 cursor-pointer py-4 text-primary capitalize font-medium text-base"
              disabled={isLoading}
            >
              {isLoading ? "Working..." : "Rename"}
            </button>

            <button
              onClick={closeDialog}
              className="outline-none cursor-pointer py-4 text-primary capitalize font-medium text-base"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
