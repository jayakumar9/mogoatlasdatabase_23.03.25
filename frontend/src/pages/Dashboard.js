import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import api from "../services/api";
import AddAccountModal from "../components/AddAccountModal";
import EditAccountModal from "../components/EditAccountModal";

const Dashboard = () => {
  const { user, userPreferences, setUserPreferences } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("website");
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (userPreferences?.database && userPreferences?.collection) {
      fetchAccounts();
    }
  }, [userPreferences]);

  useEffect(() => {
    filterAccounts();
  }, [searchTerm, accounts, filterOption]);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/accounts?db=${userPreferences.database}&collection=${userPreferences.collection}`);
      setAccounts(response.data);
      setFilteredAccounts(response.data);
    } catch (error) {
      console.error("Error fetching accounts", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAccounts = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = accounts.filter(account => 
      account[filterOption]?.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredAccounts(filtered);
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen p-6`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold">Account Manager</h2>
        <button 
          onClick={toggleTheme} 
          className="px-4 py-2 rounded text-white bg-gray-700"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder={`Search by ${filterOption}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-1/2"
        />
        <select
          onChange={(e) => setFilterOption(e.target.value)}
          className="p-2 border ml-2"
        >
          <option value="website">Website</option>
          <option value="username">Username</option>
          <option value="email">Email</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading accounts...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 p-2">#</th>
                <th className="border border-gray-700 p-2">Logo</th>
                <th className="border border-gray-700 p-2">Website</th>
                <th className="border border-gray-700 p-2">Username</th>
                <th className="border border-gray-700 p-2">Email</th>
                <th className="border border-gray-700 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.map((account) => (
                <tr key={account._id} className="text-center bg-gray-800 hover:bg-gray-700">
                  <td className="border border-gray-700 p-2">{account.serialNumber}</td>
                  <td className="border border-gray-700 p-2">
                    <img src={account.logo} alt="Logo" className="h-8 w-8 mx-auto" />
                  </td>
                  <td className="border border-gray-700 p-2">{account.website}</td>
                  <td className="border border-gray-700 p-2">{account.username}</td>
                  <td className="border border-gray-700 p-2">{account.email}</td>
                  <td className="border border-gray-700 p-2">
                    {user.role === "admin" && (
                      <>
                        <button
                          onClick={() => console.log("Edit function here")}
                          className="bg-blue-500 px-3 py-1 rounded text-white mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => console.log("Delete function here")}
                          className="bg-red-500 px-3 py-1 rounded text-white"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
