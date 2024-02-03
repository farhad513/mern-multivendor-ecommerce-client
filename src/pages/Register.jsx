import React, { useEffect, useState } from "react";
import { AiFillFacebook, AiOutlineGoogle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";
import { user_register, messageClear } from "../store/reducers/authReducer";
const Register = () => {
  const { loader, userInfo, successMessage, errorMessage } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const register = (e) => {
    e.preventDefault();
    dispatch(user_register(state));
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [successMessage, errorMessage]);
  return (
    <>
      {loader && (
        <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-[999] bg-[#30383033]">
          <FadeLoader />
        </div>
      )}
      <div className="bg-slate-200">
        <div className="w-full justify-center items-center  py-10">
          <div className="grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md">
            <div className="p-8">
              <h2 className="text-center w-full text-xl font-bold text-slate-600">
                Register
              </h2>
              <form onSubmit={register}>
                <div className="flex flex-col gap-2 mb-2">
                  <label htmlFor="name" className="text-lg font-semibold">
                    Name :{" "}
                  </label>
                  <input
                    value={state.name}
                    onChange={inputHandle}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Please Enter Name"
                    className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-400 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-2 mb-2">
                  <label className="text-lg font-semibold" htmlFor="email">
                    Email :{" "}
                  </label>
                  <input
                    value={state.email}
                    onChange={inputHandle}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Please Enter email"
                    className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-400 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-2 mb-2">
                  <label htmlFor="password" className="text-lg font-semibold">
                    Password :{" "}
                  </label>
                  <input
                    value={state.password}
                    onChange={inputHandle}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Please Enter password"
                    className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-400 rounded-md"
                  />
                </div>
                <button className="px-8 w-full py-2 bg-indigo-500 text-white font-semibold mt-2 hover:shadow-md hover:shadow-indigo-500/40 rounded-md">
                  Register
                </button>
              </form>
              <div className="w-full flex justify-center items-center mb-3 pt-3">
                <div className="w-[45%] bg-slate-700 h-[1px]"></div>
                <div className="w-[10%] flex items-center justify-center">
                  <span className="pb-1">Or</span>
                </div>
                <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              </div>
              <button className="px-8 w-full py-2 bg-indigo-500 hover:shadow-md hover:shadow-indigo-500/50 text-white rounded-md flex justify-center items-center gap-3 mb-3">
                <span>
                  <AiFillFacebook />
                </span>
                <span>Login With Facebook</span>
              </button>
              <button className="px-8 w-full py-2 bg-orange-500 hover:shadow-md hover:shadow-orange-500/50 text-white rounded-md flex justify-center items-center gap-3 mb-3">
                <span>
                  <AiOutlineGoogle />
                </span>
                <span>Login With Google</span>
              </button>
              <div className="text-center text-slate-500 pt-1 font-medium">
                <p>
                  <a
                    target="_blank"
                    className="text-blue-500"
                    href={"https://robobitst-dashboard.vercel.app/register"}
                  >
                    register
                  </a>{" "}
                  seller Account
                </p>
              </div>
              <div className="text-center text-slate-500 pt-1 font-medium">
                <p>
                  You have already Account ?{" "}
                  <Link className="text-blue-500" to={"/login"}>
                    Login
                  </Link>{" "}
                </p>
              </div>
            </div>
            <div className="w-full h-full pr-4 py-4">
              <img
                className="w-full h-[95%]"
                src="http://localhost:3000/images/download.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
