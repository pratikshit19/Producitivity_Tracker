import { useEffect, useState } from "react";

export default function TodoPage() {
  const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
});

  const [taskText, setTaskText] = useState("");
  const [isImportant, setIsImportant] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage on change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskText.trim()) return;
    setTasks([
      { text: taskText, important: isImportant, completed: false },
      ...tasks,
    ]);
    setTaskText("");
    setIsImportant(false);
  };

  const toggleCompleted = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const toggleImportant = (index) => {
    const updated = [...tasks];
    updated[index].important = !updated[index].important;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const handleSwipe = (e, index) => {
    const touch = e.changedTouches[0];
    const swipeDistance = touch.clientX - e.target.startX;
    if (swipeDistance < -100) deleteTask(index); // swipe left
  };

  return (
    <div className="min-h-[100dvh] bg-gray-900 text-white p-6 mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">To-Do List</h2>

      <div className="bg-gray-800 p-4 rounded mb-6">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 mb-3"
          placeholder="Enter your task"
        />
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={isImportant}
            onChange={() => setIsImportant(!isImportant)}
            id="important"
          />
          <label htmlFor="important" className="text-gray-300">
            Mark as important
          </label>
        </div>
        <button
          onClick={addTask}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white font-semibold"
        >
          Add Task
        </button>
      </div>

      <div>
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks yet.</p>
        ) : (
          tasks.map((task, idx) => (
            <div
              key={idx}
              className={`relative group bg-gray-800 p-3 rounded mb-3 border ${
                task.important ? "border-red-500" : "border-gray-700"
              }`}
              onTouchStart={(e) => {
                e.target.startX = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => handleSwipe(e, idx)}
            >
              <div>
                <p
                  className={`text-lg ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.text}
                </p>
                {task.important && (
                  <span className="text-red-500 text-xs">Important</span>
                )}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => toggleCompleted(idx)}
                  className="text-sm bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white"
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => toggleImportant(idx)}
                  className="text-sm bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white"
                >
                  {task.important ? "Unmark" : "Important"}
                </button>
                <button
                  onClick={() => deleteTask(idx)}
                  className="ml-auto text-sm bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-white hidden group-hover:block"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
