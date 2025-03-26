import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Community = ({ language }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Jane Baker",
      avatar: "/api/placeholder/40/40",
      content: "Just tried a new sourdough recipe and it turned out amazing! Has anyone experimented with adding herbs to their sourdough?",
      image: "/api/placeholder/400/300",
      likes: 24,
      comments: 7,
      time: "2 hours ago"
    },
    {
      id: 2,
      author: "Mark Chef",
      avatar: "/api/placeholder/40/40",
      content: "Looking for tips on making the perfect macaron feet. Mine always collapse after baking. Any advice?",
      image: null,
      likes: 18,
      comments: 12,
      time: "5 hours ago"
    },
    {
      id: 3,
      author: "Sarah Green",
      avatar: "/api/placeholder/40/40",
      content: "Check out my vegan chocolate cake! No one could tell it was dairy-free.",
      image: "/api/placeholder/400/300",
      likes: 42,
      comments: 15,
      time: "1 day ago"
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showEmojis, setShowEmojis] = useState(false);
  const [notification, setNotification] = useState(null);
  
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const translations = {
    en: {
      title: "Baking Community",
      subtitle: "Share your passion for baking with fellow enthusiasts",
      placeholder: "Share your baking experiences...",
      postButton: "Post",
      like: "Like",
      comment: "Comment",
      share: "Share",
      addPhoto: "Add Photo",
      addEmoji: "Add Emoji",
      filters: {
        all: "All Posts",
        popular: "Popular",
        recent: "Recent"
      },
      notifications: {
        posted: "Your post has been shared!",
        liked: "Post liked!"
      }
    },
    es: {
      title: "Comunidad de Repostería",
      subtitle: "Comparte tu pasión por la repostería con otros entusiastas",
      placeholder: "Comparte tus experiencias de repostería...",
      postButton: "Publicar",
      like: "Me gusta",
      comment: "Comentario",
      share: "Compartir",
      addPhoto: "Añadir Foto",
      addEmoji: "Añadir Emoji",
      filters: {
        all: "Todas las Publicaciones",
        popular: "Populares",
        recent: "Recientes"
      },
      notifications: {
        posted: "¡Tu publicación ha sido compartida!",
        liked: "¡Publicación gustada!"
      }
    },
  };

  const t = translations[language] || translations.en;
  
  const emojis = ["😋", "🍰", "🍞", "🥐", "🥖", "🧁", "🍪", "🥯", "🥨", "❤️"];

  // Filter posts based on the active filter
  const filteredPosts = () => {
    switch(activeFilter) {
      case 'popular':
        return [...posts].sort((a, b) => b.likes - a.likes);
      case 'recent':
        return [...posts].sort((a, b) => {
          if (a.time === "Just now") return -1;
          if (b.time === "Just now") return 1;
          return a.time < b.time ? -1 : 1;
        });
      default:
        return posts;
    }
  };

  // Handle new post submission
  const handlePost = () => {
    if (!newPost.trim() && !imagePreview) return;
    
    setIsPosting(true);
    
    // Simulate posting delay
    setTimeout(() => {
      const newPostData = {
        id: posts.length + 1,
        author: "You",
        avatar: "/api/placeholder/40/40",
        content: newPost,
        image: imagePreview,
        likes: 0,
        comments: 0,
        time: "Just now"
      };
  
      setPosts([newPostData, ...posts]);
      setNewPost('');
      setImagePreview(null);
      setIsPosting(false);
      
      // Show notification
      showNotification(t.notifications.posted);
    }, 1000);
  };

  // Handle likes with animation
  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
    showNotification(t.notifications.liked);
  };
  
  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For demonstration, we'll use a placeholder
      setImagePreview("/api/placeholder/400/300");
    }
  };
  
  // Add emoji to post
  const addEmoji = (emoji) => {
    setNewPost(prev => prev + emoji);
    setShowEmojis(false);
    textareaRef.current.focus();
  };
  
  // Show notification message
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
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
    <div className="max-w-2xl mx-auto p-4" style={{ backgroundColor: '#fff' }}>
      {/* Header with animation */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl font-bold" style={{ color: '#e981a4' }}>{t.title}</h1>
        <p className="mt-2" style={{ color: '#f9adb7' }}>{t.subtitle}</p>
      </motion.div>

      {/* New Post Input with enhanced UI */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="p-6 rounded-xl shadow-md mt-4 border"
        style={{ backgroundColor: 'white', borderColor: '#f4c5d7' }}
      >
        <textarea
          ref={textareaRef}
          className="w-full p-3 border rounded-lg transition duration-200"
          style={{ borderColor: '#fec9c3', focus: { borderColor: '#e981a4' } }}
          placeholder={t.placeholder}
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          rows={3}
        />
        
        {/* Image preview */}
        {imagePreview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 relative"
          >
            <img src={imagePreview} alt="preview" className="rounded-lg w-full max-h-64 object-cover" />
            <button 
              onClick={() => setImagePreview(null)}
              className="absolute top-2 right-2 bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center"
              style={{ backgroundColor: '#e981a4' }}
            >
              ✕
            </button>
          </motion.div>
        )}
        
        {/* Post actions */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex space-x-3">
            <button
              className="flex items-center space-x-1 transition"
              style={{ color: '#f9adb7', hover: { color: '#e981a4' } }}
              onClick={() => fileInputRef.current.click()}
            >
              <span>📷</span>
              <span>{t.addPhoto}</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
            
            <div className="relative">
              <button
                className="flex items-center space-x-1 transition"
                style={{ color: '#f9adb7', hover: { color: '#e981a4' } }}
                onClick={() => setShowEmojis(!showEmojis)}
              >
                <span>😊</span>
                <span>{t.addEmoji}</span>
              </button>
              
              {/* Emoji picker */}
              <AnimatePresence>
                {showEmojis && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 top-10 shadow-lg rounded-lg p-2 z-10 grid grid-cols-5 gap-2"
                    style={{ backgroundColor: 'white' }}
                  >
                    {emojis.map(emoji => (
                      <button 
                        key={emoji} 
                        onClick={() => addEmoji(emoji)}
                        className="text-xl rounded p-1 w-8 h-8 flex items-center justify-center"
                        style={{ hover: { backgroundColor: '#fec9c3' } }}
                      >
                        {emoji}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isPosting}
            className={`text-white px-6 py-2 rounded-lg font-medium transition duration-200 flex items-center ${isPosting ? 'opacity-70' : ''}`}
            style={{ backgroundColor: '#e981a4', hover: { backgroundColor: '#f9adb7' } }}
            onClick={handlePost}
          >
            {isPosting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Posting...
              </>
            ) : t.postButton}
          </motion.button>
        </div>
      </motion.div>

      {/* Filter tabs */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center space-x-1 mt-6 p-1 rounded-lg"
        style={{ backgroundColor: '#fec9c3' }}
      >
        {Object.entries(t.filters).map(([key, label]) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-lg transition duration-200 ${activeFilter === key ? 'shadow-sm font-medium' : 'hover:bg-opacity-50'}`}
            style={{ 
              backgroundColor: activeFilter === key ? 'white' : 'transparent',
              color: activeFilter === key ? '#e981a4' : '#f4c5d7'
            }}
            onClick={() => setActiveFilter(key)}
          >
            {label}
          </button>
        ))}
      </motion.div>

      {/* Posts List with staggered animation */}
      <motion.div 
        className="mt-6 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredPosts().map((post) => (
          <motion.div
            key={post.id}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="p-5 shadow-md rounded-xl border"
            style={{ backgroundColor: 'white', borderColor: '#f4c5d7' }}
          >
            <div className="flex items-center space-x-3">
              <motion.img 
                whileHover={{ scale: 1.1 }}
                src={post.avatar} 
                alt="avatar" 
                className="w-10 h-10 rounded-full border-2"
                style={{ borderColor: '#fec9c3' }}
              />
              <div>
                <span className="font-bold" style={{ color: '#e981a4' }}>{post.author}</span>
                <p className="text-sm" style={{ color: '#f9adb7' }}>{post.time}</p>
              </div>
            </div>
            
            <p className="mt-3" style={{ color: '#666' }}>{post.content}</p>
            
            {post.image && (
              <motion.img 
                src={post.image} 
                alt="post" 
                className="mt-3 rounded-lg w-full cursor-pointer"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
            )}
            
            {/* Like, Comment and Share Buttons */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t" style={{ borderColor: '#fec9c3' }}>
              <motion.button 
                whileTap={{ scale: 1.2 }}
                onClick={() => handleLike(post.id)} 
                className="flex items-center space-x-1 transition"
                style={{ color: '#f9adb7', hover: { color: '#e981a4' } }}
              >
                <span>👍</span>
                <span>{t.like} ({post.likes})</span>
              </motion.button>
              
              <Link to={`/post/${post.id}`} className="flex items-center space-x-1 transition" style={{ color: '#f9adb7', hover: { color: '#e981a4' } }}>
                <span>💬</span>
                <span>{t.comment} ({post.comments})</span>
              </Link>
              
              <button className="flex items-center space-x-1 transition" style={{ color: '#f9adb7', hover: { color: '#e981a4' } }}>
                <span>📤</span>
                <span>{t.share}</span>
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Notification toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 text-white px-6 py-3 rounded-lg shadow-lg"
            style={{ backgroundColor: '#e981a4' }}
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Community;