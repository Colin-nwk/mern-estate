import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuGroup,
  MenuList,
  Button,
} from "@chakra-ui/react";

import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";

// Profile Dropdown

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [menuState, setMenuState] = useState(false);

  // Replace  path with your path
  const navigation = [
    { title: "Home", path: "" },
    { title: "About", path: "/about" },
  ];
  return (
    <>
      <nav className="bg-white border-b">
        <div className="flex items-center space-x-8 py-2 px-4 max-w-screen mx-auto md:px-8 overflow-hidden">
          <div className="flex-none lg:flex-initial bg-blue-200 px-3 py-1 rounded-xl">
            <p className="text-base uppercase font-bold text-blue-900">
              <Link to="">
                <span className="text-white">R </span> Estate
              </Link>
            </p>
          </div>
          <div className="flex-1 flex items-center justify-between">
            <div
              className={`bg-white absolute z-20 w-full top-14 left-0 p-4 border-b lg:static lg:block lg:border-none ${
                menuState ? "" : "hidden"
              }`}
            >
              <ul className="mt-3 space-y-5 lg:flex lg:space-x-6 lg:space-y-0 lg:mt-0">
                {navigation.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-gray-600 hover:text-blue-900 hover:font-semibold text-sm duration-300 ease-in-out transition-colors"
                  >
                    <Link to={item.path}>{item.title}</Link>
                    {/* <a href={item.path}>{item.title}</a> */}
                  </li>
                ))}
              </ul>
              {/* <ProfileDropDown class="mt-5 pt-5 border-t lg:hidden" /> */}
            </div>
            <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
              <form className="flex items-center space-x-2 border rounded-md p-2 focus-within:border-blue-900">
                {/* <SearchIcon /> */}
                <BsSearch size={16} color="gray" />
                <input
                  className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto text-sm"
                  type="text"
                  placeholder="Search"
                />
              </form>
              {/* <ProfileDropDown class="hidden lg:block" /> */}
              <button
                className="outline-none text-gray-400 block lg:hidden"
                onClick={() => setMenuState(!menuState)}
              >
                {menuState ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>

              {currentUser ? (
                <Menu>
                  <MenuButton>
                    <Avatar
                      size="sm"
                      name={currentUser.username}
                      src={currentUser.avatar}
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title={currentUser.email}>
                      <Link to="/profile">
                        <MenuItem>My Profile</MenuItem>
                      </Link>
                      <MenuItem>SignOut </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              ) : (
                <Button colorScheme="linkedin" size="sm" color="aliceblue">
                  <Link to="/signin">SignIn</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
