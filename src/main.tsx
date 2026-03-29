import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { AuthProvider } from "./auth/AuthContext";
import App from "./app/App";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
    <Toaster position="top-center" richColors />
  </AuthProvider>
);
  