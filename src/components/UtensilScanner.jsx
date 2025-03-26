// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaCamera, FaRuler, FaWeight, FaVolumeUp, FaChevronDown, FaInfoCircle, FaArrowRight, FaUpload, FaTimes, FaUtensils, FaTemperatureHigh, FaCoffee } from 'react-icons/fa';
// import { FaBowlFood } from "react-icons/fa6"; // If it's from FontAwesome 6

// const UtensilScanner = ({ language = 'en', openModal }) => {
//   const [isScanning, setIsScanning] = useState(false);
//   const [scanComplete, setScanComplete] = useState(false);
//   const [activeTab, setActiveTab] = useState('volume');
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const [scanResults, setScanResults] = useState(null);
//   const [cameraPermission, setCameraPermission] = useState(null);
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [showUploadInfo, setShowUploadInfo] = useState(false);
//   const [utensilInfo, setUtensilInfo] = useState(null);
  
//   const translations = {
//     en: {
//       title: "Utensil Scanner",
//       subtitle: "Measure your utensils with just a scan",
//       scanButton: "Scan Utensil",
//       uploadButton: "Upload Photo",
//       measuring: "Measuring...",
//       scanAgain: "Scan Again",
//       volume: "Volume",
//       dimensions: "Dimensions",
//       weight: "Weight Capacity",
//       scanPrompt: "Position your utensil in the frame",
//       permissionDenied: "Camera access denied",
//       permissionRequest: "Allow camera access to use scanner",
//       height: "Height",
//       diameter: "Diameter",
//       capacity: "Capacity",
//       canHold: "Can hold approx.",
//       learnMore: "Learn more about measurement",
//       scanComplete: "Scan Complete!",
//       tips: "Scanning Tips",
//       tip1: "Ensure good lighting",
//       tip2: "Place utensil on flat surface",
//       tip3: "Keep camera steady",
//       viewDetails: "View Full Details",
//       or: "or",
//       utensilInfo: "Utensil Information",
//       close: "Close",
//       materialType: "Material Type",
//       heatResistance: "Heat Resistance",
//       dishwasherSafe: "Dishwasher Safe",
//       bestFor: "Best Used For",
//       recommendedUses: "Recommended Uses",
//       careInstructions: "Care Instructions",
//       yes: "Yes",
//       no: "No",
//       utensilIdentified: "Utensil Identified!",
//       detectedUtensil: "Detected Utensil",
//       viewResults: "View Measurement Results",
//       cupType: "Cup Type"
//     },
//     hi: {
//       title: "बर्तन स्कैनर",
//       subtitle: "सिर्फ एक स्कैन से अपने बर्तन को मापें",
//       scanButton: "स्कैन करें",
//       uploadButton: "फोटो अपलोड करें",
//       measuring: "माप रहा है...",
//       scanAgain: "फिर से स्कैन करें",
//       volume: "आयतन",
//       dimensions: "आयाम",
//       weight: "वजन क्षमता",
//       scanPrompt: "अपने बर्तन को फ्रेम में रखें",
//       permissionDenied: "कैमरा एक्सेस अस्वीकृत",
//       permissionRequest: "स्कैनर का उपयोग करने के लिए कैमरा एक्सेस की अनुमति दें",
//       height: "ऊंचाई",
//       diameter: "व्यास",
//       capacity: "क्षमता",
//       canHold: "लगभग धारण कर सकता है",
//       learnMore: "माप के बारे में अधिक जानें",
//       scanComplete: "स्कैन पूरा हुआ!",
//       tips: "स्कैनिंग टिप्स",
//       tip1: "अच्छी रोशनी सुनिश्चित करें",
//       tip2: "बर्तन को समतल सतह पर रखें",
//       tip3: "कैमरा स्थिर रखें",
//       viewDetails: "पूरा विवरण देखें",
//       or: "या",
//       utensilInfo: "बर्तन जानकारी",
//       close: "बंद करें",
//       materialType: "सामग्री प्रकार",
//       heatResistance: "ताप प्रतिरोध",
//       dishwasherSafe: "डिशवॉशर सुरक्षित",
//       bestFor: "सबसे अच्छा उपयोग",
//       recommendedUses: "अनुशंसित उपयोग",
//       careInstructions: "देखभाल निर्देश",
//       yes: "हां",
//       no: "नहीं",
//       utensilIdentified: "बर्तन की पहचान हो गई!",
//       detectedUtensil: "पहचाना गया बर्तन",
//       viewResults: "माप परिणाम देखें",
//       cupType: "कप प्रकार"
//     }
//   };

//   const text = translations[language];

//   // Mock utensil information that would be detected from AI
//   const mockUtensilInfo = {
//     name: "Measuring Cup",
//     type: "Kitchen Measuring Cup",
//     material: "Stainless Steel",
//     heatResistant: "Up to 200°C (392°F)",
//     dishwasherSafe: true,
//     bestFor: ["Measuring Liquids", "Measuring Dry Ingredients", "Cooking", "Baking"],
//     recommendedUses: [
//       { name: "Coffee", icon: "coffee" },
//       { name: "Flour", icon: "flour" },
//       { name: "Sugar", icon: "sugar" },
//       { name: "Soup", icon: "soup" }
//     ],
//     careInstructions: [
//       "Hand wash recommended for prolonged life",
//       "Dry immediately after washing to prevent water spots",
//       "Do not use abrasive cleaners",
//       "Store in a dry place"
//     ],
//     cupType: "Standard American Cup (8 oz)",
//     additionalNotes: "Features a pour spout for easy liquid transfer. The handle is designed to stay cool even when measuring hot liquids."
//   };

//   // Simulated results - in a real app these would come from computer vision algorithms
//   const mockResultsData = {
//     height: {
//       value: 15.2,
//       unit: "cm"
//     },
//     diameter: {
//       top: 10.5,
//       bottom: 8.2,
//       unit: "cm"
//     },
//     volume: {
//       value: 750,
//       unit: "ml"
//     },
//     weight: {
//       flour: {
//         value: 450,
//         unit: "g"
//       },
//       sugar: {
//         value: 600,
//         unit: "g"
//       },
//       water: {
//         value: 750,
//         unit: "ml"
//       },
//       rice: {
//         value: 525,
//         unit: "g"
//       }
//     }
//   };

//   // Request camera access
//   const requestCameraAccess = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { facingMode: 'environment' } 
//       });
      
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
      
//       setCameraPermission('granted');
//     } catch (err) {
//       console.error("Error accessing camera:", err);
//       setCameraPermission('denied');
//     }
//   };

//   // Start the scanning process
//   const startScan = () => {
//     if (cameraPermission !== 'granted') {
//       requestCameraAccess();
//       return;
//     }
    
//     setIsScanning(true);
//     setScanComplete(false);
//     setScanResults(null);
//     setUploadedImage(null);
//     setShowUploadInfo(false);
    
//     // Simulated scanning process
//     setTimeout(() => {
//       // In a real app, this is where you'd process video frames for measurements
//       setIsScanning(false);
//       setScanComplete(true);
//       setScanResults(mockResultsData);
//     }, 3000);
//   };

//   const resetScan = () => {
//     setIsScanning(false);
//     setScanComplete(false);
//     setScanResults(null);
//     setUploadedImage(null);
//     setShowUploadInfo(false);
//     setUtensilInfo(null);
//   };

//   const handleUpload = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
      
//       reader.onloadend = () => {
//         setUploadedImage(reader.result);
//         // Process the uploaded image
//         setIsScanning(true);
//         setTimeout(() => {
//           setIsScanning(false);
//           setUtensilInfo(mockUtensilInfo);
//           setShowUploadInfo(true);
//         }, 3000);
//       };
      
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleContinueToResults = () => {
//     setShowUploadInfo(false);
//     setScanComplete(true);
//     setScanResults(mockResultsData);
//   };

//   const showDetails = () => {
//     if (!scanResults) return;
    
//     const detailsContent = {
//       title: text.title,
//       body: (
//         <div>
//           <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg mb-6">
//             <h3 className="text-xl font-bold text-purple-800 mb-2">{text.dimensions}</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-white p-3 rounded-lg shadow-sm">
//                 <div className="text-sm text-gray-600">{text.height}</div>
//                 <div className="text-2xl font-bold text-purple-700">
//                   {scanResults.height.value} {scanResults.height.unit}
//                 </div>
//               </div>
//               <div className="bg-white p-3 rounded-lg shadow-sm">
//                 <div className="text-sm text-gray-600">{text.diameter}</div>
//                 <div className="text-2xl font-bold text-purple-700">
//                   {scanResults.diameter.top} - {scanResults.diameter.bottom} {scanResults.diameter.unit}
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-gradient-to-r from-blue-100 to-teal-100 p-4 rounded-lg mb-6">
//             <h3 className="text-xl font-bold text-blue-800 mb-2">{text.volume}</h3>
//             <div className="bg-white p-3 rounded-lg shadow-sm">
//               <div className="text-sm text-gray-600">{text.capacity}</div>
//               <div className="text-2xl font-bold text-blue-700">
//                 {scanResults.volume.value} {scanResults.volume.unit}
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-gradient-to-r from-pink-100 to-orange-100 p-4 rounded-lg">
//             <h3 className="text-xl font-bold text-pink-800 mb-2">{text.weight}</h3>
//             <div className="grid grid-cols-2 gap-4">
//               {Object.entries(scanResults.weight).map(([ingredient, data]) => (
//                 <div key={ingredient} className="bg-white p-3 rounded-lg shadow-sm">
//                   <div className="text-sm text-gray-600 capitalize">{ingredient}</div>
//                   <div className="text-xl font-bold text-pink-700">
//                     {data.value} {data.unit}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )
//     };
    
//     openModal(detailsContent);
//   };

//   // Cleanup camera on unmount
//   useEffect(() => {
//     return () => {
//       if (videoRef.current && videoRef.current.srcObject) {
//         const tracks = videoRef.current.srcObject.getTracks();
//         tracks.forEach(track => track.stop());
//       }
//     };
//   }, []);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 24
//       }
//     }
//   };

//   const tabs = [
//     { id: 'volume', icon: <FaVolumeUp /> },
//     { id: 'dimensions', icon: <FaRuler /> },
//     { id: 'weight', icon: <FaWeight /> }
//   ];
  
//   // Function to get icon component based on string name
//   const getIconComponent = (iconName) => {
//     switch(iconName) {
//       case 'coffee':
//         return <FaCoffee />;
//       case 'flour':
//         return <FaUtensils />;
//       case 'sugar':
//         return <FaWeight />;
//       case 'soup':
//         return <FaBowlFood />;
//       default:
//         return <FaUtensils />;
//     }
//   };

//   return (
//     <motion.section 
//       className="py-16 overflow-hidden"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       style={{
//         background: "linear-gradient(135deg, #fff6f8 0%, #ffe2ec 25%, #ffd1e8 50%, #ffe2f5 75%, #fff8fa 100%)"
//       }}
//     >
//       <div className="container mx-auto px-4">
//         {/* Header with animated elements */}
//         <div className="relative mb-12 text-center">
//           <motion.div 
//             className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 opacity-70"
//             animate={{ 
//               scale: [1, 1.1, 1],
//               rotate: [0, -5, 0]
//             }}
//             transition={{ duration: 6, repeat: Infinity }}
//           />
          
//           <motion.div 
//             className="absolute -bottom-12 -left-12 w-24 h-24 rounded-full bg-gradient-to-tr from-pink-200 to-fuchsia-200 opacity-70"
//             animate={{ 
//               scale: [1, 1.2, 1],
//               rotate: [0, 10, 0]
//             }}
//             transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
//           />
          
//           <motion.h2 
//             className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-fuchsia-600 relative z-10"
//             variants={itemVariants}
//           >
//             {text.title}
//           </motion.h2>
          
//           <motion.p
//             className="text-gray-600 mt-3 max-w-lg mx-auto"
//             variants={itemVariants}
//           >
//             {text.subtitle}
//           </motion.p>
          
//           <motion.div 
//             className="w-24 h-1 bg-gradient-to-r from-pink-400 to-fuchsia-500 mx-auto mt-4"
//             variants={itemVariants}
//             initial={{ width: 0 }}
//             animate={{ width: 96 }}
//             transition={{ delay: 0.2 }}
//           />
//         </div>
        
//         {/* Main scanner component */}
//         <motion.div 
//           className="max-w-lg mx-auto relative"
//           variants={itemVariants}
//         >
//           <motion.div 
//             className="relative rounded-3xl overflow-hidden shadow-xl bg-gradient-to-b from-pink-50 to-fuchsia-100 p-4"
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//           >
//             <div className="rounded-2xl overflow-hidden bg-black aspect-video relative">
//               {/* Camera view or placeholder or uploaded image */}
//               {uploadedImage ? (
//                 <img 
//                   src={uploadedImage}
//                   className="w-full h-full object-cover"
//                   alt="Uploaded utensil"
//                 />
//               ) : cameraPermission === 'granted' ? (
//                 <video 
//                   ref={videoRef} 
//                   autoPlay 
//                   playsInline 
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gray-900 flex items-center justify-center">
//                   {cameraPermission === 'denied' ? (
//                     <div className="text-center p-6">
//                       <FaCamera className="text-white text-4xl mx-auto mb-3 opacity-40" />
//                       <p className="text-white font-medium">{text.permissionDenied}</p>
//                       <button 
//                         className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white rounded-full text-sm"
//                         onClick={requestCameraAccess}
//                       >
//                         {text.permissionRequest}
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="text-center">
//                       <FaCamera className="text-white text-5xl mx-auto mb-3 opacity-60" />
//                     </div>
//                   )}
//                 </div>
//               )}
              
//               {/* Scanning overlay */}
//               <AnimatePresence>
//                 {isScanning && (
//                   <motion.div 
//                     className="absolute inset-0 flex flex-col items-center justify-center"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                   >
//                     <div className="bg-black/50 w-full h-full absolute"></div>
//                     <motion.div 
//                       className="w-64 h-64 border-2 border-white rounded-lg relative z-10"
//                       animate={{ 
//                         borderColor: ['rgba(255,255,255,0.5)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0.5)'],
//                         boxShadow: [
//                           '0 0 0 0 rgba(255,255,255,0)',
//                           '0 0 0 4px rgba(255,255,255,0.3)',
//                           '0 0 0 0 rgba(255,255,255,0)'
//                         ]
//                       }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                     >
//                       <motion.div 
//                         className="absolute inset-0 border-t-2 border-white" 
//                         animate={{ top: [0, '100%', 0] }}
//                         transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
//                       />
//                     </motion.div>
//                     <motion.p 
//                       className="text-white font-medium mt-6 text-lg z-10 bg-black/30 px-4 py-2 rounded-full"
//                       animate={{ opacity: [0.7, 1, 0.7] }}
//                       transition={{ duration: 1.5, repeat: Infinity }}
//                     >
//                       {text.measuring}
//                     </motion.p>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
              
//               {/* Scan guidance overlay */}
//               {!isScanning && !scanComplete && !showUploadInfo && cameraPermission === 'granted' && !uploadedImage && (
//                 <div className="absolute inset-0 flex flex-col items-center justify-center">
//                   <div className="bg-black/40 w-full h-full absolute"></div>
//                   <div className="w-64 h-64 border-2 border-dashed border-white/70 rounded-lg relative z-10"></div>
//                   <p className="text-white font-medium mt-6 text-base z-10 bg-black/30 px-4 py-2 rounded-full">
//                     {text.scanPrompt}
//                   </p>
//                 </div>
//               )}
              
//               {/* Utensil Info popup after upload */}
//               <AnimatePresence>
//                 {showUploadInfo && utensilInfo && (
//                   <motion.div 
//                     className="absolute inset-0"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                   >
//                     <div className="bg-gradient-to-b from-pink-900/80 to-fuchsia-900/80 w-full h-full absolute"></div>
                    
//                     <div className="absolute inset-0 flex flex-col items-center justify-start pt-4 px-3 overflow-y-auto">
//                       <motion.div
//                         initial={{ scale: 0.8, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         transition={{ delay: 0.1, type: "spring" }}
//                         className="bg-white/20 backdrop-blur-md rounded-full px-5 py-2 mb-3"
//                       >
//                         <h3 className="text-white font-bold">{text.utensilIdentified}</h3>
//                       </motion.div>
                      
//                       <motion.div
//                         initial={{ y: 20, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 0.2 }}
//                         className="bg-white/15 backdrop-blur-md rounded-xl p-4 w-full mb-4"
//                       >
//                         <h4 className="text-white text-lg font-bold mb-2">{text.detectedUtensil}</h4>
//                         <h3 className="text-white text-2xl font-bold mb-3">{utensilInfo.name}</h3>
//                         <p className="text-white/80 text-sm mb-1">{text.cupType}</p>
//                         <p className="text-white font-medium mb-3">{utensilInfo.cupType}</p>
//                       </motion.div>
                      
//                       <motion.div
//                         initial={{ y: 20, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 0.3 }}
//                         className="bg-white/15 backdrop-blur-md rounded-xl p-4 w-full mb-4"
//                       >
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <p className="text-white/80 text-xs">{text.materialType}</p>
//                             <p className="text-white font-medium">{utensilInfo.material}</p>
//                           </div>
//                           <div>
//                             <p className="text-white/80 text-xs">{text.heatResistance}</p>
//                             <p className="text-white font-medium flex items-center">
//                               <FaTemperatureHigh className="mr-1 text-red-300" />
//                               {utensilInfo.heatResistant}
//                             </p>
//                           </div>
//                           <div>
//                             <p className="text-white/80 text-xs">{text.dishwasherSafe}</p>
//                             <p className="text-white font-medium">
//                               {utensilInfo.dishwasherSafe ? text.yes : text.no}
//                             </p>
//                           </div>
//                         </div>
//                       </motion.div>
                      
//                       <motion.div
//                         initial={{ y: 20, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 0.4 }}
//                         className="bg-white/15 backdrop-blur-md rounded-xl p-4 w-full mb-4"
//                       >
//                         <h4 className="text-white font-medium mb-2">{text.bestFor}</h4>
//                         <div className="flex flex-wrap gap-2">
//                           {utensilInfo.bestFor.map((use, index) => (
//                             <div 
//                               key={index} 
//                               className="bg-white/20 px-3 py-1 rounded-full text-white text-sm"
//                             >
//                               {use}
//                             </div>
//                           ))}
//                         </div>
//                       </motion.div>
                      
//                       <motion.div
//                         initial={{ y: 20, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 0.5 }}
//                         className="bg-white/15 backdrop-blur-md rounded-xl p-4 w-full mb-4"
//                       >
//                         <h4 className="text-white font-medium mb-2">{text.recommendedUses}</h4>
//                         <div className="grid grid-cols-2 gap-3">
//                           {utensilInfo.recommendedUses.map((use, index) => (
//                             <div 
//                               key={index} 
//                               className="bg-white/20 p-2 rounded-lg flex items-center"
//                             >
//                               <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white mr-2">
//                                 {getIconComponent(use.icon)}
//                               </div>
//                               <span className="text-white">{use.name}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </motion.div>
                      
//                       <motion.div
//                         initial={{ y: 20, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 0.6 }}
//                         className="bg-white/15 backdrop-blur-md rounded-xl p-4 w-full mb-6"
//                       >
//                         <h4 className="text-white font-medium mb-2">{text.careInstructions}</h4>
//                         <ul className="text-white space-y-2">
//                           {utensilInfo.careInstructions.map((instruction, index) => (
//                             <li key={index} className="text-sm flex items-start">
//                               <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">•</span>
//                               {instruction}
//                             </li>
//                           ))}
//                         </ul>
//                       </motion.div>
                      
//                       <motion.button
//                         className="w-full py-3 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white rounded-lg font-medium text-lg flex items-center justify-center shadow-lg shadow-pink-200/30 mb-4"
//                         onClick={handleContinueToResults}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         initial={{ y: 20, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 0.7 }}
//                       >
//                         {text.viewResults}
//                       </motion.button>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
              
//               {/* Results overlay */}
//               <AnimatePresence>
//                 {scanComplete && scanResults && (
//                   <motion.div 
//                     className="absolute inset-0"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                   >
//                     <div className="bg-gradient-to-b from-pink-900/70 to-fuchsia-900/70 w-full h-full absolute"></div>
                    
//                     <div className="absolute inset-0 flex flex-col items-center justify-start pt-8">
//                       <motion.div
//                         initial={{ scale: 0.8, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         transition={{ delay: 0.2, type: "spring" }}
//                         className="bg-white/20 backdrop-blur-md rounded-full px-5 py-2 mb-4"
//                       >
//                         <h3 className="text-white font-bold">{text.scanComplete}</h3>
//                       </motion.div>
                      
//                       {/* Tabs for different measurement types */}
//                       <div className="flex space-x-2 mb-4">
//                         {tabs.map(tab => (
//                           <motion.button
//                             key={tab.id}
//                             className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${
//                               activeTab === tab.id 
//                                 ? 'bg-white text-pink-700' 
//                                 : 'bg-white/30 text-white hover:bg-white/40'
//                             }`}
//                             onClick={() => setActiveTab(tab.id)}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                           >
//                             <div className="flex items-center space-x-1">
//                               {tab.icon}
//                               <span>{text[tab.id]}</span>
//                             </div>
//                           </motion.button>
//                         ))}
//                       </div>
                      
//                       {/* Measurement results */}
//                       <AnimatePresence mode="wait">
//                         <motion.div
//                           key={activeTab}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -20 }}
//                           className="w-full px-4"
//                         >
//                           {activeTab === 'volume' && (
//                             <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 w-full">
//                               <div className="flex justify-between items-center mb-3">
//                                 <h4 className="text-white font-medium">{text.volume}</h4>
//                                 <div className="text-xs text-white/70">{text.capacity}</div>
//                               </div>
//                               <div className="flex items-center justify-center py-6">
//                                 <div className="relative">
//                                   <div className="text-5xl font-bold text-white">
//                                     {scanResults.volume.value}
//                                   </div>
//                                   <div className="text-lg text-white/80 absolute -right-6 bottom-0">
//                                     {scanResults.volume.unit}
//                                   </div>
//                                 </div>
//                               </div>
//                               <div>
//                                 <div className="text-sm text-white/80 mb-1">{text.canHold}:</div>
//                                 <div className="grid grid-cols-2 gap-3">
//                                   {Object.entries(scanResults.weight).map(([ingredient, data]) => (
//                                     <div key={ingredient} className="bg-white/20 p-2 rounded-lg flex items-center">
//                                       <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white mr-2">
//                                         {getIconComponent(ingredient)}
//                                       </div>
//                                       <div>
//                                         <div className="text-white text-xs capitalize">{ingredient}</div>
//                                         <div className="text-white font-bold">
//                                           {data.value} {data.unit}
//                                         </div>
//                                       </div>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             </div>
//                           )}
                          
//                           {activeTab === 'dimensions' && (
//                             <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 w-full">
//                               <div className="flex justify-between items-center mb-3">
//                                 <h4 className="text-white font-medium">{text.dimensions}</h4>
//                               </div>
//                               <div className="grid grid-cols-2 gap-3">
//                                 <div className="bg-white/20 rounded-lg p-3">
//                                   <div className="text-white/80 text-xs mb-1">{text.height}</div>
//                                   <div className="text-white text-2xl font-bold">
//                                     {scanResults.height.value} <span className="text-sm font-normal">{scanResults.height.unit}</span>
//                                   </div>
//                                 </div>
//                                 <div className="bg-white/20 rounded-lg p-3">
//                                   <div className="text-white/80 text-xs mb-1">{text.diameter}</div>
//                                   <div className="text-white">
//                                     <span className="text-2xl font-bold">
//                                       {scanResults.diameter.top}
//                                     </span>
//                                     <span className="mx-1 text-white/80">-</span>
//                                     <span className="text-2xl font-bold">
//                                       {scanResults.diameter.bottom}
//                                     </span>
//                                     <span className="text-sm font-normal ml-1">{scanResults.diameter.unit}</span>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
                          
//                           {activeTab === 'weight' && (
//                             <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 w-full">
//                               <div className="flex justify-between items-center mb-3">
//                                 <h4 className="text-white font-medium">{text.weight}</h4>
//                               </div>
//                               <div className="grid grid-cols-2 gap-3">
//                                 {Object.entries(scanResults.weight).map(([ingredient, data]) => (
//                                   <div key={ingredient} className="bg-white/20 p-3 rounded-lg">
//                                     <div className="text-white/80 text-xs mb-1 capitalize">{ingredient}</div>
//                                     <div className="text-white text-2xl font-bold flex items-baseline">
//                                       {data.value} <span className="text-sm font-normal ml-1">{data.unit}</span>
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
                          
//                           <div className="flex flex-col space-y-3 mt-6 px-4">
//                             <motion.button
//                               className="py-3 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white rounded-lg font-medium text-lg flex items-center justify-center shadow-lg shadow-pink-200/30"
//                               onClick={showDetails}
//                               whileHover={{ scale: 1.02 }}
//                               whileTap={{ scale: 0.98 }}
//                             >
//                               {text.viewDetails}
//                               <FaArrowRight className="ml-2" />
//                             </motion.button>
                            
//                             <motion.button
//                               className="py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium flex items-center justify-center"
//                               onClick={resetScan}
//                               whileHover={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
//                               whileTap={{ scale: 0.98 }}
//                             >
//                               {text.scanAgain}
//                             </motion.button>
//                           </div>
//                         </motion.div>
//                       </AnimatePresence>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
              
//               {/* Canvas for image processing (hidden) */}
//               <canvas ref={canvasRef} className="hidden" />
//             </div>
            
//             {/* Controls */}
//             {!isScanning && !scanComplete && !showUploadInfo && (
//               <div className="pt-6 pb-2 px-1">
//                 <div className="flex justify-center items-center flex-col space-y-4">
//                   <motion.button
//                     className="w-full py-3 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white rounded-full font-medium text-lg flex items-center justify-center shadow-lg shadow-pink-200/30"
//                     onClick={startScan}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     <FaCamera className="mr-2" />
//                     {text.scanButton}
//                   </motion.button>
                  
//                   <div className="text-gray-500 text-sm font-medium">{text.or}</div>
                  
//                   <motion.button
//                     className="w-full py-3 border-2 border-pink-300 text-pink-700 rounded-full font-medium flex items-center justify-center"
//                     onClick={handleUpload}
//                     whileHover={{ backgroundColor: 'rgba(236, 72, 153, 0.05)' }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     <FaUpload className="mr-2" />
//                     {text.uploadButton}
//                   </motion.button>
                  
//                   <input 
//                     type="file"
//                     ref={fileInputRef}
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                   />
//                 </div>
                
//                 <motion.div
//                   className="mt-6 bg-white rounded-xl p-4 shadow-sm"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   <div className="flex justify-between items-center mb-2">
//                     <h4 className="font-medium text-gray-800 flex items-center">
//                       <FaInfoCircle className="mr-1.5 text-pink-500" />
//                       {text.tips}
//                     </h4>
//                     <motion.button
//                       whileHover={{ rotate: 180 }}
//                       transition={{ duration: 0.3 }}
//                       className="text-gray-400 hover:text-gray-600"
//                     >
//                       <FaChevronDown />
//                     </motion.button>
//                   </div>
//                   <ul className="text-sm text-gray-600 space-y-1.5">
//                     <li className="flex items-start">
//                       <span className="text-pink-500 mr-2">•</span>
//                       {text.tip1}
//                     </li>
//                     <li className="flex items-start">
//                       <span className="text-pink-500 mr-2">•</span>
//                       {text.tip2}
//                     </li>
//                     <li className="flex items-start">
//                       <span className="text-pink-500 mr-2">•</span>
//                       {text.tip3}
//                     </li>
//                   </ul>
//                 </motion.div>
//               </div>
//             )}
//           </motion.div>
          
//           {/* Decorative elements */}
//           <motion.div 
//             className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 opacity-70 z-0"
//             animate={{ 
//               scale: [1, 1.1, 1],
//               rotate: [0, 10, 0],
//               x: [0, 5, 0], 
//               y: [0, -5, 0]
//             }}
//             transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
//           />
          
//           <motion.div 
//             className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-tr from-fuchsia-200 to-pink-200 opacity-70 z-0"
//             animate={{ 
//               scale: [1, 1.2, 1],
//               rotate: [0, -10, 0],
//               x: [0, -5, 0], 
//               y: [0, 5, 0]
//             }}
//             transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", delay: 1 }}
//           />
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// };

// export default UtensilScanner;

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCamera, FaRuler, FaWeight, FaVolumeUp, FaChevronDown, FaInfoCircle, FaArrowRight, FaUpload, FaTimes, FaUtensils, FaTemperatureHigh, FaCoffee } from 'react-icons/fa';
import { FaBowlFood } from "react-icons/fa6"; 

const UtensilScanner = ({ language = 'en', openModal }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('volume');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [scanResults, setScanResults] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showUploadInfo, setShowUploadInfo] = useState(false);
  const [utensilInfo, setUtensilInfo] = useState(null);
  
  const translations = {
    en: {
      title: "Utensil Scanner",
      subtitle: "Measure your utensils with just a scan",
      scanButton: "Scan Utensil",
      uploadButton: "Upload Photo",
      measuring: "Measuring...",
      scanAgain: "Scan Again",
      volume: "Volume",
      dimensions: "Dimensions",
      weight: "Weight Capacity",
      scanPrompt: "Position your utensil in the frame",
      permissionDenied: "Camera access denied",
      permissionRequest: "Allow camera access to use scanner",
      height: "Height",
      diameter: "Diameter",
      capacity: "Capacity",
      canHold: "Can hold approx.",
      learnMore: "Learn more about measurement",
      scanComplete: "Scan Complete!",
      tips: "Scanning Tips",
      tip1: "Ensure good lighting",
      tip2: "Place utensil on flat surface",
      tip3: "Keep camera steady",
      viewDetails: "View Full Details",
      or: "or",
      utensilInfo: "Utensil Information",
      close: "Close",
      materialType: "Material Type",
      heatResistance: "Heat Resistance",
      dishwasherSafe: "Dishwasher Safe",
      bestFor: "Best Used For",
      recommendedUses: "Recommended Uses",
      careInstructions: "Care Instructions",
      yes: "Yes",
      no: "No",
      utensilIdentified: "Utensil Identified!",
      detectedUtensil: "Detected Utensil",
      viewResults: "View Measurement Results",
      cupType: "Cup Type",
      explainerTitle: "Smart Kitchen Measurement",
      explainer1: "Scan any kitchen utensil to get precise measurements",
      explainer2: "Identify utensil type and recommended uses",
      explainer3: "Get capacity information for cooking and baking",
      explainer4: "Save time with accurate volume & weight conversions",
      howItWorks: "How It Works",
      step1: "Position your utensil within the frame",
      step2: "Our AI analyzes the dimensions and shape",
      step3: "Get instant volume, weight and dimension data",
      howToUse: "How To Use",
      useTip1: "Perfect for measuring cups, spoons & containers",
      useTip2: "Helps with recipe portion control",
      useTip3: "Great for meal prep planning"
    },
    hi: {
      title: "बर्तन स्कैनर",
      subtitle: "सिर्फ एक स्कैन से अपने बर्तन को मापें",
      scanButton: "स्कैन करें",
      uploadButton: "फोटो अपलोड करें",
      measuring: "माप रहा है...",
      scanAgain: "फिर से स्कैन करें",
      volume: "आयतन",
      dimensions: "आयाम",
      weight: "वजन क्षमता",
      scanPrompt: "अपने बर्तन को फ्रेम में रखें",
      permissionDenied: "कैमरा एक्सेस अस्वीकृत",
      permissionRequest: "स्कैनर का उपयोग करने के लिए कैमरा एक्सेस की अनुमति दें",
      height: "ऊंचाई",
      diameter: "व्यास",
      capacity: "क्षमता",
      canHold: "लगभग धारण कर सकता है",
      learnMore: "माप के बारे में अधिक जानें",
      scanComplete: "स्कैन पूरा हुआ!",
      tips: "स्कैनिंग टिप्स",
      tip1: "अच्छी रोशनी सुनिश्चित करें",
      tip2: "बर्तन को समतल सतह पर रखें",
      tip3: "कैमरा स्थिर रखें",
      viewDetails: "पूरा विवरण देखें",
      or: "या",
      utensilInfo: "बर्तन जानकारी",
      close: "बंद करें",
      materialType: "सामग्री प्रकार",
      heatResistance: "ताप प्रतिरोध",
      dishwasherSafe: "डिशवॉशर सुरक्षित",
      bestFor: "सबसे अच्छा उपयोग",
      recommendedUses: "अनुशंसित उपयोग",
      careInstructions: "देखभाल निर्देश",
      yes: "हां",
      no: "नहीं",
      utensilIdentified: "बर्तन की पहचान हो गई!",
      detectedUtensil: "पहचाना गया बर्तन",
      viewResults: "माप परिणाम देखें",
      cupType: "कप प्रकार",
      explainerTitle: "स्मार्ट किचन मापन",
      explainer1: "किसी भी रसोई के बर्तन को स्कैन करके सटीक माप प्राप्त करें",
      explainer2: "बर्तन के प्रकार और अनुशंसित उपयोग की पहचान करें",
      explainer3: "खाना पकाने और बेकिंग के लिए क्षमता जानकारी प्राप्त करें",
      explainer4: "सटीक मात्रा और वजन रूपांतरण के साथ समय बचाएं",
      howItWorks: "यह कैसे काम करता है",
      step1: "अपने बर्तन को फ्रेम के भीतर रखें",
      step2: "हमारा AI आयामों और आकार का विश्लेषण करता है",
      step3: "तुरंत आयतन, वजन और आयाम डेटा प्राप्त करें",
      howToUse: "उपयोग कैसे करें",
      useTip1: "मापने वाले कप, चम्मच और कंटेनर के लिए एकदम सही",
      useTip2: "व्यंजन पोर्शन नियंत्रण में मदद करता है",
      useTip3: "मील प्रेप योजना के लिए बढ़िया"
    }
  };

  const text = translations[language];

  // Mock utensil information that would be detected from AI
  const mockUtensilInfo = {
    name: "Measuring Cup",
    type: "Kitchen Measuring Cup",
    material: "Stainless Steel",
    heatResistant: "Up to 200°C (392°F)",
    dishwasherSafe: true,
    bestFor: ["Measuring Liquids", "Measuring Dry Ingredients", "Cooking", "Baking"],
    recommendedUses: [
      { name: "Coffee", icon: "coffee" },
      { name: "Flour", icon: "flour" },
      { name: "Sugar", icon: "sugar" },
      { name: "Soup", icon: "soup" }
    ],
    careInstructions: [
      "Hand wash recommended for prolonged life",
      "Dry immediately after washing to prevent water spots",
      "Do not use abrasive cleaners",
      "Store in a dry place"
    ],
    cupType: "Standard American Cup (8 oz)",
    additionalNotes: "Features a pour spout for easy liquid transfer. The handle is designed to stay cool even when measuring hot liquids."
  };

  // Simulated results - in a real app these would come from computer vision algorithms
  const mockResultsData = {
    height: {
      value: 15.2,
      unit: "cm"
    },
    diameter: {
      top: 10.5,
      bottom: 8.2,
      unit: "cm"
    },
    volume: {
      value: 750,
      unit: "ml"
    },
    weight: {
      flour: {
        value: 450,
        unit: "g"
      },
      sugar: {
        value: 600,
        unit: "g"
      },
      water: {
        value: 750,
        unit: "ml"
      },
      rice: {
        value: 525,
        unit: "g"
      }
    }
  };

  // Request camera access
  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setCameraPermission('granted');
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraPermission('denied');
    }
  };

  // Start the scanning process
  const startScan = () => {
    if (cameraPermission !== 'granted') {
      requestCameraAccess();
      return;
    }
    
    setIsScanning(true);
    setScanComplete(false);
    setScanResults(null);
    setUploadedImage(null);
    setShowUploadInfo(false);
    
    // Simulated scanning process
    setTimeout(() => {
      // In a real app, this is where you'd process video frames for measurements
      setIsScanning(false);
      setScanComplete(true);
      setScanResults(mockResultsData);
    }, 3000);
  };

  const resetScan = () => {
    setIsScanning(false);
    setScanComplete(false);
    setScanResults(null);
    setUploadedImage(null);
    setShowUploadInfo(false);
    setUtensilInfo(null);
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        // Process the uploaded image
        setIsScanning(true);
        setTimeout(() => {
          setIsScanning(false);
          setUtensilInfo(mockUtensilInfo);
          setShowUploadInfo(true);
        }, 3000);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleContinueToResults = () => {
    setShowUploadInfo(false);
    setScanComplete(true);
    setScanResults(mockResultsData);
  };

  const showDetails = () => {
    if (!scanResults) return;
    
    const detailsContent = {
      title: text.title,
      body: (
        <div>
          <div className="bg-gradient-to-r from-[#f4c5d7] to-[#fec9c3] p-4 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-[#e981a4] mb-2">{text.dimensions}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600">{text.height}</div>
                <div className="text-2xl font-bold text-[#e981a4]">
                  {scanResults.height.value} {scanResults.height.unit}
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600">{text.diameter}</div>
                <div className="text-2xl font-bold text-[#e981a4]">
                  {scanResults.diameter.top} - {scanResults.diameter.bottom} {scanResults.diameter.unit}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#f9adb7] to-[#fec9c3] p-4 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-[#e981a4] mb-2">{text.volume}</h3>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600">{text.capacity}</div>
              <div className="text-2xl font-bold text-[#e981a4]">
                {scanResults.volume.value} {scanResults.volume.unit}
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#f9adb7] to-[#fff] p-4 rounded-lg">
            <h3 className="text-xl font-bold text-[#e981a4] mb-2">{text.weight}</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(scanResults.weight).map(([ingredient, data]) => (
                <div key={ingredient} className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-sm text-gray-600 capitalize">{ingredient}</div>
                  <div className="text-xl font-bold text-[#e981a4]">
                    {data.value} {data.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    };
    
    openModal(detailsContent);
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

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

  const tabs = [
    { id: 'volume', icon: <FaVolumeUp /> },
    { id: 'dimensions', icon: <FaRuler /> },
    { id: 'weight', icon: <FaWeight /> }
  ];
  
  // Function to get icon component based on string name
  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'coffee':
        return <FaCoffee />;
      case 'flour':
        return <FaUtensils />;
      case 'sugar':
        return <FaWeight />;
      case 'soup':
        return <FaBowlFood />;
      default:
        return <FaUtensils />;
    }
  };

  return (
    <motion.section 
      className="py-8 overflow-hidden min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        background: "linear-gradient(135deg, #f4c5d7 0%, #f9adb7 25%, #fec9c3 50%, #fff 75%, #fff8fa 100%)"
      }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="relative mb-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-[#e981a4] relative z-10"
            variants={itemVariants}
          >
            {text.title}
          </motion.h2>
          
          <motion.p
            className="text-gray-700 mt-3 max-w-lg mx-auto"
            variants={itemVariants}
          >
            {text.subtitle}
          </motion.p>
          
          <motion.div 
            className="w-24 h-1 bg-[#e981a4] mx-auto mt-4"
            variants={itemVariants}
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.2 }}
          />
        </div>
        
        {/* Split layout - Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Scanner */}
          <motion.div 
            className="w-full lg:w-7/12 relative"
            variants={itemVariants}
          >
            <motion.div 
              className="relative rounded-3xl overflow-hidden shadow-xl bg-gradient-to-b from-[#f4c5d7] to-[#fec9c3] p-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Camera view container */}
              <div className="rounded-2xl overflow-hidden bg-black aspect-video relative">
                {/* Camera view or placeholder or uploaded image */}
                {uploadedImage ? (
                  <img 
                    src={uploadedImage}
                    className="w-full h-full object-cover"
                    alt="Uploaded utensil"
                  />
                ) : cameraPermission === 'granted' ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    {cameraPermission === 'denied' ? (
                      <div className="text-center p-6">
                        <FaCamera className="text-white text-4xl mx-auto mb-3 opacity-40" />
                        <p className="text-white font-medium">{text.permissionDenied}</p>
                        <button 
                          className="mt-4 px-4 py-2 bg-[#e981a4] text-white rounded-full text-sm"
                          onClick={requestCameraAccess}
                        >
                          {text.permissionRequest}
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <FaCamera className="text-white text-5xl mx-auto mb-3 opacity-60" />
                      </div>
                    )}
                  </div>
                )}
                
                {/* Scanning overlay */}
                <AnimatePresence>
                  {isScanning && (
                    <motion.div 
                      className="absolute inset-0 flex flex-col items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="bg-black/50 w-full h-full absolute"></div>
                      <motion.div 
                        className="w-64 h-64 border-2 border-white rounded-lg relative z-10"
                        animate={{ 
                          borderColor: ['rgba(255,255,255,0.5)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0.5)'],
                          boxShadow: [
                            '0 0 0 0 rgba(255,255,255,0)',
                            '0 0 0 4px rgba(255,255,255,0.3)',
                            '0 0 0 0 rgba(255,255,255,0)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <motion.div 
                          className="absolute inset-0 border-t-2 border-white" 
                          animate={{ top: [0, '100%', 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
                        />
                      </motion.div>
                      <motion.p 
                        className="text-white font-medium mt-6 text-lg z-10 bg-black/30 px-4 py-2 rounded-full"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {text.measuring}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Scan guidance overlay */}
                {!isScanning && !scanComplete && !showUploadInfo && cameraPermission === 'granted' && !uploadedImage && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="bg-black/40 w-full h-full absolute"></div>
                    <div className="w-64 h-64 border-2 border-dashed border-white/70 rounded-lg relative z-10"></div>
                    <p className="text-white font-medium mt-6 text-base z-10 bg-black/30 px-4 py-2 rounded-full">
                      {text.scanPrompt}
                    </p>
                  </div>
                )}
                
                {/* Utensil Info popup after upload */}
                <AnimatePresence>
                  {showUploadInfo && utensilInfo && (
                    <motion.div 
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="bg-gradient-to-b from-[#e981a4]/80 to-[#f9adb7]/80 w-full h-full absolute"></div>
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-start pt-4 px-3 overflow-y-auto">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1, type: "spring" }}
                          className="bg-white/20 backdrop-blur-md rounded-full px-5 py-2 mb-3"
                        >
                          <h3 className="text-white font-bold">{text.utensilIdentified}</h3>
                        </motion.div>
                        
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="bg-white/15 backdrop-blur-md rounded-xl p-4 w-full mb-4"
                        >
                          <h4 className="text-white text-lg font-bold mb-2">{text.detectedUtensil}</h4>
                          <h3 className="text-white text-2xl font-bold mb-3">{utensilInfo.name}</h3>
                          <p className="text-white/80 text-sm mb-1">{text.cupType}</p>
                          <p className="text-white font-medium mb-3">{utensilInfo.cupType}</p>
                        </motion.div>
                        
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="bg-white/15 backdrop-blur-md rounded-xl p-4 w-full mb-4"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-white/80 text-xs">{text.materialType}</p>
                              <p className="text-white font-medium">{utensilInfo.material}</p>
                            </div>
                            <div>
                              <p className="text-white/80 text-xs">{text.heatResistance}</p>
                              <p className="text-white font-medium flex items-center">
                                <FaTemperatureHigh className="mr-1 text-[#fec9c3]" />
                                {utensilInfo.heatResistant}
                              </p>
                            </div>
                            <div>
                              <p className="text-white/80 text-xs">{text.dishwasherSafe}</p>
                              <p className="text-white font-medium">
                                {utensilInfo.dishwasherSafe ? text.yes : text.no}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                        
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="bg-white/15 backdrop-blur-md rounded-xl p-4 w-full mb-4"
                        >
                          <h4 className="text-white font-medium mb-2">{text.bestFor}</h4>
                          <div className="flex flex-wrap gap-2">
                            {utensilInfo.bestFor.map((use, index) => (
                              <div 
                                key={index} 
                                className="bg-white/20 px-3 py-1 rounded-full text-white text-sm"
                              >
                                {use}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                        
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="bg-white/15 backdrop-blur-md rounded-xl p-4 w-full mb-4"
                        >
                          <h4 className="text-white font-medium mb-2">{text.recommendedUses}</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {utensilInfo.recommendedUses.map((use, index) => (
                              <div 
                                key={index} 
                                className="bg-white/20 p-2 rounded-lg flex items-center"
                              >
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white mr-2">
                                  {getIconComponent(use.icon)}
                                </div>
                                <span className="text-white">{use.name}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                        
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="bg-white/15 backdrop-blur-md rounded-xl p-4 w-full mb-6"
                        >
                          <h4 className="text-white font-medium mb-2">{text.careInstructions}</h4>
                          <ul className="text-white space-y-2">
                            {utensilInfo.careInstructions.map((instruction, index) => (
                              <li key={index} className="text-sm flex items-start">
                                <span className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">•</span>
                                {instruction}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                        
                        <motion.button
                          className="w-full py-3 bg-[#e981a4] text-white rounded-lg font-medium text-lg flex items-center justify-center shadow-lg shadow-[#f4c5d7]/50 mb-4"
                          onClick={handleContinueToResults}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          {text.viewResults}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Results overlay */}
                <AnimatePresence>
                  {scanComplete && scanResults && (
                    <motion.div 
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="bg-gradient-to-b from-[#e981a4]/70 to-[#f9adb7]/70 w-full h-full absolute"></div>
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.1, type: "spring" }}
                          className="bg-white/20 backdrop-blur-md rounded-full px-5 py-2 mb-3"
                        >
                          <h3 className="text-white font-bold">{text.scanComplete}</h3>
                        </motion.div>
                        
                        {/* Tabs */}
                        <motion.div 
                          className="bg-white/15 backdrop-blur-md rounded-full p-1 flex mb-4"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {tabs.map(tab => (
                            <button
                              key={tab.id}
                              className={`py-2 px-4 rounded-full flex items-center ${
                                activeTab === tab.id 
                                  ? 'bg-white text-[#e981a4]' 
                                  : 'text-white'
                              }`}
                              onClick={() => setActiveTab(tab.id)}
                            >
                              <span className="mr-2">{tab.icon}</span>
                              <span>{text[tab.id]}</span>
                            </button>
                          ))}
                        </motion.div>
                        
                        {/* Results based on active tab */}
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white/15 backdrop-blur-md rounded-xl p-5 w-full mb-4"
                          >
                            {activeTab === 'volume' && (
                              <div className="text-center">
                                <h4 className="text-white text-lg font-medium mb-2">{text.capacity}</h4>
                                <p className="text-white text-4xl font-bold mb-1">
                                  {scanResults.volume.value}
                                  <span className="text-xl ml-1">{scanResults.volume.unit}</span>
                                </p>
                              </div>
                            )}
                            
                            {activeTab === 'dimensions' && (
                              <div className="flex justify-around">
                                <div className="text-center">
                                  <h4 className="text-white text-sm font-medium mb-1">{text.height}</h4>
                                  <p className="text-white text-3xl font-bold">
                                    {scanResults.height.value}
                                    <span className="text-lg ml-1">{scanResults.height.unit}</span>
                                  </p>
                                </div>
                                <div className="text-center">
                                  <h4 className="text-white text-sm font-medium mb-1">{text.diameter}</h4>
                                  <p className="text-white text-3xl font-bold">
                                    {scanResults.diameter.top}
                                    <span className="text-lg ml-1">{scanResults.diameter.unit}</span>
                                  </p>
                                </div>
                              </div>
                            )}
                            
                            {activeTab === 'weight' && (
                              <div>
                                <h4 className="text-white text-lg font-medium mb-3 text-center">{text.canHold}</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  {Object.entries(scanResults.weight).map(([ingredient, data]) => (
                                    <div key={ingredient} className="bg-white/20 p-3 rounded-lg">
                                      <p className="text-white text-xs capitalize mb-1">{ingredient}</p>
                                      <p className="text-white text-xl font-bold">
                                        {data.value}
                                        <span className="text-sm ml-1">{data.unit}</span>
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>
                        
                        <motion.button
                          className="bg-white/20 backdrop-blur-md text-white py-2 px-5 rounded-full mb-4 flex items-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          onClick={showDetails}
                        >
                          {text.viewDetails}
                          <FaArrowRight className="ml-2" />
                        </motion.button>
                        
                        <motion.button
                          className="text-white underline text-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          onClick={resetScan}
                        >
                          {text.scanAgain}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Controls */}
              {!isScanning && !scanComplete && !showUploadInfo && (
                <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
                  <motion.button
                    className="w-full sm:w-auto px-8 py-3 bg-[#e981a4] text-white rounded-lg font-medium text-lg flex items-center justify-center shadow-lg shadow-[#f4c5d7]/50"
                    onClick={startScan}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    <FaCamera className="mr-2" />
                    {text.scanButton}
                  </motion.button>
                  
                  <div className="flex items-center text-gray-500 w-full sm:w-auto justify-center">
                    <div className="h-px w-12 bg-gray-500/30 hidden sm:block"></div>
                    <span className="px-3">{text.or}</span>
                    <div className="h-px w-12 bg-gray-500/30 hidden sm:block"></div>
                  </div>
                  
                  <motion.button
                    className="w-full sm:w-auto px-6 py-3 bg-white text-[#e981a4] rounded-lg font-medium border border-[#e981a4] flex items-center justify-center"
                    onClick={handleUpload}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                  >
                    <FaUpload className="mr-2" />
                    {text.uploadButton}
                  </motion.button>
                  
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              )}
              
              {/* Reset button (when scanning/results are active) */}
              {(isScanning || scanComplete || showUploadInfo) && (
                <motion.button
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
                  onClick={resetScan}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <FaTimes />
                </motion.button>
              )}
            </motion.div>
          </motion.div>
          
          {/* Right side - Explainer */}
          <motion.div 
            className="w-full lg:w-5/12 lg:pt-4"
            variants={itemVariants}
          >
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-6">
              <motion.h3 
                className="text-2xl font-bold text-[#e981a4] mb-4"
                variants={itemVariants}
              >
                {text.explainerTitle}
              </motion.h3>
              
              <motion.ul
                className="space-y-4 mb-8"
                variants={containerVariants}
              >
                {[text.explainer1, text.explainer2, text.explainer3, text.explainer4].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    variants={itemVariants}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#e981a4] text-white flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </motion.li>
                ))}
              </motion.ul>
              
              <motion.div
                className="mb-6"
                variants={itemVariants}
              >
                <div className="flex items-center mb-3">
                  <h4 className="text-xl font-bold text-[#e981a4]">{text.howItWorks}</h4>
                  <div className="h-px flex-grow bg-[#e981a4]/20 ml-3"></div>
                </div>
                
                <div className="pl-6 border-l-2 border-[#e981a4]/20 space-y-4">
                  <div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-[#e981a4]/20 flex items-center justify-center text-[#e981a4] text-xs">
                        1
                      </div>
                      <p className="ml-3 text-gray-700 font-medium">{text.step1}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-[#e981a4]/20 flex items-center justify-center text-[#e981a4] text-xs">
                        2
                      </div>
                      <p className="ml-3 text-gray-700 font-medium">{text.step2}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-[#e981a4]/20 flex items-center justify-center text-[#e981a4] text-xs">
                        3
                      </div>
                      <p className="ml-3 text-gray-700 font-medium">{text.step3}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
              >
                <div className="flex items-center mb-3">
                  <h4 className="text-xl font-bold text-[#e981a4]">{text.howToUse}</h4>
                  <div className="h-px flex-grow bg-[#e981a4]/20 ml-3"></div>
                </div>
                
                <div className="bg-[#e981a4]/10 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#e981a4]">
                      <FaUtensils />
                    </div>
                    <p className="ml-3 text-gray-700">{text.useTip1}</p>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#e981a4]">
                      <FaBowlFood />
                    </div>
                    <p className="ml-3 text-gray-700">{text.useTip2}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#e981a4]">
                      <FaWeight />
                    </div>
                    <p className="ml-3 text-gray-700">{text.useTip3}</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="mt-6 flex justify-center"
                variants={itemVariants}
              >
                <button 
                  className="flex items-center text-[#e981a4] font-medium"
                  onClick={() => {}}
                >
                  <FaInfoCircle className="mr-2" />
                  {text.learnMore}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default UtensilScanner;