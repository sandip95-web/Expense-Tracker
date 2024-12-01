import { FC } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-10 relative bg-gradient-to-b from-indigo-900 to-gray-900 py-10"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-white font-extrabold text-4xl md:text-6xl lg:text-8xl tracking-tight"
        >
          Expense{" "}
          <Link
            to="/"
            className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:scale-105 transform transition duration-300 ease-in-out"
          >
            GQL
          </Link>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-gray-300 text-lg md:text-xl mt-4"
        >
          Manage your expenses seamlessly and stylishly.
        </motion.p>
      </motion.div>

      {/* Animated Gradient Bar */}
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.2, delay: 1 }}
        className="relative w-3/4 mx-auto mt-6 h-2 overflow-hidden rounded-lg shadow-lg"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 animate-gradient-x"></div>
      </motion.div>

      {/* Decorative Circles */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute -top-10 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 blur-xl opacity-70"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute -bottom-10 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 blur-2xl opacity-60"
      ></motion.div>
    </motion.div>
  );
};

export default Header;
