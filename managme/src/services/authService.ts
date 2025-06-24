import axios from "axios";

const API_URL = "http://localhost:3000/auth";

let isRefreshing = false;
let failedQueue: any[] = [];
let currentUser: any = null;

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const instance = axios.create();

// Interceptor: dołącz token do każdego żądania
instance.interceptors.request.use(config => {
  const token = AuthService.getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: odśwież token jeśli dostaliśmy 401
instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;
      const refreshToken = AuthService.getRefreshToken();

      try {
        const { data } = await axios.post(`${API_URL}/refresh`, { refreshToken });
        AuthService.setAccessToken(data.accessToken);
        processQueue(null, data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        AuthService.logout();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

class AuthService {
  static async login(login: string, password: string) {
    const response = await axios.post(`${API_URL}/login`, { login, haslo: password });
    this.setAccessToken(response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
  }

  static logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  static getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }

  static setAccessToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  static async getLoggedUser() {
    const response = await instance.get(`${API_URL}/me`);
    return response.data;
  }
  static async fetchAndStoreUser() {
    const token = this.getAccessToken();
    if (!token) return null;

    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    currentUser = response.data;
    return currentUser;
  }

  static getUser() {
    return currentUser;
  }

  static axios() {
    return instance;
  }
}

export default AuthService;
