import React, { useState } from "react";
import styles from "./App.module.css";
import { Accordion } from "./components/Accordion";
import { AccordionSection } from "./components/AccordionSection";

const App = () => {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(true);
  return (
    <div className={styles.Wrapper}>
      <Accordion>
        <AccordionSection
          title="section 1"
          id="1"
          expanded={expanded1}
          onToggle={() => setExpanded1(!expanded1)}
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
          expanded={expanded2}
          onToggle={() => setExpanded2(!expanded2)}
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
