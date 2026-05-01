import { useEffect, useState } from "react";
import { getTasks } from "../services/api";
import { useStore } from "../store/useStore";
import Board from "../components/Board/Board";
import Timer from "../components/common/Timer";
import "../styles/dashboard.css";
import { Home, Settings, User, LogOut, LayoutDashboard } from "lucide-react";

export default function Dashboard() {
  const user = localStorage.getItem("user");
  const { tasks, setTasks } = useStore((s: any) => s);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    const userId = "PUT-GUID-HERE"; // temp
    getTasks(userId).then((res) => {
      setTasks(res.data);
    });
  }, []);
  useEffect(() => {
    const handleClick = () => setShowDropdown(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);
  useEffect(() => {
    const close = () => setShowDropdown(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const count = (status: string) =>
    tasks.filter((t: any) => t.status === status).length;

  return (
    <div className="dashboard-container">
      {/* 🔥 HEADER */}
      <div className="dashboard-header">
        <div className="header-left">
          <div className="header-logo">
            <Home size={18} />
            Home
          </div>

          <div className="header-title">
            <LayoutDashboard size={20} /> Dashboard
          </div>

          <div className="header-nav">
            <span>Services</span>
            <span>Contact</span>
            <span onClick={() => setShowModal(true)}>My Tasks</span>
          </div>
        </div>

        <div className="header-right">
          <div
            className="user-section"
            onClick={(e) => {
              e.stopPropagation();
              setShowDropdown(!showDropdown);
            }}
          >
            <div className="avatar-circle">{user?.charAt(0).toUpperCase()}</div>
            {user}
          </div>

          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <User size={16} /> Profile
              </div>

              <div className="dropdown-item">
                <Settings size={16} /> Settings
              </div>

              <div className="dropdown-divider"></div>

              <div className="dropdown-item logout" onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
      {/* 🔥 CONTENT */}
      <div className="dashboard-content">
        <Timer />
        <Board />
      </div>

      {/* 🔥 FOOTER */}
      <div className="dashboard-footer">Built with focus ⚡</div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-card large"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">Task Summary</h2>

            <div className="summary-grid">
              <div className="summary-box todo">
                <span>ToDo</span>
                <strong>{count("ToDo")}</strong>
              </div>

              <div className="summary-box analysis">
                <span>Analysis</span>
                <strong>{count("Analysis")}</strong>
              </div>

              <div className="summary-box progress">
                <span>InProgress</span>
                <strong>{count("InProgress")}</strong>
              </div>

              <div className="summary-box accept">
                <span>Acceptance</span>
                <strong>{count("Acceptance")}</strong>
              </div>

              <div className="summary-box complete">
                <span>Completed</span>
                <strong>{count("Completed")}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
