import React, { useState } from 'react';
import { Film, User } from 'lucide-react';

interface UserRegistrationProps {
  onRegister: (name: string) => void;
}

export function UserRegistration({ onRegister }: UserRegistrationProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onRegister(name);
    }
  };

  return (
    <div className="container">
      <div className="custom-container">
        <div className="flex justify-center mb-8">
          <Film size={80} className="text-purple-800" />
        </div>
        <h1 className="titulo">NxtFilm</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="texto">
              Como podemos te chamar?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="container-2"
              placeholder="Digite seu nome"
              required
            />
          </div>
          <button type="submit" className="button-2">
            <User size={20} />
            <span>Começar a Explorar</span>
          </button>
        </form>
      </div>
    </div>
  );
}
