import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import api from "../services/api";
import DatabaseSelectionModal from "../components/DatabaseSelectionModal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      setModalOpen(true);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSelection = async (choice) => {
    console.log("User selected:", choice);
    // You can handle database/collection selection logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-white text-2xl mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 p-2 rounded text-white">Login</button>
      </form>
      
      <DatabaseSelectionModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onSelect={handleSelection} 
      />
    </div>
  );
};

export default Login;
