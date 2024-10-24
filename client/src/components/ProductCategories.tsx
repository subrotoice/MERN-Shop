import {
  FaArrowRightLong,
  FaMobileScreen,
  FaLaptop,
  FaTv,
  FaNetworkWired,
  FaMicrophoneLines,
} from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import IconComponent from "./IconComponent";
import { IconType } from "react-icons";
// Smartphones', 'Laptops', 'Smart TVs', 'Wearable Devices', 'Audio Devices
const iconMap: { [key: string]: IconType } = {
  FaMobileScreen: FaMobileScreen,
  FaLaptop: FaLaptop,
  FaTv: FaTv,
  FaNetworkWired: FaNetworkWired,
  FaMicrophoneLines: FaMicrophoneLines,
  // Add more icons here
};
const ProductCategories = () => {
  const categories = useCategories();
  console.log(categories.map((c) => c.icon));
  return (
    <div>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 dark:border-t border-gray-700 md:py-16">
          <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Shop by category
            </h2>
            <a
              href="#"
              title=""
              className="flex items-center text-base font-medium text-primary-700 hover:underline dark:text-primary-500"
            >
              See more categories
              <FaArrowRightLong className="ml-2" />
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <NavLink
                to={`/categories/${category._id}`}
                className="flex flex-col items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <IconComponent Icon={iconMap[category.icon]} />
                <span className="font-medium text-gray-900 dark:text-white pb-4 text-2xl">
                  {category.name}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductCategories;
