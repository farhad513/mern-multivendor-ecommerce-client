import React, { useEffect } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import FeatureProduct from "../components/Products/FeatureProduct";
import Products from "../components/Products/Products";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { get_categorys, get_products } from "../store/reducers/homeReducer";
const Home = () => {
  const dispatch = useDispatch();
  const {
    categorys,
    products,
    latestProduct,
    topRatedProduct,
    discountProduct,
  } = useSelector((state) => state.home);
  useEffect(() => {
    dispatch(get_products());
  }, []);
  return (
    <div className="w-full">
      <Header />
      <Banner />
      <div className="my-4">
        <Categorys />
      </div>
      <div className="py-[40px]">
        <FeatureProduct products={products} />
      </div>
      <div className="py-[40px]">
        <div className="w-[85%] flex flex-wrap mx-auto">
          <div className=" w-full grid grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="overflow-hidden">
              <Products title="Latest Product" products={latestProduct} />
            </div>
            <div className="overflow-hidden">
              <Products title="Top Reted Product" products={topRatedProduct} />
            </div>
            <div className="overflow-hidden">
              <Products title="Discount Product" products={discountProduct} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
