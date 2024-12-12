import style from './style.module.css';

export function SiteFooter() {
  const item = ({ title }: { title: string }) => {
    return (
      <span className="px-3 py-2 rounded-s cursor-pointer hover:bg-[rgba(255,255,255,.12)] text-sm">
        {title}
      </span>
    );
  };

  return (
    <footer className={style.footer}>
      <div
        className="mx-auto gap-6 flex justify-center"
        style={{ maxWidth: 'calc(1024px * 0.6)' }}
      >
        <div className="flex flex-col flex-1">
          <span className="text-white font-bold text-lg mb-4 px-3 py-2">
            Nền Tảng
          </span>
          {item({ title: 'ĐT di động' })}
          {item({ title: 'Tải ứng dụng' })}
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-white font-bold text-lg mb-4 px-3 py-2">
            Sản phẩm
          </span>
          {[
            'Thể thao',
            'Thể Thao Ảo',
            'Thể Thao Điện tử',
            'Number Game',
            'Trò chơi',
            'RNG Keno',
            'Cổng Game SABA',
          ].map((i) => item({ title: i }))}
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-white font-bold text-lg mb-4 px-3 py-2">
            Ngôn ngữ
          </span>
          {['Tiếng việt', 'English'].map((i) => item({ title: i }))}
        </div>
      </div>

      <div className="text-center text-xs text-white mt-12 opacity-50">
        {`© Copyright {0}. viva88. All Rights Reserved.`}
      </div>
    </footer>
  );
}
