import { AuthContext } from '@/contexts/Auth';
import { useContext } from 'react';

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return context;
};

export default useAuthContext;
