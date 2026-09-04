import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaTag } from 'react-icons/fa';

export default function SearchBar({ allTags, selectedTags, onSearch }) {
    const [searchInput, setSearchInput] = useState('');
    const [suggestedTags, setSuggestedTags] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);

    useEffect(() => {
        if (searchInput.trim() === '') {
            setSuggestedTags([]);
            return;
        }

        const filtered = allTags.filter(tag => 
            tag.toLowerCase().includes(searchInput.toLowerCase()) && 
            !selectedTags.includes(tag)
        );
        setSuggestedTags(filtered);
    }, [searchInput, allTags, selectedTags]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
        setShowSuggestions(true);
    };

    const addTag = (tag) => {
        if (!selectedTags.includes(tag)) {
            const newTags = [...selectedTags, tag];
            onSearch(newTags);
            setSearchInput('');
            setSuggestedTags([]);
            
            // Focus back on input after selection
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    const removeTag = (tagToRemove) => {
        const newTags = selectedTags.filter(tag => tag !== tagToRemove);
        onSearch(newTags);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && searchInput.trim() !== '' && suggestedTags.length > 0) {
            addTag(suggestedTags[0]);
            e.preventDefault();
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const tagVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 15 }
        },
        exit: { 
            opacity: 0, 
            scale: 0.8,
            transition: { duration: 0.2 }
        },
        hover: { scale: 1.05 }
    };

    const suggestionsVariants = {
        hidden: { opacity: 0, y: -10, height: 0 },
        visible: { 
            opacity: 1, 
            y: 0, 
            height: 'auto',
            transition: { 
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: { 
            opacity: 0, 
            y: -10, 
            height: 0,
            transition: { 
                duration: 0.2,
                ease: "easeIn"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: (i) => ({ 
            opacity: 1, 
            x: 0,
            transition: { 
                delay: i * 0.05,
                duration: 0.3
            }
        }),
        hover: { 
            backgroundColor: "#1B201E",
            x: 5,
            transition: { duration: 0.2 }
        }
    };

    return (
        <motion.div 
            className="mb-12 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="bg-[#232928] rounded-lg shadow-xl p-6">
                <div className="relative">
                    <div 
                        className="flex items-center bg-[#1B201E] rounded-lg px-4 py-3 mb-4 border-2 border-transparent focus-within:border-[#C4BAA6] transition-all duration-300"
                        ref={inputRef}
                    >
                        <FaSearch className="text-[#C4BAA6] mr-3" />
                        <input
                            type="text"
                            placeholder="Buscar por etiquetas..."
                            value={searchInput}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setShowSuggestions(true)}
                            className="bg-transparent text-[#C4BAA6] w-full focus:outline-none placeholder-gray-500"
                            ref={inputRef}
                        />
                        {searchInput && (
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                    setSearchInput('');
                                    inputRef.current.focus();
                                }}
                                className="text-gray-400 hover:text-[#C4BAA6] transition-colors"
                            >
                                <FaTimes />
                            </motion.button>
                        )}
                    </div>
                    
                    {/* Tag suggestions */}
                    <AnimatePresence>
                        {showSuggestions && suggestedTags.length > 0 && (
                            <motion.div 
                                className="absolute z-10 w-full bg-[#232928] rounded-lg shadow-lg mt-1 overflow-hidden border border-[#3A3F3D]"
                                variants={suggestionsVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                ref={suggestionsRef}
                            >
                                <div className="py-2 max-h-60 overflow-y-auto custom-scrollbar">
                                    {suggestedTags.map((tag, index) => (
                                        <motion.div
                                            key={tag}
                                            className="px-4 py-3 cursor-pointer text-[#C4BAA6] flex items-center gap-2 border-b border-[#1B201E] last:border-b-0"
                                            onClick={() => {
                                                addTag(tag);
                                                setShowSuggestions(false);
                                            }}
                                            variants={itemVariants}
                                            custom={index}
                                            initial="hidden"
                                            animate="visible"
                                            whileHover="hover"
                                        >
                                            <FaTag className="text-[#C4BAA6] opacity-70" />
                                            <span className="font-medium">{tag}</span>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="bg-[#1B201E] py-2 px-4 text-xs text-gray-400 flex justify-between items-center">
                                    <span>{suggestedTags.length} etiquetas encontradas</span>
                                    <span className="italic">Presiona Enter para seleccionar la primera</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Selected tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                    <AnimatePresence>
                        {selectedTags.length > 0 ? (
                            selectedTags.map((tag, index) => (
                                <motion.span
                                    key={tag}
                                    className="bg-[#C4BAA6] text-[#1B201E] px-3 py-1 rounded-full flex items-center gap-2 font-medium shadow-sm"
                                    variants={tagVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    whileHover="hover"
                                    layout
                                    custom={index}
                                >
                                    <FaTag size={10} />
                                    {tag}
                                    <motion.button
                                        onClick={() => removeTag(tag)}
                                        className="text-[#1B201E] hover:text-[#4A4A4A] transition-colors ml-1 p-1 rounded-full hover:bg-[#a59c89]"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <FaTimes size={10} />
                                    </motion.button>
                                </motion.span>
                            ))
                        ) : (
                            <motion.p 
                                className="text-gray-400 text-sm italic"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                Selecciona etiquetas para filtrar productos o deja vacío para ver todos
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}