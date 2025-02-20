/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export async function apiRequest(url: string, method: "GET" | "POST" | "PUT" | "DELETE" = "GET", data?: any,timeoutMs: number = 5000) {
  try {
    const response = await axios({
      url,
      method,
      data: method !== "GET" ? data : undefined,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: timeoutMs,
    });

    return response.data;
  } catch (error) {
    console.error("API Request Failed:", error);
    return null;
  }
}


export async function batchApiRequests(
  requests: { url: string; method: "GET" | "POST" | "PUT" | "DELETE"; data?: any }[],
  timeoutMs: number = 5000
) {
  const promises = requests.map(({ url, method, data }) =>
    axios({
      url,
      method,
      data: method !== "GET" ? data : undefined,
      timeout: timeoutMs, // Set timeout per request
    })
      .then(res => res.data)
      .catch(error => ({ error: error.message }))
  );

  const results = await Promise.allSettled(promises);

  return results.map((result, index) => ({
    request: requests[index],
    status: result.status,
    data: result.status === "fulfilled" ? result.value : null,
    error: result.status === "rejected" ? result.reason : null,
  }));
}



// // Example usage:
// apiRequest("https://api.example.com/data", "POST", { name: "John" })
//   .then((res) => console.log(res));
