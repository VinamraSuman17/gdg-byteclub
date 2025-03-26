// // import React, { useRef } from 'react';
// // import { motion } from 'framer-motion';
// // import { useInView } from 'react-intersection-observer';
// // import { Link } from 'react-router-dom';
// // import { HiUser, HiClock, HiHeart } from 'react-icons/hi';

// // const BlogSection = ({ language, openModal }) => {
// //   const carouselRef = useRef(null);
// //   const [ref, inView] = useInView({
// //     triggerOnce: true,
// //     threshold: 0.1,
// //   });

// //   const translations = {
// //     en: {
// //       title: "Top Food Blogs",
// //       viewAll: "View All",
// //       joinCommunity: "Join Our Community",
// //       blogs: [
// //         {
// //           title: "Perfect Sourdough Bread",
// //           author: "Jane Baker",
// //           time: "15 min read",
// //           likes: "2.4k",
// //           image: "https://i.pinimg.com/736x/c4/7c/c6/c47cc6ef37972edcf3ae605c92e744bd.jpg"
// //         },
// //         {
// //           title: "5 Common Baking Mistakes",
// //           author: "Mark Chef",
// //           time: "8 min read",
// //           likes: "1.9k",
// //           image: "https://i.pinimg.com/474x/e9/26/01/e9260100ea6b091e553421c0e6092284.jpg"
// //         },
// //         {
// //           title: "Vegan Chocolate Desserts",
// //           author: "Sarah Green",
// //           time: "12 min read",
// //           likes: "3.1k",
// //           image: "https://i.pinimg.com/474x/29/b4/09/29b409cffe4da412a42374f381710d10.jpg"
// //         },
// //         {
// //           title: "Gluten-Free Baking Guide",
// //           author: "Tom Health",
// //           time: "20 min read",
// //           likes: "1.7k",
// //           image: "https://i.pinimg.com/474x/b4/f5/68/b4f5684dd02aafe07557f907d0d78671.jpg"
// //         }
// //       ]
// //     },
// //     hi: {
// //       title: "टॉप फूड ब्लॉग्स",
// //       viewAll: "सभी देखें",
// //       joinCommunity: "हमारे समुदाय से जुड़ें",
// //       blogs: [
// //         {
// //           title: "परफेक्ट सरडो ब्रेड",
// //           author: "जेन बेकर",
// //           time: "15 मिनट पढ़ने के लिए",
// //           likes: "2.4k",
// //           image: "/api/placeholder/300/200"
// //         },
// //         {
// //           title: "5 आम बेकिंग गलतियां",
// //           author: "मार्क शेफ",
// //           time: "8 मिनट पढ़ने के लिए",
// //           likes: "1.9k",
// //           image: "/api/placeholder/300/200"
// //         },
// //         {
// //           title: "वीगन चॉकलेट डेसर्ट",
// //           author: "सारा ग्रीन",
// //           time: "12 मिनट पढ़ने के लिए",
// //           likes: "3.1k",
// //           image: "/api/placeholder/300/200"
// //         },
// //         {
// //           title: "ग्लूटेन-फ्री बेकिंग गाइड",
// //           author: "टॉम हेल्थ",
// //           time: "20 मिनट पढ़ने के लिए",
// //           likes: "1.7k",
// //           image: "/api/placeholder/300/200"
// //         }
// //       ]
// //     }
// //   };

// //   const text = translations[language];

// //   const handleBlogClick = (blog) => {
// //     const blogContent = {
// //       title: blog.title,
// //       body: (
// //         <div>
// //           <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-4" />
// //           <div className="flex items-center text-gray-500 text-sm mb-4">
// //             <span className="flex items-center mr-4"><HiUser className="mr-1" /> {blog.author}</span>
// //             <span className="flex items-center mr-4"><HiClock className="mr-1" /> {blog.time}</span>
// //             <span className="flex items-center"><HiHeart className="mr-1" /> {blog.likes}</span>
// //           </div>
// //           <p className="text-gray-700 mb-4">
// //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl vel nisl.
// //           </p>
// //           <p className="text-gray-700 mb-4">
// //             Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl vel nisl.
// //           </p>
// //           <h3 className="text-xl font-bold mb-2">Key Takeaways</h3>
// //           <ul className="list-disc pl-5 mb-4">
// //             <li>Start with quality ingredients for best results</li>
// //             <li>Maintain proper temperature throughout the process</li>
// //             <li>Practice patience - good baking takes time</li>
// //             <li>Don't be afraid to experiment with flavors</li>
// //           </ul>
// //         </div>
// //       )
// //     };
// //     openModal(blogContent);
// //   };

// //   return (
// //     <section ref={ref} className="py-20 bg-gradient-to-b from-amber-50 to-orange-100">
// //       <div className="container mx-auto px-4">
// //         <div className="flex justify-between items-center mb-12">
// //           <motion.h2 
// //             className="text-3xl font-bold text-amber-700"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
// //             transition={{ duration: 0.6 }}
// //           >
// //             {text.title}
// //           </motion.h2>
          
// //           <motion.button
// //             className="text-amber-600 hover:text-amber-700 font-medium"
// //             initial={{ opacity: 0 }}
// //             animate={inView ? { opacity: 1 } : { opacity: 0 }}
// //             transition={{ duration: 0.6, delay: 0.2 }}
// //           >
// //             {text.viewAll} →
// //           </motion.button>
// //         </div>
        
// //         <div 
// //           ref={carouselRef}
// //           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
// //         >
// //           {text.blogs.map((blog, index) => (
// //             <motion.div 
// //               key={index}
// //               className="bg-white rounded-xl overflow-hidden shadow-lg"
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
// //               transition={{ duration: 0.6, delay: index * 0.1 }}
// //               whileHover={{ y: -10, transition: { duration: 0.3 } }}
// //               onClick={() => handleBlogClick(blog)}
// //             >
// //               <div className="relative h-48">
// //                 <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
// //                 <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-2">
// //                   <HiHeart className="text-red-500" />
// //                 </div>
// //               </div>
// //               <div className="p-4">
// //                 <h3 className="font-bold text-lg text-amber-700 mb-2">{blog.title}</h3>
// //                 <div className="flex items-center text-gray-500 text-sm">
// //                   <span className="flex items-center mr-4"><HiUser className="mr-1" /> {blog.author}</span>
// //                   <span className="flex items-center"><HiClock className="mr-1" /> {blog.time}</span>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
        
// //         <motion.div 
// //           className="mt-16 flex justify-center"
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
// //           transition={{ duration: 0.6, delay: 0.5 }}
// //         >
// //           <Link to="/community">
// //             <motion.button
// //               className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //             >
// //               <span>{text.joinCommunity}</span>
// //               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
// //                 <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
// //               </svg>
// //             </motion.button>
// //           </Link>
// //         </motion.div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default BlogSection;

// import React, { useRef, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { Link } from 'react-router-dom';
// import { HiUser, HiClock, HiHeart, HiChevronLeft, HiChevronRight, HiOutlineBookmark, HiOutlineShare, HiOutlineFilter } from 'react-icons/hi';

// const BlogSection = ({ language, openModal }) => {
//   const carouselRef = useRef(null);
//   const [currentCategory, setCurrentCategory] = useState('all');
//   const [hoveredBlog, setHoveredBlog] = useState(null);
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const translations = {
//     en: {
//       title: "Top Food Blogs",
//       viewAll: "View All",
//       joinCommunity: "Join Our Community",
//       categories: ["All", "Bread", "Desserts", "Healthy", "Vegan"],
//       readMore: "Read More",
//       popularTags: "Popular Tags",
//       tags: ["#sourdough", "#vegan", "#glutenfree", "#chocolate"],
//       blogs: [
//         {
//           title: "Perfect Sourdough Bread",
//           author: "Jane Baker",
//           time: "15 min read",
//           likes: "2.4k",
//           image: "https://i.pinimg.com/736x/c4/7c/c6/c47cc6ef37972edcf3ae605c92e744bd.jpg",
//           category: "bread",
//           excerpt: "Master the art of baking delicious sourdough bread with these expert tips..."
//         },
//         {
//           title: "5 Common Baking Mistakes",
//           author: "Mark Chef",
//           time: "8 min read",
//           likes: "1.9k",
//           image: "https://i.pinimg.com/474x/e9/26/01/e9260100ea6b091e553421c0e6092284.jpg",
//           category: "desserts",
//           excerpt: "Avoid these common pitfalls to ensure your baked goods come out perfect every time..."
//         },
//         {
//           title: "Vegan Chocolate Desserts",
//           author: "Sarah Green",
//           time: "12 min read",
//           likes: "3.1k",
//           image: "https://i.pinimg.com/474x/29/b4/09/29b409cffe4da412a42374f381710d10.jpg",
//           category: "vegan",
//           excerpt: "Indulge in these decadent chocolate desserts that are completely plant-based..."
//         },
//         {
//           title: "Gluten-Free Baking Guide",
//           author: "Tom Health",
//           time: "20 min read",
//           likes: "1.7k",
//           image: "https://i.pinimg.com/474x/b4/f5/68/b4f5684dd02aafe07557f907d0d78671.jpg",
//           category: "healthy",
//           excerpt: "Everything you need to know about gluten-free flours and baking techniques..."
//         }
//       ]
//     },
//     hi: {
//       title: "टॉप फूड ब्लॉग्स",
//       viewAll: "सभी देखें",
//       joinCommunity: "हमारे समुदाय से जुड़ें",
//       categories: ["सभी", "ब्रेड", "मिठाई", "स्वस्थ", "वीगन"],
//       readMore: "और पढ़ें",
//       popularTags: "लोकप्रिय टैग",
//       tags: ["#सरडो", "#वीगन", "#ग्लूटेनफ्री", "#चॉकलेट"],
//       blogs: [
//         {
//           title: "परफेक्ट सरडो ब्रेड",
//           author: "जेन बेकर",
//           time: "15 मिनट पढ़ने के लिए",
//           likes: "2.4k",
//           image: "/api/placeholder/300/200",
//           category: "bread",
//           excerpt: "इन विशेषज्ञ युक्तियों के साथ स्वादिष्ट सरडो ब्रेड बनाने की कला में महारत हासिल करें..."
//         },
//         {
//           title: "5 आम बेकिंग गलतियां",
//           author: "मार्क शेफ",
//           time: "8 मिनट पढ़ने के लिए",
//           likes: "1.9k",
//           image: "/api/placeholder/300/200",
//           category: "desserts",
//           excerpt: "इन सामान्य गलतियों से बचें ताकि आपके बेक किए गए व्यंजन हर बार परफेक्ट बनें..."
//         },
//         {
//           title: "वीगन चॉकलेट डेसर्ट",
//           author: "सारा ग्रीन",
//           time: "12 मिनट पढ़ने के लिए",
//           likes: "3.1k",
//           image: "/api/placeholder/300/200",
//           category: "vegan",
//           excerpt: "इन स्वादिष्ट चॉकलेट डेसर्ट का आनंद लें जो पूरी तरह से पौधे-आधारित हैं..."
//         },
//         {
//           title: "ग्लूटेन-फ्री बेकिंग गाइड",
//           author: "टॉम हेल्थ",
//           time: "20 मिनट पढ़ने के लिए",
//           likes: "1.7k",
//           image: "/api/placeholder/300/200",
//           category: "healthy",
//           excerpt: "ग्लूटेन-फ्री आटे और बेकिंग तकनीकों के बारे में आपको जो कुछ भी जानने की जरूरत है..."
//         }
//       ]
//     }
//   };

//   const text = translations[language];

//   const handleBlogClick = (blog) => {
//     const blogContent = {
//       title: blog.title,
//       body: (
//         <div>
//           <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-4" />
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center text-gray-500 text-sm">
//               <span className="flex items-center mr-4"><HiUser className="mr-1" /> {blog.author}</span>
//               <span className="flex items-center mr-4"><HiClock className="mr-1" /> {blog.time}</span>
//               <span className="flex items-center"><HiHeart className="mr-1" /> {blog.likes}</span>
//             </div>
//             <div className="flex space-x-2">
//               <motion.button 
//                 whileHover={{ scale: 1.1 }} 
//                 whileTap={{ scale: 0.9 }}
//                 className="p-2 bg-amber-100 rounded-full text-amber-600"
//               >
//                 <HiOutlineBookmark />
//               </motion.button>
//               <motion.button 
//                 whileHover={{ scale: 1.1 }} 
//                 whileTap={{ scale: 0.9 }}
//                 className="p-2 bg-amber-100 rounded-full text-amber-600"
//               >
//                 <HiOutlineShare />
//               </motion.button>
//             </div>
//           </div>
//           <p className="text-gray-700 mb-4">
//             {blog.excerpt} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl vel nisl.
//           </p>
//           <p className="text-gray-700 mb-4">
//             Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl vel nisl.
//           </p>
//           <h3 className="text-xl font-bold mb-2">Key Takeaways</h3>
//           <ul className="list-disc pl-5 mb-4">
//             <li>Start with quality ingredients for best results</li>
//             <li>Maintain proper temperature throughout the process</li>
//             <li>Practice patience - good baking takes time</li>
//             <li>Don't be afraid to experiment with flavors</li>
//           </ul>
//           <div className="mt-6 flex flex-wrap gap-2">
//             {text.tags.map((tag, i) => (
//               <span key={i} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">{tag}</span>
//             ))}
//           </div>
//         </div>
//       )
//     };
//     openModal(blogContent);
//   };

//   const filteredBlogs = currentCategory === 'all' 
//     ? text.blogs 
//     : text.blogs.filter(blog => blog.category === currentCategory);

//   const scrollLeft = () => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
//     }
//   };

//   const scrollRight = () => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
//     }
//   };

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
//     visible: { opacity: 1, y: 0 }
//   };

//   return (
//     <section ref={ref} className="py-20 bg-gradient-to-b from-amber-50 to-orange-100">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <motion.h2 
//             className="text-3xl font-bold text-amber-700 mb-4 md:mb-0"
//             initial={{ opacity: 0, y: 20 }}
//             animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//             transition={{ duration: 0.6 }}
//           >
//             {text.title}
//           </motion.h2>
          
//           <motion.div
//             className="flex items-center"
//             initial={{ opacity: 0 }}
//             animate={inView ? { opacity: 1 } : { opacity: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <motion.div
//               className="relative flex items-center mr-4"
//               whileHover={{ scale: 1.05 }}
//             >
//               <HiOutlineFilter className="absolute left-3 text-amber-500" />
//               <select 
//                 className="appearance-none bg-white border border-amber-200 text-amber-700 py-2 pl-10 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
//                 onChange={(e) => setCurrentCategory(e.target.value.toLowerCase())}
//               >
//                 {text.categories.map((category, i) => (
//                   <option key={i} value={i === 0 ? 'all' : category.toLowerCase()}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-amber-700">
//                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
//                 </svg>
//               </div>
//             </motion.div>
            
//             <motion.button
//               className="text-amber-600 hover:text-amber-700 font-medium flex items-center"
//               whileHover={{ scale: 1.05 }}
//             >
//               <span>{text.viewAll}</span>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//               </svg>
//             </motion.button>
//           </motion.div>
//         </div>

//         <motion.div className="mb-6 flex flex-wrap gap-2 justify-center"
//           variants={containerVariants}
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//         >
//           {text.tags.map((tag, index) => (
//             <motion.span 
//               key={index}
//               variants={itemVariants}
//               className="px-3 py-1 bg-white text-amber-700 rounded-full text-sm shadow-sm cursor-pointer hover:bg-amber-100 transition-colors"
//               whileHover={{ 
//                 scale: 1.05,
//                 backgroundColor: "#FEF3C7", 
//                 transition: { duration: 0.2 } 
//               }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {tag}
//             </motion.span>
//           ))}
//         </motion.div>
        
//         <div className="relative">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={inView ? { opacity: 1 } : { opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10"
//           >
//             <motion.button
//               onClick={scrollLeft}
//               className="bg-white p-2 rounded-full shadow-lg text-amber-600 hover:text-amber-700"
//               whileHover={{ scale: 1.1, backgroundColor: "#FEF3C7" }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <HiChevronLeft className="w-6 h-6" />
//             </motion.button>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={inView ? { opacity: 1 } : { opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10"
//           >
//             <motion.button
//               onClick={scrollRight}
//               className="bg-white p-2 rounded-full shadow-lg text-amber-600 hover:text-amber-700"
//               whileHover={{ scale: 1.1, backgroundColor: "#FEF3C7" }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <HiChevronRight className="w-6 h-6" />
//             </motion.button>
//           </motion.div>
        
//           <div 
//             ref={carouselRef}
//             className="flex space-x-6 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 pb-4 hide-scrollbar"
//             style={{ scrollBehavior: 'smooth' }}
//           >
//             <AnimatePresence>
//               {filteredBlogs.map((blog, index) => (
//                 <motion.div 
//                   key={blog.title}
//                   layout
//                   className="bg-white rounded-xl overflow-hidden shadow-lg min-w-[280px] md:min-w-0"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   whileHover={{ 
//                     y: -10, 
//                     transition: { duration: 0.3 },
//                     boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
//                   }}
//                   onClick={() => handleBlogClick(blog)}
//                   onMouseEnter={() => setHoveredBlog(blog.title)}
//                   onMouseLeave={() => setHoveredBlog(null)}
//                 >
//                   <div className="relative h-48 overflow-hidden">
//                     <motion.img 
//                       src={blog.image} 
//                       alt={blog.title} 
//                       className="w-full h-full object-cover"
//                       animate={{ 
//                         scale: hoveredBlog === blog.title ? 1.05 : 1 
//                       }}
//                       transition={{ duration: 0.5 }}
//                     />
//                     <motion.div 
//                       className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
//                       initial={{ opacity: 0 }}
//                       animate={{ 
//                         opacity: hoveredBlog === blog.title ? 1 : 0
//                       }}
//                       transition={{ duration: 0.3 }}
//                     />
//                     <motion.div
//                       className="absolute bottom-0 left-0 right-0 p-4 text-white"
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ 
//                         opacity: hoveredBlog === blog.title ? 1 : 0,
//                         y: hoveredBlog === blog.title ? 0 : 20
//                       }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <motion.button
//                         className="px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-sm font-medium transition-colors"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleBlogClick(blog);
//                         }}
//                       >
//                         {text.readMore}
//                       </motion.button>
//                     </motion.div>
//                     <div className="absolute top-3 right-3 flex space-x-2">
//                       <motion.div 
//                         className="bg-white bg-opacity-90 rounded-full p-2 flex items-center"
//                         whileHover={{ scale: 1.2 }}
//                         whileTap={{ scale: 0.9 }}
//                       >
//                         <HiHeart className="text-red-500" />
//                         <span className="text-xs ml-1 font-medium">{blog.likes}</span>
//                       </motion.div>
//                       <motion.div 
//                         className="bg-white bg-opacity-90 rounded-full p-2"
//                         whileHover={{ scale: 1.2 }}
//                         whileTap={{ scale: 0.9 }}
//                       >
//                         <HiOutlineBookmark className="text-amber-500" />
//                       </motion.div>
//                     </div>
//                   </div>
//                   <div className="p-4">
//                     <div className="mb-1">
//                       <span className="text-xs font-medium px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
//                         {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
//                       </span>
//                     </div>
//                     <h3 className="font-bold text-lg text-amber-700 mb-2">{blog.title}</h3>
//                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">{blog.excerpt}</p>
//                     <div className="flex items-center justify-between text-gray-500 text-xs">
//                       <span className="flex items-center"><HiUser className="mr-1" /> {blog.author}</span>
//                       <span className="flex items-center"><HiClock className="mr-1" /> {blog.time}</span>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>
        
//         <motion.div 
//           className="mt-16 flex flex-col items-center"
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//           transition={{ duration: 0.6, delay: 0.5 }}
//         >
//           <motion.div
//             className="bg-white p-6 rounded-xl shadow-lg mb-8 max-w-lg w-full text-center"
//             initial={{ scale: 0.9 }}
//             whileInView={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 200, damping: 15 }}
//           >
//             <h3 className="text-xl font-bold text-amber-700 mb-4">
//               {text.joinCommunity}
//             </h3>
//             <p className="text-gray-600 mb-6">Join thousands of baking enthusiasts and share your recipes, tips, and culinary creations!</p>
//             <Link to="/community">
//               <motion.button
//                 className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto"
//                 whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <span>{text.joinCommunity}</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//                 </svg>
//               </motion.button>
//             </Link>
//           </motion.div>
//         </motion.div>
//       </div>
      
//       <style jsx>{`
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;  
//           overflow: hidden;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default BlogSection;

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { HiUser, HiClock, HiHeart, HiChevronLeft, HiChevronRight, HiOutlineBookmark, HiOutlineShare, HiOutlineFilter } from 'react-icons/hi';

const BlogSection = ({ language, openModal }) => {
  const carouselRef = useRef(null);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [hoveredBlog, setHoveredBlog] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Color scheme
  const colors = {
    primary: '#e981a4',       // Deep pink - primary accent
    secondary: '#f9adb7',     // Light pink - secondary accent
    tertiary: '#f4c5d7',      // Softer pink - background and subtle elements
    light: '#faf2dd',         // Cream - text background and cards
    highlight: '#fec9c3',     // Peach - highlights and hover states
    text: '#832147',          // Dark pink - for text
    lightText: '#ba4775',     // Medium pink - for secondary text
  };

  const translations = {
    en: {
      title: "Top Food Blogs",
      viewAll: "View All",
      joinCommunity: "Join Our Community",
      categories: ["All", "Bread", "Desserts", "Healthy", "Vegan"],
      readMore: "Read More",
      popularTags: "Popular Tags",
      tags: ["#sourdough", "#vegan", "#glutenfree", "#chocolate"],
      blogs: [
        {
          title: "Perfect Sourdough Bread",
          author: "Jane Baker",
          time: "15 min read",
          likes: "2.4k",
          image: "https://i.pinimg.com/736x/c4/7c/c6/c47cc6ef37972edcf3ae605c92e744bd.jpg",
          category: "bread",
          excerpt: "Master the art of baking delicious sourdough bread with these expert tips..."
        },
        {
          title: "5 Common Baking Mistakes",
          author: "Mark Chef",
          time: "8 min read",
          likes: "1.9k",
          image: "https://i.pinimg.com/474x/e9/26/01/e9260100ea6b091e553421c0e6092284.jpg",
          category: "desserts",
          excerpt: "Avoid these common pitfalls to ensure your baked goods come out perfect every time..."
        },
        {
          title: "Vegan Chocolate Desserts",
          author: "Sarah Green",
          time: "12 min read",
          likes: "3.1k",
          image: "https://i.pinimg.com/474x/29/b4/09/29b409cffe4da412a42374f381710d10.jpg",
          category: "vegan",
          excerpt: "Indulge in these decadent chocolate desserts that are completely plant-based..."
        },
        {
          title: "Gluten-Free Baking Guide",
          author: "Tom Health",
          time: "20 min read",
          likes: "1.7k",
          image: "https://i.pinimg.com/474x/b4/f5/68/b4f5684dd02aafe07557f907d0d78671.jpg",
          category: "healthy",
          excerpt: "Everything you need to know about gluten-free flours and baking techniques..."
        }
      ]
    },
    hi: {
      title: "टॉप फूड ब्लॉग्स",
      viewAll: "सभी देखें",
      joinCommunity: "हमारे समुदाय से जुड़ें",
      categories: ["सभी", "ब्रेड", "मिठाई", "स्वस्थ", "वीगन"],
      readMore: "और पढ़ें",
      popularTags: "लोकप्रिय टैग",
      tags: ["#सरडो", "#वीगन", "#ग्लूटेनफ्री", "#चॉकलेट"],
      blogs: [
        {
          title: "परफेक्ट सरडो ब्रेड",
          author: "जेन बेकर",
          time: "15 मिनट पढ़ने के लिए",
          likes: "2.4k",
          image: "/api/placeholder/300/200",
          category: "bread",
          excerpt: "इन विशेषज्ञ युक्तियों के साथ स्वादिष्ट सरडो ब्रेड बनाने की कला में महारत हासिल करें..."
        },
        {
          title: "5 आम बेकिंग गलतियां",
          author: "मार्क शेफ",
          time: "8 मिनट पढ़ने के लिए",
          likes: "1.9k",
          image: "/api/placeholder/300/200",
          category: "desserts",
          excerpt: "इन सामान्य गलतियों से बचें ताकि आपके बेक किए गए व्यंजन हर बार परफेक्ट बनें..."
        },
        {
          title: "वीगन चॉकलेट डेसर्ट",
          author: "सारा ग्रीन",
          time: "12 मिनट पढ़ने के लिए",
          likes: "3.1k",
          image: "/api/placeholder/300/200",
          category: "vegan",
          excerpt: "इन स्वादिष्ट चॉकलेट डेसर्ट का आनंद लें जो पूरी तरह से पौधे-आधारित हैं..."
        },
        {
          title: "ग्लूटेन-फ्री बेकिंग गाइड",
          author: "टॉम हेल्थ",
          time: "20 मिनट पढ़ने के लिए",
          likes: "1.7k",
          image: "/api/placeholder/300/200",
          category: "healthy",
          excerpt: "ग्लूटेन-फ्री आटे और बेकिंग तकनीकों के बारे में आपको जो कुछ भी जानने की जरूरत है..."
        }
      ]
    }
  };

  const text = translations[language];

  const handleBlogClick = (blog) => {
    const blogContent = {
      title: blog.title,
      body: (
        <div>
          <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-4" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-gray-600 text-sm">
              <span className="flex items-center mr-4"><HiUser className="mr-1" /> {blog.author}</span>
              <span className="flex items-center mr-4"><HiClock className="mr-1" /> {blog.time}</span>
              <span className="flex items-center"><HiHeart className="mr-1" /> {blog.likes}</span>
            </div>
            <div className="flex space-x-2">
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full"
                style={{ backgroundColor: colors.tertiary, color: colors.text }}
              >
                <HiOutlineBookmark />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full"
                style={{ backgroundColor: colors.tertiary, color: colors.text }}
              >
                <HiOutlineShare />
              </motion.button>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            {blog.excerpt} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl vel nisl.
          </p>
          <p className="text-gray-700 mb-4">
            Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, nec aliquet nisl nisl vel nisl.
          </p>
          <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>Key Takeaways</h3>
          <ul className="list-disc pl-5 mb-4 text-gray-700">
            <li>Start with quality ingredients for best results</li>
            <li>Maintain proper temperature throughout the process</li>
            <li>Practice patience - good baking takes time</li>
            <li>Don't be afraid to experiment with flavors</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {text.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-3 py-1 rounded-full text-sm"
                style={{ backgroundColor: colors.tertiary, color: colors.text }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )
    };
    openModal(blogContent);
  };

  const filteredBlogs = currentCategory === 'all' 
    ? text.blogs 
    : text.blogs.filter(blog => blog.category === currentCategory);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
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
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      ref={ref} 
      className="py-20"
      style={{ background: `linear-gradient(to bottom, ${colors.tertiary}, ${colors.highlight})` }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <motion.h2 
            className="text-3xl font-bold mb-4 md:mb-0"
            style={{ color: colors.text }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {text.title}
          </motion.h2>
          
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="relative flex items-center mr-4"
              whileHover={{ scale: 1.05 }}
            >
              <HiOutlineFilter className="absolute left-3" style={{ color: colors.primary }} />
              <select 
                className="appearance-none border py-2 pl-10 pr-8 rounded-lg focus:outline-none focus:ring-2"
                style={{ 
                  backgroundColor: colors.light, 
                  borderColor: colors.secondary,
                  color: colors.text,
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                }}
                onChange={(e) => setCurrentCategory(e.target.value.toLowerCase())}
              >
                {text.categories.map((category, i) => (
                  <option key={i} value={i === 0 ? 'all' : category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2" style={{ color: colors.text }}>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </motion.div>
            
            <motion.button
              className="font-medium flex items-center"
              style={{ color: colors.text }}
              whileHover={{ scale: 1.05 }}
            >
              <span>{text.viewAll}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </motion.div>
        </div>

        <motion.div className="mb-6 flex flex-wrap gap-2 justify-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {text.tags.map((tag, index) => (
            <motion.span 
              key={index}
              variants={itemVariants}
              className="px-3 py-1 rounded-full text-sm shadow-sm cursor-pointer transition-colors"
              style={{ 
                backgroundColor: colors.light, 
                color: colors.text,
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: colors.secondary, 
                transition: { duration: 0.2 } 
              }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
        
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10"
          >
            <motion.button
              onClick={scrollLeft}
              className="p-2 rounded-full shadow-lg"
              style={{ backgroundColor: colors.light, color: colors.primary }}
              whileHover={{ scale: 1.1, backgroundColor: colors.secondary }}
              whileTap={{ scale: 0.95 }}
            >
              <HiChevronLeft className="w-6 h-6" />
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10"
          >
            <motion.button
              onClick={scrollRight}
              className="p-2 rounded-full shadow-lg"
              style={{ backgroundColor: colors.light, color: colors.primary }}
              whileHover={{ scale: 1.1, backgroundColor: colors.secondary }}
              whileTap={{ scale: 0.95 }}
            >
              <HiChevronRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        
          <div 
            ref={carouselRef}
            className="flex space-x-6 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 pb-4 hide-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            <AnimatePresence>
              {filteredBlogs.map((blog, index) => (
                <motion.div 
                  key={blog.title}
                  layout
                  className="rounded-xl overflow-hidden shadow-lg min-w-[280px] md:min-w-0"
                  style={{ backgroundColor: colors.light }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10, 
                    transition: { duration: 0.3 },
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  onClick={() => handleBlogClick(blog)}
                  onMouseEnter={() => setHoveredBlog(blog.title)}
                  onMouseLeave={() => setHoveredBlog(null)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover"
                      animate={{ 
                        scale: hoveredBlog === blog.title ? 1.05 : 1 
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t"
                      style={{ 
                        background: `linear-gradient(to top, rgba(233, 129, 164, 0.7), transparent)` 
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: hoveredBlog === blog.title ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: hoveredBlog === blog.title ? 1 : 0,
                        y: hoveredBlog === blog.title ? 0 : 20
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.button
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        style={{ backgroundColor: colors.primary }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBlogClick(blog);
                        }}
                      >
                        {text.readMore}
                      </motion.button>
                    </motion.div>
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <motion.div 
                        className="bg-opacity-90 rounded-full p-2 flex items-center"
                        style={{ backgroundColor: `${colors.light}E6` }} // E6 for 90% opacity
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <HiHeart className="text-pink-500" />
                        <span className="text-xs ml-1 font-medium" style={{ color: colors.text }}>{blog.likes}</span>
                      </motion.div>
                      <motion.div 
                        className="bg-opacity-90 rounded-full p-2"
                        style={{ backgroundColor: `${colors.light}E6` }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <HiOutlineBookmark style={{ color: colors.primary }} />
                      </motion.div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-1">
                      <span 
                        className="text-xs font-medium px-2 py-1 rounded-full"
                        style={{ backgroundColor: colors.tertiary, color: colors.text }}
                      >
                        {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
                      </span>
                    </div>
                    <h3 
                      className="font-bold text-lg mb-2" 
                      style={{ color: colors.text }}
                    >
                      {blog.title}
                    </h3>
                    <p 
                      className="text-sm mb-3 line-clamp-2" 
                      style={{ color: colors.lightText }}
                    >
                      {blog.excerpt}
                    </p>
                    <div 
                      className="flex items-center justify-between text-xs"
                      style={{ color: colors.lightText }}
                    >
                      <span className="flex items-center"><HiUser className="mr-1" /> {blog.author}</span>
                      <span className="flex items-center"><HiClock className="mr-1" /> {blog.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        <motion.div 
          className="mt-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            className="p-6 rounded-xl shadow-lg mb-8 max-w-lg w-full text-center"
            style={{ 
              backgroundColor: colors.light,
              backgroundImage: `radial-gradient(circle at top right, ${colors.highlight}, transparent 70%), radial-gradient(circle at bottom left, ${colors.tertiary}, transparent 70%)`
            }}
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <h3 
              className="text-xl font-bold mb-4"
              style={{ color: colors.text }}
            >
              {text.joinCommunity}
            </h3>
            <p 
              className="mb-6"
              style={{ color: colors.lightText }}
            >
              Join thousands of baking enthusiasts and share your recipes, tips, and culinary creations!
            </p>
            <Link to="/community">
              <motion.button
                className="px-8 py-4 text-white rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto"
                style={{ backgroundColor: colors.primary }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  backgroundColor: '#d96b92' // Darker shade for hover
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{text.joinCommunity}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default BlogSection;