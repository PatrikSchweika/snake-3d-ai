/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_THEME_MUSIC_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
