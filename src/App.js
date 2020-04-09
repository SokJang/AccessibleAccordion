import React, { useState } from "react";
import styles from "./App.module.css";
import { Accordion } from "./components/Accordion";
import { AccordionSection } from "./components/AccordionSection";

const App = () => {
  const [expanded, setExpanded] = useState({ "2": true });
  const toggle = (id) => {
    setExpanded({
      ...expanded,
      [id]: !expanded[id],
    });
  };
  return (
    <div className={styles.Wrapper}>
      <Accordion>
        <AccordionSection
          title="section 1"
          id="1"
          expanded={expanded["1"]}
          onToggle={toggle}
        >
          Alice was beginning to get very tired of sitting by her sister on the
          bank, and of having nothing to do: once or twice she had peeped into
          the book her sister was reading, but it had no pictures or
          conversations in it, “and what is the use of a book,” thought Alice
          “without pictures or conversations?”
        </AccordionSection>
        <AccordionSection
          title="section 2"
          id="2"
          expanded={expanded["2"]}
          onToggle={toggle}
        >
          <a href="#test">Alice </a>
          was beginning to get very tired of sitting by her sister on the bank,
          and of having nothing to do: once or twice she had peeped into the
          book her sister was reading, but it had no pictures or conversations
          in it, “and what is the use of a book,” thought Alice “without
          pictures or conversations?”
        </AccordionSection>
      </Accordion>
    </div>
  );
};
export default App;
