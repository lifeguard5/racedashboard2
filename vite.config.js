import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Race-Dashboard/',
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        rennen: resolve(__dirname, 'rennen.html'),
        kalender: resolve(__dirname, 'kalender.html'),
        serien: resolve(__dirname, 'serien.html'),
        serie: resolve(__dirname, 'serie.html'),
        race: resolve(__dirname, 'race.html'),
        watchlist: resolve(__dirname, 'watchlist.html'),
        about: resolve(__dirname, 'about.html'),
        notfound: resolve(__dirname, '404.html')
      }
    }
  }
});
