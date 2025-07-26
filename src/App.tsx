// File: src/App.tsx

import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"
import Home from './pages/Home';
import Playground from './pages/Playground';
import Landing from "./pages/Landing";
import DeviceFormPage from './pages/DeviceFormPage';
import Login from './pages/Login';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/device-form" element={<DeviceFormPage />} />
          <Route path="/login" element={<Login />} />

          {/* Add more routes as needed */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;


