import { atom } from "recoil";

const userState = atom({
  key: "userState",
  default: {
    user: null,
    token: null,
    logOut: null,
  },
});

const uiState = atom({
  key: "uiState",
  default: {
    darkMode: false,
    showNewDialog: false,
  },
});

const mediaPreviewState = atom({
  key: "mediaPreviewState",
  default: {
    show: false,
    data: null,
  },
});

const uploaderState = atom({
  key: "uploaderState",
  default: {
    file: null,
    hide: false,
  },
});

const renameDialogState = atom({
  key: "renameDialogState",
  default: {
    show: false,
    currentName: "",
    isFolder: false,
    resourceUid: null,
  },
});

export {
  userState,
  uiState,
  uploaderState,
  mediaPreviewState,
  renameDialogState,
};
