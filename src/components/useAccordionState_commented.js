import { useState } from "react";

// used on Top Level component
export const useAccordionState_commented = (initialState) => {
  const [expanded, setExpanded] = useState(initialState);
  const onToggle = (id) => {
    setExpanded({
      ...expanded,
      [id]: !expanded[id],
    });
  };
  // passing prop through Accordion, Context API, useMemo, AccordionSection and DOM eventing
  return { expanded, onToggle };
};
