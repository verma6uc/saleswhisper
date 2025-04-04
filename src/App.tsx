
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage/Homepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="ai-coaching" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">AI Coaching</h1></div>} />
          <Route path="conversation-analytics" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Conversation Analytics</h1></div>} />
          <Route path="platform" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Platform</h1></div>} />
          <Route path="solutions" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Solutions</h1></div>} />
          <Route path="integration" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Integration</h1></div>} />
          <Route path="pricing" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Pricing</h1></div>} />
          <Route path="roi-calculator" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">ROI Calculator</h1></div>} />
          <Route path="resources" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Resources</h1></div>} />
          <Route path="demo" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Demo</h1></div>} />
          <Route path="*" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">404 - Page Not Found</h1></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
  