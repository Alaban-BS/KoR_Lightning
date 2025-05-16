/// <reference types="react" />
/// <reference types="react-dom" />

declare module 'react' {
  export * from '@types/react';
  export const useState: typeof import('@types/react').useState;
  export const useEffect: typeof import('@types/react').useEffect;
  export const useCallback: typeof import('@types/react').useCallback;
  export const useMemo: typeof import('@types/react').useMemo;
  export const useRef: typeof import('@types/react').useRef;
  export const useContext: typeof import('@types/react').useContext;
  export const useReducer: typeof import('@types/react').useReducer;
  export const useLayoutEffect: typeof import('@types/react').useLayoutEffect;
  export const useImperativeHandle: typeof import('@types/react').useImperativeHandle;
  export const useDebugValue: typeof import('@types/react').useDebugValue;
  export const useId: typeof import('@types/react').useId;
  export const useTransition: typeof import('@types/react').useTransition;
  export const useDeferredValue: typeof import('@types/react').useDeferredValue;
  export const useSyncExternalStore: typeof import('@types/react').useSyncExternalStore;
  export const useInsertionEffect: typeof import('@types/react').useInsertionEffect;
}

declare module 'react-i18next' {
  export * from '@types/react-i18next';
  export const useTranslation: typeof import('@types/react-i18next').useTranslation;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 