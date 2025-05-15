# Components Documentation

This document provides detailed information about the components used in the project.

## Component Overview

### OrderHeader Component

The `OrderHeader` component is a reusable component that displays order information and allows for order name and customer selection.

#### Props

```typescript
interface OrderHeaderProps {
  orderName: string;
  onOrderNameChange: (name: string) => void;
  customer: string;
  onCustomerChange: (customerId: string) => void;
  customers: Customer[];
  totalVolume: number;
  totalWeight: number;
}

interface Customer {
  id: string;
  name: string;
}
```

#### Features

- Order name input with validation
- Customer selection dropdown
- Date display
- Total volume and weight display
- Internationalization support

#### Usage Example

```tsx
import OrderHeader from './components/OrderHeader';

const MyComponent = () => {
  const [orderName, setOrderName] = useState('');
  const [customer, setCustomer] = useState('');
  const customers = [
    { id: '1', name: 'Customer 1' },
    { id: '2', name: 'Customer 2' }
  ];

  return (
    <OrderHeader
      orderName={orderName}
      onOrderNameChange={setOrderName}
      customer={customer}
      onCustomerChange={setCustomer}
      customers={customers}
      totalVolume={100}
      totalWeight={50}
    />
  );
};
```

#### Styling

The component uses CSS modules for styling. The styles are defined in `OrderHeader.css`:

```css
.order-header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.order-header-left,
.order-header-right {
  display: flex;
  gap: 1rem;
}

.order-header-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
```

## Common Components

### Button

A reusable button component with various styles and states.

#### Props

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'small' | 'medium' | 'large';
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}
```

### Input

A reusable input component with validation and error handling.

#### Props

```typescript
interface InputProps {
  type: 'text' | 'number' | 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  label?: string;
}
```

### Select

A reusable select component with search and multi-select capabilities.

#### Props

```typescript
interface SelectProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
}
```

## Component Guidelines

### Best Practices

1. **Props**
   - Use TypeScript interfaces for prop definitions
   - Provide default values where appropriate
   - Document prop types and usage

2. **State Management**
   - Use local state for component-specific data
   - Lift state up when needed
   - Use context for global state

3. **Performance**
   - Implement React.memo for expensive renders
   - Use useCallback for event handlers
   - Use useMemo for computed values

4. **Accessibility**
   - Include ARIA labels
   - Ensure keyboard navigation
   - Maintain proper heading hierarchy

### Component Structure

```tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './ComponentName.css';

interface ComponentProps {
  // Props definition
}

const ComponentName: React.FC<ComponentProps> = ({
  // Props destructuring
}) => {
  // Hooks
  const { t } = useTranslation();

  // State and handlers

  return (
    // JSX
  );
};

export default ComponentName;
```

### Testing Components

1. **Unit Tests**
   ```tsx
   import { render, screen } from '@testing-library/react';
   import ComponentName from './ComponentName';

   describe('ComponentName', () => {
     it('renders correctly', () => {
       render(<ComponentName />);
       expect(screen.getByText('Expected Text')).toBeInTheDocument();
     });
   });
   ```

2. **Integration Tests**
   ```tsx
   describe('ComponentName Integration', () => {
     it('handles user interactions', async () => {
       render(<ComponentName />);
       await userEvent.click(screen.getByRole('button'));
       expect(screen.getByText('Updated Text')).toBeInTheDocument();
     });
   });
   ```

## Component Library

The project uses Material-UI as its component library. For more information about available components and their usage, refer to the [Material-UI documentation](https://mui.com/components/). 