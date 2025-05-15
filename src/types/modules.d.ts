declare module 'vite' {
  export * from 'vite';
}

declare module '@vitejs/plugin-react' {
  import { Plugin } from 'vite';
  const react: () => Plugin;
  export default react;
}

declare module 'path' {
  export * from 'path';
}

declare module 'url' {
  export * from 'url';
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: any;
  export default content;
} 