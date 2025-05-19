
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  Bell,
  LogOut,
  Building,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar: React.FC = () => {
  const { user, isManager, isResident, logout } = useAuth();
  const location = useLocation();
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const navigationItems = [
    { name: "Dashboard", path: "/", icon: <Home size={20} />, access: ["manager", "resident"] },
    { name: "Unidades", path: "/units", icon: <Building size={20} />, access: ["manager"] },
    { name: "Moradores", path: "/residents", icon: <Users size={20} />, access: ["manager"] },
    { name: "Taxas", path: "/fees", icon: <DollarSign size={20} />, access: ["manager", "resident"] },
    { name: "Avisos", path: "/announcements", icon: <Bell size={20} />, access: ["manager", "resident"] },
    { name: "Reservas", path: "/reservations", icon: <Calendar size={20} />, access: ["manager", "resident"] },
    { name: "Mensagens", path: "/messages", icon: <MessageSquare size={20} />, access: ["manager", "resident"] },
    { name: "Reclamações", path: "/complaints", icon: <FileText size={20} />, access: ["manager", "resident"] },
    { name: "Configurações", path: "/settings", icon: <Settings size={20} />, access: ["manager", "resident"] },
  ];

  const filteredNavigation = navigationItems.filter((item) =>
    item.access.includes(user?.role || "")
  );

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground flex flex-col h-screen border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <Building className="h-8 w-8 text-sidebar-primary" />
          <h1 className="text-xl font-bold">CondoSync</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-2">
          {filteredNavigation.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 rounded-md transition-colors",
                location.pathname === item.path
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "hover:bg-sidebar-accent/70 text-sidebar-foreground"
              )}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Avatar className="h-9 w-9 mr-2">
              <AvatarImage src={user?.avatarUrl} />
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                {user?.name ? getInitials(user.name) : "??"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/80">
                {user?.role === "manager" ? "Síndico" : `Unidade ${user?.unitNumber}`}
              </p>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={logout}
          className="w-full justify-start text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <LogOut size={18} className="mr-2" />
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
