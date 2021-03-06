import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import styles from "./Accordion.module.css";

// 2.
// pass focusRef with this Accordion "Wrapper" to all AccordionSections with Context API
// a. createContext()
// b. export useContext() for AccordionSections to access
// c. provide context value for all AccordionSection to use
/*
<AccordionContext.Provider value={context}>
  {children}
</AccordionContext.Provider>
 */
const AccordionContext = createContext({
  focusRef: {},
  selected: null,
  // expanded container
  expandedAll: {},
  // default
  onToggle: undefined,
});
export const useAccordionContext = () => useContext(AccordionContext);

export const Accordion = ({ children, expanded, onToggle }) => {
  // 1.
  // store keyboard usage (Up Arrow and Down Arrow) with focusRef
  /* useRef returns a mutable ref object whose .current property is initialized
  to the passed argument (initialValue).
  The returned object will persist for the full lifetime of the component.
   */
  // the mutable is value is set with onFocus and onBlur
  const focusRef = useRef(null);
  const [selected, setSelected] = useState(null);

  // 3.
  // the createdContext value gets optimized
  // to avoid unwanted rerenders on state changes with useMemo()
  /*
  Returns a memoized value.
  Pass a “create” function and an array of dependencies.
  useMemo will only recompute the memoized value when one of the dependencies has changed.
  This optimization helps to avoid expensive calculations on every render.
   */

  // higher order function passing context props through (except expandedAll gets additionally a default assignment)
  const context = useMemo(
    () => ({ focusRef, selected, expandedAll: expanded, onToggle }),
    // watched (for change) dependencies
    [selected, expanded, onToggle]
  );

  // Check if id is unique
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
      onKeyDown={
        // 4.
        // catch key use
        (e) => {
          switch (e.key) {
            case "ArrowDown":
              {
                // https://reactjs.org/docs/react-api.html#reactchildrenmap
                // get the ids of the children (AccordionSections)
                const ids = React.Children.map(
                  children,
                  (child) => child.props.id
                );
                // get the focused element
                const index = ids.findIndex((x) => x === focusRef.current);
                // find the next value
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
          }
        }
      }
    >
      <AccordionContext.Provider value={context}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
};

Accordion.propTypes = {
  expanded: PropTypes.objectOf(PropTypes.bool),
  onToggle: PropTypes.func,
};

Accordion.defaultProps = {
  expanded: {},
};
