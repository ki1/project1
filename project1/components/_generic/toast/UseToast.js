import { useContext, useMemo } from 'react';
import ToastContext from '../../../providers/ToastProvider';

function useToast() {
  const context = useContext(ToastContext);

  return useMemo(
    () => ({ addToast: context.addToast, removeToast: context.removeToast }),
    [context]
  );
}

export default useToast;
