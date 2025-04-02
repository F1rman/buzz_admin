import GoogleContext from 'contexts/GoogleMapContext';
import { useContext } from 'react';

export default function useGoogleMap() {
  const context = useContext(GoogleContext);
  if (!context) throw new Error('context must be use inside provider');

  return context;
}
