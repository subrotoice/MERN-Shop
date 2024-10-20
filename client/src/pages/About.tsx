import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Navbar />
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">About Us</h1>
            <p className="py-6">
              An eCommerce shop is an online platform where businesses or
              individuals sell products or services over the internet. It
              provides a virtual storefront where customers can browse, compare,
              and purchase items without the need for a physical store. These
              shops have become an essential part of modern business due to the
              increasing shift of consumers towards online shopping. Key
              elements of a successful eCommerce shop include user-friendly
              design, secure payment methods, and efficient delivery systems.
              The website should be easy to navigate, allowing customers to find
              products quickly. Incorporating features such as product filters,
              search bars, and detailed product descriptions helps enhance the
              shopping experience. Additionally, having multiple secure payment
              gateways like credit cards, PayPal, and digital wallets is crucial
              to ensure customer trust and convenience.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <div className="flex  justify-center ">
        <div className="max-w-96 bg-white shadow flex flex-col my-4 p-6 ">
          <p className="text-xl font-semibold pb-5">About Us</p>
          <p className="pb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            mattis est eu odio sagittis tristique. Vestibulum ut finibus leo. In
            hac habitasse platea dictumst.
          </p>
          <a
            href="#"
            className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4"
          >
            Get to know us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
