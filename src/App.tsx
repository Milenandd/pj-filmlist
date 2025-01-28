import React, { useState } from 'react';
import { UserRegistration } from './components/UserRegistration';
import { MovieCatalog } from './components/MovieCatalog';

function App() {
  const [user, setUser] = useState('');

  return (
    <div className="Mi-1">
      <main className="container-3">
        {!user ? (
          <UserRegistration onRegister={setUser} />
        ) : (
          <MovieCatalog username={user} />
        )}
      </main>
    </div>
  );
}

export default App;