import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { orderService, SavedOrder } from '../services/orderService';
import '../styles/SavedOrders.css';

interface SavedOrdersProps {
  orders: Array<{
    id: string;
    name: string;
    date: string;
  }>;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
}

const SavedOrders = ({ orders, onDelete, onSelect }: SavedOrdersProps) => {
  const { t } = useTranslation();

  if (orders.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" align="center">
        {t('No saved orders')}
      </Typography>
    );
  }

  return (
    <List>
      {orders.map((order) => (
        <ListItem
          key={order.id}
          secondaryAction={
            <IconButton edge="end" onClick={() => onDelete(order.id)}>
              <DeleteIcon />
            </IconButton>
          }
          onClick={() => onSelect(order.id)}
          sx={{ cursor: 'pointer' }}
        >
          <ListItemText
            primary={order.name}
            secondary={new Date(order.date).toLocaleDateString()}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default SavedOrders; 