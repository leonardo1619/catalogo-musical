import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { FiX, FiMusic, FiUser, FiDisc, FiFolder } from 'react-icons/fi';
import * as S from './styles';

import songsData from '../../data/songs.json';
import artistsData from '../../data/artists.json';
import genresData from '../../data/genres.json';
import albumsData from '../../data/albums.json';

export function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({
    songs: [],
    artists: [],
    genres: [],
    albums: []
  });
  const navigate = useNavigate();

  // Configurar Fuse.js para cada tipo de búsqueda
  const fuseOptions = {
    threshold: 0.3,
    keys: ['name', 'title']
  };

  const songsFuse = new Fuse(songsData, { ...fuseOptions, keys: ['title'] });
  const artistsFuse = new Fuse(artistsData, fuseOptions);
  const genresFuse = new Fuse(genresData, fuseOptions);
  const albumsFuse = new Fuse(albumsData, fuseOptions);

  // Buscar en tiempo real
  useEffect(() => {
    if (query.trim() === '') {
      setResults({ songs: [], artists: [], genres: [], albums: [] });
      return;
    }

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
  }, [query]);

  // Navegar a resultado
  const handleSongClick = (song) => {
    navigate(`/pdf/${song.id}`);
    onClose();
  };

  const handleArtistClick = (artist) => {
    navigate(`/genero/${artist.genreId}/artista/${artist.id}`);
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
        />

        {/* Resultados */}
        <S.Results>
          {query.trim() === '' ? (
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
                  {results.songs.map(song => {
                    const artist = artistsData.find(a => a.id === song.artistId);
                    return (
                      <S.ResultItem key={song.id} onClick={() => handleSongClick(song)}>
                        <S.ResultIcon>
                          <FiMusic size={20} />
                        </S.ResultIcon>
                        <S.ResultInfo>
                          <S.ResultTitle>{song.title}</S.ResultTitle>
                          <S.ResultSubtitle>
                            {artist?.name} • {song.difficulty}
                          </S.ResultSubtitle>
                        </S.ResultInfo>
                      </S.ResultItem>
                    );
                  })}
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
                    const artistSongs = songsData.filter(s => s.artistId === artist.id);
                    return (
                      <S.ResultItem key={artist.id} onClick={() => handleArtistClick(artist)}>
                        <S.ResultIcon>
                          <FiUser size={20} />
                        </S.ResultIcon>
                        <S.ResultInfo>
                          <S.ResultTitle>{artist.name}</S.ResultTitle>
                          <S.ResultSubtitle>
                            {artistSongs.length} Canciones
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
                    const genreSongs = songsData.filter(s => s.genreId === genre.id);
                    const genreArtists = artistsData.filter(a => a.genreId === genre.id);
                    return (
                      <S.ResultItem key={genre.id} onClick={() => handleGenreClick(genre)}>
                        <S.ResultIcon>
                          <FiDisc size={20} />
                        </S.ResultIcon>
                        <S.ResultInfo>
                          <S.ResultTitle>{genre.name}</S.ResultTitle>
                          <S.ResultSubtitle>
                            {genreSongs.length} Canciones • {genreArtists.length} Artistas
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
                    const albumSongs = songsData.filter(s => s.albumId === album.id);
                    return (
                      <S.ResultItem key={album.id} onClick={() => handleAlbumClick(album)}>
                        <S.ResultIcon>
                          <FiFolder size={20} />
                        </S.ResultIcon>
                        <S.ResultInfo>
                          <S.ResultTitle>{album.name}</S.ResultTitle>
                          <S.ResultSubtitle>
                            {albumSongs.length} Canciones • Nivel {album.level}
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