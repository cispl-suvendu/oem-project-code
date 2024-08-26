import { profileDropdownMenu } from "@/src/constants/dashboard";
import { useRouter } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAuthContext } from "@/src/app/context/authcontext";
import { Avatar } from "@chakra-ui/react";

export default function UserDropdownMenu() {
  const router = useRouter();
  const { logout, user } = useAuthContext();

  const handleClick = (item: string) => {
    if (item === "/logout") {
      return logout();
    }
    return router.push(item);
  };

  return (
    <div className="nav-item dropdown cus-drop d-flex">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          <div
            className="nav-link dropdown-toggle d-flex"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Avatar name={user?.full_name} bg="teal.500" />
            <div className="pointer">
              <IoMdArrowDropdown
                style={{
                  height: "30px",
                  width: "30px",
                  marginTop: "8px",
                }}
              />
            </div>
          </div>
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0 user_drop_down"
        >
          {profileDropdownMenu.map((item) => (
            <MenuItem key={item.name}>
              <div
                onClick={() => handleClick(item.url)}
                className="dropdown-item pointer"
              >
                {item.name}
              </div>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}
