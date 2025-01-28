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

    
    <div className="max-w-md mx-auto px-4">
      <div className="bg-white/80 backdrop-blur p-6 sm:p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
          <Film size={80} className="text-purple-800" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6 text-violet-300">
          Bem-vindo ao Catálogo de Filmes
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2 text-slate-700"
            >
              Como podemos te chamar?
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-pink-200 focus:ring-2 focus:ring-purple-00 focus:border-transparent"
              placeholder="Digite seu nome"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-violet-400 to-purple-600 text-white rounded-md hover:from-purple-900 hover:to-violet-400 transition-colors flex items-center justify-center gap-2"
          >
            <User size={20} />
            <span>Começar a Explorar</span>
          </button>
        </form>
      </div>
    </div>
  );
}