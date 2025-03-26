import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaUtensils, FaUsers, FaSearch } from "react-icons/fa";

const LandingPage = ({ language = "en" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: false, amount: 0.3 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const translations = {
    en: {
      title: "Smart and Simple Baking Assistant",
      subtitle: "Making baking easier, one recipe at a time",
      description:
        "We help you measure ingredients perfectly, find alternative ingredients, and connect with other baking enthusiasts.",
      getStarted: "Get Started",
      exploreRecipes: "Explore Recipes",
      features: "What We Offer",
      feature1Title: "Perfect Measurements",
      feature1Desc: "Convert and scale any recipe with precision",
      feature2Title: "Community Support",
      feature2Desc: "Connect with bakers from around the world",
      feature3Title: "Ingredient Alternatives",
      feature3Desc: "Find substitutes for any ingredient you don't have",
    },
    hi: {
      title: "स्मार्ट और सरल बेकिंग सहायक",
      subtitle: "बेकिंग को आसान बनाना, एक रेसिपी एक बार में",
      description:
        "हम आपको सामग्री को सही मापने, वैकल्पिक सामग्री खोजने और अन्य बेकिंग उत्साही लोगों से जुड़ने में मदद करते हैं।",
      getStarted: "शुरू करें",
      exploreRecipes: "रेसिपी देखें",
      features: "हम क्या प्रदान करते हैं",
      feature1Title: "सटीक मापन",
      feature1Desc: "किसी भी रेसिपी को सटीकता से कनवर्ट और स्केल करें",
      feature2Title: "समुदाय समर्थन",
      feature2Desc: "दुनिया भर के बेकर्स से जुड़ें",
      feature3Title: "सामग्री विकल्प",
      feature3Desc: "आपके पास न होने वाली किसी भी सामग्री के विकल्प खोजें",
    },
  };

  const text = translations[language] || translations.en;

  // Floating animation for the hero elements
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
    },
  };

  // Staggered entrance animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Feature card hover animations
  const featureCardVariants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      transition: {
        repeat: Infinity,
        duration: 3,
        repeatType: "loop",
      },
    },
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: "0 10px 20px rgba(233, 129, 164, 0.3)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  const iconVariants = {
    rest: {
      scale: 1,
      rotate: 0,
      transition: {
        repeat: Infinity,
        duration: 3,
        repeatType: "loop",
      },
    },
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  // Enhanced wave animations
  const waveAnimation = {
    x: [-30, 30, -30],
    y: [0, 10, 0],
    transition: {
      repeat: Infinity,
      duration: 10,
      ease: "easeInOut",
      repeatType: "loop",
    },
  };

  const wave2Animation = {
    x: [30, -30, 30],
    y: [5, -5, 5],
    transition: {
      repeat: Infinity,
      duration: 8,
      ease: "easeInOut",
      repeatType: "loop",
    },
  };

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-screen overflow-hidden"
          style={{ backgroundColor: "#fff" }}
        >
          {/* Wave SVG for Background - All waves use the same color #f4c5d7
           */}
          <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
            {/* First wave */}
            <motion.div
              className="absolute top-64 left-0 w-full"
              animate={waveAnimation}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                className="w-full scale-125"
              >
                <path
                  fill="#f4c5d7
                "
                  fillOpacity="0.9"
                  d="M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,197.3C672,213,768,235,864,234.7C960,235,1056,213,1152,192C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                ></path>
              </svg>
            </motion.div>

            {/* Second wave */}
            <motion.div
              className="absolute top-80 left-0 w-full opacity-80"
              animate={wave2Animation}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                className="w-full scale-125"
              >
                <path
                  fill="#f4c5d7
                "
                  fillOpacity="0.85"
                  d="M0,128L48,149.3C96,171,192,213,288,218.7C384,224,480,192,576,176C672,160,768,160,864,165.3C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                ></path>
              </svg>
            </motion.div>

            {/* Third wave */}
            <motion.div
              className="absolute top-96 left-0 w-full opacity-70"
              animate={{
                x: [-20, 20, -20],
                y: [-5, 8, -5],
                transition: {
                  repeat: Infinity,
                  duration: 12,
                  ease: "easeInOut",
                  delay: 1,
                  repeatType: "loop",
                },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                className="w-full scale-125"
              >
                <path
                  fill="#f4c5d7
                "
                  fillOpacity="0.6"
                  d="M0,256L48,245.3C96,235,192,213,288,192C384,171,480,149,576,165.3C672,181,768,235,864,245.3C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                ></path>
              </svg>
            </motion.div>
          </div>

          {/* Main content container */}
          <div className="h-full flex flex-col">
            {/* Upper section */}
            <div className="flex flex-col md:flex-row h-full">
              {/* Left column: Hero section */}
              <div className="md:w-1/2 p-4 pt-6 flex items-center relative z-10">
                <div className="relative w-full">
                  {/* Decorative floating elements */}
                  <motion.div
                    className="absolute w-24 h-24 rounded-full bg-[#f4c5d7
                    ] opacity-40 -top-10 right-10"
                    animate={{
                      y: [0, 20, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 8,
                    }}
                  />
                  <motion.div
                    className="absolute w-16 h-16 rounded-full bg-[#f4c5d7
                    ] opacity-50 bottom-5 left-5"
                    animate={{
                      y: [0, -10, 0],
                      scale: [1, 0.9, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 6,
                    }}
                  />

                  <motion.div
                    className="text-center md:text-left relative z-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.h1
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f983be] mb-3"
                      variants={itemVariants}
                    >
                      {text.title}
                    </motion.h1>
                    <motion.h2
                      className="text-lg md:text-xl text-gray-700 mb-4"
                      variants={itemVariants}
                    >
                      {text.subtitle}
                    </motion.h2>
                    <motion.p
                      className="text-base text-gray-700 mb-6 max-w-lg mx-auto md:mx-0"
                      variants={itemVariants}
                    >
                      {text.description}
                    </motion.p>
                    <motion.div
                      className="flex flex-row space-x-3 justify-center md:justify-start"
                      variants={itemVariants}
                    >
                      <motion.button
                        className="px-4 py-2 bg-[#f4c5d7] hover:bg-[#f4c5d7] text-white rounded-lg font-medium transition-colors shadow-lg text-sm"
                        whileHover={{
                          scale: 1.05,
                          boxShadow:
                            "0 10px 25px -5px rgba(233, 129, 164, 0.4)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {text.getStarted}
                      </motion.button>
                      <motion.button
                        className="px-4 py-2 bg-white border-2 border-[#f9adb7] text-[#f9adb7] hover:bg-[#f4c5d7] hover:text-white rounded-lg font-medium transition-colors shadow-md text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {text.exploreRecipes}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Right column: Image */}
              <div className="md:w-1/2 p-4 flex items-center justify-center relative z-10">
                <motion.div
                  className="relative w-4/5 md:w-3/4"
                  animate={floatingAnimation}
                >
                  <img
                    src="https://i.pinimg.com/474x/e8/8b/00/e88b008e33935d7f31d13a4ce5580875.jpg"
                    alt="Baking illustration"
                    className="rounded-2xl shadow-2xl w-full border-4 border-[#f4c5d7
                    ]"
                  />
                  <motion.div
                    className="absolute -bottom-4 -right-4 bg-white p-2 rounded-lg shadow-lg text-sm"
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 2, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 1,
                    }}
                  >
                    <span className="text-[#f4c5d7] font-bold">
                      🍰 Delicious!
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Features section */}
            <div ref={featuresRef} className="pb-6 px-6 relative z-10">
              <motion.h2
                className="text-xl md:text-2xl font-bold text-center text-[#f4c5d7] mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.6 }}
              >
                {text.features}
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: <FaUtensils />,
                    title: text.feature1Title,
                    desc: text.feature1Desc,
                  },
                  {
                    icon: <FaUsers />,
                    title: text.feature2Title,
                    desc: text.feature2Desc,
                  },
                  {
                    icon: <FaSearch />,
                    title: text.feature3Title,
                    desc: text.feature3Desc,
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#f4c5d7
                    ] bg-opacity-20 rounded-xl p-4 h-full shadow-md"
                    variants={featureCardVariants}
                    initial="rest"
                    animate={{
                      ...(isInView
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 20 }),
                      scale: 1,
                      y: 0,
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                    whileHover="hover"
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15,
                      type: "spring",
                      damping: 12,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <motion.div
                        className="text-xl text-[#f4c5d7] bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-md flex-shrink-0"
                        variants={iconVariants}
                      >
                        {feature.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-base font-semibold text-[#f4c5d7] mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-xs text-gray-700">{feature.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative footer */}
            <div className="mt-auto">
              <motion.div
                animate={{
                  y: [0, 8, 0],
                  x: [5, -5, 5],
                  transition: {
                    repeat: Infinity,
                    duration: 7,
                    ease: "easeInOut",
                  },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1440 100"
                  className="w-full"
                >
                  <path
                    fill="#f4c5d7
                  "
                    fillOpacity="1"
                    d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
                  ></path>
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingPage;
