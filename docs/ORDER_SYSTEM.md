# Order System Documentation

## Overview
The order system is a comprehensive solution for managing product orders, including order creation, management, and line item handling. It provides a user-friendly interface for creating and managing orders with real-time calculations and visual feedback.

## Components

### 1. Order Management
The order management component serves as the main controller for the order system.

#### Features
- Create new orders
- Load existing orders
- Delete orders
- Save order changes
- Order naming and validation
- Order duplication

#### Usage
```typescript
<OrderManagement
  currentOrderId={string | null}
  currentOrderLines={OrderLine[]}
  onLoadOrder={(lines, id) => void}
  onNewOrder={() => void}
/>
```

### 2. Order Component
The main order display component that shows the current order's details and line items.

#### Features
- Display order lines with product details
- Show total volume and weight
- Handle order line removal
- Highlight modified lines
- Real-time calculations
- Responsive design

#### Usage
```typescript
<Order
  orderLines={OrderLine[]}
  productData={Product[]}
  onRemoveLine={(sku: string) => void}
  orderManagement={React.ReactNode}
/>
```

### 3. OrderLineItem Component
Individual order line display component showing detailed product information.

#### Features
- Product name and SKU display
- Quantity management
- Price calculations with discounts
- Volume and weight information
- Remove functionality
- Visual feedback for changes

#### Usage
```typescript
<OrderLineItem
  line={OrderLine}
  product={Product}
  pricing={Pricing}
  volume={number}
  weight={number}
  onRemove={() => void}
/>
```

## Data Structures

### OrderLine
```typescript
interface OrderLine {
  SKU: string;
  qty: number;
}
```

### Product
```typescript
interface Product {
  SKU: string;
  Name: string;
  "Price unit price": number;
  "Order unit price": number;
  "Price Unit": string;
  "Order unit": string;
  Weight_KG: number;
  M3: number;
  "Colli per pallet": number;
  "Colli": number;
  "Product Category": string;
  Subcategory: string;
  "Origin of product": string;
  "Discount %": number;
}
```

### Pricing
```typescript
interface Pricing {
  basePrice: number;
  finalPrice: number;
  totalDiscountRate: number;
  lineTotal: number;
  isPalletMultiple: boolean;
  savedAmount: number;
}
```

## Functionality

### Order Creation
1. User clicks "New Order" button
2. System prompts for order name
3. Validates order name (required, unique)
4. Creates new order with empty line items
5. Updates order list

### Adding Products
1. User selects product from price list
2. System adds product to order lines
3. Calculates prices and discounts
4. Updates totals and displays visual feedback

### Order Line Management
1. Quantity updates
   - User modifies quantity
   - System recalculates prices
   - Updates volume and weight totals
   - Applies pallet discounts if applicable

2. Line removal
   - User clicks remove button
   - System removes line with animation
   - Updates order totals
   - Saves changes

### Order Saving
1. Automatic saving on changes
2. Manual save option
3. Validation before saving
4. Error handling and feedback

### Discounts
1. Regular discounts
   - Applied based on product settings
   - Shown as percentage
   - Calculated in final price

2. Pallet discounts
   - Applied when order quantity matches pallet size
   - Additional to regular discounts
   - Visual indication of pallet quantity

## Visual Design

### Order Management
- Clean, modern interface
- Clear hierarchy of information
- Responsive layout
- Intuitive controls

### Order Lines
- Clear product information
- Prominent quantity controls
- Visible price calculations
- Easy-to-read totals

### Status Indicators
- Stock status with color coding
- Discount indicators
- Pallet quantity highlights
- Change animations

## Responsive Design
- Adapts to different screen sizes
- Mobile-friendly controls
- Readable on all devices
- Touch-friendly interface

## Error Handling
- Input validation
- Error messages
- Recovery options
- User feedback

## Performance
- Efficient calculations
- Smooth animations
- Quick response times
- Optimized rendering

## Best Practices
1. Always validate input
2. Provide clear feedback
3. Save changes automatically
4. Handle errors gracefully
5. Maintain consistent styling
6. Ensure accessibility
7. Test on all devices 