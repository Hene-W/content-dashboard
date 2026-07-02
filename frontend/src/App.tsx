import { Outlet } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";

function App() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen p-3 gap-3 bg-background">

      {/* Sidebar */}
      <aside className="w-full md:w-64  bg-white shadow-md rounded-xl">
        <Sidebar />
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-white shadow-md rounded-xl">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
