import React from 'react';

const ToastContext = React.createContext({});

export default ToastContext;

export const ToastProvider = ToastContext.Provider;
export const ToastConsumer = ToastContext.Consumer;
