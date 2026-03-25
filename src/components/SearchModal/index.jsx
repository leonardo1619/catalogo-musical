import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { FiX, FiMusic, FiUser, FiDisc, FiFolder } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';
import * as S from './styles';

  // Configurar Fuse.js
  const fuseOptions = {
    threshold: 0.3,
    keys: ['name', 'title']
  };


export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({
    songs: [],
    artists: [],
    genres: [],
    albums: []
  });
  const [allData, setAllData] = useState({
    songs: [],
    artists: [],
    genres: [],
    albums: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar todos los datos al montar el componente
  useEffect(() => {
    async function fetchAllData() {
      try {
        // Cargar datos sin JOINs complejos
        const [songsRes, artistsRes, genresRes, albumsRes] = await Promise.all([
          supabase.from('songs').select('*'),
          supabase.from('artists').select('*'),
          supabase.from('genres').select('*'),
          supabase.from('albums').select('*')
        ]);

        // Crear mapas para relacionar datos
        const artistsMap = {};
        const genresMap = {};
        
        (artistsRes.data || []).forEach(a => {
          artistsMap[a.id] = a.name;
        });
        
        (genresRes.data || []).forEach(g => {
          genresMap[g.id] = g.name;
        });

        setAllData({
          songs: (songsRes.data || []).map(s => ({
            id: s.slug,
            title: s.title,
            artistName: artistsMap[s.artist_id] || 'Sin artista',
            artistId: s.artist_id,
            genreId: s.genre_id,
            genreName: genresMap[s.genre_id] || 'Sin género',
            difficulty: s.difficulty
          })),
          artists: (artistsRes.data || []).map(a => ({
            id: a.slug,
            name: a.name,
            genreId: a.genre_id,
            genreSlug: a.genre_id
          })),
          genres: (genresRes.data || []).map(g => ({
            id: g.slug,
            name: g.name,
            _uuid: g.id
          })),
          albums: (albumsRes.data || []).map(a => ({
            id: a.slug,
            name: a.name,
            level: a.level,
            _uuid: a.id
          }))
        });
      } catch (error) {
        console.error('Error cargando datos para búsqueda:', error);
      } finally {
        setLoading(false);
      }
    }

    if (isOpen) {
      fetchAllData();
    }
  }, [isOpen]);


  // Buscar en tiempo real
  useEffect(() => {
    if (query.trim() === '' || loading) {
      setResults({ songs: [], artists: [], genres: [], albums: [] });
      return;
    }

    const songsFuse = new Fuse(allData.songs, { ...fuseOptions, keys: ['title', 'artistName'] });
    const artistsFuse = new Fuse(allData.artists, fuseOptions);
    const genresFuse = new Fuse(allData.genres, fuseOptions);
    const albumsFuse = new Fuse(allData.albums, fuseOptions);

    const songResults = songsFuse.search(query).slice(0, 5);
    const artistResults = artistsFuse.search(query).slice(0, 5);
    const genreResults = genresFuse.search(query).slice(0, 3);
    const albumResults = albumsFuse.search(query).slice(0, 3);

    setResults({
      songs: songResults.map(r => r.item),
      artists: artistResults.map(r => r.item),
      genres: genreResults.map(r => r.item),
      albums: albumResults.map(r => r.item)
    });
  }, [query, allData, loading]);

  // Navegar a resultado
  const handleSongClick = (song) => {
    navigate(`/pdf/${song.id}`);
    onClose();
  };

  const handleArtistClick = async (artist) => {
    try {
      // Obtener el slug del género
      const { data: genreData } = await supabase
        .from('genres')
        .select('slug')
        .eq('id', artist.genreSlug)
        .single();

      if (genreData) {
        navigate(`/genero/${genreData.slug}/artista/${artist.id}`);
      }
    } catch (error) {
      console.error('Error navegando a artista:', error);
    }
    onClose();
  };

  const handleGenreClick = (genre) => {
    navigate(`/genero/${genre.id}`);
    onClose();
  };

  const handleAlbumClick = (album) => {
    navigate(`/album/${album.id}`);
    onClose();
  };

  // Contar canciones por entidad
  const getSongsCount = (entityId, entityType) => {
    if (entityType === 'artist') {
      // Buscar por UUID del artista
      const artist = allData.artists.find(a => a.id === entityId);
      if (!artist) return 0;
      return allData.songs.filter(s => s.artistId === artist.genreSlug).length;
    }
    if (entityType === 'genre') {
      // Buscar UUID del género
      const genre = allData.genres.find(g => g.id === entityId);
      if (!genre) return 0;
      return allData.songs.filter(s => s.genreId === genre._uuid).length;
    }
    if (entityType === 'album') {
      const album = allData.albums.find(a => a.id === entityId);
      if (!album) return 0;
      return allData.songs.filter(s => s.albumId === album._uuid).length;
    }
    return 0;
  };

  const getArtistsCount = (genreId) => {
    const genre = allData.genres.find(g => g.id === genreId);
    if (!genre) return 0;
    return allData.artists.filter(a => a.genreId === genre._uuid).length;
  };

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasResults = results.songs.length > 0 || 
                     results.artists.length > 0 || 
                     results.genres.length > 0 || 
                     results.albums.length > 0;

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <S.Header>
          <h2>Buscar</h2>
          <S.CloseButton onClick={onClose}>
            <FiX size={24} />
          </S.CloseButton>
        </S.Header>

        {/* Input */}
        <S.SearchInput
          type="text"
          placeholder="Buscar canciones, artistas, géneros..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          disabled={loading}
        />

        {/* Resultados */}
        <S.Results>
          {loading ? (
            <S.EmptyState>
              Cargando datos...
            </S.EmptyState>
          ) : query.trim() === '' ? (
            <S.EmptyState>
              Escribe para buscar en el catálogo...
            </S.EmptyState>
          ) : !hasResults ? (
            <S.EmptyState>
              No se encontraron resultados para "{query}"
            </S.EmptyState>
          ) : (
            <>
              {/* Canciones */}
              {results.songs.length > 0 && (
                <S.Section>
                  <S.SectionTitle>
                    <FiMusic size={18} />
                    CANCIONES ({results.songs.length})
                  </S.SectionTitle>
                  {results.songs.map(song => (
                    <S.ResultItem key={song.id} onClick={() => handleSongClick(song)}>
                      <S.ResultIcon>
                        <FiMusic size={20} />
                      </S.ResultIcon>
                      <S.ResultInfo>
                        <S.ResultTitle>{song.title}</S.ResultTitle>
                        <S.ResultSubtitle>
                          {song.artistName} • {song.difficulty}
                        </S.ResultSubtitle>
                      </S.ResultInfo>
                    </S.ResultItem>
                  ))}
                </S.Section>
              )}

              {/* Artistas */}
              {results.artists.length > 0 && (
                <S.Section>
                  <S.SectionTitle>
                    <FiUser size={18} />
                    ARTISTAS ({results.artists.length})
                  </S.SectionTitle>
                  {results.artists.map(artist => {
                    const songsCount = getSongsCount(artist.id, 'artist');
                    return (
                      <S.ResultItem key={artist.id} onClick={() => handleArtistClick(artist)}>
                        <S.ResultIcon>
                          <FiUser size={20} />
                        </S.ResultIcon>
                        <S.ResultInfo>
                          <S.ResultTitle>{artist.name}</S.ResultTitle>
                          <S.ResultSubtitle>
                            {songsCount} Canciones
                          </S.ResultSubtitle>
                        </S.ResultInfo>
                      </S.ResultItem>
                    );
                  })}
                </S.Section>
              )}

              {/* Géneros */}
              {results.genres.length > 0 && (
                <S.Section>
                  <S.SectionTitle>
                    <FiDisc size={18} />
                    GÉNEROS ({results.genres.length})
                  </S.SectionTitle>
                  {results.genres.map(genre => {
                    const songsCount = getSongsCount(genre.id, 'genre');
                    const artistsCount = getArtistsCount(genre.id);
                    return (
                      <S.ResultItem key={genre.id} onClick={() => handleGenreClick(genre)}>
                        <S.ResultIcon>
                          <FiDisc size={20} />
                        </S.ResultIcon>
                        <S.ResultInfo>
                          <S.ResultTitle>{genre.name}</S.ResultTitle>
                          <S.ResultSubtitle>
                            {songsCount} Canciones • {artistsCount} Artistas
                          </S.ResultSubtitle>
                        </S.ResultInfo>
                      </S.ResultItem>
                    );
                  })}
                </S.Section>
              )}

              {/* Álbumes */}
              {results.albums.length > 0 && (
                <S.Section>
                  <S.SectionTitle>
                    <FiFolder size={18} />
                    ÁLBUMES ({results.albums.length})
                  </S.SectionTitle>
                  {results.albums.map(album => {
                    const songsCount = getSongsCount(album.id, 'album');
                    return (
                      <S.ResultItem key={album.id} onClick={() => handleAlbumClick(album)}>
                        <S.ResultIcon>
                          <FiFolder size={20} />
                        </S.ResultIcon>
                        <S.ResultInfo>
                          <S.ResultTitle>{album.name}</S.ResultTitle>
                          <S.ResultSubtitle>
                            {songsCount} Canciones • Nivel {album.level}
                          </S.ResultSubtitle>
                        </S.ResultInfo>
                      </S.ResultItem>
                    );
                  })}
                </S.Section>
              )}
            </>
          )}
        </S.Results>
      </S.Modal>
    </S.Overlay>
  );
}