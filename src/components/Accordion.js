import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useMemo,
} from "react";
import styles from "./Accordion.module.css";

const AccordionContext = createContext({
  focusRef: {},
  selected: null,
});
export const useAccordionContext = () => useContext(AccordionContext);

export const Accordion = ({ children }) => {
  const focusRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const context = useMemo(() => ({ focusRef, selected }), [selected]);

  if (process.env.NODE_ENV === "development") {
    const uniqueIds = new Set();
    React.Children.forEach(children, (child) => {
      if (uniqueIds.has(child.props.id)) {
        console.warn(
          `AccordionSection id param should be unique, found duplicate key: ${child.props.id}`
        );
      } else {
        uniqueIds.add(child.props.id);
      }
    });
  }

  return (
    <div
      className={styles.Accordion}
      onKeyDown={(e) => {
        switch (e.key) {
          case "ArrowDown":
            {
              const ids = React.Children.map(
                children,
                (child) => child.props.id
              );
              const index = ids.findIndex((x) => x === focusRef.current);
              if (index >= ids.length - 1) {
                setSelected(ids[0]);
              } else {
                setSelected(ids[index + 1]);
              }
            }
            break;
          case "ArrowUp":
            {
              const ids = React.Children.map(
                children,
                (child) => child.props.id
              );
              const index = ids.findIndex((x) => x === focusRef.current);
              if (index <= 0) {
                setSelected(ids[ids.length - 1]);
              } else {
                setSelected(ids[index - 1]);
              }
            }
            break;
          case "Home":
            {
              const ids = React.Children.map(
                children,
                (child) => child.props.id
              );
              setSelected(ids[0]);
            }
            break;
          case "End":
            {
              const ids = React.Children.map(
                children,
                (child) => child.props.id
              );
              setSelected(ids[ids.length - 1]);
            }
            break;
          default:
        }
      }}
    >
      <AccordionContext.Provider value={context}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
};
