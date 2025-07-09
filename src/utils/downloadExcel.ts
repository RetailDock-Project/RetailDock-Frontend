// utils/downloadExcel.ts

import toast from "react-hot-toast";

/**
 * Generic function to trigger Excel file download from a service function.
 *
 * @param fetchFunction - A function that returns a Promise of a Blob (or AxiosResponse<Blob>)
 * @param fileName - Desired filename for the download (e.g., "Products.xlsx")
 */
export const downloadExcelFile = async (
  fetchFunction: () => Promise<Blob | { data: Blob }>,
  fileName: string = "data.xlsx"
): Promise<void> => {
  try {
    const result = await fetchFunction();

    const blob = result instanceof Blob ? result : result.data;

    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Excel download failed:", error);
    toast.error("Failed to download Excel file.");
  }
};
