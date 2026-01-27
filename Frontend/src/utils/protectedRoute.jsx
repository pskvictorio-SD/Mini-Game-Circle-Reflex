import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ redirectPath = "/" }) {
  function parseJwt(token) {
    if (!token) return null;

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token);

  const isTokenValid =
    decodedToken && decodedToken.exp * 1000 > Date.now();

  if (!isTokenValid) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
