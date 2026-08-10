import React, { createContext, useContext, useState, useCallback } from 'react';
import Icon from '../Icon';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, message, type = 'info', duration = 4000 }) => {
    const id = Date.now() + Math.random().toString();
    const newToast = { id, title, message, type };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="ui-toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`ui-toast ui-toast-${toast.type}`}>
            <div className="ui-toast-icon">
              <Icon
                name={
                  toast.type === 'success'
                    ? 'checkCircle'
                    : toast.type === 'danger'
                    ? 'alertTriangle'
                    : toast.type === 'warning'
                    ? 'alertTriangle'
                    : 'sparkles'
                }
                size={18}
              />
            </div>

            <div className="ui-toast-body">
              {toast.title && <h4 className="ui-toast-title">{toast.title}</h4>}
              {toast.message && <p className="ui-toast-message">{toast.message}</p>}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="ui-toast-close"
              aria-label="Close notification"
            >
              <Icon name="close" size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      addToast: ({ title, message }) => console.log('Toast:', title, message),
      removeToast: () => {},
    };
  }
  return context;
}

export default ToastProvider;
