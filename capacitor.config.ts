import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'capacitor-camera',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    url: "http://192.168.86.49:3001/",
    cleartext: true
  }
};

export default config;
