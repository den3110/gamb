'use client';

import { useParams } from 'next/navigation';

import { Dropdown } from 'antd';
import { usePathname } from 'next-intl/client';
import Link from 'next-intl/link';

import { languages } from '@/locale';

import Icons from './Icons';

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const params = useParams();

  const locale = params?.['locale'];

  const langName = (languages as any)[locale as any]?.name;

  return (
    <Dropdown
      className="!bg-[#2D4976] !h-[32px] text-white border-white border-solid border"
      menu={{
        items: Object.entries(languages).map(([lang, setting]) => ({
          key: lang,
          label: (
            <Link href={pathname ?? '/'} locale={lang}>
              {setting.flag}&nbsp;&nbsp;{setting.name}
            </Link>
          ),
        })),
      }}
    >
      <div
        className="flex !items-center !justify-between btn w-[110px] h-[32px] bg-white"
        role={'button'}
        tabIndex={0}
      >
        <span className="text-xs"> {langName}</span>
        <Icons.ChevronDown style={{ width: 14, height: 14 }} />
      </div>
    </Dropdown>
  );
}
