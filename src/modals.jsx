function ImageModal({ isOpen, onClose, cardData }) {
  if (!isOpen || !cardData) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      {/* Modal content container: white background, rounded corners, shadow, scrollable if content overflows */}
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative p-6">
        {/* Close button: positioned absolutely in the top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 text-3xl font-bold leading-none cursor-pointer"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Modal Image: full width, maintains aspect ratio, fits within container, rounded corners */}
        <img
          src={cardData.image}
          alt={cardData.title}
          className="w-full h-auto max-h-[60vh] object-contain rounded-md mb-4"
        />
        {/* Modal Title: centered, bold, dark text */}
        <p className="text-2xl font-bold text-gray-900 text-center">
          {cardData.title}
        </p>
      </div>
    </div>
  );
}

export default ImageModal;


// Modal.jsx

//import './Modal.css'; // We'll create this CSS file next

export const Modal = ({ show, onClose, children, title }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

