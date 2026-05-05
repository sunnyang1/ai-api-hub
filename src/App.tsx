import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Models from './pages/Models';
import Compare from './pages/Compare';
import Rankings from './pages/Rankings';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Pricing from './pages/Pricing';
import Docs from './pages/Docs';
import Keys from './pages/Keys';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="models" element={<Models />} />
          <Route path="compare" element={<Compare />} />
          <Route path="rankings" element={<Rankings />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chat" element={<Chat />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="docs" element={<Docs />} />
          <Route path="keys" element={<Keys />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
