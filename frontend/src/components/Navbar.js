import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl">Secure Account Manager</h1>
      {user && (
        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded text-white">
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
