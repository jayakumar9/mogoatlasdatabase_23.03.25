import { useState, useEffect } from "react";
import api from "../services/api";

const EditAccountModal = ({ isOpen, onClose, account, refreshAccounts }) => {
  const [website, setWebsite] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (account) {
      setWebsite(account.website);
      setName(account.name);
      setUsername(account.username);
      setEmail(account.email);
      setPassword(""); // Do not prefill the password
      setNote(account.note);
    }
  }, [account]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/accounts/${account._id}`, { website, name, username, email, password, note });
      refreshAccounts();
      onClose();
    } catch (error) {
      console.error("Error updating account", error);
    }
  };

  if (!isOpen || !account) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-white text-2xl mb-4 text-center">Edit Account</h2>
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
            placeholder="New Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAccountModal;
