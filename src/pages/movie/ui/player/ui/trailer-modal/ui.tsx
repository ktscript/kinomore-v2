import clsx from 'clsx';
import { useState } from 'react';
import { useStore } from 'effector-react';
import { pageModel } from 'pages/movie';
import { useToggler } from 'shared/lib/hooks';
import { CloseIcon, Popup, Spinner } from 'shared/ui';
import styles from './styles.module.scss';

export const TrailerModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { videos } = useStore(pageModel.$movie)!;
  const trailerModal = useToggler(pageModel.trailerModalToggler);
  const lastTrailer = videos?.trailers.slice(-1)[0];

  return (
    <Popup
      onClick={trailerModal.close}
      className={styles.modal}
      isOpen={trailerModal.isOpen}
      close={trailerModal.close}>
      <button onClick={trailerModal.close} className={clsx('btn-reset', styles.close)}>
        <CloseIcon />
      </button>
      <div className={styles.content}>
        {videos?.trailers.length ? (
          <>
            {isLoading && (
              <div className={styles.spinner}>
                <Spinner strokeWidth={2} />
              </div>
            )}
            <iframe
              onLoad={() => setIsLoading(false)}
              className={styles.iframe}
              src={lastTrailer?.url}
              title="Трейлер"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </>
        ) : null}
      </div>
    </Popup>
  );
};
