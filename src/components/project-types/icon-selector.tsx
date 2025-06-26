"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import * as TiIcons from "react-icons/ti";

const iconLibraries = {
  fa: { name: "Font Awesome", icons: FaIcons },
  ai: { name: "Ant Design", icons: AiIcons },
  bi: { name: "Bootstrap", icons: BiIcons },
  bs: { name: "Bootstrap", icons: BsIcons },
  fi: { name: "Feather", icons: FiIcons },
  hi: { name: "Heroicons", icons: HiIcons },
  io: { name: "Ionicons", icons: IoIcons },
  md: { name: "Material Design", icons: MdIcons },
  ri: { name: "Remix", icons: RiIcons },
  si: { name: "Simple Icons", icons: SiIcons },
  ti: { name: "Typicons", icons: TiIcons },
};

// Popular icons for each library
const popularIcons = {
  fa: [
    "FaCode",
    "FaLaptop",
    "FaMobile",
    "FaDesktop",
    "FaDatabase",
    "FaCloud",
    "FaRocket",
    "FaCog",
  ],
  ai: [
    "AiOutlineCode",
    "AiOutlineLaptop",
    "AiOutlineMobile",
    "AiOutlineDesktop",
    "AiOutlineDatabase",
  ],
  bi: ["BiCode", "BiLaptop", "BiMobile", "BiDesktop", "BiData"],
  bs: ["BsCode", "BsLaptop", "BsPhone", "BsDisplay", "BsDatabase"],
  fi: ["FiCode", "FiMonitor", "FiSmartphone", "FiServer", "FiDatabase"],
  hi: [
    "HiCode",
    "HiDesktopComputer",
    "HiDeviceMobile",
    "HiServer",
    "HiDatabase",
  ],
  io: ["IoCodeSlash", "IoLaptop", "IoPhonePortrait", "IoDesktop", "IoServer"],
  md: ["MdCode", "MdLaptop", "MdPhoneAndroid", "MdDesktopMac", "MdStorage"],
  ri: [
    "RiCodeLine",
    "RiComputerLine",
    "RiSmartphoneLine",
    "RiMacLine",
    "RiDatabase2Line",
  ],
  si: ["SiJavascript", "SiReact", "SiNodedotjs", "SiPython", "SiMongodb"],
  ti: [
    "TiCode",
    "TiDeviceDesktop",
    "TiDevicePhone",
    "TiDeviceTablet",
    "TiDatabase",
  ],
};

interface IconSelectorProps {
  selectedLibrary: string;
  selectedIcon: string;
  onIconSelect: (library: string, iconName: string) => void;
}

export function IconSelector({
  selectedLibrary,
  selectedIcon,
  onIconSelect,
}: IconSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const renderIcon = (library: string, iconName: string, size = 20) => {
    const iconLib = iconLibraries[library as keyof typeof iconLibraries];
    if (!iconLib) return null;

    const IconComponent = iconLib.icons[iconName as keyof typeof iconLib.icons];
    if (!IconComponent) return null;

    const Icon = IconComponent as React.ComponentType<{ size?: number }>;
    return <Icon size={size} />;
  };

  const getFilteredIcons = (library: string) => {
    const iconLib = iconLibraries[library as keyof typeof iconLibraries];
    if (!iconLib) return [];

    let icons = popularIcons[library as keyof typeof popularIcons] || [];

    if (searchTerm) {
      const allIcons = Object.keys(iconLib.icons);
      icons = allIcons
        .filter((iconName) =>
          iconName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 50); // Limit to 50 results
    }

    return icons;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Select
          value={selectedLibrary}
          onValueChange={(library) => {
            const defaultIcon =
              popularIcons[library as keyof typeof popularIcons]?.[0] || "Icon";
            onIconSelect(library, defaultIcon);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(iconLibraries).map(([key, lib]) => (
              <SelectItem key={key} value={key}>
                {lib.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <div className="flex items-center space-x-2">
                {renderIcon(selectedLibrary, selectedIcon)}
                <span>{selectedIcon}</span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <Input
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="grid grid-cols-6 gap-2 max-h-60 overflow-y-auto">
                {getFilteredIcons(selectedLibrary).map((iconName) => (
                  <Button
                    key={iconName}
                    variant={selectedIcon === iconName ? "default" : "ghost"}
                    size="sm"
                    className="h-10 w-10 p-0"
                    onClick={() => {
                      onIconSelect(selectedLibrary, iconName);
                      setOpen(false);
                    }}
                    title={iconName}
                  >
                    {renderIcon(selectedLibrary, iconName, 16)}
                  </Button>
                ))}
              </div>
              {getFilteredIcons(selectedLibrary).length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No icons found. Try a different search term.
                </p>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
