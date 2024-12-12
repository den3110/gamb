import { Metadata } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';

import AuthProvider from '@/components/AuthProvider';
import NotificationProvider from '@/components/ReduxProvider';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import StoreProvider from '@/components/StoreProvider';
import ThemeProvider from '@/components/ThemeProvider';
import { API_NAME, API_ROUTES } from '@/constances/api';
import { ACCESS_TOKEN } from '@/constances/auth';
import StoreCtx from '@/contexts/StoreCtx';
import { iGameCategory } from '@/interface/game';

const font = Roboto_Condensed({
  weight: ['300', '400', '700'],
  subsets: ['vietnamese'],
});

const getGameCategories = async (token: any) => {
  if (!token) {
    return [];
  }

  const data = await fetch(API_ROUTES[API_NAME.GAME_CATEGORY], {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

  const requset = data.map((ep: iGameCategory) => {
    return new Promise(async (resolve) => {
      console.log(ep.isList, 'isList=');

      if (!ep.isList) {
        return resolve(ep);
      }

      const subCategories = await fetch(
        API_ROUTES[API_NAME.GAME_CATEGORY] + `/${ep.catId}`,
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then((res) => res.json())
        .catch(() => {
          return [] as any;
        });

      console.log(subCategories, '=subCategories=');

      return resolve({
        ...ep,
        subCategories,
      });
    });
  });

  const gameCategories = await Promise.all(requset);

  return gameCategories;
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: Record<string, any>;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get(
    Buffer.from(ACCESS_TOKEN).toString('base64'),
  )?.value;
  const gameCategories = await getGameCategories(token);

  let messages;
  try {
    messages = (await import(`@/locale/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className={font.className}>
      <head />
      <body>
        <NotificationProvider>
          <AuthProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <ThemeProvider locale={locale}>
                <StoreProvider gameCategories={gameCategories}>
                  <SiteHeader gameCategories={gameCategories} />
                  <main className="relative">{children}</main>
                  {!token && <SiteFooter />}
                </StoreProvider>
              </ThemeProvider>
            </NextIntlClientProvider>
          </AuthProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('site');
  const locale = getLocale();
  const title = t('title');
  const description = t('desc');

  return {
    title,
    description,
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      title,
      description,
      url: 'https://nextjs.org',
      siteName: title,
      images: [
        {
          url: 'https://nextjs.org/og.png',
          width: 800,
          height: 600,
        },
        {
          url: 'https://nextjs.org/og-alt.png',
          width: 1800,
          height: 1600,
          alt: 'My custom alt',
        },
      ],
      locale,
      type: 'website',
    },
  };
}
