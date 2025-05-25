import React from 'react';

const Button = ({ onClick, children, className = '', disabled = false }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400 ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;