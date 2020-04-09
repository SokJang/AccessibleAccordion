import React, { useEffect, useRef } from "react";
import styles from "./AccordionSection.module.css";
import { useAccordionContext } from "./Accordion";

export const AccordionSection = ({
  children,
  title,
  expanded,
  id,
  onToggle,
}) => {
  const sectionId = `section-${id}`;
  const labelId = `label-${id}`;

  // consuming context
  const { focusRef, selected } = useAccordionContext();
  // manage focus states with labelRef
  const labelRef = useRef(null);
  // to call focus() we need useEffect()
  // conditionally firing the effect only in changed props [id, selected]
  useEffect(() => {
    if (id === selected && labelRef.current) {
      labelRef.current.focus();
    }
  }, [id, selected]);

  return (
    <>
      <div
        role="button"
        aria-expanded={expanded}
        aria-controls={sectionId}
        id={labelId}
        tabIndex={0}
        className={styles.Label}
        onClick={onToggle}
        onKeyDown={(e) => {
          switch (e.key) {
            case " ":
            case "Enter":
              onToggle();
              break;
            default:
          }
        }}
        // mutable focusRe stored in context
        onFocus={() => {
          focusRef.current = id;
        }}
        onBlur={() => {
          focusRef.current = null;
        }}
        ref={labelRef}
      >
        {title}
        <span aria-hidden={true}>{expanded ? "▲" : "▼"}</span>
      </div>
      <div
        role="region"
        aria-labelledby={labelId}
        id={sectionId}
        hidden={!expanded}
        className={styles.Panel}
      >
        {expanded && children}
      </div>
    </>
  );
};
