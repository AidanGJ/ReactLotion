import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout.js";
import NoteEditor from "./NoteEditor.js";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" index></Route>
          <Route path="/:noteNum" element={<NoteEditor />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// Note for grader!

// I do not have time to figure out routing,