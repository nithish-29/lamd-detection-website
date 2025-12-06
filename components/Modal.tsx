import React from 'react';
import { ModalState } from '../types';

interface ModalProps {
  state: ModalState;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ state, onClose }) => {
  if (!state.isOpen) return null;

  const borderColor = 
    state.type === 'error' ? 'border-red-500' : 
    state.type === 'warning' ? 'border-yellow-500' : 
    state.type === 'success' ? 'border-green-500' : 'border-blue-500';

  const titleColor =
    state.type === 'error' ? 'text-red-500' : 
    state.type === 'warning' ? 'text-yellow-400' : 
    state.type === 'success' ? 'text-green-400' : 'text-blue-400';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4">
      <div className={`bg-gray-800 w-full max-w-lg rounded-lg border-2 ${borderColor} shadow-[0_0_30px_rgba(0,0,0,0.5)] transform transition-all`}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className={`text-2xl font-bold font-mono ${titleColor} uppercase`}>{state.title}</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
            >
              &times;
            </button>
          </div>
          
          <div className="text-gray-300 font-mono whitespace-pre-wrap text-sm leading-relaxed max-h-[60vh] overflow-y-auto custom-scrollbar">
            {state.content}
          </div>

          {state.footer && (
            <div className="mt-6 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500 font-mono uppercase">{state.footer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};