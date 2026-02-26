import { useCallback } from "react";

export const useDownloadFile = () => {
  return useCallback((url: string, fileName?: string) => {
    try {
      const link = document.createElement("a");
      link.href = url;
      if (fileName) link.download = fileName;
      link.click();
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  }, []);
};
