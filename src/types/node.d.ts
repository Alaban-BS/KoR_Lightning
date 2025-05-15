/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    VITE_APP_TITLE: string;
    [key: string]: string | undefined;
  }
}

declare module 'node:*' {
  const content: any;
  export default content;
} 