import Faq from "../components/Faq";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Offer from "../components/Offer";
import ProductCategories from "../components/ProductCategories";
import Promotional from "../components/Promotional";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ProductCategories />
      <Promotional />
      <Offer />
      <Faq />
      <Footer />
    </>
  );
};

export default Home;
