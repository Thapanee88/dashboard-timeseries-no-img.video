import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#0d9488]">
      <div className="container mx-auto">
        <ul className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "bg-[#ffffff] text-[#0d9488] m-0 p-2" : "text-[#ffffff] m-0 p-2"
            }
          >
            OnePersonManyVideo
          </NavLink>
          <NavLink
            to="/2"
            className={({ isActive }) =>
              isActive ? "bg-[#ffffff] text-[#0d9488] m-0 p-2" : "text-[#ffffff] m-0 p-2"
            }
          >
            ManyPersonOneVideo
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;