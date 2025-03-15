import React, { useState, useRef, useEffect } from 'react';

const PromoCodeInput = () => {
  const [sections, setSections] = useState<string[]>(['', '', '', '']);
  const inputRefs = [
    useRef<HTMLInputElement>(null), 
    useRef<HTMLInputElement>(null), 
    useRef<HTMLInputElement>(null), 
    useRef<HTMLInputElement>(null)
  ];
  const [isPromoValid, setIsPromoValid] = useState<boolean | null>(null);
  
  const handleChange = (index: number, value: string) => {
    if (value.length <= 4 && /^[A-Za-z0-9]*$/.test(value)) {
      const newSections = [...sections];
      newSections[index] = value.toUpperCase();
      setSections(newSections);
      
      // Auto-advance to next input when section is filled
      if (value.length === 4 && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to previous input when current is empty
    if (e.key === 'Backspace' && sections[index] === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    
    // Handle right arrow at end of input
    if (e.key === 'ArrowRight' && 
        index < 3 && 
        inputRefs[index].current?.selectionStart === sections[index].length) {
      inputRefs[index + 1].current?.focus();
    }
    
    // Handle left arrow at beginning of input
    if (e.key === 'ArrowLeft' && 
        index > 0 && 
        inputRefs[index].current?.selectionStart === 0) {
      inputRefs[index - 1].current?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    
    // If pasted text roughly matches expected format
    if (pastedText && pastedText.length <= 19) {
      // Remove any non-alphanumeric characters
      const cleaned = pastedText.replace(/[^A-Za-z0-9]/g, '');
      
      // Split into sections
      const newSections = ['', '', '', ''];
      for (let i = 0; i < 4; i++) {
        newSections[i] = cleaned.slice(i * 4, (i + 1) * 4).toUpperCase();
      }
      
      setSections(newSections);
    }
  };
  
  const applyPromoCode = () => {
    const fullCode = sections.join('-');
    
    const isValid = sections.every(section => section.length === 4);
    setIsPromoValid(isValid);
  };
  
  return (
    <div className="grid grid-cols-1 gap-6 justify-items-center">
      <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 max-w-sm min-w-sm">
        <h3 className="text-xl font-semibold text-white tracking-wider mb-4">
          Enter Promo Code
        </h3>
        
        <div className="flex items-center space-x-2">
          {sections.map((section, index) => (
            <React.Fragment key={index}>
              <input
                ref={inputRefs[index]}
                type="text"
                value={section}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-16 p-2 bg-gray-800 rounded-lg text-center text-white border-none outline-none focus:ring-2 focus:ring-indigo-500"
                maxLength={4}
              />
              {index < 3 && (
                <span className="text-gray-500 font-bold">-</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <button 
          onClick={applyPromoCode}
          className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg transition-all"
        >
          Apply Code
        </button>

        {isPromoValid !== null && (
          <p className={`mt-3 text-sm ${isPromoValid ? "text-green-400" : "text-red-400"}`}>
            {isPromoValid ? "Promo code applied successfully!" : "Invalid promo code."}
          </p>
        )}
      </div>
    </div>
  );
};

export default PromoCodeInput;