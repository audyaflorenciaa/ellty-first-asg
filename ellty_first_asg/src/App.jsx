import "./App.css";
import { useState, useRef } from "react";

export default function App() {
  const [pages, setPages] = useState([
    { id: 1, name: "Page 1", checked: false },
    { id: 2, name: "Page 2", checked: false },
    { id: 3, name: "Page 3", checked: false },
    { id: 4, name: "Page 4", checked: false },
    { id: 5, name: "Page 5", checked: false },
    { id: 6, name: "Page 6", checked: false },
  ]);

  const [allPages, setAllPages] = useState({ checked: false });

  const [hoveredId, setHoveredId] = useState(null);
  const [hoveredCheckbox, setHoveredCheckbox] = useState(null);
  const [flickering, setFlickering] = useState({});
  const flickerTimeoutRef = useRef({});

  const handlePageClick = (id) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;

        if (p.checked) {
          if (flickerTimeoutRef.current[id]) {
            clearTimeout(flickerTimeoutRef.current[id]);
          }

          setFlickering((prev) => ({ ...prev, [id]: true }));

          flickerTimeoutRef.current[id] = setTimeout(() => {
            setPages((prev2) =>
              prev2.map((p2) =>
                p2.id === id ? { ...p2, checked: false } : p2
              )
            );
            setFlickering((prev) => ({ ...prev, [id]: false }));
          }, 280);

          return p;
        } else {
          return { ...p, checked: true };
        }
      })
    );
  };

  const handleAllPagesClick = () => {
    if (allPages.checked) {
      if (flickerTimeoutRef.current["all"]) {
        clearTimeout(flickerTimeoutRef.current["all"]);
      }

      setFlickering((prev) => ({ ...prev, all: true }));

      flickerTimeoutRef.current["all"] = setTimeout(() => {
        setAllPages({ checked: false });
        setFlickering((prev) => ({ ...prev, all: false }));
      }, 280);
    } else {
      setAllPages({ checked: true });
    }
  };

  const getCheckboxClass = (item, isHoveredRow, isHoveredCheckbox, itemId) => {
    const { checked } = item;
    const isFlickering = flickering[itemId];

    let classes = "checkbox";

    if (isFlickering) {
      classes += " flicker-out";
      return classes;
    }

    if (checked) {
      classes += isHoveredRow || isHoveredCheckbox ? " checked-hover" : " checked-away";
    } else {
      if (isHoveredRow || isHoveredCheckbox) {
        classes += " hover";
      }
    }

    return classes;
  };

  return (
    <div className="app-container">
      <div className="card">
        {/* ALL PAGES */}
        <div
          className="row fixed-row"
          onClick={handleAllPagesClick}
          onMouseEnter={() => setHoveredId("all")}
          onMouseLeave={() => {
            setHoveredId(null);
            setHoveredCheckbox(null);
          }}
        >
          <span className="label">All pages</span>
          <div
            className={getCheckboxClass(
              allPages,
              hoveredId === "all",
              hoveredCheckbox === "all",
              "all"
            )}
            onMouseEnter={() => setHoveredCheckbox("all")}
            onMouseLeave={() => setHoveredCheckbox(null)}
          >
            <svg viewBox="0 0 24 24">
              <path d="M20 6L9 17L4 12" />
            </svg>
          </div>
        </div>

        <div className="divider"></div>

        {/* INDIVIDUAL PAGES */}
        <div className="page-scroll-container">
          {pages.map((page) => (
            <div
              className="row"
              key={page.id}
              onClick={() => handlePageClick(page.id)}
              onMouseEnter={() => setHoveredId(page.id)}
              onMouseLeave={() => {
                setHoveredId(null);
                setHoveredCheckbox(null);
              }}
            >
              <span className="label">{page.name}</span>

              <div
                className={getCheckboxClass(
                  page,
                  hoveredId === page.id,
                  hoveredCheckbox === page.id,
                  page.id
                )}
                onMouseEnter={() => setHoveredCheckbox(page.id)}
                onMouseLeave={() => setHoveredCheckbox(null)}
              >
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
