// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { HiPaperAirplane, HiOutlineEmojiHappy, HiOutlinePhotograph, HiMicrophone, HiOutlineTranslate, HiOutlineQuestionMarkCircle } from 'react-icons/hi';

// const ChatbotInterface = ({ language }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(true);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);
  
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const translations = {
//     en: {
//       title: "Ask Our AI Assistant",
//       placeholder: "Ask about ingredients, substitutions, or techniques...",
//       send: "Send",
//       welcome: "Hello! I'm your baking assistant. Ask me about ingredient substitutions, baking techniques, or recipe adjustments!",
//       typing: "Typing...",
//       suggestions: [
//         "How do I make gluten-free cookies?",
//         "What can I substitute for eggs?",
//         "How to fix a cake that's too dry?",
//         "Convert 350°F to Celsius"
//       ],
//       suggestionHeader: "Try asking about:",
//       darkMode: "Dark mode",
//       lightMode: "Light mode"
//     },
//     hi: {
//       title: "हमारे AI सहायक से पूछें",
//       placeholder: "सामग्री, विकल्प, या तकनीकों के बारे में पूछें...",
//       send: "भेजें",
//       welcome: "नमस्ते! मैं आपका बेकिंग सहायक हूँ। मुझसे सामग्री के विकल्प, बेकिंग तकनीक, या रेसिपी समायोजन के बारे में पूछें!",
//       typing: "टाइप कर रहा है...",
//       suggestions: [
//         "ग्लूटेन-फ्री कुकीज़ कैसे बनाएं?",
//         "अंडे के लिए क्या विकल्प हैं?",
//         "बहुत सूखे केक को कैसे ठीक करें?",
//         "350°F को सेल्सियस में बदलें"
//       ],
//       suggestionHeader: "इसके बारे में पूछें:",
//       darkMode: "डार्क मोड",
//       lightMode: "लाइट मोड"
//     }
//   };

//   const botResponses = {
//     en: [
//       "You can substitute butter with equal parts of vegetable oil, but the texture might be slightly different.",
//       "If you don't have all-purpose flour, you can use 50% whole wheat flour and 50% cake flour as a substitute.",
//       "For a vegan alternative to eggs in baking, try using 1/4 cup unsweetened applesauce for each egg.",
//       "To make your own buttermilk, add 1 tablespoon of lemon juice or vinegar to 1 cup of milk and let it sit for 5 minutes.",
//       "The ideal oven temperature for most cookies is between 350°F and 375°F (175°C to 190°C)."
//     ],
//     hi: [
//       "आप बटर को समान मात्रा में वनस्पति तेल से बदल सकते हैं, लेकिन बनावट थोड़ी अलग हो सकती है।",
//       "यदि आपके पास ऑल-परपस आटा नहीं है, तो आप विकल्प के रूप में 50% गेहूं का आटा और 50% केक आटा का उपयोग कर सकते हैं।",
//       "बेकिंग में अंडे के लिए वीगन विकल्प के लिए, प्रत्येक अंडे के लिए 1/4 कप बिना मीठे सेब के सॉस का प्रयोग करें।",
//       "अपना खुद का बटरमिल्क बनाने के लिए, 1 कप दूध में 1 बड़ा चम्मच नींबू का रस या सिरका डालें और इसे 5 मिनट के लिए रखें।",
//       "अधिकांश कुकीज़ के लिए आदर्श ओवन तापमान 350°F से 375°F (175°C से 190°C) के बीच होता है।"
//     ]
//   };

//   const text = translations[language];

//   useEffect(() => {
//     // Add welcome message when component mounts
//     if (messages.length === 0) {
//       setMessages([
//         { type: 'bot', text: text.welcome }
//       ]);
//     }
//   }, [language, messages.length, text.welcome]);

//   useEffect(() => {
//     // Scroll to bottom when messages change
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSend = () => {
//     if (input.trim() === '') return;
    
//     // Add user message
//     const userMessage = { type: 'user', text: input };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setInput('');
//     setIsTyping(true);
//     setShowSuggestions(false);
    
//     // Simulate bot response after delay
//     setTimeout(() => {
//       const randomIndex = Math.floor(Math.random() * botResponses[language].length);
//       const botMessage = { type: 'bot', text: botResponses[language][randomIndex] };
//       setMessages(prevMessages => [...prevMessages, botMessage]);
//       setIsTyping(false);
//     }, 1500);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSend();
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setInput(suggestion);
//     setTimeout(() => {
//       handleSend();
//     }, 300);
//   };

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   const focusInput = () => {
//     inputRef.current?.focus();
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { 
//         duration: 0.7,
//         when: "beforeChildren",
//         staggerChildren: 0.1
//       } 
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.5 }
//     }
//   };

//   const pulseAnimation = {
//     scale: [1, 1.03, 1],
//     transition: { duration: 2, repeat: Infinity }
//   };

//   return (
//     <section 
//       ref={ref} 
//       className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}
//     >
//       <div className="container mx-auto px-4">
//         <motion.h2 
//           className={`text-3xl font-bold text-center ${isDarkMode ? 'text-amber-400' : 'text-amber-700'} mb-12`}
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//           transition={{ duration: 0.6 }}
//         >
//           {text.title}
//         </motion.h2>
        
//         <motion.div 
//           variants={containerVariants}
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//           className={`max-w-2xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}
//           style={{ height: isExpanded ? '500px' : '450px' }}
//         >
//           <div className={`${isDarkMode ? 'bg-amber-600' : 'bg-amber-500'} py-3 px-4 transition-colors duration-300`}>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 bg-red-400 rounded-full mr-2"></motion.div>
//                 <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 bg-yellow-300 rounded-full mr-2"></motion.div>
//                 <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 bg-green-400 rounded-full"></motion.div>
//                 <div className="ml-4 text-white font-medium">BakEase Assistant</div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <motion.button 
//                   whileHover={{ scale: 1.1 }} 
//                   whileTap={{ scale: 0.9 }}
//                   onClick={toggleDarkMode} 
//                   className="text-white"
//                   title={isDarkMode ? text.lightMode : text.darkMode}
//                 >
//                   {isDarkMode ? '🌞' : '🌙'}
//                 </motion.button>
//                 <motion.button 
//                   whileHover={{ scale: 1.1 }} 
//                   whileTap={{ scale: 0.9 }}
//                   onClick={toggleExpand} 
//                   className="text-white"
//                 >
//                   {isExpanded ? '↓' : '↑'}
//                 </motion.button>
//               </div>
//             </div>
//           </div>
          
//           <div 
//             className={`${isExpanded ? 'h-96' : 'h-80'} overflow-y-auto p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} transition-colors duration-300`}
//             onClick={focusInput}
//           >
//             <AnimatePresence>
//               {messages.map((message, index) => (
//                 <motion.div 
//                   key={index}
//                   className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                   initial={{ opacity: 0, y: 15, scale: 0.95 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   transition={{ duration: 0.4, type: "spring" }}
//                 >
//                   <div 
//                     className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
//                       message.type === 'user' 
//                         ? `${isDarkMode ? 'bg-amber-600' : 'bg-amber-500'} text-white rounded-br-none`
//                         : `${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} shadow-sm rounded-bl-none`
//                     }`}
//                   >
//                     <p className="text-sm">{message.text}</p>
//                   </div>
//                 </motion.div>
//               ))}
              
//               {isTyping && (
//                 <motion.div 
//                   className="mb-4 flex justify-start"
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.95 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <div className={`${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-white border-gray-200 text-gray-500'} border rounded-lg rounded-bl-none px-4 py-2 shadow-sm`}>
//                     <div className="flex items-center space-x-1">
//                       <motion.div 
//                         className={`w-2 h-2 ${isDarkMode ? 'bg-gray-500' : 'bg-gray-300'} rounded-full`}
//                         animate={{ y: [0, -5, 0] }}
//                         transition={{ duration: 0.6, repeat: Infinity }}
//                       ></motion.div>
//                       <motion.div 
//                         className={`w-2 h-2 ${isDarkMode ? 'bg-gray-500' : 'bg-gray-300'} rounded-full`}
//                         animate={{ y: [0, -5, 0] }}
//                         transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
//                       ></motion.div>
//                       <motion.div 
//                         className={`w-2 h-2 ${isDarkMode ? 'bg-gray-500' : 'bg-gray-300'} rounded-full`}
//                         animate={{ y: [0, -5, 0] }}
//                         transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
//                       ></motion.div>
//                       <span className="text-xs ml-2">{text.typing}</span>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {showSuggestions && messages.length === 1 && (
//                 <motion.div
//                   className="my-6"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 1, duration: 0.5 }}
//                 >
//                   <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{text.suggestionHeader}</p>
//                   <div className="flex flex-wrap gap-2">
//                     {text.suggestions.map((suggestion, index) => (
//                       <motion.button
//                         key={index}
//                         variants={itemVariants}
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className={`text-sm px-3 py-1.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-amber-300 border border-gray-600 hover:bg-gray-600' : 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-50'}`}
//                         onClick={() => handleSuggestionClick(suggestion)}
//                       >
//                         {suggestion}
//                       </motion.button>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
              
//               <div ref={messagesEndRef} />
//             </AnimatePresence>
//           </div>
          
//           <div className={`p-3 border-t ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} transition-colors duration-300`}>
//             <motion.div 
//               className="flex items-center"
//               animate={!input.trim() ? pulseAnimation : {}}
//             >
//               <div className="flex items-center space-x-2 mr-2">
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   className={`p-1.5 rounded-full ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
//                 >
//                   <HiOutlineEmojiHappy className="h-5 w-5" />
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   className={`p-1.5 rounded-full ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
//                 >
//                   <HiMicrophone className="h-5 w-5" />
//                 </motion.button>
//               </div>
              
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder={text.placeholder}
//                 className={`flex-grow px-4 py-2 rounded-full focus:outline-none focus:ring-2 ${
//                   isDarkMode 
//                     ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-amber-500 border border-gray-600' 
//                     : 'bg-gray-100 text-gray-800 focus:ring-amber-500'
//                 }`}
//               />
              
//               <motion.button
//                 onClick={handleSend}
//                 disabled={input.trim() === ''}
//                 className={`ml-2 p-2 rounded-full ${
//                   input.trim() === '' 
//                     ? `${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'}`
//                     : `${isDarkMode ? 'bg-amber-600' : 'bg-amber-500'} text-white`
//                 }`}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <HiPaperAirplane className="h-5 w-5 transform rotate-90" />
//               </motion.button>
//             </motion.div>
//           </div>
//         </motion.div>
        
//         <motion.div 
//           className={`max-w-2xl mx-auto mt-8 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1 } : { opacity: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//         >
//           <motion.p whileHover={{ scale: 1.02 }}>
//             Our AI can help with ingredient substitutions, measurement conversions,<br />
//             troubleshooting, and general baking advice.
//           </motion.p>
          
//           <motion.div 
//             className="mt-6 flex justify-center space-x-8"
//             initial={{ opacity: 0 }}
//             animate={inView ? { opacity: 1 } : { opacity: 0 }}
//             transition={{ duration: 0.6, delay: 0.6 }}
//           >
//             <motion.div 
//               whileHover={{ y: -5 }}
//               className="flex flex-col items-center"
//             >
//               <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
//                 <HiOutlineQuestionMarkCircle className="h-6 w-6" />
//               </div>
//               <span className="mt-2 text-xs">Ask Questions</span>
//             </motion.div>
            
//             <motion.div 
//               whileHover={{ y: -5 }}
//               className="flex flex-col items-center"
//             >
//               <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
//                 <HiOutlinePhotograph className="h-6 w-6" />
//               </div>
//               <span className="mt-2 text-xs">Visual Recipes</span>
//             </motion.div>
            
//             <motion.div 
//               whileHover={{ y: -5 }}
//               className="flex flex-col items-center"
//             >
//               <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-800 text-amber-400' : 'bg-amber-100 text-amber-600'}`}>
//                 <HiOutlineTranslate className="h-6 w-6" />
//               </div>
//               <span className="mt-2 text-xs">Multiple Languages</span>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ChatbotInterface;

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiPaperAirplane, HiOutlineEmojiHappy, HiOutlinePhotograph, HiMicrophone, HiOutlineTranslate, HiOutlineQuestionMarkCircle } from 'react-icons/hi';

const ChatbotInterface = ({ language }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Custom color palette
  const colors = {
    lightPink: '#f4c5d7',
    mediumPink: '#f9adb7',
    peach: '#fec9c3',
    cream: '#fff',
    darkPink: '#e981a4',
  };
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const translations = {
    en: {
      title: "Ask Our AI Assistant",
      placeholder: "Ask about ingredients, substitutions, or techniques...",
      send: "Send",
      welcome: "Hello! I'm your baking assistant. Ask me about ingredient substitutions, baking techniques, or recipe adjustments!",
      typing: "Typing...",
      suggestions: [
        "How do I make gluten-free cookies?",
        "What can I substitute for eggs?",
        "How to fix a cake that's too dry?",
        "Convert 350°F to Celsius"
      ],
      suggestionHeader: "Try asking about:",
      darkMode: "Dark mode",
      lightMode: "Light mode"
    },
    hi: {
      title: "हमारे AI सहायक से पूछें",
      placeholder: "सामग्री, विकल्प, या तकनीकों के बारे में पूछें...",
      send: "भेजें",
      welcome: "नमस्ते! मैं आपका बेकिंग सहायक हूँ। मुझसे सामग्री के विकल्प, बेकिंग तकनीक, या रेसिपी समायोजन के बारे में पूछें!",
      typing: "टाइप कर रहा है...",
      suggestions: [
        "ग्लूटेन-फ्री कुकीज़ कैसे बनाएं?",
        "अंडे के लिए क्या विकल्प हैं?",
        "बहुत सूखे केक को कैसे ठीक करें?",
        "350°F को सेल्सियस में बदलें"
      ],
      suggestionHeader: "इसके बारे में पूछें:",
      darkMode: "डार्क मोड",
      lightMode: "लाइट मोड"
    }
  };

  const botResponses = {
    en: [
      "You can substitute butter with equal parts of vegetable oil, but the texture might be slightly different.",
      "If you don't have all-purpose flour, you can use 50% whole wheat flour and 50% cake flour as a substitute.",
      "For a vegan alternative to eggs in baking, try using 1/4 cup unsweetened applesauce for each egg.",
      "To make your own buttermilk, add 1 tablespoon of lemon juice or vinegar to 1 cup of milk and let it sit for 5 minutes.",
      "The ideal oven temperature for most cookies is between 350°F and 375°F (175°C to 190°C)."
    ],
    hi: [
      "आप बटर को समान मात्रा में वनस्पति तेल से बदल सकते हैं, लेकिन बनावट थोड़ी अलग हो सकती है।",
      "यदि आपके पास ऑल-परपस आटा नहीं है, तो आप विकल्प के रूप में 50% गेहूं का आटा और 50% केक आटा का उपयोग कर सकते हैं।",
      "बेकिंग में अंडे के लिए वीगन विकल्प के लिए, प्रत्येक अंडे के लिए 1/4 कप बिना मीठे सेब के सॉस का प्रयोग करें।",
      "अपना खुद का बटरमिल्क बनाने के लिए, 1 कप दूध में 1 बड़ा चम्मच नींबू का रस या सिरका डालें और इसे 5 मिनट के लिए रखें।",
      "अधिकांश कुकीज़ के लिए आदर्श ओवन तापमान 350°F से 375°F (175°C से 190°C) के बीच होता है।"
    ]
  };

  const text = translations[language];

  useEffect(() => {
    // Add welcome message when component mounts
    if (messages.length === 0) {
      setMessages([
        { type: 'bot', text: text.welcome }
      ]);
    }
  }, [language, messages.length, text.welcome]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = { type: 'user', text: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsTyping(true);
    setShowSuggestions(false);
    
    // Simulate bot response after delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * botResponses[language].length);
      const botMessage = { type: 'bot', text: botResponses[language][randomIndex] };
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setTimeout(() => {
      handleSend();
    }, 300);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7,
        when: "beforeChildren",
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.03, 1],
    transition: { duration: 2, repeat: Infinity }
  };

  return (
    <section 
      ref={ref} 
      className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}
      style={{ backgroundColor: isDarkMode ? '#333' : colors.cream }}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          style={{ color: isDarkMode ? colors.lightPink : colors.darkPink }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {text.title}
        </motion.h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-2xl mx-auto rounded-xl shadow-xl overflow-hidden border transition-all duration-300"
          style={{ 
            height: isExpanded ? '500px' : '450px',
            backgroundColor: isDarkMode ? '#444' : 'white',
            borderColor: isDarkMode ? '#555' : colors.lightPink
          }}
        >
          <div className="py-3 px-4 transition-colors duration-300" style={{ backgroundColor: colors.darkPink }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.peach }}></motion.div>
                <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors.cream }}></motion.div>
                <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.lightPink }}></motion.div>
                <div className="ml-4 text-white font-medium">BakEase Assistant</div>
              </div>
              <div className="flex items-center space-x-3">
                <motion.button 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleDarkMode} 
                  className="text-white"
                  title={isDarkMode ? text.lightMode : text.darkMode}
                >
                  {isDarkMode ? '🌞' : '🌙'}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleExpand} 
                  className="text-white"
                >
                  {isExpanded ? '↓' : '↑'}
                </motion.button>
              </div>
            </div>
          </div>
          
          <div 
            className={`${isExpanded ? 'h-96' : 'h-80'} overflow-y-auto p-4 transition-colors duration-300`}
            style={{ backgroundColor: isDarkMode ? '#444' : colors.cream }}
            onClick={focusInput}
          >
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div 
                  key={index}
                  className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, type: "spring" }}
                >
                  <div 
                    className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                      message.type === 'user' 
                        ? 'text-white rounded-br-none'
                        : `${isDarkMode ? 'text-gray-100' : 'text-gray-800'} border rounded-bl-none`
                    }`}
                    style={{ 
                      backgroundColor: message.type === 'user' 
                        ? colors.darkPink
                        : isDarkMode ? '#555' : 'white',
                      borderColor: isDarkMode ? '#666' : colors.lightPink
                    }}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  className="mb-4 flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="border rounded-lg rounded-bl-none px-4 py-2 shadow-sm"
                    style={{ 
                      backgroundColor: isDarkMode ? '#555' : 'white',
                      borderColor: isDarkMode ? '#666' : colors.lightPink,
                      color: isDarkMode ? '#ccc' : '#555'
                    }}
                  >
                    <div className="flex items-center space-x-1">
                      <motion.div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: isDarkMode ? '#777' : colors.mediumPink }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      ></motion.div>
                      <motion.div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: isDarkMode ? '#777' : colors.mediumPink }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      ></motion.div>
                      <motion.div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: isDarkMode ? '#777' : colors.mediumPink }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      ></motion.div>
                      <span className="text-xs ml-2">{text.typing}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {showSuggestions && messages.length === 1 && (
                <motion.div
                  className="my-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <p className="text-sm mb-2"
                    style={{ color: isDarkMode ? '#ccc' : '#555' }}
                  >{text.suggestionHeader}</p>
                  <div className="flex flex-wrap gap-2">
                    {text.suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-sm px-3 py-1.5 rounded-full border"
                        style={{ 
                          backgroundColor: isDarkMode ? '#555' : 'white',
                          borderColor: isDarkMode ? '#666' : colors.lightPink,
                          color: isDarkMode ? colors.lightPink : colors.darkPink
                        }}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </div>
          
          <div className="p-3 border-t transition-colors duration-300"
            style={{ 
              backgroundColor: isDarkMode ? '#444' : 'white',
              borderColor: isDarkMode ? '#555' : colors.lightPink
            }}
          >
            <motion.div 
              className="flex items-center"
              animate={!input.trim() ? pulseAnimation : {}}
            >
              <div className="flex items-center space-x-2 mr-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 rounded-full"
                  style={{ color: isDarkMode ? '#ccc' : colors.darkPink }}
                >
                  <HiOutlineEmojiHappy className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 rounded-full"
                  style={{ color: isDarkMode ? '#ccc' : colors.darkPink }}
                >
                  <HiMicrophone className="h-5 w-5" />
                </motion.button>
              </div>
              
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={text.placeholder}
                className="flex-grow px-4 py-2 rounded-full focus:outline-none focus:ring-2 border"
                style={{ 
                  backgroundColor: isDarkMode ? '#555' : colors.peach + '40',
                  color: isDarkMode ? 'white' : '#333',
                  borderColor: isDarkMode ? '#666' : colors.mediumPink,
                  placeholderColor: isDarkMode ? '#999' : '#777'
                }}
              />
              
              <motion.button
                onClick={handleSend}
                disabled={input.trim() === ''}
                className="ml-2 p-2 rounded-full"
                style={{ 
                  backgroundColor: input.trim() === '' 
                    ? (isDarkMode ? '#555' : colors.lightPink)
                    : colors.darkPink,
                  color: 'white'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiPaperAirplane className="h-5 w-5 transform rotate-90" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="max-w-2xl mx-auto mt-8 text-center text-sm"
          style={{ color: isDarkMode ? '#ccc' : '#555' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.p whileHover={{ scale: 1.02 }}>
            Our AI can help with ingredient substitutions, measurement conversions,<br />
            troubleshooting, and general baking advice.
          </motion.p>
          
          <motion.div 
            className="mt-6 flex justify-center space-x-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center"
            >
              <div className="p-3 rounded-full"
                style={{ 
                  backgroundColor: isDarkMode ? '#444' : colors.peach,
                  color: isDarkMode ? colors.lightPink : colors.darkPink
                }}
              >
                <HiOutlineQuestionMarkCircle className="h-6 w-6" />
              </div>
              <span className="mt-2 text-xs">Ask Questions</span>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center"
            >
              <div className="p-3 rounded-full"
                style={{ 
                  backgroundColor: isDarkMode ? '#444' : colors.peach,
                  color: isDarkMode ? colors.lightPink : colors.darkPink
                }}
              >
                <HiOutlinePhotograph className="h-6 w-6" />
              </div>
              <span className="mt-2 text-xs">Visual Recipes</span>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex flex-col items-center"
            >
              <div className="p-3 rounded-full"
                style={{ 
                  backgroundColor: isDarkMode ? '#444' : colors.peach,
                  color: isDarkMode ? colors.lightPink : colors.darkPink
                }}
              >
                <HiOutlineTranslate className="h-6 w-6" />
              </div>
              <span className="mt-2 text-xs">Multiple Languages</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatbotInterface;