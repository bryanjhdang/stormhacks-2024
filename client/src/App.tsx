// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import PoolPage from "./pages/PoolPage";
import CreatePage from "./pages/CreatePage";
import { FirebaseAuthProvider } from "./contexts/FirebaseAuth.context";
import { LandingPage } from "./pages/Landing";
import { ProtectedRoutes } from "./components/auth/ProtectedRoute";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <MantineProvider>
          <FirebaseAuthProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoutes />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/pool" element={<PoolPage />} />
              </Route>
            </Routes>
          </FirebaseAuthProvider>
        </MantineProvider>
      </BrowserRouter>
    </>
  );
}
