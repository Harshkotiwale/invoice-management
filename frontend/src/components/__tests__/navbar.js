import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <motion.nav
      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 flex justify-between items-center shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold">Invoice Management</h1>
      <ul className="flex space-x-4">
        <motion.li whileHover={{ scale: 1.1 }}><a href="/">Home</a></motion.li>
        <motion.li whileHover={{ scale: 1.1 }}><a href="/invoices">Invoices</a></motion.li>
        <motion.li whileHover={{ scale: 1.1 }}><a href="/about">About</a></motion.li>
      </ul>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-gray-800 text-white px-3 py-2 rounded"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </motion.nav>
  );
};

export default Navbar;
