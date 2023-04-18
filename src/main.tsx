import { QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import AuthProvider from "./context/auth/AuthProvider";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import { queryClient } from "./utils/ReactQuery";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </QueryClientProvider>
);
