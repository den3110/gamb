import LobbyProducts from '@/components/LobbyProduct/list';
import MainBanner from '@/components/MainBanner';

export default async function Page() {
  return (
    <>
      <MainBanner />

      <LobbyProducts />
    </>
  );
}
