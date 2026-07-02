import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ContentDetailPage from "./pages/ContentDetailPage";
import SettingsPage from "./pages/SettingsPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Toaster } from "sonner";
import { ContentProvider } from "./contexts/ContentContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>
          <Toaster richColors />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="content/:id" element={<ContentDetailPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
