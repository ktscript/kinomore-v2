import clsx from 'clsx';
import { useEvent, useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { movieModel } from 'pages/movie';
import { favoritesModel } from 'features/favorites';
import { useToggler } from 'shared/lib';
import { Icon } from 'shared/ui/icon';
import styles from './styles.module.scss';

export const MobileActions = () => {
  const { query } = useRouter();
  const toggleFavoriteClicked = useEvent(favoritesModel.toggleFavoriteClicked);
  const isFavorite = useStore(favoritesModel.$isFavorite);
  const isRated = useStore(movieModel.$isRated);
  const rating = useStore(movieModel.$rating);
  const shareToggler = useToggler(movieModel.shareToggler);
  const gradeToggler = useToggler(movieModel.gradeToggler);
  const trailerToggler = useToggler(movieModel.trailerToggler);

  const movieId = Number(query.id);

  const items = [
    {
      label: 'Трейлер',
      handler: trailerToggler.open,
      icon: <Icon name="common/play" />,
    },
    {
      label: isFavorite ? 'Запомнен' : 'Запомнить',
      activeCondition: isFavorite,
      handler: () => toggleFavoriteClicked({ id: movieId }),
      icon: <Icon name="common/bookmark" />,
    },
    {
      label: isRated ? `Оценка ${rating}` : 'Оценить',
      activeCondition: isRated,
      handler: gradeToggler.open,
      icon: <Icon name="common/star" />,
    },
    {
      label: 'Поделится',
      handler: shareToggler.open,
      icon: <Icon name="common/share" />,
    },
  ];

  return (
    <div className={styles.root}>
      {items.map(({ label, handler, icon, activeCondition }) => (
        <button
          className={clsx(
            'btn-reset',
            activeCondition && styles.isActive,
            styles.btn
          )}
          key={label}
          onClick={handler}
        >
          <span className={styles.icon}>{icon}</span>
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </div>
  );
};
