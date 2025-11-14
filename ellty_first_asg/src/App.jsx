import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [pages, setPages] = useState([
    { id: 1, name: "Page 1", isChecked: false, hover: false, active: false },
    { id: 2, name: "Page 2", isChecked: false, hover: false, active: false },
    { id: 3, name: "Page 3", isChecked: false, hover: false, active: false },
    { id: 4, name: "Page 4", isChecked: false, hover: false, active: false },
  ]);

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [allHover, setAllHover] = useState(false);
  const [allActive, setAllActive] = useState(false);

  useEffect(() => {
    const allSelected = pages.every((page) => page.isChecked);
    setIsAllChecked(allSelected);
  }, [pages]);

  const handleAllClick = () => {
    const newStatus = !isAllChecked;
    setIsAllChecked(newStatus);
    setPages(pages.map((p) => ({ ...p, isChecked: newStatus })));
  };

  const handlePageClick = (id) => {
    setPages(
      pages.map((p) =>
        p.id === id ? { ...p, isChecked: !p.isChecked } : p
      )
    );
  };

  const setHover = (id, val) => {
    setPages(pages.map((p) => p.id === id ? { ...p, hover: val } : p));
  };

  const setActive = (id, val) => {
    setPages(pages.map((p) => p.id === id ? { ...p, active: val } : p));
  };

  return (
    <div className="container">
      <div className="card">

        {/* ALL PAGES */}
        <div
          className="row"
          onClick={handleAllClick}
          onMouseEnter={() => setAllHover(true)}
          onMouseLeave={() => { setAllHover(false); setAllActive(false); }}
          onMouseDown={() => setAllActive(true)}
          onMouseUp={() => setAllActive(false)}
        >
          <span className="label">All pages</span>

          <div className={`
            checkbox 
            ${isAllChecked ? "checked" : ""} 
            ${allHover ? "hover" : ""} 
            ${allActive ? "active" : ""}
          `}>
            <svg viewBox="0 0 24 24">
              <path d="M20 6L9 17L4 12" />
            </svg>
          </div>
        </div>

        <div className="divider"></div>

        {/* LIST */}
        <div className="list">
          {pages.map((page) => (
            <div
              className="row"
              key={page.id}
              onClick={() => handlePageClick(page.id)}
              onMouseEnter={() => setHover(page.id, true)}
              onMouseLeave={() => setHover(page.id, false)}
              onMouseDown={() => setActive(page.id, true)}
              onMouseUp={() => setActive(page.id, false)}
            >
              <span className="label">{page.name}</span>

              <div className={`
                checkbox 
                ${page.isChecked ? "checked" : ""} 
                ${page.hover ? "hover" : ""} 
                ${page.active ? "active" : ""}
              `}>
                <svg viewBox="0 0 24 24">
                  <path d="M20 6L9 17L4 12" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="divider"></div>

        <button className="btn-done">Done</button>
      </div>
    </div>
  );
}
