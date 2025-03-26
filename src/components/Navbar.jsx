// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// import { SiCookiecutter } from 'react-icons/si';
// import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';

// const Navbar = ({ language, toggleLanguage }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [navVisible, setNavVisible] = useState(true);
//   const { scrollY } = useScroll();

//   // Enhanced scroll animations
//   const navBackground = useTransform(
//     scrollY, 
//     [0, 100], 
//     ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.95)']
//   );
  
//   const navHeight = useTransform(scrollY, [0, 100], ['5rem', '4rem']);
//   const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
      
//       // Hide nav when scrolling down, show when scrolling up
//       if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         setNavVisible(false);
//       } else {
//         setNavVisible(true);
//       }
      
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [lastScrollY]);

//   const translations = {
//     en: {
//       home: "Home",
//       community: "Community",
//       uploadBlog: "Upload Blog",
//       language: "हिंदी"
//     },
//     hi: {
//       home: "होम",
//       community: "समुदाय",
//       uploadBlog: "ब्लॉग अपलोड करें",
//       language: "English"
//     }
//   };

//   const text = translations[language];

//   // Menu item hover animations
//   const menuItemVariants = {
//     initial: { y: 0 },
//     hover: { y: -3, transition: { type: "spring", stiffness: 400, damping: 10 } }
//   };

//   // Logo animation variants
//   const logoVariants = {
//     initial: { rotate: 0 },
//     hover: { rotate: 15, transition: { type: "spring", stiffness: 500, damping: 10 } }
//   };

//   // Mobile menu animations
//   const mobileMenuVariants = {
//     closed: { 
//       x: "100%",
//       opacity: 0,
//       transition: { 
//         type: "spring", 
//         stiffness: 300, 
//         damping: 30 
//       }
//     },
//     open: { 
//       x: 0,
//       opacity: 1,
//       transition: { 
//         type: "spring", 
//         stiffness: 300, 
//         damping: 30,
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const menuItemVariantsMobile = {
//     closed: { x: 20, opacity: 0 },
//     open: { 
//       x: 0, 
//       opacity: 1,
//       transition: { type: "spring", stiffness: 400, damping: 20 }
//     }
//   };

//   // Navbar animation for showing/hiding
//   const navbarVariants = {
//     visible: { 
//       y: 0,
//       opacity: 1,
//       transition: { 
//         type: "spring", 
//         stiffness: 300, 
//         damping: 30 
//       }
//     },
//     hidden: { 
//       y: -100,
//       opacity: 0,
//       transition: { 
//         type: "spring", 
//         stiffness: 300, 
//         damping: 30 
//       }
//     }
//   };

//   return (
//     <>
//       <motion.nav 
//         className="fixed top-0 left-0 right-0 z-40"
//         style={{ 
//           background: navBackground,
//           height: navHeight,
//           boxShadow: lastScrollY > 50 ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none"
//         }}
//         variants={navbarVariants}
//         initial="visible"
//         animate={navVisible ? "visible" : "hidden"}
//       >
//         <div className="container mx-auto px-4 h-full flex justify-between items-center">
//           <Link to="/" className="flex items-center space-x-2 group">
//             <motion.div
//               whileHover="hover"
//               initial="initial"
//               variants={logoVariants}
//             >
//               <SiCookiecutter className="text-3xl text-amber-500" />
//             </motion.div>
//             <motion.span 
//               className="text-xl font-bold text-amber-700"
//               style={{ scale: logoScale }}
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 400 }}
//             >
//               BakEase
//             </motion.span>
//           </Link>
          
//           <div className="hidden md:flex items-center space-x-8">
//             {['home', 'community', 'uploadBlog'].map((item) => (
//               <motion.div
//                 key={item}
//                 onHoverStart={() => setHoveredItem(item)}
//                 onHoverEnd={() => setHoveredItem(null)}
//                 variants={menuItemVariants}
//                 initial="initial"
//                 whileHover="hover"
//               >
//                 <Link 
//                   to={item === 'home' ? '/' : `/${item.toLowerCase().replace('blog', '-blog')}`} 
//                   className="text-amber-700 hover:text-amber-500 transition-colors relative"
//                 >
//                   {text[item]}
//                   {hoveredItem === item && (
//                     <motion.span
//                       className="absolute bottom-0 left-0 w-full bg-amber-400"
//                       initial={{ height: 0 }}
//                       animate={{ height: '2px' }}
//                       transition={{ duration: 0.2 }}
//                     />
//                   )}
//                 </Link>
//               </motion.div>
//             ))}
            
//             <motion.button 
//               onClick={toggleLanguage}
//               className="px-3 py-1 bg-amber-100 hover:bg-amber-200 rounded-lg text-amber-700 transition-colors"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ type: "spring", stiffness: 400 }}
//             >
//               {text.language}
//             </motion.button>
//           </div>
          
//           <motion.button 
//             className="md:hidden"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             whileTap={{ scale: 0.9 }}
//           >
//             <AnimatePresence mode="wait">
//               {isMenuOpen ? (
//                 <motion.div
//                   key="close"
//                   initial={{ rotate: -90, opacity: 0 }}
//                   animate={{ rotate: 0, opacity: 1 }}
//                   exit={{ rotate: 90, opacity: 0 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <HiX className="text-2xl text-amber-700" />
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="menu"
//                   initial={{ rotate: 90, opacity: 0 }}
//                   animate={{ rotate: 0, opacity: 1 }}
//                   exit={{ rotate: -90, opacity: 0 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <HiOutlineMenuAlt3 className="text-2xl text-amber-700" />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.button>
//         </div>
//       </motion.nav>
      
//       {/* Mobile menu with improved animations */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div 
//             className="fixed inset-0 bg-white z-30 pt-20"
//             variants={mobileMenuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//           >
//             <div className="container mx-auto px-4 py-8 flex flex-col space-y-6">
//               {['home', 'community', 'uploadBlog'].map((item) => (
//                 <motion.div key={item} variants={menuItemVariantsMobile}>
//                   <Link 
//                     to={item === 'home' ? '/' : `/${item.toLowerCase().replace('blog', '-blog')}`}
//                     className="text-xl text-amber-700 hover:text-amber-500 transition-colors block"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <motion.div
//                       whileHover={{ x: 10 }}
//                       transition={{ type: "spring", stiffness: 400 }}
//                       className="flex items-center"
//                     >
//                       <span className="mr-2 opacity-0 group-hover:opacity-100">→</span>
//                       {text[item]}
//                     </motion.div>
//                   </Link>
//                 </motion.div>
//               ))}
              
//               <motion.button 
//                 onClick={() => {
//                   toggleLanguage();
//                   setIsMenuOpen(false);
//                 }}
//                 className="px-4 py-2 bg-amber-100 hover:bg-amber-200 rounded-lg text-amber-700 transition-colors w-fit"
//                 variants={menuItemVariantsMobile}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {text.language}
//               </motion.button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { SiCookiecutter } from 'react-icons/si';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = ({ language, toggleLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const { scrollY } = useScroll();

  // Enhanced scroll animations with white background
  const navBackground = useTransform(
    scrollY, 
    [0, 100], 
    ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.95)']
  );
  
  const navHeight = useTransform(scrollY, [0, 100], ['5rem', '4rem']);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide nav when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const translations = {
    en: {
      home: "Home",
      community: "Community",
      uploadBlog: "Upload Blog",
      language: "हिंदी"
    },
    hi: {
      home: "होम",
      community: "समुदाय",
      uploadBlog: "ब्लॉग अपलोड करें",
      language: "English"
    }
  };

  const text = translations[language];

  // Menu item hover animations
  const menuItemVariants = {
    initial: { y: 0 },
    hover: { y: -3, transition: { type: "spring", stiffness: 400, damping: 10 } }
  };

  // Logo animation variants
  const logoVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 15, transition: { type: "spring", stiffness: 500, damping: 10 } }
  };

  // Mobile menu animations
  const mobileMenuVariants = {
    closed: { 
      x: "100%",
      opacity: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    open: { 
      x: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const menuItemVariantsMobile = {
    closed: { x: 20, opacity: 0 },
    open: { 
      x: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 400, damping: 20 }
    }
  };

  // Navbar animation for showing/hiding
  const navbarVariants = {
    visible: { 
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    },
    hidden: { 
      y: -100,
      opacity: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-40"
        style={{ 
          background: navBackground,
          height: navHeight,
          boxShadow: lastScrollY > 50 ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none"
        }}
        variants={navbarVariants}
        initial="visible"
        animate={navVisible ? "visible" : "hidden"}
      >
        <div className="container mx-auto px-4 h-full flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover="hover"
              initial="initial"
              variants={logoVariants}
            >
              <SiCookiecutter style={{ color: '#e981a4' }} className="text-3xl" />
            </motion.div>
            <motion.span 
              style={{ color: '#e981a4', scale: logoScale }}
              className="text-xl font-bold"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              BakEase
            </motion.span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'community', 'uploadBlog'].map((item) => (
              <motion.div
                key={item}
                onHoverStart={() => setHoveredItem(item)}
                onHoverEnd={() => setHoveredItem(null)}
                variants={menuItemVariants}
                initial="initial"
                whileHover="hover"
              >
                <Link 
                  to={item === 'home' ? '/' : `/${item.toLowerCase().replace('blog', '-blog')}`} 
                  style={{ color: '#e981a4' }}
                  className="hover:text-[#f9adb7] transition-colors relative"
                >
                  {text[item]}
                  {hoveredItem === item && (
                    <motion.span
                      style={{ backgroundColor: '#f9adb7' }}
                      className="absolute bottom-0 left-0 w-full"
                      initial={{ height: 0 }}
                      animate={{ height: '2px' }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            <motion.button 
              onClick={toggleLanguage}
              style={{ 
                backgroundColor: '#f4c5d7', 
                color: '#e981a4' 
              }}
              className="px-3 py-1 hover:bg-[#fec9c3] rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {text.language}
            </motion.button>
          </div>
          
          <motion.button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiX style={{ color: '#e981a4' }} className="text-2xl" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiOutlineMenuAlt3 style={{ color: '#e981a4' }} className="text-2xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>
      
      {/* Mobile menu with improved animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            style={{ backgroundColor: '#fff' }}
            className="fixed inset-0 z-30 pt-20"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col space-y-6">
              {['home', 'community', 'uploadBlog'].map((item) => (
                <motion.div key={item} variants={menuItemVariantsMobile}>
                  <Link 
                    to={item === 'home' ? '/' : `/${item.toLowerCase().replace('blog', '-blog')}`}
                    style={{ color: '#e981a4' }}
                    className="text-xl hover:text-[#f9adb7] transition-colors block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <motion.div
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="flex items-center"
                    >
                      <span className="mr-2 opacity-0 group-hover:opacity-100">→</span>
                      {text[item]}
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
              
              <motion.button 
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                style={{ 
                  backgroundColor: '#f4c5d7', 
                  color: '#e981a4' 
                }}
                className="px-4 py-2 hover:bg-[#fec9c3] rounded-lg transition-colors w-fit"
                variants={menuItemVariantsMobile}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {text.language}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;