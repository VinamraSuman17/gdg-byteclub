
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiLink, HiArrowRight, HiChevronDown, HiCheck, HiOutlineX, HiCamera, HiUpload } from 'react-icons/hi';
import { FaYoutube, FaUtensils, FaWeightHanging } from 'react-icons/fa';

const RecipeExtractor = ({ language }) => {
  const [url, setUrl] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [servings, setServings] = useState(4);
  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false
  });
  const [recipeContent, setRecipeContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showMeasurementsTable, setShowMeasurementsTable] = useState(false);
  const [showUtensilScanner, setShowUtensilScanner] = useState(false);
  const [customServingSize, setCustomServingSize] = useState(null);
  const [scannedUtensil, setScannedUtensil] = useState(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const translations = {
    en: {
      title: "Extract Recipe from Video",
      subtitle: "Transform cooking videos into written recipes in seconds",
      placeholder: "Paste YouTube URL here",
      extract: "Extract Recipe",
      formTitle: "Customize Your Recipe",
      servings: "Number of servings",
      dietary: "Dietary preferences",
      vegetarian: "Vegetarian",
      vegan: "Vegan",
      glutenFree: "Gluten-Free",
      dairyFree: "Dairy-Free",
      submit: "Get Recipe",
      recipeTitle: "Your Recipe is Ready!",
      noRecipe: "Enter a YouTube URL to extract a recipe",
      loading: "Extracting recipe...",
      success: "Recipe extracted successfully!",
      error: "Invalid YouTube URL. Please try again.",
      back: "Back",
      ingredients: "Ingredients",
      instructions: "Instructions",
      print: "Print Recipe",
      share: "Share Recipe",
      save: "Save Recipe",
      viewMeasurements: "View Measurements Table",
      hideMeasurements: "Hide Measurements Table",
      scanUtensil: "Scan Your Utensil",
      utensilTitle: "Utensil Scanner",
      utensilSubtitle: "Scan or upload your utensil to adjust portion sizes",
      startScan: "Start Camera",
      stopScan: "Stop Camera",
      captureScan: "Capture Image",
      uploadPhoto: "Upload Photo",
      scanProcessing: "Processing your utensil...",
      scanResult: "Scan Result",
      measurementsTitle: "Ingredient Measurements",
      perServing: "Per Serving",
      totalAmount: "Total Amount",
      adjustServingSize: "Adjust for your utensil",
      detectedSize: "Detected utensil capacity",
      adjustServings: "Adjust Servings",
      ml: "ml",
      grams: "g",
      cups: "cups",
      tbsp: "tbsp",
      tsp: "tsp"
    },
    hi: {
      title: "वीडियो से रेसिपी निकालें",
      subtitle: "कुकिंग वीडियो को सेकंडों में लिखित रेसिपी में बदलें",
      placeholder: "यहां YouTube URL पेस्ट करें",
      extract: "रेसिपी निकालें",
      formTitle: "अपनी रेसिपी को अनुकूलित करें",
      servings: "सर्विंग्स की संख्या",
      dietary: "आहार संबंधी प्राथमिकताएं",
      vegetarian: "शाकाहारी",
      vegan: "वीगन",
      glutenFree: "ग्लूटेन-फ्री",
      dairyFree: "डेयरी-फ्री",
      submit: "रेसिपी प्राप्त करें",
      recipeTitle: "आपकी रेसिपी तैयार है!",
      noRecipe: "रेसिपी निकालने के लिए YouTube URL दर्ज करें",
      loading: "रेसिपी निकाल रहे हैं...",
      success: "रेसिपी सफलतापूर्वक निकाली गई!",
      error: "अमान्य YouTube URL। कृपया पुनः प्रयास करें।",
      back: "वापस",
      ingredients: "सामग्री",
      instructions: "निर्देश",
      print: "रेसिपी प्रिंट करें",
      share: "रेसिपी शेयर करें",
      save: "रेसिपी सहेजें",
      viewMeasurements: "मापन तालिका देखें",
      hideMeasurements: "मापन तालिका छिपाएं",
      scanUtensil: "अपना बर्तन स्कैन करें",
      utensilTitle: "बर्तन स्कैनर",
      utensilSubtitle: "पोर्शन साइज़ समायोजित करने के लिए अपना बर्तन स्कैन करें या अपलोड करें",
      startScan: "कैमरा शुरू करें",
      stopScan: "कैमरा बंद करें",
      captureScan: "इमेज कैप्चर करें",
      uploadPhoto: "फोटो अपलोड करें",
      scanProcessing: "आपका बर्तन प्रोसेस हो रहा है...",
      scanResult: "स्कैन परिणाम",
      measurementsTitle: "सामग्री माप",
      perServing: "प्रति सर्विंग",
      totalAmount: "कुल मात्रा",
      adjustServingSize: "अपने बर्तन के लिए समायोजित करें",
      detectedSize: "पता लगाया गया बर्तन क्षमता",
      adjustServings: "सर्विंग्स समायोजित करें",
      ml: "मिली",
      grams: "ग्राम",
      cups: "कप",
      tbsp: "बड़ा चम्मच",
      tsp: "छोटा चम्मच"
    }
  };

  const text = translations[language];

  const ingredientMeasurements = [
    { ingredient: "All-purpose flour", baseAmount: 250, unit: "g" },
    { ingredient: "Granulated sugar", baseAmount: 200, unit: "g" },
    { ingredient: "Butter", baseAmount: 120, unit: "g" },
    { ingredient: "Salt", baseAmount: 5, unit: "g" },
    { ingredient: "Cinnamon", baseAmount: 3, unit: "g" },
    { ingredient: "Nutmeg", baseAmount: 2, unit: "g" },
    { ingredient: "Baking powder", baseAmount: 6, unit: "g" },
    { ingredient: "Baking soda", baseAmount: 4, unit: "g" },
    { ingredient: "Yeast", baseAmount: 3, unit: "g" },
    { ingredient: "Eggs", baseAmount: 2, unit: "" },
    { ingredient: "Gelatin", baseAmount: 5, unit: "g" },
    { ingredient: "Egg whites", baseAmount: 1, unit: "" },
    { ingredient: "Vanilla extract", baseAmount: 10, unit: "ml" },
    { ingredient: "Cocoa powder", baseAmount: 50, unit: "g" },
    { ingredient: "Coffee extract", baseAmount: 5, unit: "ml" }
  ];

  const stapleIngredients = new Set(["All-purpose flour", "Granulated sugar", "Butter"]);
  const spicesSeasonings = new Set(["Salt", "Cinnamon", "Nutmeg"]);
  const leaveningAgents = new Set(["Baking powder", "Baking soda", "Yeast"]);
  const eggsGelatin = new Set(["Eggs", "Gelatin", "Egg whites"]);

  const scaleIngredient = (ingredient, baseAmount, originalServings, newServings) => {
    if (stapleIngredients.has(ingredient)) {
      return ((newServings / originalServings) * baseAmount).toFixed(2);
    } else if (spicesSeasonings.has(ingredient)) {
      return (baseAmount * Math.pow((newServings / originalServings), 0.8)).toFixed(2);
    } else if (leaveningAgents.has(ingredient)) {
      const k = 2;
      return (baseAmount + k * Math.log(newServings / originalServings)).toFixed(2);
    } else if (eggsGelatin.has(ingredient)) {
      if (newServings <= 3) return 1;
      if (newServings <= 6) return 2;
      return Math.round(newServings / 3);
    } else {
      return ((newServings / originalServings) * baseAmount).toFixed(2);
    }
  };

  const calculateMeasurement = (ingredient, baseAmount, unit) => {
    if (customServingSize) {
      return (baseAmount * (customServingSize / 240)).toFixed(1);
    } else {
      return scaleIngredient(ingredient, baseAmount, 4, servings);
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const validateUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    
    if (!validateUrl(url)) {
      setNotification({
        type: 'error',
        message: text.error
      });
      return;
    }
    
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setRecipeContent({
        title: "Chocolate Chip Cookies",
        ingredients: [
          "2 1/4 cups all-purpose flour",
          "1 tsp baking soda",
          "1 tsp salt",
          "1 cup butter, softened",
          "3/4 cup granulated sugar",
          "3/4 cup packed brown sugar",
          "2 large eggs",
          "2 tsp vanilla extract",
          "2 cups chocolate chips"
        ],
        instructions: [
          "Preheat oven to 375°F (190°C).",
          "In a small bowl, mix flour, baking soda, and salt.",
          "In a large bowl, cream butter and sugars until light and fluffy.",
          "Beat in eggs one at a time, then stir in vanilla.",
          "Gradually blend in the dry ingredients.",
          "Stir in chocolate chips.",
          "Drop by rounded tablespoons onto ungreased cookie sheets.",
          "Bake for 9 to 11 minutes or until golden brown.",
          "Let stand for 2 minutes before removing to cool on wire racks."
        ]
      });
      setIsLoading(false);
      setShowForm(false);
      setNotification({
        type: 'success',
        message: text.success
      });
    }, 2000);
  };

  const handleReset = () => {
    setUrl('');
    setShowForm(false);
    setRecipeContent(null);
    setPreferences({
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false
    });
    setServings(4);
    setShowMeasurementsTable(false);
    setShowUtensilScanner(false);
    setCustomServingSize(null);
    setScannedUtensil(null);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      setIsLoading(true);
      
      setTimeout(() => {
        setScannedUtensil({
          type: "Cup",
          capacityMl: 350,
          image: "/api/placeholder/200/200"
        });
        setCustomServingSize(350);
        setIsLoading(false);
        stopCamera();
      }, 2000);
    }
  };

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      const imageUrl = URL.createObjectURL(file);
      
      setTimeout(() => {
        setScannedUtensil({
          type: "Cup",
          capacityMl: 300,
          image: imageUrl
        });
        setCustomServingSize(300);
        setIsLoading(false);
      }, 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipeContent.title,
          text: `${text.ingredients}: ${recipeContent.ingredients.join(', ')}\n${text.instructions}: ${recipeContent.instructions.join(' ')}`,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      setNotification({
        type: 'error',
        message: 'Sharing is not supported in your browser'
      });
    }
  };

  const handleSave = () => {
    const recipeBlob = new Blob([JSON.stringify(recipeContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(recipeBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${recipeContent.title}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section ref={ref} className="py-20" style={{ backgroundColor: '#fff' }}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: '#e981a4' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {text.title}
          </motion.h2>
          <motion.p
            className="text-lg max-w-md mx-auto"
            style={{ color: '#f9adb7' }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {text.subtitle}
          </motion.p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence>
            {notification && (
              <motion.div
                className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 flex items-center gap-2 ${
                  notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {notification.type === 'success' ? <HiCheck size={20} /> : <HiOutlineX size={20} />}
                <span>{notification.message}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!showForm && !recipeContent && !isLoading && (
              <motion.form 
                key="url-form"
                onSubmit={handleSubmit}
                className="p-6 md:p-8 rounded-xl shadow-lg"
                style={{ backgroundColor: '#FFF0F3' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-grow relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500">
                      <FaYoutube size={24} />
                    </div>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder={text.placeholder}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e981a4] transition-all duration-300"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="px-6 py-4 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#e981a4' }}
                    whileHover={{ scale: 1.05, backgroundColor: '#f9adb7' }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!url}
                  >
                    {text.extract}
                    <HiArrowRight />
                  </motion.button>
                </div>
              </motion.form>
            )}

            {showForm && !isLoading && (
              <motion.form 
                key="preferences-form"
                onSubmit={handleFormSubmit}
                className="p-6 md:p-8 rounded-xl shadow-lg"
                style={{ backgroundColor: '#f4c5d7' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#e981a4' }}>
                  <FaUtensils />
                  {text.formTitle}
                </h3>
                
                <div className="mb-6">
                  <label className="block mb-2 font-medium" style={{ color: '#e981a4' }}>{text.servings}</label>
                  <div className="flex items-center">
                    <motion.button
                      type="button"
                      onClick={() => setServings(Math.max(1, servings - 1))}
                      className="px-3 py-2 rounded-l-lg"
                      style={{ backgroundColor: '#fec9c3', color: '#e981a4' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      -
                    </motion.button>
                    <input
                      type="number"
                      min="1"
                      value={servings}
                      onChange={(e) => setServings(parseInt(e.target.value) || 1)}
                      className="w-16 px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none"
                      style={{ backgroundColor: '#fff', color: '#e981a4' }}
                    />
                    <motion.button
                      type="button"
                      onClick={() => setServings(servings + 1)}
                      className="px-3 py-2 rounded-r-lg"
                      style={{ backgroundColor: '#fec9c3', color: '#e981a4' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      +
                    </motion.button>
                  </div>
                </div>
                
                <div className="mb-8">
                  <label className="block mb-3 font-medium" style={{ color: '#e981a4' }}>{text.dietary}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries({
                      vegetarian: text.vegetarian,
                      vegan: text.vegan,
                      glutenFree: text.glutenFree,
                      dairyFree: text.dairyFree
                    }).map(([key, label]) => (
                      <motion.div 
                        key={key} 
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                          preferences[key] ? 'bg-[#fec9c3] border-2 border-[#e981a4]' : 'bg-[#fff] border border-gray-200'
                        }`}
                        onClick={() => setPreferences(prev => ({ ...prev, [key]: !prev[key] }))}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                          preferences[key] ? 'bg-[#e981a4]' : 'bg-white border border-gray-300'
                        }`}>
                          {preferences[key] && <HiCheck className="text-white" size={12} />}
                        </div>
                        <span className={preferences[key] ? 'font-medium' : 'text-gray-700'} style={{ color: preferences[key] ? '#e981a4' : '#666' }}>
                          {label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <motion.button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {text.back}
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="px-6 py-3 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                    style={{ backgroundColor: '#e981a4' }}
                    whileHover={{ scale: 1.05, backgroundColor: '#f9adb7' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {text.submit}
                    <HiArrowRight />
                  </motion.button>
                </div>
              </motion.form>
            )}

            {isLoading && (
              <motion.div
                key="loading"
                className="p-8 rounded-xl shadow-lg flex flex-col items-center justify-center"
                style={{ backgroundColor: '#f4c5d7' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="w-16 h-16 border-4 border-[#e981a4] border-t-transparent rounded-full mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="font-medium" style={{ color: '#e981a4' }}>
                  {showUtensilScanner ? text.scanProcessing : text.loading}
                </p>
              </motion.div>
            )}

            {recipeContent && !isLoading && (
              <motion.div 
                key="recipe"
                className="p-6 md:p-8 rounded-xl shadow-lg"
                style={{ backgroundColor: '#f4c5d7' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold" style={{ color: '#e981a4' }}>{text.recipeTitle}</h3>
                  <motion.button
                    onClick={handleReset}
                    className="hover:text-[#f9adb7]"
                    style={{ color: '#e981a4' }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <HiOutlineX size={24} />
                  </motion.button>
                </div>

                <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#fff' }}>
                  <h4 className="text-xl font-bold mb-2" style={{ color: '#e981a4' }}>{recipeContent.title}</h4>
                  <div className="flex flex-wrap justify-between items-center">
                    <p style={{ color: '#f9adb7' }}>
                      {text.servings}: {customServingSize ? (customServingSize / 240).toFixed(1) : servings}
                      {customServingSize && ` (${customServingSize}${text.ml})`}
                    </p>
                    
                    <div className="flex gap-2 mt-2">
                      <motion.button
                        onClick={() => setShowMeasurementsTable(!showMeasurementsTable)}
                        className="text-xs px-3 py-1 text-white rounded-md flex items-center gap-1"
                        style={{ backgroundColor: '#e981a4' }}
                        whileHover={{ scale: 1.05, backgroundColor: '#f9adb7' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaWeightHanging size={12} />
                        {showMeasurementsTable ? text.hideMeasurements : text.viewMeasurements}
                      </motion.button>
                      
                      <motion.button
                        onClick={() => {
                          setShowUtensilScanner(!showUtensilScanner);
                          if (!showUtensilScanner) {
                            setScannedUtensil(null);
                            setCustomServingSize(null);
                          }
                        }}
                        className="text-xs px-3 py-1 rounded-md flex items-center gap-1"
                        style={{ backgroundColor: '#fec9c3', color: '#e981a4' }}
                        whileHover={{ scale: 1.05, backgroundColor: '#f9adb7' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <HiCamera size={12} />
                        {text.scanUtensil}
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.entries(preferences).map(([key, value]) => (
                      value && (
                        <span key={key} className="px-2 py-1 rounded-md text-sm" style={{ backgroundColor: '#fec9c3', color: '#e981a4' }}>
                          {text[key]}
                        </span>
                      )
                    ))}
                  </div>
                </div>
                
                <AnimatePresence>
                  {showUtensilScanner && !isLoading && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 overflow-hidden"
                    >
                      <div className="p-4 rounded-lg" style={{ backgroundColor: '#fff' }}>
                        <h4 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color: '#e981a4' }}>
                          <HiCamera />
                          {text.utensilTitle}
                        </h4>
                        <p className="text-sm mb-4" style={{ color: '#f9adb7' }}>{text.utensilSubtitle}</p>
                        
                        {!scannedUtensil ? (
                          <div className="flex flex-col items-center">
                            <div className="w-full max-w-sm h-64 bg-black rounded-lg overflow-hidden mb-4 relative">
                              <video 
                                ref={videoRef} 
                                autoPlay 
                                playsInline
                                className="w-full h-full object-cover"
                              />
                              {!videoRef.current?.srcObject && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <HiCamera size={48} className="text-white opacity-30" />
                                </div>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                              {!videoRef.current?.srcObject ? (
                                <>
                                  <motion.button
                                    type="button"
                                    onClick={startCamera}
                                    className="px-4 py-2 text-white rounded-lg flex items-center gap-2"
                                    style={{ backgroundColor: '#e981a4' }}
                                    whileHover={{ scale: 1.05, backgroundColor: '#f9adb7' }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <HiCamera size={16} />
                                    {text.startScan}
                                  </motion.button>
                                  <motion.button
                                    type="button"
                                    onClick={() => fileInputRef.current.click()}
                                    className="px-4 py-2 text-white rounded-lg flex items-center gap-2"
                                    style={{ backgroundColor: '#e981a4' }}
                                    whileHover={{ scale: 1.05, backgroundColor: '#f9adb7' }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <HiUpload size={16} />
                                    {text.uploadPhoto}
                                  </motion.button>
                                  <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleUploadPhoto}
                                    accept="image/*"
                                    className="hidden"
                                  />
                                </>
                              ) : (
                                <>
                                  <motion.button
                                    type="button"
                                    onClick={stopCamera}
                                    className="px-4 py-2 text-white rounded-lg flex items-center gap-2"
                                    style={{ backgroundColor: '#666' }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <HiOutlineX size={16} />
                                    {text.stopScan}
                                  </motion.button>
                                  <motion.button
                                    type="button"
                                    onClick={captureImage}
                                    className="px-4 py-2 text-white rounded-lg flex items-center gap-2"
                                    style={{ backgroundColor: '#e981a4' }}
                                    whileHover={{ scale: 1.05, backgroundColor: '#f9adb7' }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <HiCamera size={16} />
                                    {text.captureScan}
                                  </motion.button>
                                </>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
                              <img 
                                src={scannedUtensil.image} 
                                alt="Scanned utensil" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <h5 className="font-medium mb-1" style={{ color: '#e981a4' }}>{text.scanResult}</h5>
                              <p className="mb-2" style={{ color: '#f9adb7' }}>
                                {scannedUtensil.type} - {text.detectedSize}: {scannedUtensil.capacityMl}{text.ml}
                              </p>
                              <p className="text-sm mb-3" style={{ color: '#f9adb7' }}>
                                {text.adjustServingSize}
                              </p>
                              <div className="flex gap-2">
                                <motion.button
                                  type="button"
                                  onClick={() => {
                                    setCustomServingSize(null);
                                    setScannedUtensil(null);
                                    setShowUtensilScanner(false);
                                  }}
                                  className="px-3 py-1 text-gray-700 rounded-md text-sm"
                                  style={{ backgroundColor: '#fec9c3' }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {text.back}
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {showMeasurementsTable && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 overflow-hidden"
                    >
                      <div className="p-4 rounded-lg" style={{ backgroundColor: '#fff' }}>
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-semibold" style={{ color: '#e981a4' }}>{text.measurementsTitle}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm" style={{ color: '#e981a4' }}>{text.adjustServings}:</span>
                            <motion.button
                              type="button"
                              onClick={() => setServings(Math.max(1, servings - 1))}
                              className="px-2 py-1 rounded-l-md"
                              style={{ backgroundColor: '#fec9c3', color: '#e981a4' }}
                              whileTap={{ scale: 0.95 }}
                            >
                              -
                            </motion.button>
                            <input
                              type="number"
                              min="1"
                              value={servings}
                              onChange={(e) => setServings(parseInt(e.target.value) || 1)}
                              className="w-12 px-2 py-1 border-t border-b border-[#e981a4] text-center focus:outline-none"
                              style={{ backgroundColor: '#f4c5d7', color: '#e981a4' }}
                            />
                            <motion.button
                              type="button"
                              onClick={() => setServings(servings + 1)}
                              className="px-2 py-1 rounded-r-md"
                              style={{ backgroundColor: '#fec9c3', color: '#e981a4' }}
                              whileTap={{ scale: 0.95 }}
                            >
                              +
                            </motion.button>
                          </div>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm" style={{ color: '#e981a4' }}>
                            <thead>
                              <tr style={{ backgroundColor: '#f9adb7' }}>
                                <th className="p-2 text-left">{text.ingredients}</th>
                                <th className="p-2 text-right">{text.perServing}</th>
                                <th className="p-2 text-right">{text.totalAmount}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {ingredientMeasurements.map((item, index) => (
                                <tr key={index} className="border-b" style={{ borderColor: '#f9adb7' }}>
                                  <td className="p-2">{item.ingredient}</td>
                                  <td className="p-2 text-right">
                                    {(parseFloat(calculateMeasurement(item.ingredient, item.baseAmount, item.unit)) / servings).toFixed(2)} {item.unit}
                                  </td>
                                  <td className="p-2 text-right">
                                    {calculateMeasurement(item.ingredient, item.baseAmount, item.unit)} {item.unit}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3" style={{ color: '#e981a4' }}>{text.ingredients}</h4>
                    <ul className="list-disc pl-5 space-y-2" style={{ color: '#f9adb7' }}>
                      {recipeContent.ingredients.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3" style={{ color: '#e981a4' }}>{text.instructions}</h4>
                    <ol className="list-decimal pl-5 space-y-2" style={{ color: '#f9adb7' }}>
                      {recipeContent.instructions.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 justify-center">
                  <motion.button
                    onClick={handlePrint}
                    className="px-4 py-2 text-white rounded-lg flex items-center gap-2"
                    style={{ backgroundColor: '#e981a4' }}
                    whileHover={{ scale: 1.05, backgroundColor: '#f9adb7' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <HiLink size={16} />
                    {text.print}
                  </motion.button>
                  <motion.button
                    onClick={handleShare}
                    className="px-4 py-2 text-white rounded-lg flex items-center gap-2"
                    style={{ backgroundColor: '#e981a4' }}
                    whileHover={{ scale: 1.05, backgroundColor: '#f9adb7' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <HiLink size={16} />
                    {text.share}
                  </motion.button>
                  <motion.button
                    onClick={handleSave}
                    className="px-4 py-2 text-white rounded-lg flex items-center gap-2"
                    style={{ backgroundColor: '#e981a4' }}
                    whileHover={{ scale: 1.05, backgroundColor: '#f9adb7' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <HiLink size={16} />
                    {text.save}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RecipeExtractor;