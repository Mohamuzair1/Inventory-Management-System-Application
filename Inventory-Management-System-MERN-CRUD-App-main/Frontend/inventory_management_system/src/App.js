import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Products from './components/Products';
import InsertProduct from './components/InsertProduct'
import UpdateProduct from './components/UpdateProduct';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Sales from './components/Sales';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return !token ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Navbar title="IMS" about="About" />
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Navbar title="IMS" about="About" />
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/home" element={
            <ProtectedRoute>
              <Navbar title="IMS" about="About" />
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/products" element={
            <ProtectedRoute>
              <Navbar title="IMS" about="About" />
              <Products />
            </ProtectedRoute>
          } />
          <Route path="/insertproduct" element={
            <ProtectedRoute>
              <Navbar title="IMS" about="About" />
              <InsertProduct />
            </ProtectedRoute>
          } />
          <Route path="/updateproduct/:id" element={
            <ProtectedRoute>
              <Navbar title="IMS" about="About" />
              <UpdateProduct />
            </ProtectedRoute>
          } />
          <Route path="/sales" element={
            <ProtectedRoute>
              <Navbar title="IMS" about="About" />
              <Sales />
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <Navbar title="IMS" about="About" />
              <About />
            </ProtectedRoute>
          } />
          
          {/* Catch all route - redirect to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
