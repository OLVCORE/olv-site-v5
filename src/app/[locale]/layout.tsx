import { ReactNode } from 'react';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Internationalization temporarily disabled
  return <>{children}</>;
} 