# Internationalization Guide

This document provides information about the internationalization (i18n) setup and usage in the project.

## Overview

The project uses `i18next` and `react-i18next` for internationalization support. This allows for easy translation of text content and proper handling of different languages and locales.

## Setup

### Configuration

The i18n configuration is located in `src/i18n.ts`:

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: require('./locales/en.json')
      },
      // Add more languages here
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
```

### Translation Files

Translation files are stored in the `src/locales` directory:

```
locales/
├── en.json
├── es.json
└── fr.json
```

Example translation file (`en.json`):
```json
{
  "orderManagement": {
    "emptyOrderMessage": "Enter order name",
    "selectCustomer": "Select Customer",
    "totalVolume": "Total Volume",
    "totalWeight": "Total Weight"
  }
}
```

## Usage

### Basic Translation

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('orderManagement.emptyOrderMessage')}</h1>
    </div>
  );
};
```

### Translation with Variables

```tsx
const MyComponent = () => {
  const { t } = useTranslation();
  const name = 'John';

  return (
    <div>
      <p>{t('greeting', { name })}</p>
    </div>
  );
};
```

Translation file:
```json
{
  "greeting": "Hello, {{name}}!"
}
```

### Pluralization

```tsx
const MyComponent = () => {
  const { t } = useTranslation();
  const count = 5;

  return (
    <div>
      <p>{t('items', { count })}</p>
    </div>
  );
};
```

Translation file:
```json
{
  "items": {
    "one": "{{count}} item",
    "other": "{{count}} items"
  }
}
```

### Language Switching

```tsx
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('es')}>Español</button>
      <button onClick={() => changeLanguage('fr')}>Français</button>
    </div>
  );
};
```

## Best Practices

1. **Translation Keys**
   - Use nested keys for better organization
   - Use descriptive key names
   - Follow a consistent naming convention

2. **Translation Files**
   - Keep translations organized by feature
   - Use JSON format for better maintainability
   - Include comments for complex translations

3. **Component Usage**
   - Use the `useTranslation` hook
   - Avoid hardcoded strings
   - Handle missing translations gracefully

4. **Performance**
   - Load translations dynamically
   - Cache translations when possible
   - Use translation namespaces for better code splitting

## Adding New Languages

1. Create a new translation file in `src/locales`:
   ```json
   // src/locales/es.json
   {
     "orderManagement": {
       "emptyOrderMessage": "Ingrese el nombre del pedido",
       "selectCustomer": "Seleccionar Cliente",
       "totalVolume": "Volumen Total",
       "totalWeight": "Peso Total"
     }
   }
   ```

2. Add the language to the i18n configuration:
   ```typescript
   i18n.init({
     resources: {
       en: {
         translation: require('./locales/en.json')
       },
       es: {
         translation: require('./locales/es.json')
       }
     }
   });
   ```

## Testing

### Translation Testing

```tsx
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders translated content', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MyComponent />
      </I18nextProvider>
    );
    expect(screen.getByText('Expected Translation')).toBeInTheDocument();
  });
});
```

## Troubleshooting

### Common Issues

1. **Missing Translations**
   - Check translation key spelling
   - Verify translation file structure
   - Ensure language is properly configured

2. **Translation Not Updating**
   - Clear browser cache
   - Check i18n configuration
   - Verify language switching logic

3. **Build Issues**
   - Check import paths
   - Verify JSON file format
   - Ensure proper webpack configuration

## Additional Resources

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [i18next-http-backend](https://github.com/i18next/i18next-http-backend)
- [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) 