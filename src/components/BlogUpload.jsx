// import React, { useState, useEffect } from 'react';
// import { Camera, Calendar, Tag, ChevronDown, ChevronUp, X, Plus, Save } from 'lucide-react';
// import BlogPostForm from './BlogPostForm';
// import { motion, AnimatePresence } from 'framer-motion';

// const BakeryBlogUpload = () => {
//   const [blogPost, setBlogPost] = useState({
//     title: '',
//     dishType: '',
//     ingredients: [''],
//     recipe: '',
//     storyBehind: '',
//     prepTime: '',
//     cookTime: '',
//     difficulty: 'medium',
//     tags: [],
//     images: [],
//     featuredImage: null,
//     isSpecial: false,
//     isDraft: true
//   });
  
//   const [previewMode, setPreviewMode] = useState(false);
//   const [notification, setNotification] = useState(null);
//   const [expandedSection, setExpandedSection] = useState('basic');
//   const [newTag, setNewTag] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [pageLoaded, setPageLoaded] = useState(false);
  
//   const dishTypes = ["Bread", "Pastry", "Cake", "Cookie", "Muffin", "Pie", "Special"];
//   const difficulties = ["easy", "medium", "challenging", "expert"];
  
//   useEffect(() => {
//     setPageLoaded(true);
//   }, []);
  
//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setBlogPost({
//       ...blogPost,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };
  
//   const handleIngredientChange = (index, value) => {
//     const updatedIngredients = [...blogPost.ingredients];
//     updatedIngredients[index] = value;
//     setBlogPost({
//       ...blogPost,
//       ingredients: updatedIngredients
//     });
//   };
  
//   const addIngredient = () => {
//     setBlogPost({
//       ...blogPost,
//       ingredients: [...blogPost.ingredients, '']
//     });
//   };
  
//   const removeIngredient = (index) => {
//     const updatedIngredients = [...blogPost.ingredients];
//     updatedIngredients.splice(index, 1);
//     setBlogPost({
//       ...blogPost,
//       ingredients: updatedIngredients
//     });
//   };
  
//   const handleAddTag = () => {
//     if (newTag.trim() && !blogPost.tags.includes(newTag.trim())) {
//       setBlogPost({
//         ...blogPost,
//         tags: [...blogPost.tags, newTag.trim()]
//       });
//       setNewTag('');
//     }
//   };
  
//   const handleRemoveTag = (tagToRemove) => {
//     setBlogPost({
//       ...blogPost,
//       tags: blogPost.tags.filter(tag => tag !== tagToRemove)
//     });
//   };
  
//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const fileNames = files.map(file => file.name);
    
//     setBlogPost({
//       ...blogPost,
//       images: [...blogPost.images, ...fileNames]
//     });
    
//     if (!blogPost.featuredImage && files.length > 0) {
//       setBlogPost(prev => ({
//         ...prev,
//         featuredImage: fileNames[0]
//       }));
//     }
//   };
  
//   const setFeaturedImage = (imageName) => {
//     setBlogPost({
//       ...blogPost,
//       featuredImage: imageName
//     });
//   };
  
//   const removeImage = (imageName) => {
//     const updatedImages = blogPost.images.filter(img => img !== imageName);
//     setBlogPost({
//       ...blogPost,
//       images: updatedImages,
//       featuredImage: blogPost.featuredImage === imageName ? 
//                     (updatedImages.length > 0 ? updatedImages[0] : null) : 
//                     blogPost.featuredImage
//     });
//   };
  
//   const toggleSection = (section) => {
//     setExpandedSection(expandedSection === section ? null : section);
//   };
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setShowSuccess(true);
//       setNotification({
//         type: 'success',
//         message: blogPost.isDraft ? 'Blog post saved as draft!' : 'Your delicious blog post has been published!'
//       });
      
//       setTimeout(() => {
//         setShowSuccess(false);
//         setNotification(null);
//       }, 3000);
//     }, 1500);
//   };
  
//   const togglePreviewMode = () => {
//     setPreviewMode(!previewMode);
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
//     >
//       <motion.div 
//         initial={{ backgroundColor: "#FEF3C7" }}
//         animate={{ backgroundColor: "#FEF3C7" }}
//         whileHover={{ backgroundColor: "#FCE7B6" }}
//         transition={{ duration: 0.3 }}
//         className="bg-amber-100 p-6 border-b border-amber-200"
//       >
//         <motion.h1 
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2, duration: 0.4 }}
//           className="text-3xl font-bold text-amber-800"
//         >
//           Share Your Bakery Creation
//         </motion.h1>
//         <motion.p 
//           initial={{ y: -10, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.4, duration: 0.4 }}
//           className="text-amber-700 mt-2"
//         >
//           Inspire others with your delicious recipes and stories
//         </motion.p>
//       </motion.div>
      
//       <AnimatePresence>
//         {notification && (
//           <motion.div 
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className={`p-4 overflow-hidden ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} flex items-center justify-between`}
//           >
//             <p>{notification.message}</p>
//             <button onClick={() => setNotification(null)} className="text-gray-500 hover:text-gray-700">
//               <X size={16} />
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
      
//       <div className="p-6">
//         <div className="mb-6 flex justify-end">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={togglePreviewMode}
//             className="bg-amber-500 text-white py-1 px-4 rounded-full text-sm"
//           >
//             {previewMode ? 'Edit Mode' : 'Preview'}
//           </motion.button>
//         </div>
        
//         {previewMode ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="bg-amber-50 p-6 rounded-lg"
//           >
//             <h2 className="text-2xl font-bold mb-4">{blogPost.title || 'Untitled Recipe'}</h2>
//             {blogPost.featuredImage && (
//               <div className="w-full h-64 bg-gray-200 mb-4 rounded flex items-center justify-center">
//                 <p className="text-gray-600">Featured Image: {blogPost.featuredImage}</p>
//               </div>
//             )}
//             <div className="mb-6">
//               <h3 className="font-bold text-lg mb-2">Ingredients:</h3>
//               <ul className="list-disc pl-5">
//                 {blogPost.ingredients.map((ingredient, index) => (
//                   ingredient.trim() && <li key={index}>{ingredient}</li>
//                 ))}
//               </ul>
//             </div>
//             <div className="mb-6">
//               <h3 className="font-bold text-lg mb-2">Recipe:</h3>
//               <p className="whitespace-pre-line">{blogPost.recipe}</p>
//             </div>
//             {blogPost.storyBehind && (
//               <div className="mb-6">
//                 <h3 className="font-bold text-lg mb-2">Story Behind:</h3>
//                 <p className="whitespace-pre-line">{blogPost.storyBehind}</p>
//               </div>
//             )}
//           </motion.div>
//         ) : (
//           <BlogPostForm 
//             blogPost={blogPost}
//             handleInputChange={handleInputChange}
//             handleIngredientChange={handleIngredientChange}
//             addIngredient={addIngredient}
//             removeIngredient={removeIngredient}
//             handleAddTag={handleAddTag}
//             handleRemoveTag={handleRemoveTag}
//             newTag={newTag}
//             setNewTag={setNewTag}
//             handleImageUpload={handleImageUpload}
//             setFeaturedImage={setFeaturedImage}
//             removeImage={removeImage}
//             toggleSection={toggleSection}
//             expandedSection={expandedSection}
//             dishTypes={dishTypes}
//             difficulties={difficulties}
//             handleSubmit={handleSubmit}
//             isSubmitting={isSubmitting}
//           />
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default BakeryBlogUpload;

import React, { useState, useEffect } from 'react';
import { Camera, Calendar, Tag, ChevronDown, ChevronUp, X, Plus, Save } from 'lucide-react';
import BlogPostForm from './BlogPostForm';
import { motion, AnimatePresence } from 'framer-motion';

const BakeryBlogUpload = () => {
  const [blogPost, setBlogPost] = useState({
    title: '',
    dishType: '',
    ingredients: [''],
    recipe: '',
    storyBehind: '',
    prepTime: '',
    cookTime: '',
    difficulty: 'medium',
    tags: [],
    images: [],
    featuredImage: null,
    isSpecial: false,
    isDraft: true
  });
  
  const [previewMode, setPreviewMode] = useState(false);
  const [notification, setNotification] = useState(null);
  const [expandedSection, setExpandedSection] = useState('basic');
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  
  const dishTypes = ["Bread", "Pastry", "Cake", "Cookie", "Muffin", "Pie", "Special"];
  const difficulties = ["easy", "medium", "challenging", "expert"];
  
  useEffect(() => {
    setPageLoaded(true);
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlogPost({
      ...blogPost,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...blogPost.ingredients];
    updatedIngredients[index] = value;
    setBlogPost({
      ...blogPost,
      ingredients: updatedIngredients
    });
  };
  
  const addIngredient = () => {
    setBlogPost({
      ...blogPost,
      ingredients: [...blogPost.ingredients, '']
    });
  };
  
  const removeIngredient = (index) => {
    const updatedIngredients = [...blogPost.ingredients];
    updatedIngredients.splice(index, 1);
    setBlogPost({
      ...blogPost,
      ingredients: updatedIngredients
    });
  };
  
  const handleAddTag = () => {
    if (newTag.trim() && !blogPost.tags.includes(newTag.trim())) {
      setBlogPost({
        ...blogPost,
        tags: [...blogPost.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove) => {
    setBlogPost({
      ...blogPost,
      tags: blogPost.tags.filter(tag => tag !== tagToRemove)
    });
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map(file => file.name);
    
    setBlogPost({
      ...blogPost,
      images: [...blogPost.images, ...fileNames]
    });
    
    if (!blogPost.featuredImage && files.length > 0) {
      setBlogPost(prev => ({
        ...prev,
        featuredImage: fileNames[0]
      }));
    }
  };
  
  const setFeaturedImage = (imageName) => {
    setBlogPost({
      ...blogPost,
      featuredImage: imageName
    });
  };
  
  const removeImage = (imageName) => {
    const updatedImages = blogPost.images.filter(img => img !== imageName);
    setBlogPost({
      ...blogPost,
      images: updatedImages,
      featuredImage: blogPost.featuredImage === imageName ? 
                    (updatedImages.length > 0 ? updatedImages[0] : null) : 
                    blogPost.featuredImage
    });
  };
  
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setNotification({
        type: 'success',
        message: blogPost.isDraft ? 'Blog post saved as draft!' : 'Your delicious blog post has been published!'
      });
      
      setTimeout(() => {
        setShowSuccess(false);
        setNotification(null);
      }, 3000);
    }, 1500);
  };
  
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <motion.div 
        initial={{ backgroundColor: "#f4c5d7" }}
        animate={{ backgroundColor: "#f4c5d7" }}
        whileHover={{ backgroundColor: "#f9adb7" }}
        transition={{ duration: 0.3 }}
        className="p-6 border-b border-pink-200"
      >
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-3xl font-bold text-pink-800"
        >
          Share Your Bakery Creation
        </motion.h1>
        <motion.p 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-pink-700 mt-2"
        >
          Inspire others with your delicious recipes and stories
        </motion.p>
      </motion.div>
      
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-4 overflow-hidden ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} flex items-center justify-between`}
          >
            <p>{notification.message}</p>
            <button onClick={() => setNotification(null)} className="text-gray-500 hover:text-gray-700">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="p-6" style={{ backgroundColor: "#faf2dd" }}>
        <div className="mb-6 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePreviewMode}
            style={{ backgroundColor: "#e981a4" }}
            className="text-white py-1 px-4 rounded-full text-sm"
          >
            {previewMode ? 'Edit Mode' : 'Preview'}
          </motion.button>
        </div>
        
        {previewMode ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ backgroundColor: "#fec9c3" }}
            className="p-6 rounded-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-pink-800">{blogPost.title || 'Untitled Recipe'}</h2>
            {blogPost.featuredImage && (
              <div className="w-full h-64 bg-gray-200 mb-4 rounded flex items-center justify-center">
                <p className="text-gray-600">Featured Image: {blogPost.featuredImage}</p>
              </div>
            )}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2 text-pink-800">Ingredients:</h3>
              <ul className="list-disc pl-5">
                {blogPost.ingredients.map((ingredient, index) => (
                  ingredient.trim() && <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2 text-pink-800">Recipe:</h3>
              <p className="whitespace-pre-line">{blogPost.recipe}</p>
            </div>
            {blogPost.storyBehind && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2 text-pink-800">Story Behind:</h3>
                <p className="whitespace-pre-line">{blogPost.storyBehind}</p>
              </div>
            )}
          </motion.div>
        ) : (
          <div style={{ backgroundColor: "#faf2dd" }}>
            <BlogPostForm 
              blogPost={blogPost}
              handleInputChange={handleInputChange}
              handleIngredientChange={handleIngredientChange}
              addIngredient={addIngredient}
              removeIngredient={removeIngredient}
              handleAddTag={handleAddTag}
              handleRemoveTag={handleRemoveTag}
              newTag={newTag}
              setNewTag={setNewTag}
              handleImageUpload={handleImageUpload}
              setFeaturedImage={setFeaturedImage}
              removeImage={removeImage}
              toggleSection={toggleSection}
              expandedSection={expandedSection}
              dishTypes={dishTypes}
              difficulties={difficulties}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              customColors={{
                header: "#f4c5d7",
                accent: "#e981a4",
                background: "#faf2dd",
                formSection: "#fec9c3",
                button: "#f9adb7",
                hoverButton: "#e981a4",
                tag: "#f9adb7",
                tagText: "#fff"
              }}
            />
          </div>
        )}
      </div>
      
      <div className="p-6 flex justify-between items-center" style={{ backgroundColor: "#fec9c3" }}>
        <button
          onClick={() => setNotification({ type: 'success', message: 'Post saved as draft!' })}
          className="text-pink-800 hover:text-pink-900"
        >
          Save Draft
        </button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{ backgroundColor: "#e981a4" }}
          className="flex items-center gap-2 text-white py-2 px-6 rounded-full"
        >
          {isSubmitting ? 'Publishing...' : 'Publish Post'}
          {!isSubmitting && <Save size={16} />}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BakeryBlogUpload;