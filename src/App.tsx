import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Agents } from './pages/Agents';
import { Transactions } from './pages/Transactions';
import { Rules } from './pages/Rules';
import { Settings } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="agents" element={<Agents />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="rules" element={<Rules />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={
            <div style={{color: '#0f172a', padding: '40px', fontSize: '20px', fontWeight: 600}}>
              ⚙️ Feature set for this route is coming soon.
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
