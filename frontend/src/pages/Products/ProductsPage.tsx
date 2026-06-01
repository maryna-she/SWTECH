import useAuthLanguage from '../hooks/useAuthLanguage';
import HomeHeader from '../Home/HomeHeader';
import { homeDe } from '../Home/home.de';
import { homeEn } from '../Home/home.en';
import ProductCard from './ProductCard';
import { products } from './products';
import { productsDe } from './products.de';
import { productsEn } from './products.en';
import './ProductsPage.css';

const ProductsPage = () => {
  const { language, changeLanguage } = useAuthLanguage();
  const headerText = language === 'de' ? homeDe : homeEn;
  const text = language === 'de' ? productsDe : productsEn;

  return (
    <main className="home-shell products-shell">
      <HomeHeader
        text={headerText}
        language={language}
        onLanguageChange={changeLanguage}
      />

      <section className="products-hero" aria-labelledby="products-title">
        <p className="home-kicker">{text.kicker}</p>
        <h1 id="products-title">{text.title}</h1>
        <p>{text.intro}</p>
      </section>

      <section className="products-grid" aria-label={text.allProducts}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            text={text}
            language={language}
            product={product}
          />
        ))}
      </section>
    </main>
  );
};

export default ProductsPage;
