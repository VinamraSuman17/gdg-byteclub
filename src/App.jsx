// App.js - Main Application Component
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SiCookiecutter } from 'react-icons/si';
import './App.css';

// Components
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import DishCarousel from './components/DishCarousel';
import RecipeExtractor from './components/RecipeExtractor';
import ScanFeature from './components/ScanFeature';
import ChatbotInterface from './components/ChatbotInterface';
import BlogSection from './components/BlogSection';
import Community from './components/Community';
import BlogUpload from './components/BlogUpload';
import Footer from './components/Footer';
import UtensilScanner from './components/UtensilScanner';

function App() {
  const [language, setLanguage] = useState('en'); // 'en' for English, 'hi' for Hindi
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Handle language change
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  // Handle modal display
  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
        <Navbar language={language} toggleLanguage={toggleLanguage} />
        
        <AnimatePresence>
          {showModal && (
            <Modal onClose={closeModal} content={modalContent} />
          )}
        </AnimatePresence>

        <Routes>
          <Route path="/" element={
            <main>
              <LandingPage language={language} />
              <DishCarousel language={language} openModal={openModal} />
              <ScanFeature language={language} />
              <RecipeExtractor language={language} />
              <UtensilScanner language={language} />
              <ChatbotInterface language={language} />
              <BlogSection language={language} openModal={openModal} />
              <Footer language={language} />
            </main>
          } />
          <Route path="/community" element={<Community language={language} />} />
          <Route path="/upload-blog" element={<BlogUpload language={language} />} />
        </Routes>
      </div>
    </Router>
  );
}

// Modal Component
const Modal = ({ onClose, content }) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-amber-700">{content?.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div>{content?.body}</div>
      </motion.div>
    </motion.div>
  );
};

export default App;