'use client';

import { ReactNode } from 'react';

import StoreCtx from '@/contexts/StoreCtx';
import { iGameCategory } from '@/interface/game';

export default function StoreProvider({
  gameCategories,
  children,
}: {
  gameCategories: iGameCategory[];
  children: ReactNode;
}) {
  return (
    <StoreCtx.Provider value={{ gameCategories }}>{children}</StoreCtx.Provider>
  );
}
