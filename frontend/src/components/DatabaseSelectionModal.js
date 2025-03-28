import { useState } from "react";

const DatabaseSelectionModal = ({ isOpen, onClose, onSelect }) => {
  const [step, setStep] = useState(1);

  const handleSelection = (choice) => {
    if (step === 1) {
      setStep(2);
      onSelect({ database: choice });
    } else {
      onSelect({ collection: choice });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-white text-xl mb-4 text-center">
          {step === 1 ? "Select Database" : "Select Collection"}
        </h2>
        <div className="flex flex-col space-y-3">
          <button
            onClick={() => handleSelection("existing")}
            className="bg-blue-500 p-2 rounded text-white"
          >
            Continue with Existing {step === 1 ? "Database" : "Collection"}
          </button>
          <button
            onClick={() => handleSelection("new")}
            className="bg-green-500 p-2 rounded text-white"
          >
            Create New {step === 1 ? "Database" : "Collection"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatabaseSelectionModal;
