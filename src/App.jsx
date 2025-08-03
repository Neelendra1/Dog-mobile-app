import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, AppBar, Toolbar, IconButton, Typography, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserRegister from "./components/UserRegister";
import ProviderRegister from "./components/ProviderRegister";
import Booking from "./components/Booking";
import AdminDashboard from "./components/AdminDashboard";
import Home from "./components/Home";
import BookingTracking from "./components/BookingTracking";
import Payment from "./components/Payment";
import UserProfile from "./components/UserProfile";
import ProviderReviews from "./components/ProviderReviews";
import LiveBookingTracking from "./components/LiveBookingTracking";
import ChatSupport from "./components/ChatSupport";
import OffersLoyalty from "./components/OffersLoyalty";
import ProviderSearch from "./components/ProviderSearch";
import Sidebar from "./components/Sidebar";
import { AuthProvider } from "./authContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);

  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/src/service-worker.js').then(() => {
        console.log('Service Worker registered');
      });
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <CssBaseline />
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setSidebarOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dog Lovers PWA
            </Typography>
          </Toolbar>
        </AppBar>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Container maxWidth="sm" sx={{ mt: 2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/provider-register" element={<ProviderRegister />} />
            <Route path="/booking" element={<ProtectedRoute allowedRoles={["user"]}><Booking /></ProtectedRoute>} />
            <Route path="/tracking" element={<ProtectedRoute allowedRoles={["user"]}><BookingTracking /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute allowedRoles={["user"]}><Payment /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute allowedRoles={["user"]}><UserProfile /></ProtectedRoute>} />
            <Route path="/reviews" element={<ProviderReviews />} />
            <Route path="/live-tracking" element={<ProtectedRoute allowedRoles={["user","provider"]}><LiveBookingTracking /></ProtectedRoute>} />
            <Route path="/support" element={<ChatSupport />} />
            <Route path="/offers" element={<ProtectedRoute allowedRoles={["user"]}><OffersLoyalty /></ProtectedRoute>} />
            <Route path="/search" element={<ProviderSearch />} />
          </Routes>
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;
