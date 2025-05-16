import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';

export const TitleBar = () => {
  const { t } = useTranslation() as { t: TFunction };

  return (
    <div className="title-bar">
      <h1>{t('page.title', { defaultValue: 'Lightning-fast ordering' })}</h1>
    </div>
  );
};