import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import ProductDetailPage from './pages/Products/ProductDetailPage';
import ProductsPage from './pages/Products/ProductsPage';
import RegisterPage from './pages/Register/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Definiert die Hauptseiten und leitet unbekannte Pfade zurück. */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
