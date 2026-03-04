import styles from './loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
        <div className={styles.cube}></div>
      </div>
      <span className={styles.text}>
        Галерея формируется<span className={styles.dots}></span>
      </span>
    </div>
  );
};
