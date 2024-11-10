import { Button, Input, Space } from 'antd';
import styles from './styles.module.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchGetSearch } from '../../../redux/slices/searchVideosSlice';
import { setSaveText } from '../../../redux/slices/saveTextSlice';
import ModalComponent from '../../ModalComponent/ModalComponent';
import { IRespSearch } from '../../../interfaces';
import { setShowFormModal } from '../../../redux/slices/showFormModalSlice';


const InputComponent = () => {
    const dispatch = useAppDispatch();
    const [textInput, setTextInput] = useState<string>('');
    const videos = useAppSelector(state => state?.videos.items)


    const handleSearchVideos = ({ order = 'relevance', maxResults, query }: IRespSearch) => {
        if (query.length === 0) {
            alert('Поиск должен включать символы.')
            return;
        }

        dispatch(fetchGetSearch({ order, maxResults, query }));
        dispatch(setSaveText(textInput))
    }

    return (
        <div className={styles.input}>
            <h2>Поиск видео</h2>
            <Space.Compact className={styles.search__container} >
                <div className={styles.input__inputWrapp}>
                    <Input
                        className={styles.input__input}
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                    />
                    {videos?.length > 0 &&
                        <button onClick={() => dispatch(setShowFormModal(true))} className={styles.input__button}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '20px' }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </button>
                    }
                </div>
                <Button onClick={() => handleSearchVideos({ query: textInput })} className={styles.input__searchButton} type="primary">Поиск</Button>
            </Space.Compact>
            <ModalComponent />
        </div >
    );
};

export default InputComponent;