const config = {
  appName: "BSSPD",

  namedUrls: {
    signIn: "/login",
    signUp: "/register",
  },

  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:7000/api",

  endpoints: {
    login: "/u/sign-in",
    register: "/u",
    verifyEmailComplete: "/u/email/verify",
    verifyEmail: "/u/email/verify",
    sessionInfo: "/u/session",
    resetPassword: "/u/password/reset",
    confirmPasswordReset: "/u/password/reset/complete",

    createFolder: "/fs/folders",
    uploadFile: "/fs/upload",

    getFolders: "/fs/folders",
    getFiles: "/fs/files",
    getRecent: "/fs/recent",

    getFileStream: "/fs/stream",

    trashFile: "/fs/files",

    renameFile: "/fs/files",
    renameFolder: "/fs/folders",

    getTrash: "/fs/trash",

    restoreFile: "/fs/trash/restore",
  },

  browserStorageKeys: {
    accessToken: "BSSPDToken",
  },
};

export default config;
