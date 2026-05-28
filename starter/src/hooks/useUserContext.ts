import { UserContext, type UserContextType } from '@/context/UserContext';
import { useContext } from 'react';

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
};
