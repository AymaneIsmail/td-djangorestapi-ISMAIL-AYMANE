export interface NavigationItem {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    link: string;
  }