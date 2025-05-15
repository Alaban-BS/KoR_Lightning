# KOR Order Management Layout

## Overview
The KOR (King of Reach) Order Management Layout is a specialized vertical split layout optimized for order management and product selection. The layout is divided into four main sections, each with a specific purpose and height ratio, designed to provide an efficient workflow for order processing.

## Layout Structure

### Header (5% height)
- Fixed position at the top
- Minimum height: 48px
- Contains:
  - Application title "King of Reach"
  - Theme switch button (light/dark mode)
  - Additional navigation elements (if any)

### Main Content Area (90% height)
The main content area is split vertically into two sections:

#### Price List (50% of main content)
- Product Catalog/Price List
- Scrollable independently
- Features:
  - Product search and filtering
  - Product grid/list view
  - Product details
  - Quick add to order functionality
  - Stock information
  - Country flags for product origins

#### Order List (40% of main content)
- Current Order
- Scrollable independently
- Features:
  - Order items list
  - Quantity adjustments
  - Remove items
  - Order management controls
  - Order totals
  - Save/Load order functionality

### Order Button (5% height)
- Fixed position at the bottom
- Minimum height: 48px
- Features:
  - Submit order button
  - Disabled when no items in order
  - Centered with maximum width
  - Clear visual feedback

## Responsive Behavior
- The layout maintains its vertical split on all screen sizes
- Each section has independent scrolling
- Minimum heights are enforced to ensure usability
- The layout adjusts to the viewport height while maintaining proportions
- The order button remains accessible at all times

## Theme Integration
- The layout respects both light and dark themes
- Border colors and backgrounds adapt to the current theme
- Scrollbars follow the theme's color scheme
- Text and interactive elements maintain proper contrast in both themes
- The order button uses primary color with proper contrast

## Technical Implementation
```typescript
// KOR Order Management Layout
<Box 
  sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
  className="kor-order-management-layout"
>
  {/* KOR Layout: Header Section (5%) */}
  <Box sx={{ height: '5%', minHeight: '48px' }}>
    <Header />
  </Box>

  {/* KOR Layout: Main Content Area (90%) */}
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column',
    height: '90%',
    overflow: 'hidden'
  }}>
    {/* KOR Layout: Price List Section (50% of main content) */}
    <Box sx={{ 
      height: '50%',
      overflow: 'auto'
    }}>
      <PriceList />
    </Box>
    
    {/* KOR Layout: Order List Section (40% of main content) */}
    <Box sx={{ 
      height: '40%',
      overflow: 'auto'
    }}>
      <Order />
    </Box>
  </Box>

  {/* KOR Layout: Order Button Section (5%) */}
  <Box sx={{ 
    height: '5%',
    minHeight: '48px'
  }}>
    <Button>Submit Order</Button>
  </Box>
</Box>
```

## Best Practices
1. Always maintain the specified height ratios:
   - Header: 5%
   - Price List: 50% of main content
   - Order List: 40% of main content
   - Order Button: 5%
2. Ensure both main sections remain independently scrollable
3. Keep the header and order button fixed in their positions
4. Maintain proper spacing between sections
5. Use consistent border and padding styles
6. Ensure proper overflow handling in scrollable sections
7. Keep the order button disabled when appropriate

## Accessibility Considerations
- All sections should be keyboard navigable
- Maintain proper contrast ratios in both themes
- Ensure scrollable areas are properly announced to screen readers
- Keep interactive elements easily reachable
- Maintain proper focus management between sections
- Provide clear feedback for the order button state
- Include proper ARIA labels for all interactive elements

## CSS Class Naming Convention
The layout uses the following CSS class naming convention:
- Main layout container: `kor-order-management-layout`
- Individual sections can be targeted using:
  - `.kor-order-management-layout > header`
  - `.kor-order-management-layout > main`
  - `.kor-order-management-layout > .price-list`
  - `.kor-order-management-layout > .order-list`
  - `.kor-order-management-layout > .order-button` 