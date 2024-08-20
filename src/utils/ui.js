import PDFIcon from "../assets/icons/icons8-pdf-96.png";
import DocIcon from "../assets/icons/icons8-document-96.png";
import ArchiveIcon from "../assets/icons/icons8-zip-96.png";
import TextIcon from "../assets/icons/icons8-txt-96.png";
import VideoIcon from "../assets/icons/icons8-video-file-96.png";
import ImageIcon from "../assets/icons/icons8-image-file-96.png";
import AudioIcon from "../assets/icons/icons8-audio-file-96.png";
import ExcelIcon from "../assets/icons/icons8-xls-96.png";
import WordIcon from "../assets/icons/icons8-document-96.png";
import PptIcon from "../assets/icons/icons8-powerpoint-file-96.png";

function convertBytesToHigherUnit(bytes) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (bytes >= 1024) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

function mapFileExtensionToIcon(extension) {
  switch (extension) {
    case "pdf":
      return PDFIcon;
    case "doc":
    case "docx":
      return DocIcon;
    case "zip":
      return ArchiveIcon;
    case "txt":
      return TextIcon;
    case "mp4":
    case "mkv":
      return VideoIcon;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return ImageIcon;
    case "mp3":
    case "wav":
      return AudioIcon;
    case "xls":
    case "xlsx":
      return ExcelIcon;
    case "pptx":
      return PptIcon;
    default:
      return DocIcon;
  }
}

export { convertBytesToHigherUnit, mapFileExtensionToIcon };
