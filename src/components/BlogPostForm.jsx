import React from 'react';
import { Camera, Calendar, Tag, ChevronDown, ChevronUp, X, Plus, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BlogPostForm = ({
  blogPost,
  handleInputChange,
  handleIngredientChange,
  addIngredient,
  removeIngredient,
  handleAddTag,
  handleRemoveTag,
  newTag,
  setNewTag,
  handleImageUpload,
  setFeaturedImage,
  removeImage,
  toggleSection,
  expandedSection,
  dishTypes,
  difficulties,
  handleSubmit,
  isSubmitting
}) => {
  // Animation variants
  const sectionVariants = {
    collapsed: { 
      height: 0, 
      opacity: 0,
      overflow: 'hidden'
    },
    expanded: { 
      height: 'auto', 
      opacity: 1,
      overflow: 'visible'
    }
  };
  
  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info Section */}
      <motion.div 
        className="border rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className="bg-amber-50 p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('basic')}
        >
          <h3 className="font-bold text-amber-800">Basic Information</h3>
          <motion.div
            initial={false}
            animate={{ rotate: expandedSection === 'basic' ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {expandedSection === 'basic' ? <ChevronUp /> : <ChevronDown />}
          </motion.div>
        </div>
        
        <AnimatePresence initial={false}>
          {expandedSection === 'basic' && (
            <motion.div
              key="basic-content"
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={sectionVariants}
              transition={{ duration: 0.3 }}
              className="p-4 bg-white"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block font-semibold">Title</label>
                  <input 
                    type="text" 
                    name="title" 
                    value={blogPost.title} 
                    onChange={handleInputChange} 
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all duration-200" 
                    required 
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div>
                    <label className="block font-semibold">Dish Type</label>
                    <select 
                      name="dishType" 
                      value={blogPost.dishType} 
                      onChange={handleInputChange} 
                      className="w-full border rounded p-2 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all duration-200"
                      required
                    >
                      <option value="">Select Type</option>
                      {dishTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block font-semibold">Difficulty</label>
                    <select 
                      name="difficulty" 
                      value={blogPost.difficulty} 
                      onChange={handleInputChange} 
                      className="w-full border rounded p-2 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all duration-200"
                    >
                      {difficulties.map((level) => (
                        <option key={level} value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div>
                    <label className="block font-semibold">Prep Time (minutes)</label>
                    <input 
                      type="number" 
                      name="prepTime" 
                      value={blogPost.prepTime} 
                      onChange={handleInputChange} 
                      className="w-full border rounded p-2 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all duration-200" 
                    />
                  </div>
                  
                  <div>
                    <label className="block font-semibold">Cook Time (minutes)</label>
                    <input 
                      type="number" 
                      name="cookTime" 
                      value={blogPost.cookTime} 
                      onChange={handleInputChange} 
                      className="w-full border rounded p-2 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all duration-200" 
                    />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center space-x-4"
                >
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="isSpecial" 
                      name="isSpecial" 
                      checked={blogPost.isSpecial} 
                      onChange={handleInputChange} 
                      className="mr-2 h-5 w-5 text-amber-500 focus:ring-amber-300 transition-all duration-200" 
                    />
                    <label htmlFor="isSpecial">Featured Recipe</label>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="isDraft" 
                      name="isDraft" 
                      checked={blogPost.isDraft} 
                      onChange={handleInputChange} 
                      className="mr-2 h-5 w-5 text-amber-500 focus:ring-amber-300 transition-all duration-200" 
                    />
                    <label htmlFor="isDraft">Save as Draft</label>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Ingredients Section */}
      <motion.div 
        className="border rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div 
          className="bg-amber-50 p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('ingredients')}
        >
          <h3 className="font-bold text-amber-800">Ingredients</h3>
          <motion.div
            initial={false}
            animate={{ rotate: expandedSection === 'ingredients' ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {expandedSection === 'ingredients' ? <ChevronUp /> : <ChevronDown />}
          </motion.div>
        </div>
        
        <AnimatePresence initial={false}>
          {expandedSection === 'ingredients' && (
            <motion.div
              key="ingredients-content"
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={sectionVariants}
              transition={{ duration: 0.3 }}
              className="p-4 bg-white"
            >
              <div className="space-y-3">
                {blogPost.ingredients.map((ingredient, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center space-x-2"
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={listItemVariants}
                  >
                    <input 
                      type="text" 
                      value={ingredient} 
                      onChange={(e) => handleIngredientChange(index, e.target.value)} 
                      placeholder="Add ingredient with quantity" 
                      className="flex-1 border rounded p-2 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all duration-200" 
                    />
                    <motion.button 
                      type="button" 
                      onClick={() => removeIngredient(index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      disabled={blogPost.ingredients.length === 1}
                    >
                      <X size={20} />
                    </motion.button>
                  </motion.div>
                ))}
                
                <motion.button 
                  type="button" 
                  onClick={addIngredient}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center text-amber-600 hover:text-amber-800 transition-colors"
                >
                  <Plus size={16} className="mr-1" /> Add Another Ingredient
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Recipe and Story Section */}
      <motion.div 
        className="border rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div 
          className="bg-amber-50 p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('recipeStory')}
        >
          <h3 className="font-bold text-amber-800">Recipe & Story</h3>
          <motion.div
            initial={false}
            animate={{ rotate: expandedSection === 'recipeStory' ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {expandedSection === 'recipeStory' ? <ChevronUp /> : <ChevronDown />}
          </motion.div>
        </div>
        
        <AnimatePresence initial={false}>
          {expandedSection === 'recipeStory' && (
            <motion.div
              key="recipe-story-content"
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={sectionVariants}
              transition={{ duration: 0.3 }}
              className="p-4 bg-white"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block font-semibold">Recipe Instructions</label>
                  <textarea 
                    name="recipe" 
                    value={blogPost.recipe} 
                    onChange={handleInputChange} 
                    rows="6"
                    placeholder="Step by step instructions..."
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all duration-200" 
                    required
                  ></textarea>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block font-semibold">Story Behind the Recipe (Optional)</label>
                  <textarea 
                    name="storyBehind" 
                    value={blogPost.storyBehind} 
                    onChange={handleInputChange} 
                    rows="4"
                    placeholder="Share the inspiration or story behind this recipe..."
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all duration-200" 
                  ></textarea>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Tags Section */}
      <motion.div 
        className="border rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div 
          className="bg-amber-50 p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('tags')}
        >
          <h3 className="font-bold text-amber-800">Tags</h3>
          <motion.div
            initial={false}
            animate={{ rotate: expandedSection === 'tags' ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {expandedSection === 'tags' ? <ChevronUp /> : <ChevronDown />}
          </motion.div>
        </div>
        
        <AnimatePresence initial={false}>
          {expandedSection === 'tags' && (
            <motion.div
              key="tags-content"
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={sectionVariants}
              transition={{ duration: 0.3 }}
              className="p-4 bg-white"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    value={newTag} 
                    onChange={(e) => setNewTag(e.target.value)} 
                    placeholder="Add a tag" 
                    className="flex-1 border rounded p-2 focus:ring-2 focus:ring-amber-300 focus:outline-none transition-all duration-200" 
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <motion.button 
                    type="button" 
                    onClick={handleAddTag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition-colors"
                  >
                    <Tag size={16} />
                  </motion.button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {blogPost.tags.map((tag, index) => (
                      <motion.div 
                        key={tag} 
                        className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full flex items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        layout
                      >
                        <span className="mr-1">{tag}</span>
                        <motion.button 
                          type="button" 
                          onClick={() => handleRemoveTag(tag)}
                          className="text-amber-800 hover:text-amber-900 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X size={14} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Images Section */}
      <motion.div 
        className="border rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div 
          className="bg-amber-50 p-4 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('images')}
        >
          <h3 className="font-bold text-amber-800">Images</h3>
          <motion.div
            initial={false}
            animate={{ rotate: expandedSection === 'images' ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {expandedSection === 'images' ? <ChevronUp /> : <ChevronDown />}
          </motion.div>
        </div>
        
        <AnimatePresence initial={false}>
          {expandedSection === 'images' && (
            <motion.div
              key="images-content"
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={sectionVariants}
              transition={{ duration: 0.3 }}
              className="p-4 bg-white"
            >
              <div className="space-y-4">
                <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center">
                  <input
                    type="file"
                    id="imageUpload"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <motion.label 
                    htmlFor="imageUpload"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Camera size={40} className="text-amber-500 mb-2" />
                    <p className="text-gray-500">Click to upload images</p>
                    <p className="text-xs text-gray-400 mt-1">Upload your delicious creation!</p>
                  </motion.label>
                </div>
                
                <AnimatePresence>
                  {blogPost.images.length > 0 && (
                    <motion.div 
                      className="grid grid-cols-2 md:grid-cols-3 gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {blogPost.images.map((image, index) => (
                        <motion.div 
                          key={image} 
                          className={`relative bg-gray-100 p-4 rounded ${blogPost.featuredImage === image ? 'ring-2 ring-amber-500' : ''}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          layout
                        >
                          <div className="h-24 flex items-center justify-center">
                            <p className="text-sm text-gray-500 text-center break-all">{image}</p>
                          </div>
                          <div className="mt-2 flex justify-between">
                            <motion.button
                              type="button"
                              onClick={() => setFeaturedImage(image)}
                              className={`text-xs px-2 py-1 rounded ${blogPost.featuredImage === image ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {blogPost.featuredImage === image ? 'Featured' : 'Set Featured'}
                            </motion.button>
                            <motion.button
                              type="button"
                              onClick={() => removeImage(image)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <X size={18} />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Submit Button */}
      <motion.div 
        className="pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <motion.button 
          type="submit" 
          className={`w-full py-3 px-4 rounded font-medium text-lg flex items-center justify-center space-x-2 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : blogPost.isDraft ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-green-500 text-white hover:bg-green-600'} transition-colors`}
          disabled={isSubmitting}
          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-white"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Save size={20} />
              <span>{blogPost.isDraft ? 'Save as Draft' : 'Publish Recipe'}</span>
            </>
          )}
        </motion.button>
      </motion.div>
    </form>
  );
};

export default BlogPostForm;