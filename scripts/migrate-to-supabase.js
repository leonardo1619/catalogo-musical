import dotenv from 'dotenv'
dotenv.config()

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Configurar __dirname para ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configurar Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Falta VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Función para leer archivos JSON
function readJSON(filename) {
  const filepath = path.join(__dirname, '..', 'src', 'data', filename)
  const data = fs.readFileSync(filepath, 'utf-8')
  return JSON.parse(data)
}

// Función para convertir ID de string a slug
function convertId(id) {
  return id // Los IDs en JSON ya son slugs
}

async function migrateGenres() {
  console.log('\n📂 Migrando géneros...')
  const genres = readJSON('genres.json')

  for (const genre of genres) {
    const { error } = await supabase
      .from('genres')
      .insert({
        slug: genre.id,
        name: genre.name,
        image: genre.image,
        hero_image: genre.heroImage
      })

    if (error) {
      console.error(`❌ Error insertando género ${genre.name}:`, error.message)
    } else {
      console.log(`✅ Género insertado: ${genre.name}`)
    }
  }
}

async function migrateArtists() {
  console.log('\n🎤 Migrando artistas...')
  const artists = readJSON('artists.json')
  const genres = readJSON('genres.json')

  // Obtener IDs reales de géneros desde Supabase
  const { data: genresData } = await supabase.from('genres').select('id, slug')
  const genreMap = {}
  genresData.forEach(g => {
    genreMap[g.slug] = g.id
  })

  for (const artist of artists) {
    const genreUUID = genreMap[artist.genreId]

    if (!genreUUID) {
      console.error(`❌ No se encontró género ${artist.genreId} para artista ${artist.name}`)
      continue
    }

    const { error } = await supabase
      .from('artists')
      .insert({
        slug: artist.id,
        name: artist.name,
        genre_id: genreUUID,
        image: artist.image,
        hero_image: artist.heroImage
      })

    if (error) {
      console.error(`❌ Error insertando artista ${artist.name}:`, error.message)
    } else {
      console.log(`✅ Artista insertado: ${artist.name}`)
    }
  }
}

async function migrateAlbums() {
  console.log('\n💿 Migrando álbumes...')
  const albums = readJSON('albums.json')

  for (const album of albums) {
    const { error } = await supabase
      .from('albums')
      .insert({
        slug: album.id,
        name: album.name,
        instrument: album.instrument,
        level: album.level,
        image: album.image
      })

    if (error) {
      console.error(`❌ Error insertando álbum ${album.name}:`, error.message)
    } else {
      console.log(`✅ Álbum insertado: ${album.name}`)
    }
  }
}

async function migrateSongs() {
  console.log('\n🎵 Migrando canciones...')
  const songs = readJSON('songs.json')

  // Obtener IDs reales desde Supabase
  const { data: artistsData } = await supabase.from('artists').select('id, slug')
  const { data: genresData } = await supabase.from('genres').select('id, slug')
  const { data: albumsData } = await supabase.from('albums').select('id, slug')

  const artistMap = {}
  const genreMap = {}
  const albumMap = {}

  artistsData.forEach(a => { artistMap[a.slug] = a.id })
  genresData.forEach(g => { genreMap[g.slug] = g.id })
  albumsData.forEach(a => { albumMap[a.slug] = a.id })

  for (const song of songs) {
    const artistUUID = artistMap[song.artistId]
    const genreUUID = genreMap[song.genreId]
    const albumUUID = song.albumId ? albumMap[song.albumId] : null

    if (!artistUUID) {
      console.error(`❌ No se encontró artista ${song.artistId} para canción ${song.title}`)
      continue
    }

    if (!genreUUID) {
      console.error(`❌ No se encontró género ${song.genreId} para canción ${song.title}`)
      continue
    }

    const { error } = await supabase
      .from('songs')
      .insert({
        slug: song.id,
        title: song.title,
        artist_id: artistUUID,
        genre_id: genreUUID,
        album_id: albumUUID,
        difficulty: song.difficulty,
        pdf_url: song.pdf
      })

    if (error) {
      console.error(`❌ Error insertando canción ${song.title}:`, error.message)
    } else {
      console.log(`✅ Canción insertada: ${song.title}`)
    }
  }
}

async function migrate() {
  console.log('🚀 Iniciando migración a Supabase...')
  console.log(`📡 URL: ${supabaseUrl}`)

  try {
    await migrateGenres()
    await migrateArtists()
    await migrateAlbums()
    await migrateSongs()

    console.log('\n🎉 ¡Migración completada exitosamente!')
  } catch (error) {
    console.error('\n❌ Error en la migración:', error)
    process.exit(1)
  }
}

// Ejecutar migración
migrate()