export interface Config {
  backendUrl: string;
  mapboxToken: string;
}

export const config = Object.freeze({
  backendUrl: 'https://loft-taxi.glitch.me/',
  mapboxToken:
    'pk.eyJ1IjoiYWxsaXN0YSIsImEiOiJjazV0b3ZteTAwbmJ6M3Bsb3F2Z2E0aDJmIn0.yYwBFVTaGGVH0NG7g95m6g',
});
