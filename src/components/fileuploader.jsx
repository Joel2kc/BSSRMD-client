import { BiX } from "react-icons/bi";
import { useState, useRef, useEffect } from "react";
import { makeUrl } from "../utils/fetchhelpers";
import config from "../config";
import { toast } from "react-toastify";
import cn from "classnames";
import { useQueryClient } from "react-query";
import useAtom from "../utils/hooks/useatom";
import { uploaderState, userState } from "../utils/state/atoms";
import axios from "axios";

export default function FileUploader() {
  const { state, setState } = useAtom(uploaderState);
  const { state: authData } = useAtom(userState);

  const { file, hide } = state;
  const { token } = authData;

  // console.log(file)

  const queryClient = useQueryClient();

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const abortControllerRef = useRef(null);

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadSuccess(false);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(makeUrl(config.endpoints.uploadFile), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${token.tokenType || token.token_type} ${
            token.accessToken || token.access_token
          }`,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
        signal: controller.signal,
      })
      .then((response) => {
        // console.log("File uploaded successfully:", response.data);

        queryClient.invalidateQueries(config.endpoints.getFiles);

        toast.success("File uploaded successfully");
        setUploadSuccess(true);
        setIsUploading(false);

        if (hide) {
          setState({
            hide: false,
            file: null,
          });
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Upload cancelled");
          toast.warn("File upload cancelled.");
        } else {
          console.error("Error uploading file:", error);
          toast.error("Error uploading file, please try again.");

          setState({
            hide: false,
            file: null,
          });
        }
      });
  };

  const hideSelf = () =>
    setState({
      hide: true,
      file: uploadSuccess ? null : file,
    });

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Abort the upload
    }
    setIsUploading(false);

    setState({
      hide: true,
      file: null,
    });
  };

  useEffect(() => {
    handleUpload();
  }, [file]);

  if (!file) return null;

  return (
    <div
      className={
        "min-w-[400px] max-w-[450px]  py-4 bg-primary z-40 absolute  bottom-[5vh] right-4 shadow shadow-black space-y-2 " +
        cn(hide && " hidden")
      }
    >
      <div className="text-white px-4 flex flex-row justify-between items-center">
        <h1 className="text-lg">
          {uploadSuccess ? "Uploaded 1 Item" : "Uploading 1 Item"}
        </h1>

        <BiX
          title="Close"
          onClick={hideSelf}
          className="text-white/80 text-3xl cursor-pointer hover:text-white"
        />
      </div>

      <div className="flex flex-row justify-between items-center px-4 text-white/70 font-medium text-sm">
        <p>
          {uploadSuccess
            ? "Upload Complete"
            : isUploading
            ? "Uploading file..."
            : "Starting upload..."}
        </p>

        {isUploading && !uploadSuccess && (
          <button onClick={handleCancel} className="text-yellow-500">
            Cancel
          </button>
        )}
      </div>

      <div className="flex flex-row justify-between items-center space-x-8 px-4">
        {/* Progress size  */}

        <div className="text-white flex flex-col justify-between items-start  space-y-1 max-w-[30%]">
          <span className="truncate max-w-full"> {file.name} </span>
        </div>

        <div
          className={
            " w-[50%] h-[6px] rounded " +
            cn(
              uploadSuccess && " bg-accent/30 ",
              !uploadSuccess && " bg-neutral/30 "
            )
          }
        >
          <div
            style={{
              width: `${
                !uploadSuccess ? Math.min(uploadProgress, 95) : uploadProgress
              }%`,
            }}
            className={
              "  h-[6px] rounded " +
              cn(uploadSuccess && " bg-accent ", !uploadSuccess && " bg-white ")
            }
          ></div>
        </div>
      </div>
    </div>
  );
}
