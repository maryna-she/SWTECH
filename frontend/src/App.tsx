import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './Layout';
import ScrollToTop from './components/ScrollToTop';
import AccountPage from './pages/Account/AccountPage';
import AboutPage from './pages/About/AboutPage';
import CartPage from './pages/Cart/CartPage';
import ContactsPage from './pages/Contacts/ContactsPage';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import ProductDetailPage from './pages/Products/ProductDetailPage';
import ProductsPage from './pages/Products/ProductsPage';
import RegisterPage from './pages/Register/RegisterPage';

function App() {
  return (
    <LanguageProvider>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Pages with footer */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:productId" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
            </Route>

            {/* Auth & utility pages — no footer */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
