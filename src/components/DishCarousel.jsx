

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaChevronLeft, FaChevronRight, FaHeart, FaStar, FaClock } from 'react-icons/fa';

const DishCarousel = ({ language, openModal }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [favorites, setFavorites] = useState({});
  const carouselRef = useRef(null);
  const controls = useAnimation();
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const translations = {
    en: {
      title: "Today's Top Dishes",
      seeMore: "See Recipe",
      difficulty: "Difficulty",
      timeNeeded: "Time",
      rating: "Rating",
      dishCategories: "Popular Categories",
      allRecipes: "All",
      desserts: "Desserts",
      breads: "Breads",
      cakes: "Cakes",
      dishes: [
        { 
          name: "Chocolate Cake", 
          image: "https://i.pinimg.com/474x/14/98/0a/14980a9bec3957e4b5b56c026afdb8e2.jpg",
          difficulty: "Medium",
          time: "45 min",
          rating: 4.8,
          category: "cakes"
        },
        { 
          name: "Blueberry Muffins", 
          image: "https://i.pinimg.com/474x/53/ce/a6/53cea623b2f50706387ec44b3e73b277.jpg",
          difficulty: "Easy",
          time: "30 min",
          rating: 4.5,
          category: "desserts"
        },
        { 
          name: "Croissants", 
          image: "https://i.pinimg.com/474x/cf/9b/af/cf9bafa8f904bb4c2aacf06cebf46331.jpg",
          difficulty: "Hard",
          time: "3 hrs",
          rating: 4.9,
          category: "breads"
        },
        { 
          name: "Cinnamon Rolls", 
          image: "https://i.pinimg.com/474x/0c/4c/2c/0c4c2cb82d406a1d4a6fa6b8b19cb2f9.jpg",
          difficulty: "Medium",
          time: "1.5 hrs",
          rating: 4.7,
          category: "breads"
        },
        { 
          name: "Apple Pie", 
          image: "https://i.pinimg.com/474x/26/09/a3/2609a3874f5176baad65b7dd57db573e.jpg",
          difficulty: "Medium",
          time: "1 hr",
          rating: 4.6,
          category: "desserts"
        },
        { 
          name: "Macarons", 
          image: "https://i.pinimg.com/736x/45/8a/87/458a8712314cb545b3895ed8f170f022.jpg",
          difficulty: "Hard",
          time: "2 hrs",
          rating: 4.9,
          category: "desserts"
        }
      ]
    },
    hi: {
      title: "आज के टॉप डिशेज़",
      seeMore: "रेसिपी देखें",
      difficulty: "कठिनाई",
      timeNeeded: "समय",
      rating: "रेटिंग",
      dishCategories: "लोकप्रिय श्रेणियां",
      allRecipes: "सभी",
      desserts: "मिठाई",
      breads: "ब्रेड्स",
      cakes: "केक्स",
      dishes: [
        { 
          name: "चॉकलेट केक", 
          image: "https://i.pinimg.com/474x/14/98/0a/14980a9bec3957e4b5b56c026afdb8e2.jpg",
          difficulty: "मध्यम",
          time: "45 मिनट",
          rating: 4.8,
          category: "cakes"
        },
        { 
          name: "ब्लूबेरी मफिन्स", 
          image: "https://i.pinimg.com/474x/53/ce/a6/53cea623b2f50706387ec44b3e73b277.jpg",
          difficulty: "आसान",
          time: "30 मिनट",
          rating: 4.5,
          category: "desserts"
        },
        { 
          name: "क्रोइसैंट्स", 
          image: "https://i.pinimg.com/474x/cf/9b/af/cf9bafa8f904bb4c2aacf06cebf46331.jpg",
          difficulty: "कठिन",
          time: "3 घंटे",
          rating: 4.9,
          category: "breads"
        },
        { 
          name: "सिनेमन रोल्स", 
          image: "https://i.pinimg.com/474x/0c/4c/2c/0c4c2cb82d406a1d4a6fa6b8b19cb2f9.jpg",
          difficulty: "मध्यम",
          time: "1.5 घंटे",
          rating: 4.7,
          category: "breads"
        },
        { 
          name: "एप्पल पाई", 
          image: "https://i.pinimg.com/474x/26/09/a3/2609a3874f5176baad65b7dd57db573e.jpg",
          difficulty: "मध्यम",
          time: "1 घंटा",
          rating: 4.6,
          category: "desserts"
        },
        { 
          name: "मैकारून्स", 
          image: "https://i.pinimg.com/736x/45/8a/87/458a8712314cb545b3895ed8f170f022.jpg",
          difficulty: "कठिन",
          time: "2 घंटे",
          rating: 4.9,
          category: "desserts"
        }
      ]
    }
  };

  const text = translations[language];
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredDishes = activeCategory === "all" 
    ? text.dishes 
    : text.dishes.filter(dish => dish.category === activeCategory);
    
  // Create an array with duplicated items for infinite scrolling effect
  const infiniteItems = [...filteredDishes, ...filteredDishes, ...filteredDishes];
  const itemWidth = 288; // 72*4 width of each card (w-72) + margin (space-x-6)
  
  // Reset active index and scroll position when category changes
  useEffect(() => {
    setActiveIndex(0);
    if (carouselRef.current) {
      // Disable smooth scrolling temporarily when changing categories
      carouselRef.current.style.scrollBehavior = 'auto';
      const middleSetStart = filteredDishes.length * itemWidth;
      carouselRef.current.scrollLeft = middleSetStart;
      // Re-enable smooth scrolling
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.scrollBehavior = 'smooth';
        }
      }, 50);
    }
  }, [filteredDishes]);

  // Handle scrolling to make it appear infinite
  const handleScroll = () => {
    if (!carouselRef.current) return;
    
    const scrollLeft = carouselRef.current.scrollLeft;
    const containerWidth = carouselRef.current.clientWidth;
    const scrollWidth = carouselRef.current.scrollWidth;
    const singleSetWidth = filteredDishes.length * itemWidth;
    
    // If we scroll near the beginning, jump to the middle set
    if (scrollLeft < singleSetWidth * 0.5) {
      // Disable smooth scrolling temporarily to avoid visible jumps
      carouselRef.current.style.scrollBehavior = 'auto';
      carouselRef.current.scrollLeft = scrollLeft + singleSetWidth;
      carouselRef.current.style.scrollBehavior = 'smooth';
    }
    
    // If we scroll near the end, jump back to the middle set
    else if (scrollLeft > singleSetWidth * 2.5) {
      carouselRef.current.style.scrollBehavior = 'auto';
      carouselRef.current.scrollLeft = scrollLeft - singleSetWidth;
      carouselRef.current.style.scrollBehavior = 'smooth';
    }
    
    // Update the active index based on current scroll position
    const relativePosi = scrollLeft % singleSetWidth;
    const newActiveIndex = Math.round(relativePosi / itemWidth);
    if (newActiveIndex >= 0 && newActiveIndex < filteredDishes.length) {
      setActiveIndex(newActiveIndex);
    }
  };

  // Manual carousel navigation
  const scrollToNext = () => {
    if (!carouselRef.current) return;
    
    const nextIndex = (activeIndex + 1) % filteredDishes.length;
    setActiveIndex(nextIndex);
    
    // Calculate position based on middle set
    const middleSetStart = filteredDishes.length * itemWidth;
    const targetScroll = middleSetStart + (nextIndex * itemWidth);
    
    carouselRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  const scrollToPrev = () => {
    if (!carouselRef.current) return;
    
    const prevIndex = (activeIndex - 1 + filteredDishes.length) % filteredDishes.length;
    setActiveIndex(prevIndex);
    
    // Calculate position based on middle set
    const middleSetStart = filteredDishes.length * itemWidth;
    const targetScroll = middleSetStart + (prevIndex * itemWidth);
    
    carouselRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  // Auto-scrolling carousel
  useEffect(() => {
    if (!carouselRef.current || isPaused) return;

    const autoScrollInterval = setInterval(() => {
      if (!isPaused && document.hasFocus()) {
        scrollToNext();
      }
    }, 4000);
    
    return () => clearInterval(autoScrollInterval);
  }, [isPaused, activeIndex, filteredDishes]);

  // Add scroll event listener
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    
    const throttledScroll = () => {
      if (!carousel.scrolling) {
        carousel.scrolling = true;
        setTimeout(() => {
          handleScroll();
          carousel.scrolling = false;
        }, 50);
      }
    };
    
    carousel.addEventListener('scroll', throttledScroll);
    return () => carousel.removeEventListener('scroll', throttledScroll);
  }, [filteredDishes]);

  // Animate section when it comes into view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const toggleFavorite = (index, e) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleSeeMore = (dish) => {
    const recipeContent = {
      title: dish.name,
      body: (
        <div>
          <img src={dish.image} alt={dish.name} className="w-full h-64 object-cover rounded-lg mb-4" />
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <FaStar className="text-yellow-500" />
              <span className="font-medium">{dish.rating}/5</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaClock style={{ color: "#e981a4" }} />
              <span>{dish.time}</span>
            </div>
            <div className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: "#faf2dd", color: "#e981a4" }}>
              {dish.difficulty}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-2" style={{ color: "#e981a4" }}>Ingredients</h3>
            <ul className="list-disc pl-5 mb-4">
              <li>2 cups all-purpose flour</li>
              <li>1 cup sugar</li>
              <li>1/2 cup butter</li>
              <li>2 eggs</li>
              <li>1 cup milk</li>
              <li>1 tsp vanilla extract</li>
              <li>1 tsp baking powder</li>
              <li>1/2 tsp salt</li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-2" style={{ color: "#e981a4" }}>Instructions</h3>
            <ol className="list-decimal pl-5">
              <li>Preheat oven to 350°F (175°C).</li>
              <li>Mix together dry ingredients in a large bowl.</li>
              <li>In a separate bowl, cream butter and sugar until light and fluffy.</li>
              <li>Add eggs one at a time, mixing well after each addition.</li>
              <li>Gradually add dry ingredients to wet ingredients, alternating with milk.</li>
              <li>Pour batter into greased baking pan.</li>
              <li>Bake for 30-35 minutes or until a toothpick inserted in the center comes out clean.</li>
              <li>Let cool before serving.</li>
            </ol>
          </motion.div>
        </div>
      )
    };
    openModal(recipeContent);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const categories = [
    { id: "all", name: text.allRecipes },
    { id: "desserts", name: text.desserts },
    { id: "breads", name: text.breads },
    { id: "cakes", name: text.cakes },
  ];

  return (
    <motion.section 
      ref={ref}
      className="py-20 overflow-hidden"
      style={{ backgroundColor: "#fff" }}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        {/* Animated heading with decorative elements */}
        <div className="relative mb-16">
          <motion.div 
            className="absolute -top-10 -left-10 w-24 h-24 rounded-full opacity-40"
            style={{ backgroundColor: "#fec9c3" }}
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center relative z-10"
            style={{ color: "#e981a4" }}
            variants={itemVariants}
          >
            {text.title}
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 mx-auto mt-4"
            style={{ backgroundColor: "#e981a4" }}
            variants={itemVariants}
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.3 }}
          />
        </div>
        
        {/* Category filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-10"
          variants={itemVariants}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id 
                  ? 'text-white shadow-md' 
                  : 'text-pink-700 hover:bg-pink-100'
              }`}
              style={{ 
                backgroundColor: activeCategory === category.id ? "#e981a4" : "#faf2dd",
                color: activeCategory === category.id ? "white" : "#e981a4"
              }}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Carousel wrapper with navigation */}
        <div className="relative">
          <motion.div 
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 z-10 md:-translate-x-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: "#faf2dd", color: "#e981a4" }}
              onClick={scrollToPrev}
              whileHover={{ scale: 1.1, backgroundColor: "#e981a4", color: "#ffffff" }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronLeft />
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 z-10 md:translate-x-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: "#faf2dd", color: "#e981a4" }}
              onClick={scrollToNext}
              whileHover={{ scale: 1.1, backgroundColor: "#e981a4", color: "#ffffff" }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronRight />
            </motion.button>
          </motion.div>
          
          {/* Infinite Carousel */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto no-scrollbar py-8 px-2 space-x-6"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none', 
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {infiniteItems.map((dish, index) => {
              // Calculate the actual index for the favorites feature
              const actualIndex = index % filteredDishes.length;
              return (
                <motion.div 
                  key={`${dish.name}-${index}`}
                  className="flex-shrink-0 w-72 rounded-xl overflow-hidden shadow-lg bg-white group"
                  variants={itemVariants}
                  layoutId={`dish-${dish.name}-${index}`}
                  whileHover={{ 
                    y: -15,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => handleSeeMore(dish)}
                >
                  <div className="h-52 relative overflow-hidden">
                    <motion.img 
                      src={dish.image} 
                      alt={dish.name} 
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <motion.button
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center ${favorites[actualIndex] ? 'text-white' : 'text-gray-500'}`}
                      style={{ backgroundColor: favorites[actualIndex] ? "#e981a4" : "white" }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => toggleFavorite(actualIndex, e)}
                    >
                      <FaHeart className={favorites[actualIndex] ? 'text-white' : 'text-gray-400'} />
                    </motion.button>
                    
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    >
                      <h3 className="text-xl font-bold">{dish.name}</h3>
                      <motion.button
                        className="mt-2 px-4 py-1.5 text-white rounded-full font-medium text-sm inline-flex items-center"
                        style={{ backgroundColor: "#e981a4" }}
                        whileHover={{ scale: 1.05, backgroundColor: "#f9adb7" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {text.seeMore}
                      </motion.button>
                    </motion.div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 transition-colors" 
                        style={{ color: "#e981a4" }}>
                      {dish.name}
                    </h3>
                    
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <FaClock style={{ color: "#f9adb7" }} />
                        <span>{dish.time}</span>
                      </div>
                      
                      <div className="px-2 py-0.5 rounded-full text-xs"
                           style={{ backgroundColor: "#faf2dd", color: "#e981a4" }}>
                        {dish.difficulty}
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <FaStar className="text-yellow-500" />
                        <span>{dish.rating}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Carousel indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {filteredDishes.map((_, index) => (
            <motion.button
              key={index}
              className={`h-2 rounded-full`}
              style={{ 
                backgroundColor: index === activeIndex ? "#e981a4" : "#f9adb7",
                width: index === activeIndex ? "24px" : "8px"
              }}
              onClick={() => {
                if (carouselRef.current) {
                  // Calculate middle set position + desired index
                  const middleSetStart = filteredDishes.length * itemWidth;
                  const targetScroll = middleSetStart + (index * itemWidth);
                  carouselRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
                  setActiveIndex(index);
                }
              }}
              initial={false}
              animate={{ width: index === activeIndex ? 24 : 8 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default DishCarousel;