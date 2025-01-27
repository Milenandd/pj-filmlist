import React, { useState } from 'react';
import { UserRegistration } from './components/UserRegistration';
import { MovieCatalog } from './components/MovieCatalog';

function App() {
  const [user, setUser] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <main className="container mx-auto px-4 py-8">
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