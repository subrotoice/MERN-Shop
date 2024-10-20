import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <Navbar />
        <Hero />
      </div>
      <Footer />
    </>
  );
};

export default Home;
