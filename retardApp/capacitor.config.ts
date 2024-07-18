import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'myYnov-Boilerplate',
  webDir: 'dist',
  plugins: {
    BarcodeScanner: {
      android: {
        permissions: [
             'android.permission.CAMERA',
          'android.permission.FLASHLIGHT'
        ],
        enableVibration: true,
        enableSound: true,
      },
    },
  },
};

export default config;
