
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  import path from 'path';

  export default defineConfig({
    base: '/AgroGuard/',
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'react-resizable-panels@2.1.7': 'react-resizable-panels',
        'input-otp@1.4.2': 'input-otp',
        'figma:asset/a57ba80af0a2f259fe0a8a21a1157e6ef2f7a57b.png': path.resolve(__dirname, './src/assets/a57ba80af0a2f259fe0a8a21a1157e6ef2f7a57b.png'),
        'figma:asset/8e44d9c82de72f05d8af8c00d2da26f5a5e4b516.png': path.resolve(__dirname, './src/assets/8e44d9c82de72f05d8af8c00d2da26f5a5e4b516.png'),
        'figma:asset/8428a3bd8a4c0dabdf2595d305c1b509163a4795.png': path.resolve(__dirname, './src/assets/8428a3bd8a4c0dabdf2595d305c1b509163a4795.png'),
        'figma:asset/097b7628a46b2835e8189089a2a35b80d50981bb.png': path.resolve(__dirname, './src/assets/097b7628a46b2835e8189089a2a35b80d50981bb.png'),
        'embla-carousel-react@8.6.0': 'embla-carousel-react',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
    },
    server: {
      port: 3000,
      open: true,
    },
  });