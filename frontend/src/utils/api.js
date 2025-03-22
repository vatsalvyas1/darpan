import { backendUrl } from "../constant";

export const postData = async (url, data) => {
  try {
    const response = await fetch(`${backendUrl}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    // Check if the response is not OK
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json(); // Attempt to parse error details
      } catch {
        errorData = { error: "An error occurred but could not be parsed." };
      }
      throw new Error(errorData.error || "Unknown error occurred");
    }

    return await response.json(); // Return parsed JSON response
  } catch (error) {
    console.error("Error posting data:", error.message);
    return { success: false, error: error.message }; // Standardized error response
  }
};
