function getDeviceDetails() {
  let browserName = navigator.appName;
  let platform = navigator.platform;

  // Simplify browser name
  if (navigator.userAgent.indexOf("Chrome") != -1) {
    browserName = "Chrome";
  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
    browserName = "Firefox";
  } else if (navigator.userAgent.indexOf("Safari") != -1) {
    browserName = "Safari";
  } else if (navigator.userAgent.indexOf("Edge") != -1) {
    browserName = "Edge";
  } else if (navigator.userAgent.indexOf("Opera") != -1) {
    browserName = "Opera";
  } else {
    browserName = "Unknown";
  }

  // Simplify platform name
  if (platform.indexOf("Win") != -1) {
    platform = "Windows";
  } else if (platform.indexOf("Mac") != -1) {
    platform = "MacOS";
  } else if (platform.indexOf("Linux") != -1) {
    platform = "Linux";
  } else if (platform.indexOf("Android") != -1) {
    platform = "Android";
  } else if (platform.indexOf("iOS") != -1) {
    platform = "iOS";
  } else {
    platform = "Unknown";
  }

  return `${browserName} on ${platform}`;
}

function saveState(storageType, key, state) {
  try {
    const serializedState = JSON.stringify(state);
    if (storageType === "local") {
      localStorage.setItem(key, serializedState);
    } else if (storageType === "session") {
      sessionStorage.setItem(key, serializedState);
    } else {
      throw new Error("Invalid storage type. Use 'local' or 'session'.");
    }
  } catch (error) {
    console.error("Error saving state to storage:", error);
  }
}

function retrieveState(storageType, key) {
  try {
    let serializedState;
    if (storageType === "local") {
      serializedState = localStorage.getItem(key);
    } else if (storageType === "session") {
      serializedState = sessionStorage.getItem(key);
    } else {
      throw new Error("Invalid storage type. Use 'local' or 'session'.");
    }

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error retrieving state from storage:", error);
    return undefined;
  }
}

function clearState(storageType, key) {
  try {
    if (storageType === "local") {
      localStorage.removeItem(key);
    } else if (storageType === "session") {
      sessionStorage.removeItem(key);
    } else {
      throw new Error("Invalid storage type. Use 'local' or 'session'.");
    }
  } catch (error) {
    console.error("Error clearing state from storage:", error);
  }
}

export { clearState, saveState, retrieveState, getDeviceDetails };
