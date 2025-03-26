import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  HiCamera,
  HiInformationCircle,
  HiLightBulb,
  HiPhotograph,
  HiUpload,
  HiSparkles,
  HiStar,
  HiCheck,
} from "react-icons/hi";

const ScanFeature = ({ language }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [uploadHover, setUploadHover] = useState(false);
  const [scanHover, setScanHover] = useState(false);
  const fileInputRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const translations = {
    en: {
      title: "Scan & Measure",
      description:
        "Take a photo of your utensil or ingredient to get precise measurements",
      scanButton: "Scan Item",
      uploadButton: "Upload Photo",
      scanning: "Scanning...",
      resultTitle: "Scan Result",
      spoonType: "Tablespoon",
      quantity: "Quantity",
      gramValue: "14.3 grams",
      mlValue: "15 ml",
      personsValue: "For 4 persons",
      tip: "Tip",
      tipText:
        "For best results, ensure good lighting and place the item against a plain background",
      tutorialTitle: "How to Scan",
      tutorialSteps: [
        "Place your utensil on a flat surface",
        "Ensure good lighting conditions",
        "Hold your camera 15-20cm above the item",
        "Keep the camera steady and parallel",
      ],
      close: "Got it",
      howToScan: "How to scan?",
      scanAgain: "Scan Again",
      processing: "Processing image...",
      analyzing: "Analyzing...",
      preparing: "Preparing result...",
    },
    hi: {
      title: "स्कैन और मापें",
      description:
        "सटीक माप प्राप्त करने के लिए अपने बर्तन या सामग्री की तस्वीर लें",
      scanButton: "आइटम स्कैन करें",
      uploadButton: "फोटो अपलोड करें",
      scanning: "स्कैन हो रहा है...",
      resultTitle: "स्कैन परिणाम",
      spoonType: "टेबल स्पून",
      quantity: "मात्रा",
      gramValue: "14.3 ग्राम",
      mlValue: "15 मिली",
      personsValue: "4 व्यक्तियों के लिए",
      tip: "टिप",
      tipText:
        "सर्वोत्तम परिणामों के लिए, अच्छी रोशनी सुनिश्चित करें और वस्तु को सादे पृष्ठभूमि के सामने रखें",
      tutorialTitle: "स्कैन कैसे करें",
      tutorialSteps: [
        "अपने बर्तन को समतल सतह पर रखें",
        "अच्छी रोशनी सुनिश्चित करें",
        "अपने कैमरे को वस्तु से 15-20 सेमी ऊपर रखें",
        "कैमरे को स्थिर और समानांतर रखें",
      ],
      close: "समझ गया",
      howToScan: "स्कैन कैसे करें?",
      scanAgain: "फिर से स्कैन करें",
      processing: "छवि प्रोसेसिंग...",
      analyzing: "विश्लेषण हो रहा है...",
      preparing: "परिणाम तैयार हो रहा है...",
    },
  };

  const text = translations[language];
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState("");

  useEffect(() => {
    if (isScanning) {
      const statusMessages = [text.processing, text.analyzing, text.preparing];
      let progress = 0;
      const interval = setInterval(() => {
        progress += 2;
        if (progress >= 100) {
          clearInterval(interval);
          return;
        }

        setScanProgress(progress);

        if (progress < 33) {
          setScanStatus(statusMessages[0]);
        } else if (progress < 66) {
          setScanStatus(statusMessages[1]);
        } else {
          setScanStatus(statusMessages[2]);
        }
      }, 40);

      return () => clearInterval(interval);
    }
  }, [isScanning, text]);

  const handleScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setScanProgress(0);

    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        type: text.spoonType,
        gram: text.gramValue,
        ml: text.mlValue,
        persons: text.personsValue,
      });
    }, 4000);
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setIsScanning(true);
      setScanResult(null);
      setScanProgress(0);

      // Simulate processing uploaded image
      setTimeout(() => {
        setIsScanning(false);
        setScanResult({
          type: text.spoonType,
          gram: text.gramValue,
          ml: text.mlValue,
          persons: text.personsValue,
        });
      }, 4000);
    }
  };

  const scanAgain = () => {
    setScanResult(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const rotateAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  };

  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${hexToRgba(
          "#f4c5d7",
          0.4
        )}, ${hexToRgba("#fff", 0.7)})`,
      }}
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 rounded-full"
          style={{ backgroundColor: "#f4c5d7", opacity: 0.1 }}
          animate={rotateAnimation}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-60 h-60 rounded-full"
          style={{ backgroundColor: "#fec9c3", opacity: 0.1 }}
          animate={rotateAnimation}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full"
          style={{ backgroundColor: "#e981a4", opacity: 0.05 }}
          animate={pulseAnimation}
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <HiSparkles className="text-4xl" style={{ color: "#e981a4" }} />
            <motion.h2
              className="text-3xl font-bold text-center"
              variants={itemVariants}
              style={{ color: "#e981a4" }}
            >
              {text.title}
            </motion.h2>
            <HiSparkles className="text-4xl" style={{ color: "#e981a4" }} />
          </motion.div>

          <motion.p
            className="text-center max-w-xl mx-auto"
            variants={itemVariants}
            style={{ color: "#645a5a" }}
          >
            {text.description}
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
          <motion.div
            className="flex-1 p-6 rounded-xl shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={
              inView
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.95, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ backgroundColor: "#ffffff" }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Enhanced decorative elements */}
            <motion.div
              className="absolute -right-12 -top-12 w-24 h-24 rounded-full opacity-50"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              style={{ backgroundColor: "#f4c5d7" }}
            />
            <motion.div
              className="absolute -left-12 -bottom-12 w-24 h-24 rounded-full opacity-50"
              animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
              transition={{ duration: 10, repeat: Infinity, delay: 0.5 }}
              style={{ backgroundColor: "#fec9c3" }}
            />
            <motion.div
              className="absolute top-4 right-4"
              animate={floatingAnimation}
            >
              <HiStar className="text-2xl" style={{ color: "#f9adb7" }} />
            </motion.div>

            <div className="relative z-10">
              <div className="aspect-w-4 aspect-h-3 mb-6 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                  {isScanning ? (
                    <motion.div
                      key="scanning"
                      className="text-center w-full h-full flex flex-col items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ backgroundColor: "#fff" }}
                    >
                      <motion.div
                        className="w-24 h-24 rounded-full flex items-center justify-center relative"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{ border: `2px solid #e981a4` }}
                      >
                        <motion.div
                          className="w-20 h-20 rounded-full flex items-center justify-center"
                          animate={{ rotate: -360 }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          style={{ border: `2px solid #f9adb7` }}
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <HiCamera
                              className="text-3xl"
                              style={{ color: "#e981a4" }}
                            />
                          </motion.div>
                        </motion.div>
                        <motion.div
                          className="absolute -inset-4 rounded-full"
                          style={{ border: `2px dashed #f9adb7` }}
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </motion.div>

                      <div className="mt-6 w-full max-w-xs">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              width: `${scanProgress}%`,
                              backgroundColor: "#e981a4",
                            }}
                          />
                        </div>
                        <motion.p
                          className="mt-2 font-medium"
                          style={{ color: "#e981a4" }}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {scanStatus}
                        </motion.p>
                      </div>
                    </motion.div>
                  ) : scanResult ? (
                    <motion.div
                      key="result"
                      className="w-full h-full relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.img
                        src="/api/placeholder/400/300"
                        alt="Scanned item"
                        className="w-full h-full object-cover"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-3 right-3"
                      >
                        <motion.button
                          onClick={scanAgain}
                          className="bg-white p-2 rounded-full shadow-lg hover:text-pink-700"
                          whileHover={{ scale: 1.1, rotate: 180 }}
                          whileTap={{ scale: 0.9 }}
                          style={{ color: "#e981a4" }}
                        >
                          <HiCamera className="text-xl" />
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      className="w-full h-full flex flex-col items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ backgroundColor: "#fff" }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <HiCamera
                          className="text-6xl"
                          style={{ color: "#f9adb7" }}
                        />
                      </motion.div>
                      <motion.button
                        onClick={() => setShowTutorial(true)}
                        className="mt-4 text-sm hover:text-pink-600 flex items-center gap-1"
                        whileHover={{ scale: 1.05, x: 5 }}
                        style={{ color: "#e981a4" }}
                      >
                        <HiLightBulb style={{ color: "#f9adb7" }} />{" "}
                        {text.howToScan}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-4">
                <motion.button
                  onClick={handleScan}
                  className="flex-1 px-4 py-3 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 relative overflow-hidden"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 4px 15px rgba(233, 129, 164, 0.3)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isScanning}
                  onHoverStart={() => setScanHover(true)}
                  onHoverEnd={() => setScanHover(false)}
                  style={{ backgroundColor: "#e981a4" }}
                >
                  {scanHover && (
                    <motion.div
                      className="absolute inset-0"
                      initial={{ x: "-100%", opacity: 0.3 }}
                      animate={{ x: "100%", opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      style={{ backgroundColor: "#ffffff" }}
                    />
                  )}
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <HiCamera className="text-xl" />
                  </motion.div>
                  {scanResult ? text.scanAgain : text.scanButton}
                </motion.button>

                <motion.button
                  onClick={handleUpload}
                  className="flex-1 px-4 py-3 bg-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 relative overflow-hidden"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 4px 15px rgba(233, 129, 164, 0.2)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isScanning}
                  onHoverStart={() => setUploadHover(true)}
                  onHoverEnd={() => setUploadHover(false)}
                  style={{ border: `1px solid #e981a4`, color: "#e981a4" }}
                >
                  {uploadHover && (
                    <motion.div
                      className="absolute inset-0"
                      initial={{ y: "-100%" }}
                      animate={{ y: "100%" }}
                      transition={{ duration: 0.5 }}
                      style={{ backgroundColor: "#f4c5d7" }}
                    />
                  )}
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <HiUpload className="text-xl" />
                  </motion.div>
                  {text.uploadButton}
                </motion.button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 p-6 rounded-xl shadow-lg relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={
              inView
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.95, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ backgroundColor: "#ffffff" }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Enhanced decorative elements */}
            <motion.div
              className="absolute -right-12 -bottom-12 w-24 h-24 rounded-full opacity-50"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 9, repeat: Infinity, delay: 1 }}
              style={{ backgroundColor: "#f4c5d7" }}
            />
            <motion.div
              className="absolute -left-12 -top-12 w-24 h-24 rounded-full opacity-50"
              animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              style={{ backgroundColor: "#fec9c3" }}
            />
            <motion.div
              className="absolute top-4 left-4"
              animate={floatingAnimation}
            >
              <HiCheck className="text-2xl" style={{ color: "#f9adb7" }} />
            </motion.div>

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {scanResult ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                  >
                    <motion.h3
                      className="text-xl font-bold mb-6 flex items-center gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ color: "#e981a4" }}
                    >
                      <HiSparkles className="text-2xl" />
                      {text.resultTitle}
                    </motion.h3>

                    <div className="space-y-6">
                      <motion.div
                        className="flex items-center p-4 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{ backgroundColor: "#f4c5d7" }}
                        whileHover={{ scale: 1.02, x: 5 }}
                      >
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                          whileHover={{ rotate: 5 }}
                        >
                          <img
                            src="/api/placeholder/80/80"
                            alt="Utensil"
                            className="w-20 h-20 object-cover rounded-lg mr-4"
                          />
                        </motion.div>
                        <div>
                          <motion.h4
                            className="font-bold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            style={{ color: "#e981a4" }}
                          >
                            {scanResult.type}
                          </motion.h4>
                          <motion.div
                            className="text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                          >
                            {text.quantity}:
                          </motion.div>
                          <motion.div
                            className="flex flex-wrap gap-2 mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                          >
                            <motion.span
                              className="px-2 py-1 rounded text-sm"
                              whileHover={{ scale: 1.05, y: -2 }}
                              style={{
                                backgroundColor: "#fff",
                                color: "#e981a4",
                              }}
                            >
                              {scanResult.gram}
                            </motion.span>
                            <motion.span
                              className="px-2 py-1 rounded text-sm"
                              whileHover={{ scale: 1.05, y: -2 }}
                              style={{
                                backgroundColor: "#fff",
                                color: "#e981a4",
                              }}
                            >
                              {scanResult.ml}
                            </motion.span>
                          </motion.div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="p-4 rounded-lg flex items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        }}
                        style={{ backgroundColor: "#fff" }}
                      >
                        <HiInformationCircle
                          className="text-xl mt-1 mr-3 flex-shrink-0"
                          style={{ color: "#e981a4" }}
                        />
                        <div>
                          <div
                            className="font-medium"
                            style={{ color: "#e981a4" }}
                          >
                            {text.personsValue}
                          </div>
                          <div
                            className="text-sm mt-1"
                            style={{ color: "#645a5a" }}
                          >
                            For a standard recipe, use 3 tablespoons of this
                            ingredient.
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="p-4 rounded-lg flex items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        }}
                        style={{ backgroundColor: "#fec9c3" }}
                      >
                        <HiInformationCircle
                          className="text-xl mt-1 mr-3 flex-shrink-0"
                          style={{ color: "#e981a4" }}
                        />
                        <div>
                          <div
                            className="font-medium"
                            style={{ color: "#e981a4" }}
                          >
                            {text.tip}
                          </div>
                          <div
                            className="text-sm mt-1"
                            style={{ color: "#645a5a" }}
                          >
                            {text.tipText}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    className="h-full flex flex-col items-center justify-center text-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <HiPhotograph
                        className="w-32 h-32 mb-6"
                        style={{ color: "#f9adb7" }}
                      />
                    </motion.div>
                    <motion.p
                      className="text-gray-500"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Scan an item to see detailed measurement information here
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTutorial(false)}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-md w-full relative overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative elements for modal */}
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
                style={{ backgroundColor: "#f4c5d7" }}
                animate={rotateAnimation}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-20"
                style={{ backgroundColor: "#fec9c3" }}
                animate={rotateAnimation}
              />

              <motion.h3
                className="text-xl font-bold mb-4 flex items-center gap-2"
                style={{ color: "#e981a4" }}
              >
                <HiLightBulb className="text-2xl" />
                {text.tutorialTitle}
              </motion.h3>

              <div className="space-y-4 mb-6">
                {text.tutorialSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="w-6 h-6 rounded-full flex items-center justify-center font-medium"
                      style={{ backgroundColor: "#f4c5d7", color: "#e981a4" }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {index + 1}
                    </motion.div>
                    <div style={{ color: "#645a5a" }}>{step}</div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="w-full py-3 text-white rounded-lg font-medium transition-colors relative overflow-hidden"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 4px 15px rgba(233, 129, 164, 0.3)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowTutorial(false)}
                style={{ backgroundColor: "#e981a4" }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                  style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                />
                {text.close}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Helper function to convert hex to rgba for gradients
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default ScanFeature;
