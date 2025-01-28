import { useState, useEffect } from 'react';
import { Search, Film, Star, Heart, Filter, AlertCircle } from 'lucide-react';

// Interfaces
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
}

interface MovieCatalogProps {
  username: string;
}

export function MovieCatalog({ username }: MovieCatalogProps) {
  // Estados
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<number | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  // API key do TMDB (usando chave de teste - em produção, use variáveis de ambiente)
  const API_KEY = '2c46288716a18fb7aadcc2a801f3fc6b';
  const API_BASE = 'https://api.themoviedb.org/3';

  // Buscar gêneros
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `${API_BASE}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (err) {
        console.error('Erro ao carregar gêneros:', err);
      }
    };

    fetchGenres();
  }, []);

  // Buscar filmes
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const endpoint = searchQuery
          ? `${API_BASE}/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=pt-BR`
          : `${API_BASE}/movie/popular?api_key=${API_KEY}&language=pt-BR`;

        const response = await fetch(endpoint);
        const data = await response.json();
        
        if (data.results) {
          setMovies(data.results);
          setError('');
        } else {
          throw new Error('Nenhum filme encontrado');
        }
      } catch (err) {
        setError('Não foi possível carregar os filmes');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchMovies, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Filtrar filmes
  const filteredMovies = movies.filter(movie => 
    selectedGenre === 'all' || movie.genre_ids.includes(Number(selectedGenre))
  );

  // Alternar favorito
  const toggleFavorite = (movieId: number) => {
    setFavorites(prev => 
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Cabeçalho */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-violet-300 mb-2">
          Catálogo de Filmes
        </h1>
        <p className="font-semibold text-lg mb-2, text-violet-400">
          Bem-vindo(a), {username}! Explore nossa coleção de filmes.
        </p>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-purple/20 p-4 rounded-lg mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-200" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-pinkl-300"
            placeholder="Buscar filmes..."
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-pink-200" />
          <select
  id="genre"
  value={selectedGenre}
  onChange={(e) => setSelectedGenre(e.target.value === 'all' ? 'all' : Number(e.target.value))}
  className="flex-1 px-4 py-2 rounded-md border border-pink-300 text-violet-400"
  aria-label="Selecione um Gênero"
>
  <option value="all" className='bg-violet-100 , border-purple-300'>Todos os Gêneros</option>
  {genres.map(genre => (
    <option key={genre.id} value={genre.id}>
      {genre.name}
    </option>
  ))}
          </select>
        </div>
      </div>

      {/* Lista de Filmes */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-slate-600">Carregando filmes...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center gap-2 text-red-400 bg-white/80 p-4 rounded-lg">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map(movie => (
            <div key={movie.id} className="bg-white/80 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[400px] object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/500x750?text=Sem+Imagem';
                  }}
                /><button
                onClick={() => toggleFavorite(movie.id)}
                className={`absolute top-2 right-2 p-2 rounded-full ${
                  favorites.includes(movie.id)
                    ? 'bg-pink-500 text-white'
                    : 'bg-white/80 text-pink-600'
                }`}
                aria-label={favorites.includes(movie.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                <Heart size={20} fill={favorites.includes(movie.id) ? 'white' : 'none'} />
              
               
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-violet-700">{movie.title}</h3>
                <div className="flex items-center gap-2 text-slate-700 mb-2">
                  <Film size={16} />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                  <Star size={16} className="text-yellow-600" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-3">{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredMovies.length === 0 && !loading && !error && (
        <div className="text-center py-8 bg-white/80 rounded-lg">
          <p className="text-slate-600">Nenhum filme encontrado com os filtros atuais.</p>
        </div>
      )}
    </div>
  );
}