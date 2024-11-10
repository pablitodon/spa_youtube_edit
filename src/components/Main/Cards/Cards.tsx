/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAppSelector } from '../../../redux/store';
import { getDateFunc } from '../../../utils/getDateFunc';
import { getViewSpaceFunc } from '../../../utils/getViewSpaceFunc';
import styles from './styles.module.css';

const Cards = () => {
    const videos = useAppSelector((state) => state.videos.items);
    const { viewCard } = useAppSelector((state) => state.viewCard);
    return (
        <div className={`${viewCard === 'grid' ? styles.card__grid : styles.card__list}`}>
            {videos.map((video) => (
                <div className={`${viewCard === 'grid' ? styles.item__grid : styles.item__list}`} key={video.id.videoId || video.id.channelId}>
                    <img
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                    />
                    <div className={styles.contain__card__text}>
                        <h3>{video.snippet.title}</h3>
                        <p>{video.snippet.channelTitle}</p>
                        <p>
                            Просмотры:{video.statistics && getViewSpaceFunc(video.statistics.statistics.viewCount)}
                        </p>
                        <p>{getDateFunc(video.snippet.publishedAt)}</p>

                    </div>
                </div>
            ))
            }
        </div >
    );
};

export default Cards; 