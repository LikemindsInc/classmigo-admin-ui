import { useEffect } from 'react';

const usePreventNavigation = (loading: boolean) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (loading) {
        const confirmationMessage = 'A process is currently running. Are you sure you want to leave?';
        (event || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [loading]);
};

export default usePreventNavigation;