import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import api from "../services/api";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await api.get("/accounts");
        setAccounts(res.data);
      } catch (error) {
        console.error("Failed to fetch accounts", error);
      }
    };
    fetchAccounts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl">Welcome, {user?.name}</h1>
        <button onClick={logout} className="bg-red-500 p-2 rounded">Logout</button>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl mb-4">Your Accounts</h2>
        {accounts.length === 0 ? (
          <p>No accounts saved yet.</p>
        ) : (
          <ul>
            {accounts.map((account) => (
              <li key={account._id} className="mb-2 p-2 bg-gray-700 rounded">
                <strong>{account.website}</strong> - {account.username}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;