# Styling Guidelines

This document provides guidelines and best practices for styling in the project, incorporating the King of Reach brand identity.

## Brand Identity Overview

King of Reach's visual identity is anchored in bold, modern tones with a confident yet approachable flair. The palette revolves around a deep indigo base, balanced with lavender accents and neutral tones for clarity and contrast.

## Brand Colour Palette

| Purpose             | Hex       | Colour Name         | Usage Description |
|---------------------|-----------|----------------------|-------------------|
| Primary             | `#24005E` | Deep Indigo          | Main brand colour – used for headers, CTAs, icons |
| Secondary           | `#7B669E` | Muted Lavender       | Highlights, secondary buttons, hover states |
| Background (light)  | `#FFFFFF` | White                | Default light theme background |
| Background (light alt) | `#F5F5F5` | Light Grey         | Panels, subtle backgrounds |
| Background (dark)   | `#121212` | Charcoal Black       | Base background in dark mode |
| Surface (dark)      | `#1E1E1E` | Dark Grey Surface    | Card backgrounds in dark theme |
| Text Primary        | `#000000` | Black                | High emphasis text on light backgrounds |
| Text Secondary      | `#666666` | Dark Grey            | Medium emphasis text on light backgrounds |
| Text on Dark        | `#FFFFFF` | White                | Text on dark backgrounds |

## Theme Implementation

### Material Light Theme

```typescript
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#24005E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7B669E',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: ['Inter', 'Scale', 'sans-serif'].join(','),
  },
});
```

### Material Dark Theme

```typescript
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7B669E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#24005E',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CCCCCC',
    },
  },
  typography: {
    fontFamily: ['Inter', 'Scale', 'sans-serif'].join(','),
  },
});
```

## Typography

The project uses a combination of:
- **Inter** – clean, modern, and readable for UI
- **Scale** – expressive and brand-forward, reserved for headings and special highlights

### Font Import

```css
/* Add to your global CSS or index.html */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap');
@import url('https://use.typekit.net/your-scale-kit.css');
```

## Usage Guidelines

### Component Styling

1. **Buttons**
   ```tsx
   import { Button } from '@mui/material';

   // Primary CTA
   <Button variant="contained" color="primary">
     Primary Action
   </Button>

   // Secondary Action
   <Button variant="outlined" color="secondary">
     Secondary Action
   </Button>
   ```

2. **Cards and Panels**
   ```tsx
   import { Card } from '@mui/material';

   <Card sx={{ 
     backgroundColor: 'background.paper',
     p: 2 
   }}>
     {/* Card content */}
   </Card>
   ```

3. **Forms**
   ```tsx
   import { TextField } from '@mui/material';

   <TextField
     sx={{
       backgroundColor: 'background.paper',
       '& .MuiOutlinedInput-root': {
         '& fieldset': {
           borderColor: 'secondary.main',
         },
       },
     }}
   />
   ```

## Accessibility Guidelines

1. **Contrast Ratios**
   - Text: Minimum 4.5:1 for normal text
   - Large Text: Minimum 3:1
   - UI Components: Minimum 3:1

2. **Color Usage**
   - Use primary color for main CTAs
   - Use secondary color for supporting actions
   - Ensure sufficient contrast in both light and dark modes

## Theme Switching

```tsx
import { useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';

const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  
  const theme = useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      {/* Your app components */}
    </ThemeProvider>
  );
};
```

## Best Practices

1. **Color Usage**
   - Use primary color for main actions and brand elements
   - Use secondary color for supporting elements
   - Maintain consistent contrast ratios

2. **Typography**
   - Use Inter for UI elements and body text
   - Use Scale for headings and brand elements
   - Maintain proper hierarchy

3. **Spacing**
   - Use theme spacing units for consistency
   - Follow Material Design spacing guidelines

4. **Responsive Design**
   - Use theme breakpoints for responsive layouts
   - Maintain readability across devices

## Additional Resources

- [Material-UI Documentation](https://mui.com/material-ui/getting-started/overview/)
- [Inter Font](https://rsms.me/inter/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Overview

The project uses a combination of CSS Modules and Material-UI for styling. This approach provides a good balance between component-specific styles and a consistent design system.

## CSS Modules

### File Structure

CSS Module files are co-located with their components:

```
src/
├── components/
│   ├── OrderHeader/
│   │   ├── OrderHeader.tsx
│   │   └── OrderHeader.module.css
│   └── Button/
│       ├── Button.tsx
│       └── Button.module.css
```

### Usage

```tsx
import styles from './OrderHeader.module.css';

const OrderHeader = () => {
  return (
    <div className={styles.orderHeader}>
      <div className={styles.orderHeaderLeft}>
        {/* Content */}
      </div>
    </div>
  );
};
```

### Naming Conventions

1. **Files**
   - Use `.module.css` extension
   - Match component name: `ComponentName.module.css`

2. **Classes**
   - Use camelCase for class names
   - Be descriptive and specific
   - Use BEM-like naming when appropriate

### Example

```css
/* OrderHeader.module.css */
.orderHeader {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.orderHeaderLeft {
  display: flex;
  gap: 1rem;
}

.orderHeaderItem {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
```

## Material-UI

### Theme Configuration

The project uses a custom Material-UI theme:

```typescript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
```

### Component Styling

1. **Styled Components**
   ```tsx
   import { styled } from '@mui/material/styles';
   import Button from '@mui/material/Button';

   const StyledButton = styled(Button)(({ theme }) => ({
     margin: theme.spacing(1),
     padding: theme.spacing(2),
   }));
   ```

2. **SX Prop**
   ```tsx
   import Box from '@mui/material/Box';

   const MyComponent = () => (
     <Box
       sx={{
         display: 'flex',
         gap: 2,
         p: 2,
       }}
     >
       {/* Content */}
     </Box>
   );
   ```

## Best Practices

### 1. Responsive Design

```css
/* Using CSS Modules */
.container {
  width: 100%;
  padding: 1rem;
}

@media (min-width: 600px) {
  .container {
    padding: 2rem;
  }
}

/* Using Material-UI */
<Box
  sx={{
    width: '100%',
    p: { xs: 1, sm: 2 },
  }}
>
  {/* Content */}
</Box>
```

### 2. Color Management

```typescript
// theme.ts
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    // ... other colors
  },
});
```

### 3. Typography

```typescript
// theme.ts
const theme = createTheme({
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
});
```

### 4. Spacing

```typescript
// Using Material-UI spacing
<Box sx={{ m: 2, p: 3 }}>  // margin: 16px, padding: 24px
<Box sx={{ gap: 2 }}>      // gap: 16px
```

## Layout Guidelines

### 1. Grid System

```tsx
import Grid from '@mui/material/Grid';

const Layout = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      {/* Content */}
    </Grid>
    <Grid item xs={12} md={6}>
      {/* Content */}
    </Grid>
  </Grid>
);
```

### 2. Flexbox

```css
.flexContainer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 600px) {
  .flexContainer {
    flex-direction: row;
  }
}
```

## Animation

### 1. CSS Transitions

```css
.button {
  transition: all 0.3s ease;
}

.button:hover {
  transform: scale(1.05);
}
```

### 2. Material-UI Transitions

```tsx
import { Fade } from '@mui/material';

const MyComponent = () => (
  <Fade in={true} timeout={500}>
    <div>Content</div>
  </Fade>
);
```

## Performance Considerations

1. **CSS-in-JS**
   - Use static styles when possible
   - Avoid dynamic styles in render
   - Use theme variables for consistency

2. **CSS Modules**
   - Keep styles scoped to components
   - Avoid global styles
   - Use composition for shared styles

3. **Material-UI**
   - Use the `sx` prop for one-off styles
   - Use styled components for reusable styles
   - Leverage theme customization

## Testing

### 1. Style Testing

```tsx
import { render } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('applies correct styles', () => {
    const { container } = render(<MyComponent />);
    const element = container.firstChild;
    expect(element).toHaveStyle({
      display: 'flex',
      gap: '1rem',
    });
  });
});
```

### 2. Theme Testing

```tsx
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

describe('Theme', () => {
  it('has correct primary color', () => {
    expect(theme.palette.primary.main).toBe('#1976d2');
  });
});
```

## Component-Specific Styling

### Stock Indicators
Stock indicators use a circular design with color-coded states:
- Green (#4caf50): Good stock level
- Orange (#ff9800): Low stock level
- Red (#f44336): Out of stock

```css
.stock-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: white;
  transition: transform 0.2s ease;
}

.stock-circle:hover {
  transform: scale(1.1);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}
```

### Quantity Input
Quantity input fields have a distinct focus state and hover effect:
```css
.quantity-input {
  width: 60px;
  text-align: center;
  padding: 4px;
  border: 1px solid var(--mui-palette-divider);
  border-radius: 4px;
  background-color: var(--mui-palette-background-default);
  color: var(--mui-palette-text-primary);
  outline: none;
  transition: all 0.2s ease;
}

.quantity-input:focus {
  border-color: var(--mui-palette-primary-main);
  box-shadow: 0 0 0 2px var(--mui-palette-primary-light);
  outline: none;
}
```

### Special Price Presentations

#### New Price
```css
.new-price {
  font-weight: bold;
  color: #d32f2f;
  background-color: #ffebee;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
}
```

#### Discount Information
```css
.discount-info {
  background-color: #fff3e0;
  color: #e65100;
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  border: 1px solid #ffe0b2;
}
```

#### Pallet Advantage
```css
.pallet-advantage {
  background-color: #e3f2fd;
  color: #1565c0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  display: inline-block;
  text-align: center;
  border: 1px solid #bbdefb;
}
```

### Savings Presentation

#### Promotional Savings
```css
.savings-promo {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 0 4px;
  border-radius: 4px;
  font-weight: 600;
  border: 1px solid #ffcdd2;
}
```

#### Pallet Savings
```css
.savings-pallet {
  background-color: #fff3e0;
  color: #e65100;
  padding: 0 4px;
  border-radius: 4px;
  font-weight: 600;
  border: 1px solid #ffe0b2;
}
```

#### Total Savings
```css
.savings-total {
  font-weight: bold;
  color: #2e7d32;
  background-color: #e8f5e9;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #c8e6c9;
}
```

## Color Palette

### Status Colors
- Success: #4caf50 (Green)
- Warning: #ff9800 (Orange)
- Error: #f44336 (Red)
- Info: #2196f3 (Blue)

### Background Colors
- Light Error: #ffebee
- Light Warning: #fff3e0
- Light Success: #e8f5e9
- Light Info: #e3f2fd

### Border Colors
- Error Border: #ffcdd2
- Warning Border: #ffe0b2
- Success Border: #c8e6c9
- Info Border: #bbdefb

## Best Practices
1. Always use the predefined color variables for consistency
2. Maintain proper contrast ratios for accessibility
3. Use appropriate padding and margins for visual hierarchy
4. Implement hover and focus states for interactive elements
5. Keep animations subtle and purposeful
6. Use consistent border-radius values
7. Maintain proper spacing between elements
8. Ensure text remains readable in all states

## Accessibility Guidelines
1. Maintain WCAG 2.1 AA contrast ratios
2. Provide clear focus indicators
3. Use semantic color meanings
4. Include proper ARIA labels
5. Ensure keyboard navigation support
6. Test with screen readers
7. Provide alternative text for visual indicators 