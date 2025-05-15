/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_APP_TITLE: string;
  }
}

declare module 'node:*' {
  const content: any;
  export default content;
} 