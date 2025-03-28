import { useState } from "react";
import api from "../services/api";

const AddAccountModal = ({ isOpen, onClose, refreshAccounts }) => {
  const [website, setWebsite] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/accounts/create", { website, name, username, email, password, note });
      refreshAccounts();
      onClose();
    } catch (error) {
      console.error("Error adding account", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-white text-2xl mb-4 text-center">Add New Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Website URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
            required
          />
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
          <textarea
            placeholder="Notes"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
          ></textarea>
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-500 px-4 py-2 rounded text-white">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">
              Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccountModal;
