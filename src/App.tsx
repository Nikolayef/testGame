import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<h1>404 Страница не найдена</h1>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
