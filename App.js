import { useState } from 'react';

import { AuthContext } from './src/store/Context';
import Navigate from './src/navigation';

export default function App() {
  const [auth, setAuth] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Navigate />
    </AuthContext.Provider>
  );
}
