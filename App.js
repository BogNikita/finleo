import { useState } from 'react';

import { AvatarContext, AuthContext } from './src/store/Context';
import Navigate from './src/navigation';

import defaultAvatar from './assets/avatar.png';

export default function App() {
  const [profileAvatar, setProfileAvatar] = useState(defaultAvatar);
  const [auth, setAuth] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <AvatarContext.Provider value={{ profileAvatar, setProfileAvatar }}>
        <Navigate />
      </AvatarContext.Provider>
    </AuthContext.Provider>
  );
}
