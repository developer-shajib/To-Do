import { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBackdropClick = (event) => {
    if (isMounted && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed z-50 inset-0 ${isOpen ? 'flex' : 'hidden'}`}
      onClick={handleBackdropClick}>
      <div className='modal-container'>
        <div className='modal-box'>
          <button
            className='modal-close'
            onClick={onClose}>
            &#x2715;
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
