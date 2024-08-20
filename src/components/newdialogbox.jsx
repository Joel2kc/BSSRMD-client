import { MdOutlineCreateNewFolder } from "react-icons/md";
import { MdOutlineUploadFile } from "react-icons/md";
import { useClickAway } from "react-use";
import { useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { toast } from "react-toastify";

export default function NewDialogBox({
  show,
  setShow,
  onSelectFolder,
  onSelectFile,
  onClick = null,
}) {
  const ref = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    setShow(false);
    onSelectFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [".mp4"],
      "video/mkv": [".mkv"],
      "audio/mpeg": [".mp3"],
      "audio/wav": [".wav"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "application/pdf": [".pdf"],
      "application/zip": [".zip"],
      "text/plain": [".txt"],
      "application/vnd.ms-excel": [".xls", ".xlsx"],
      "application/msword": [".doc", ".docx"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".pptx"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],

      // epubs
      "application/epub+zip": [".epub"],
      "application/x-mobipocket-ebook": [".mobi"],
      "application/x-ms-reader": [".lit"],
      "application/x-dtbncx+xml": [".ncx"],
      "application/x-dtbook+xml": [".dtb"],
      "application/x-dtbresource+xml": [".res"],

      // code files
      "text/html": [".html"],
      "text/css": [".css"],
      "text/javascript": [".js"],
      "application/json": [".json"],
      "application/xml": [".xml"],
      "text/x-python": [".py"],
      "text/x-c": [".c"],
      "text/x-c++": [".cpp"],
      "text/x-java-source": [".java"],
      "text/x-php": [".php"],
      "text/x-ruby": [".rb"],
      "text/x-perl": [".pl"],
      "text/x-shellscript": [".sh"],
      "text/x-sql": [".sql"],
      "text/x-yaml": [".yaml"],
      "text/x-markdown": [".md"],
      "application/x-msdownload": [".exe"],
      "application/x-dosexec": [".exe"],
      "application/x-executable": [".exe"],
      "application/x-msdos-program": [".exe"],
      "application/x-unix-executable": [".exe"],
      "application/x-shellscript": [".sh"],
      "application/x-csh": [".csh"],

      // contacts
      "text/vcard": [".vcf"],
      "text/x-vcard": [".vcf"],
      "text/directory": [".vcf"],
      "text/x-vcalendar": [".vcs"],
    },

    onDropRejected: (fileRejections) => {
      const errors = fileRejections.map(({ _, errors }) => {
        // return `${errors.map((e) => e.message).join(", ")}`;

        return "Please upload a valid file, max size 100MB";
      });

      console.log(errors);
      toast.error(errors.join(", "));
    },

    onFileDialogCancel: () => {
      console.log("File dialog cancelled.");
      // toast.error("File dialog cancelled.");
    },

    onError: (error) => {
      console.log("Error occurred:", error);
      toast.error("An error occurred. Please try again.");
      //   toast.error(error.message);
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024,
    multiple: false,
  });

  useClickAway(ref, () => {
    setShow(false);
  });

  if (!show) return;

  return (
    <div
      ref={ref}
      className="absolute top-0 min-w-[250px] bg-neutral  py-2 shadow shadow-black/20  space-y-4"
    >
      <div
        onClick={onSelectFolder}
        className="text-primary cursor-pointer px-4 border-b border-primary/20 py-4 hover:bg-black/5 text-base  flex flex-row justify-start space-x-4"
      >
        <MdOutlineCreateNewFolder className="text-2xl " />
        <span> New Folder </span>
      </div>

      <div onClick={onClick}>
        <div {...getRootProps()} className="w-full">
          <input className="invisible" {...getInputProps()} />
          <div className="text-primary cursor-pointer px-4 py-4 hover:bg-black/5 text-base  flex flex-row justify-start space-x-4">
            <MdOutlineUploadFile className="text-2xl " />
            <span> File Upload </span>
          </div>
        </div>
      </div>
    </div>
  );
}
