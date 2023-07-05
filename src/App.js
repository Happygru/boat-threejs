import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import View from "./pages";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
