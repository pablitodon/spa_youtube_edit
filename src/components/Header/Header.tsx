import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <span>IMGssss</span>
            </div>
            <div className={styles.wrapp}>
                <nav>
                    <ul>
                        <li>
                            <Link to='/main' className={styles.link}>Поиск</Link>
                        </li>
                        <li>
                            <Link to='favorite' className={styles.link}>Избранное</Link>
                        </li>
                    </ul>
                </nav>
                <button>Выйти</button>
            </div>
        </header>
    );
};

export default Header;