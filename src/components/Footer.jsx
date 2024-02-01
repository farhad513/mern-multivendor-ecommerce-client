import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineGithub,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiFillHeart,
} from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import {
  get_products_card,
  get_products_wishlist,
} from "../store/reducers/cardReducer";
import { useSelector, useDispatch } from "react-redux";
const Footer = () => {
  const { card_product_count, wishlist_count } = useSelector(
    (state) => state.card
  );
  const card_page_redirect = () => {
    if (userInfo) {
      navigate("/card");
    } else {
      navigate("/login");
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  return (
    <footer className="bg-[#f3f6fa]">
      <div className="w-[85%] flex flex-wrap mx-auto md-lg:pb-10 py-16 border-b sm:pb-6">
        <div className="w-3/12 lg:w-4/12 sm:w-full">
          <div className="flex flex-col gap-3">
            <Link to="/">
              <h1 className="text-3xl">
                ROB<span className="text-green-600">O</span>
                <span className="text-red-600">BIT</span>
                <span className="text-teal-600">SY</span>
              </h1>
            </Link>
            <ul className="flex flex-col text-slate-500">
              <li>Address : Chatkhil, Noakhali</li>
              <li>Phone : +8801518-690471</li>
              <li>Email : farhad@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="w-5/12 lg:w-8/12 sm:w-full">
          <div className="flex justify-center sm:justify-start sm:nt-6 w-full">
            <div>
              <h2 className="font-bold text-lg mb-2">All Links</h2>
              <div className=" flex justify-between gap-[80px] lg:gap-[40px]">
                <ul className="flex flex-col gap-2 text-slate-600">
                  <li>
                    <Link to="#">About Us</Link>
                  </li>
                  <li>
                    <Link to="#">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Shop Info</Link>
                  </li>
                  <li>
                    <Link to="#">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="#">Devery Info</Link>
                  </li>
                </ul>
                <ul className="flex flex-col gap-2 text-slate-600">
                  <li>
                    <Link to="#">About Us</Link>
                  </li>
                  <li>
                    <Link to="#">Home</Link>
                  </li>
                  <li>
                    <Link to="#">Shop Info</Link>
                  </li>
                  <li>
                    <Link to="#">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="#">Devery Info</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/12 lg:w-full lg:mt-6">
          <div className="w-full flex flex-col justify-start gap-3">
            <h2 className="font-bold text-lg mb-2">
              {" "}
              Join Our Newsletter Now{" "}
            </h2>
            <span>
              Get email Update about our latest shop and special offers
            </span>
            <div className="h-[50px] w-full bg-white relative border">
              <input
                placeholder="Please Enter Your Email"
                className="w-full h-full bg-transparent px-3 outline-none"
                type="text"
              />
              <button className="absolute right-0 bg-violet-500 text-white px-4 font-bold text-sm h-full uppercase ">
                Subscribe
              </button>
              <ul className="flex justify-start items-center gap-4 mt-5">
                <li className="w-[30px] h-[30px] bg-slate-400 rounded-full flex justify-center items-center text-xl">
                  <a href="#">
                    <AiOutlineFacebook />
                  </a>
                </li>
                <li className="w-[30px] h-[30px] bg-slate-400 rounded-full flex justify-center items-center text-xl">
                  <a href="#">
                    <AiOutlineGithub />
                  </a>
                </li>
                <li className="w-[30px] h-[30px] bg-slate-400 rounded-full flex justify-center items-center text-xl">
                  <a href="#">
                    <AiOutlineLinkedin />
                  </a>
                </li>
                <li className="w-[30px] h-[30px] bg-slate-400 rounded-full flex justify-center items-center text-xl">
                  <a href="#">
                    <AiOutlineTwitter />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center my-6 text-lg">
        <span>Copyright &copy; 2023, All Rights: farhad.com</span>
      </div>
      <div className="hidden fixed md-lg:block w-[50px] bottom-3 h-[100px]  right-2 bg-white rounded-full p-2">
        <div className="w-full h-full flex gap-3 flex-col justify-center items-center">
          <div
            onClick={card_page_redirect}
            className="relative flex justify-center items-center cursor-pointer w-[40px] h-[40px] rounded-full bg-slate-300"
          >
            <span className="text-orange-600 text-xl">
              <BsFillCartFill />
            </span>
            {card_product_count !== 0 && (
              <div className="w-[28px] h-[28px] absolute bg-green-500 rounded-full top-[-17px] right-[-10px] text-sm text-white flex justify-center items-center text-[12px]">
                {card_product_count}
              </div>
            )}
          </div>
          <div
            onClick={() =>
              navigate(userInfo ? "/deshboard/wishlist" : "/login")
            }
            className="relative flex justify-center items-center cursor-pointer w-[40px] h-[40px] rounded-full bg-slate-300"
          >
            <span className="text-red-600 text-xl">
              <AiFillHeart />
            </span>
            {wishlist_count !== 0 && (
              <div className="w-[28px] h-[28px] absolute bg-green-500 rounded-full top-[-17px] right-[-10px] text-sm text-white flex justify-center items-center">
                {wishlist_count}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
