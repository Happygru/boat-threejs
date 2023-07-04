import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import View from './pages';
import store from './store';

import './App.css';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<View />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
