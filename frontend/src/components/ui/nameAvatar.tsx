import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { LogOut } from "lucide-react";
import useAuth from "@/hooks/useAuth";

const NameAvatar = ({ name }: { name?: string }) => {
  const displayName = name ? name[0]?.toUpperCase() : "";
  const { onLogout } = useAuth();

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-center w-10 h-10 bg-indigo-500 text-white rounded-full cursor-pointer">
            {displayName}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-36 ml-10">
          <div
            className="flex items-center cursor-pointer hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" aria-hidden="true" />
            <span>Logout</span>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NameAvatar;
