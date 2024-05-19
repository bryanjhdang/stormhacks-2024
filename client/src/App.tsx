// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import PoolPage from './pages/PoolPage';
import CreatePage from './pages/CreatePage';

export default function App() {
  return (
    <>
      <MantineProvider>
        <Router>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/pool" element={<PoolPage />} />
          </Routes>
        </Router>
      </MantineProvider>
    </>
  )
}