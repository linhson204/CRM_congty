import { useState } from 'react';
import styles from './EmotePicker.module.css';

const EmotePicker = ({ onEmoteSelect, onClose, show, position }) => {
  const [hoveredEmote, setHoveredEmote] = useState(null);

  // Facebook-like emotes organized by categories
  const emoteCategories = {
    'Smileys & People': [
      '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
      '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
      '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔',
      '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥',
      '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧',
      '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐'
    ],
    'Hearts & Love': [
      '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
      '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥️'
    ],
    'Hand Gestures': [
      '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉',
      '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👏',
      '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💪', '🦵', '🦶', '👂'
    ],
    'Popular': [
      '😂', '❤️', '😍', '😊', '🤔', '👍', '😎', '😢', '😡', '🙄',
      '😜', '🤷‍♀️', '🤷‍♂️', '🔥', '💯', '✨', '🎉', '👏', '🙏', '💕'
    ]
  };

  const [activeCategory, setActiveCategory] = useState('Popular');

  const handleEmoteClick = (emote) => {
    onEmoteSelect(emote);
    onClose();
  };

  if (!show) return null;

  return (
    <div 
      className={styles.emotePicker}
      style={{
        position: 'absolute',
        top: '2px',
        left: '2px',
        zIndex: 1000
      }}
    >
      <div className={styles.emotePickerHeader}>
        <div className={styles.categoryTabs}>
          {Object.keys(emoteCategories).map((category) => (
            <button
              key={category}
              className={`${styles.categoryTab} ${
                activeCategory === category ? styles.active : ''
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category === 'Popular' && '⭐'}
              {category === 'Smileys & People' && '😀'}
              {category === 'Hearts & Love' && '❤️'}
              {category === 'Hand Gestures' && '👍'}
            </button>
          ))}
        </div>
      </div>
      
      <div className={styles.emoteGrid}>
        {emoteCategories[activeCategory].map((emote, index) => (
          <button
            key={index}
            className={`${styles.emoteButton} ${
              hoveredEmote === emote ? styles.hovered : ''
            }`}
            onClick={() => handleEmoteClick(emote)}
            onMouseEnter={() => setHoveredEmote(emote)}
            onMouseLeave={() => setHoveredEmote(null)}
            title={emote}
          >
            {emote}
          </button>
        ))}
      </div>
      
      {hoveredEmote && (
        <div className={styles.emotePreview}>
          <span className={styles.previewEmote}>{hoveredEmote}</span>
        </div>
      )}
      
      <div className={styles.emotePickerFooter}>
        <span className={styles.categoryName}>{activeCategory}</span>
      </div>
    </div>
  );
};

export default EmotePicker;