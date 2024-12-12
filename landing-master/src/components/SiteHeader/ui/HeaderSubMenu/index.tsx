import style from './style.module.css';

const HeaderSubMenu = () => {
  const item = (
    <div className={style.header_sub_menu_item}>
      <div className={style.header_sub_menu_bg}>
        <picture>
          <source type="image/webp" srcSet="/Bg.webp" />
          <img alt="" src="/Bg.jpg" />
        </picture>
      </div>

      <div className={style.header_sub_menu_vision}>
        <picture>
          <source
            type="image/webp"
            srcSet="https://i.vixcdn.com/MS2/template/_global/common/Images/HeaderMenu/Sports/Soccer.webp?v20230706164408"
          />
          <img
            alt=""
            src="https://i.vixcdn.com/MS2/template/_global/common/Images/HeaderMenu/Sports/Soccer.png?v20230706164408"
          />
        </picture>
      </div>

      <div className={style.header_sub_menu_play}>
        <span>Chơi ngay</span>
      </div>

      <div className={style.header_sub_menu_name}>
        <span>Chơi ngay</span>
        <img src="/arrow.svg" alt="" />
      </div>
    </div>
  );

  return (
    <div className={style.header_sub_menu}>
      <div className={style.header_sub_menu_container}>
        <div className={style.swiper_wrapper}>
          {item}
          {item}
        </div>
      </div>
    </div>
  );
};

export default HeaderSubMenu;
