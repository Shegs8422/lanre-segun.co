# Audio Files Directory

This directory contains music files for the vinyl record player components.

## Required Files

Please add the following audio files to this directory:

1. **clube-da-esquina.mp3** - for "Clube da Esquina" by Milton Nascimento
2. **initial-d.mp3** - for "Super Eurobeat Collection" by Initial D  
3. **scenery.mp3** - for "Scenery" by Ryo Fukui

## Supported Formats

- MP3 (recommended)
- WAV
- OGG
- M4A

## File Naming

Make sure the filenames match exactly as referenced in `app.vue`:
- `/audio/clube-da-esquina.mp3`
- `/audio/initial-d.mp3`
- `/audio/scenery.mp3`

## Adding Your Own Songs

To add your own music files:

1. Place your audio file in this `public/audio` directory
2. Update the corresponding `VinylRecord` component in `app.vue` with the `musicFile` prop:

```vue
<VinylRecord 
  cover="/images/your-album-cover.jpg"
  album="Your Album Name"
  artist="Artist Name"
  musicFile="/audio/your-song.mp3"
  classes="..."
  :stagger="33"
/>
```

## Notes

- Files in the `public` directory are served at the root path
- Reference audio files as `/audio/filename.mp3` (not `/public/audio/...`)
- Smaller file sizes will load faster (consider reducing bitrate if needed)
