import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
});

export async function ensureCsrfCookie() {
  // Required once per session before hitting stateful Sanctum endpoints
  await apiClient.get("/sanctum/csrf-cookie");
}

// Auto-recover from 419 (CSRF token mismatch) by ensuring CSRF cookie then retrying once
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const status = error?.response?.status;
    if (status === 419 && !original.__retryAfterCsrf) {
      try {
        await ensureCsrfCookie();
        original.__retryAfterCsrf = true;
        return apiClient.request(original);
      } catch (e) {
        // fall through to reject below
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;


