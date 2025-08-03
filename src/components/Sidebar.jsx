import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PetsIcon from "@mui/icons-material/Pets";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PaymentIcon from "@mui/icons-material/Payment";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authContext.jsx";

const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/", roles: ["guest","user","provider","admin"] },
  { text: "User Registration", icon: <PersonAddIcon />, path: "/register", roles: ["guest"] },
  { text: "Provider Registration", icon: <PersonAddIcon />, path: "/provider-register", roles: ["guest"] },
  { text: "Book Service", icon: <DirectionsWalkIcon />, path: "/booking", roles: ["user"] },
  { text: "Booking Tracking", icon: <TrackChangesIcon />, path: "/tracking", roles: ["user"] },
  { text: "Live Tracking", icon: <TrackChangesIcon />, path: "/live-tracking", roles: ["user","provider"] },
  { text: "Payment", icon: <PaymentIcon />, path: "/payment", roles: ["user"] },
  { text: "User Profile", icon: <PetsIcon />, path: "/profile", roles: ["user"] },
  { text: "Provider Reviews", icon: <StarIcon />, path: "/reviews", roles: ["user","provider","admin"] },
  { text: "Provider Search", icon: <SearchIcon />, path: "/search", roles: ["user","provider","admin"] },
  { text: "Offers & Loyalty", icon: <LocalOfferIcon />, path: "/offers", roles: ["user"] },
  { text: "Chat & Support", icon: <SupportAgentIcon />, path: "/support", roles: ["guest","user","provider","admin"] },
  { text: "Admin Dashboard", icon: <AdminPanelSettingsIcon />, path: "/admin", roles: ["admin"] }
];

function SidebarContent({ onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role || "guest";
  return (
    <Box sx={{ width: { xs: 220, sm: 300 }, pt: 2 }} role="navigation" aria-label="Main menu">
      <List>
        {menuItems.filter(item => item.roles.includes(role)).map(item => (
          <ListItem component="button" key={item.text} onClick={() => { navigate(item.path); onClose(); }} aria-label={item.text}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default function Sidebar({ open, onClose }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <SidebarContent onClose={onClose} />
    </Drawer>
  );
}
