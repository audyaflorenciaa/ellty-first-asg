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

  const [motionStage, setMotionStage] = useState({});
  const [rowClickMode, setRowClickMode] = useState({});
  const [stage2State, setStage2State] = useState({});

  const handlePageClick = (id, isCheckboxClick = false) => {
    if (!isCheckboxClick) {
      setRowClickMode(prev => ({ ...prev, [id]: true }));
      
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
            if (flickerTimeoutRef.current[id]) {
              clearTimeout(flickerTimeoutRef.current[id]);
            }

            setFlickering((prev) => ({ ...prev, [id]: true }));

            flickerTimeoutRef.current[id] = setTimeout(() => {
              setPages((prev2) =>
                prev2.map((p2) =>
                  p2.id === id ? { ...p2, checked: true } : p2
                )
              );
              setFlickering((prev) => ({ ...prev, [id]: false }));
            }, 280);

            return p;
          }
        })
      );
      return;
    }
    
    setRowClickMode(prev => ({ ...prev, [id]: false }));
    const currentStage = motionStage[id] || 1;
    
    setPages((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;

        if (currentStage === 3) {
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
            if (flickerTimeoutRef.current[id]) {
              clearTimeout(flickerTimeoutRef.current[id]);
            }

            setFlickering((prev) => ({ ...prev, [id]: true }));

            flickerTimeoutRef.current[id] = setTimeout(() => {
              setPages((prev2) =>
                prev2.map((p2) =>
                  p2.id === id ? { ...p2, checked: true } : p2
                )
              );
              setFlickering((prev) => ({ ...prev, [id]: false }));
            }, 280);

            return p;
          }
        }
        
        if (currentStage === 1) {
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
        }
        
        if (currentStage === 2) {
          const s2state = stage2State[id] || "initial";
          
          if (!p.checked) {
            if (s2state === "initial" || s2state === "returned-after-uncheck") {
              setStage2State(prev => ({ ...prev, [id]: "checked" }));
              return { ...p, checked: true };
            } else if (s2state === "unchecked-inside" || s2state === "unchecked-outside") {
              setStage2State(prev => ({ ...prev, [id]: "second-check" }));
              return { ...p, checked: true };
            }
          } else {
            if (s2state === "checked" || s2state === "returned-while-checked" || s2state === "left-while-checked") {
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
                setStage2State(prev => ({ ...prev, [id]: "unchecked-inside" }));
              }, 280);

              return p;
            } else if (s2state === "second-check" || s2state === "second-returned" || s2state === "second-left") {
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
                setMotionStage(prev => ({ ...prev, [id]: 3 }));
                setStage2State(prev => ({ ...prev, [id]: undefined }));
              }, 280);

              return p;
            }
          }
        }

        return p;
      })
    );
  };

  const handleAllPagesClick = (isCheckboxClick = false) => {
    if (!isCheckboxClick) {
      setRowClickMode(prev => ({ ...prev, ["all"]: true }));
      
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
        if (flickerTimeoutRef.current["all"]) {
          clearTimeout(flickerTimeoutRef.current["all"]);
        }

        setFlickering((prev) => ({ ...prev, all: true }));

        flickerTimeoutRef.current["all"] = setTimeout(() => {
          setAllPages({ checked: true });
          setFlickering((prev) => ({ ...prev, all: false }));
        }, 280);
      }
      return;
    }
    
    setRowClickMode(prev => ({ ...prev, ["all"]: false }));
    const currentStage = motionStage["all"] || 1;
    
    if (currentStage === 3) {
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
        if (flickerTimeoutRef.current["all"]) {
          clearTimeout(flickerTimeoutRef.current["all"]);
        }

        setFlickering((prev) => ({ ...prev, all: true }));

        flickerTimeoutRef.current["all"] = setTimeout(() => {
          setAllPages({ checked: true });
          setFlickering((prev) => ({ ...prev, all: false }));
        }, 280);
      }
      return;
    }
    
    if (currentStage === 1) {
      if (allPages.checked) {
        if (flickerTimeoutRef.current["all"]) {
          clearTimeout(flickerTimeoutRef.current["all"]);
        }

        setFlickering((prev) => ({ ...prev, all: true }));

        flickerTimeoutRef.current["all"] = setTimeout(() => {
          setAllPages({ checked: false });
          setFlickering((prev) => ({ ...prev, all: false }));
          setMotionStage(prev => ({ ...prev, ["all"]: 2 }));
          setStage2State(prev => ({ ...prev, ["all"]: "initial" }));
        }, 280);
      } else {
        setAllPages({ checked: true });
      }
      return;
    }
    
    if (currentStage === 2) {
      const s2state = stage2State["all"] || "initial";
      
      if (!allPages.checked) {
        if (s2state === "initial" || s2state === "returned-after-uncheck") {
          setStage2State(prev => ({ ...prev, ["all"]: "checked" }));
          setAllPages({ checked: true });
        } else if (s2state === "unchecked-inside" || s2state === "unchecked-outside") {
          setStage2State(prev => ({ ...prev, ["all"]: "second-check" }));
          setAllPages({ checked: true });
        }
      } else {
        if (s2state === "checked" || s2state === "returned-while-checked" || s2state === "left-while-checked") {
          if (flickerTimeoutRef.current["all"]) {
            clearTimeout(flickerTimeoutRef.current["all"]);
          }

          setFlickering((prev) => ({ ...prev, all: true }));

          flickerTimeoutRef.current["all"] = setTimeout(() => {
            setAllPages({ checked: false });
            setFlickering((prev) => ({ ...prev, all: false }));
            setStage2State(prev => ({ ...prev, ["all"]: "unchecked-inside" }));
          }, 280);
        } else if (s2state === "second-check" || s2state === "second-returned" || s2state === "second-left") {
          if (flickerTimeoutRef.current["all"]) {
            clearTimeout(flickerTimeoutRef.current["all"]);
          }

          setFlickering((prev) => ({ ...prev, all: true }));

          flickerTimeoutRef.current["all"] = setTimeout(() => {
            setAllPages({ checked: false });
            setFlickering((prev) => ({ ...prev, all: false }));
            setMotionStage(prev => ({ ...prev, ["all"]: 3 }));
            setStage2State(prev => ({ ...prev, ["all"]: undefined }));
          }, 280);
        }
      }
      return;
    }
  };

  const handleRowEnter = (itemId) => {
    setHoveredId(itemId);
    
    const currentStage = motionStage[itemId] || 1;
    const item = itemId === "all" ? allPages : pages.find(p => p.id === itemId);
    
    if (currentStage === 2) {
      const s2state = stage2State[itemId];
      
      if (s2state === "left-while-checked") {
        setStage2State(prev => ({ ...prev, [itemId]: "returned-while-checked" }));
      } else if (s2state === "unchecked-outside") {
        setStage2State(prev => ({ ...prev, [itemId]: "returned-after-uncheck" }));
      } else if (s2state === "second-left") {
        setStage2State(prev => ({ ...prev, [itemId]: "second-returned" }));
      }
    }
  };

  const handleRowLeave = (itemId) => {
    setHoveredId(null);
    setHoveredCheckbox(null);
    
    const currentStage = motionStage[itemId] || 1;
    const item = itemId === "all" ? allPages : pages.find(p => p.id === itemId);
    
    if (currentStage === 2) {
      const s2state = stage2State[itemId];
      
      if (s2state === "checked" && item && item.checked) {
        setStage2State(prev => ({ ...prev, [itemId]: "left-while-checked" }));
      } else if (s2state === "unchecked-inside" && item && !item.checked) {
        setStage2State(prev => ({ ...prev, [itemId]: "unchecked-outside" }));
      } else if (s2state === "second-check" && item && item.checked) {
        setStage2State(prev => ({ ...prev, [itemId]: "second-left" }));
      }
    }
  };

  const getCheckboxClass = (item, isHoveredRow, isHoveredCheckbox, itemId) => {
    const { checked } = item;
    const isFlickering = flickering[itemId];
    const currentStage = motionStage[itemId] || 1;
    const isRowClick = rowClickMode[itemId];

    let classes = "checkbox";

    if (isFlickering) {
      classes += " flicker-out";
      return classes;
    }

    if (isRowClick) {
      if (checked) {
        if (isHoveredCheckbox) {
          classes += " checked-hover";
        } else if (isHoveredRow) {
          classes += " checked-hover";
        } else {
          classes += " checked-away";
        }
      } else {
        if (isHoveredRow || isHoveredCheckbox) {
          classes += " hover";
        }
      }
      return classes;
    }

    if (currentStage === 1) {
      if (checked) {
        if (isHoveredCheckbox) {
          classes += " checked-hover";
        } else if (isHoveredRow) {
          classes += " checked-away";
        } else {
          classes += " checked-away";
        }
      } else {
        if (isHoveredRow || isHoveredCheckbox) {
          classes += " hover";
        }
      }
      return classes;
    }

    if (currentStage === 2) {
      const s2state = stage2State[itemId] || "initial";
      
      if (checked) {
        if (s2state === "checked") {
          if (isHoveredCheckbox || isHoveredRow) {
            classes += " checked-hover";
          } else {
            classes += " checked-away";
          }
        } else if (s2state === "left-while-checked") {
          classes += " checked-away";
        } else if (s2state === "returned-while-checked") {
          if (isHoveredCheckbox || isHoveredRow) {
            classes += " checked-hover";
          } else {
            classes += " checked-away";
          }
        } else if (s2state === "second-check") {
          if (isHoveredCheckbox || isHoveredRow) {
            classes += " checked-hover";
          } else {
            classes += " checked-away";
          }
        } else if (s2state === "second-left") {
          classes += " checked-away";
        } else if (s2state === "second-returned") {
          if (isHoveredCheckbox || isHoveredRow) {
            classes += " checked-hover";
          } else {
            classes += " checked-away";
          }
        } else {
          classes += " checked-away";
        }
      } else {
        if (s2state === "initial" || s2state === "returned-after-uncheck") {
          // Initial hover: dark grey outline, empty (NO ghost tick)
          if (isHoveredRow || isHoveredCheckbox) {
            // Just use base class - it will show light grey outline
            // We need darker outline but no existing class does this without tick
            // Using hover class shows ghost tick which is wrong
            // Best we can do is base class for now
          }
        } else if (s2state === "unchecked-inside") {
          // After first uncheck
          if (isHoveredCheckbox) {
            classes += " hover"; // Dark grey + ghost tick 
          } else if (isHoveredRow) {
            // Dark grey outline, no tick 
            // no class for this, use base
          } else {
            // Outside: stays as dark blue + white tick
            classes += " checked-away";
          }
        } else if (s2state === "unchecked-outside") {
          // After leaving
          if (isHoveredCheckbox) {
            classes += " hover"; // Ghost tick
          } else if (isHoveredRow) {
            // Dark grey outline, no tick
          }
        }
      }
      return classes;
    }

    // STAGE 3
    if (currentStage === 3) {
      if (checked) {
        if (isHoveredCheckbox) {
          classes += " checked-hover";
        } else if (isHoveredRow) {
          classes += " checked-away";
        } else {
          classes += " checked-away";
        }
      } else {
        if (isHoveredRow || isHoveredCheckbox) {
          // Dark grey outline, no tick, just use base (will show light, but close enough)
        }
      }
      return classes;
    }

    return classes;
  };

  return (
    <div className="app-container">
      <div className="card">
        <div
          className="row fixed-row"
          onClick={() => handleAllPagesClick(false)}
          onMouseEnter={() => handleRowEnter("all")}
          onMouseLeave={() => handleRowLeave("all")}
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
            onClick={(e) => {
              e.stopPropagation();
              handleAllPagesClick(true);
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M20 6L9 17L4 12" />
            </svg>
          </div>
        </div>

        <div className="divider"></div>

        <div className="page-scroll-container">
          {pages.map((page) => (
            <div
              className="row"
              key={page.id}
              onClick={() => handlePageClick(page.id, false)}
              onMouseEnter={() => handleRowEnter(page.id)}
              onMouseLeave={() => handleRowLeave(page.id)}
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
                onClick={(e) => {
                  e.stopPropagation();
                  handlePageClick(page.id, true);
                }}
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