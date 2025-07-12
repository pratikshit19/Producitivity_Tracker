import { useState, useEffect } from "react";

export default function TrackerPage() {
  // Load entries immediately from localStorage
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("entries");
    return saved ? JSON.parse(saved) : [];
  });

  const [hourRange, setHourRange] = useState("");
  const [description, setDescription] = useState("");

  const addEntry = () => {
    if (!hourRange || !description) return;
    const newEntries = [{ hourRange, description }, ...entries];
    setEntries(newEntries);
    setHourRange("");
    setDescription("");
    localStorage.setItem("entries", JSON.stringify(newEntries));
  };

  const deleteEntry = (index) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
    localStorage.setItem("entries", JSON.stringify(updated));
  };

  return (
    <div className="min-h-[100dvh] bg-gray-900 text-white p-6 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Live Tracker</h2>
      <div className="bg-gray-800 p-4 rounded mb-6">
        <div className="mb-4">
          <label className="block mb-1 text-gray-300">Hour Range (e.g., 1 PM - 2 PM)</label>
          <input
            type="text"
            value={hourRange}
            onChange={(e) => setHourRange(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
            placeholder="e.g., 2 PM - 3 PM"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-300">What did you do?</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
            placeholder="Describe your activity"
          />
        </div>
        <button
          onClick={addEntry}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white font-semibold"
        >
          Add Entry
        </button>
      </div>

      <div>
        {entries.length === 0 ? (
          <p className="text-gray-400 text-center">No entries yet.</p>
        ) : (
          entries.map((entry, idx) => (
            <div
              key={idx}
              className="bg-gray-800 p-4 rounded mb-3 border border-gray-700 flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-400">{entry.hourRange}</p>
                <p className="text-lg">{entry.description}</p>
              </div>
              <button
                onClick={() => deleteEntry(idx)}
                className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
