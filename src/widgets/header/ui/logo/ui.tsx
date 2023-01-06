import Image from 'next/image';
import Link from 'next/link';
import { RoutesEnum } from 'shared/config';
import styles from './styles.module.scss';

export const Logo = () => {
  return (
    <Link href={RoutesEnum.Home} className={styles.logo}>
      <Image priority className={styles.image} width={131} height={26} src="/logo.svg" alt="Kinomore" />
    </Link>
  );
};
