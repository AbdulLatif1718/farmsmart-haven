import { NavLink, useLocation } from 'react-router-dom';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Truck,
  Store,
  Wrench,
  BookOpen,
  Users,
  Settings,
  BarChart3,
  MapPin
} from 'lucide-react';

interface AdminSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collapsed: boolean;
}

const adminNavItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Funding Applications',
    href: '/admin/funding-applications',
    icon: FileText,
  },
  {
    title: 'Land Applications',
    href: '/admin/land-applications',
    icon: MapPin,
  },
  {
    title: 'Expert Applications',
    href: '/admin/expert-applications',
    icon: Users,
  },
  {
    title: 'Transport & Logistics',
    href: '/admin/transport',
    icon: Truck,
  },
  {
    title: 'Marketplace',
    href: '/admin/marketplace',
    icon: Store,
  },
  {
    title: 'Machinery Rentals',
    href: '/admin/machinery',
    icon: Wrench,
  },
  {
    title: 'Knowledge Hub',
    href: '/admin/knowledge',
    icon: BookOpen,
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-3">
          {adminNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export const AdminSidebar = ({ open, onOpenChange, collapsed }: AdminSidebarProps) => {
  return (
    <>
      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] border-r bg-background transition-all duration-300 md:block",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarContent collapsed={collapsed} />
      </aside>
    </>
  );
};