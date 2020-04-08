import React from "react";
import { Accordion } from "./components/accordion";
import { AccordionSection } from "./components/accordionSection";

const App = () => (
  <Accordion>
    <AccordionSection title="section 1">content 1</AccordionSection>
    <AccordionSection title="section 2" expanded>
      content 2
    </AccordionSection>
  </Accordion>
);

export default App;
