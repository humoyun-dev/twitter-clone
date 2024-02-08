import React from "react";
import { LucideIcon } from "lucide-react";
interface SidebarItemProps {
  label: string;
  icon: LucideIcon;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
}: SidebarItemProps) => {
  return (
    <div className={`flex flex-row items-center`}>
      <div
        className={`relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden`}
      >
        <Icon size={28} color={"white"} />
      </div>
    </div>
  );
};

export default SidebarItem;
