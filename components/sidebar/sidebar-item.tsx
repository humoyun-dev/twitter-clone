import React from "react";
interface SidebarItemProps {
  label: string;
  icon: any;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
}: SidebarItemProps) => {
  return (
    <div className={`flex flex-row items-center`}>
      {/* Mobile */}
      <div
        className={`relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden`}
      >
        <Icon size={28} color={"white"} />
      </div>
      {/* Desktop */}
      <div className="relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-xl text-white">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
