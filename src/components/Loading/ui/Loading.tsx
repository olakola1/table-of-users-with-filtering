import style from './style.module.scss';

export const Loading = () => {
  return (
    <div className={style.loading}>
      <div className={style.spinner}></div>
      <div className={style.text}>Загрузка</div>
    </div>
  )
};
