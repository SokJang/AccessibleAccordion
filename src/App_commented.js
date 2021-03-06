import React, { useState } from "react";
import styles from "./App.module.css";
import { Accordion } from "./components/Accordion";
import { AccordionSection } from "./components/AccordionSection";
import { useAccordionState } from "./components/useAccordionState";

const App_commented = () => {
  // using custom hook that return expanded and onToggle (formerly known as toggle)
  // these props are passed through Accordion component to its children
  const accordionProps = useAccordionState({ id2: true });
  return (
    <div className={styles.Wrapper}>
      <Accordion {...accordionProps}>
        <AccordionSection title="section 1" id="1">
          <p>
            Alice was beginning to get very tired of sitting by her sister on
            the bank, and of having nothing to do: once or twice she had peeped
            into the book her sister was reading, but it had no pictures or
            conversations in it, “and what is the use of a book,” thought Alice
            “without pictures or conversations?”
          </p>
        </AccordionSection>
        <AccordionSection title="section 2" id="2">
          <p>
            <a href="#test">Alice </a>
            was beginning to get very tired of sitting by her sister on the
            bank, and of having nothing to do: once or twice she had peeped into
            the book her sister was reading, but it had no pictures or
            conversations in it, “and what is the use of a book,” thought Alice
            “without pictures or conversations?”
          </p>
        </AccordionSection>
      </Accordion>
    </div>
  );
};

export default App_commented;
