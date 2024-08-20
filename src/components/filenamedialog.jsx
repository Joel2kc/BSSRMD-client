import { useClickAway } from "react-use";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createFetcher, endpoints } from "../utils/fetchhelpers";
import { toast } from "react-toastify";

export default function FilenameDialog({ show, setShow, token, onSettled }) {
  const ref = useRef(null);

  const [inputError, setInputError] = useState(false);
  const [fname, setFname] = useState("");

  const queryClient = useQueryClient();

  const { isLoading, reset, mutate } = useMutation({
    mutationKey: [endpoints.createFolder, "POST"],
    mutationFn: createFetcher({
      url: endpoints.createFolder,
      method: "POST",
      auth: token,
    }),

    onSuccess(data) {
      queryClient.invalidateQueries(endpoints.getFolders);

      toast.success("Folder created.");
      setShow(false);
      setFname("");

      onSettled();
    },

    onError(err) {
      reset();
      toast.error(err.message);
    },
  });

  const onFnameChange = (e) => {
    setFname(e.target.value);
    setInputError(null);
  };

  useClickAway(ref, () => {
    setShow(false);
  });

  function handleSave() {
    if (!fname) {
      setInputError("Folder name is required");
      return;
    }

    if (fname.length < 3) {
      setInputError("Folder name must be at least 3 characters");
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
      setInputError("Folder name must start with a letter");
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
          <h1 className=" text-lg"> New Folder </h1>

          <input
            value={fname}
            onChange={onFnameChange}
            className="block w-full border-2 border-primary bg-neutral/20 focus:bg-white outline-none rounded px-4 py-2 "
            name="folderName"
            placeholder="Enter folder name"
          />

          {inputError && <p className="text-red-500 text-xs"> {inputError} </p>}

          <div className="w-full flex flex-row justify-between items-center">
            <button
              onClick={handleSave}
              className="outline-none disabled:pointer-events-none disabled:opacity-20 cursor-pointer py-4 text-primary capitalize font-medium text-base"
              disabled={isLoading}
            >
              {isLoading ? "Working..." : "Create"}
            </button>

            <button
              onClick={() => setShow(false)}
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
