import { useState } from 'react';
import { setShowFormModal } from '../../redux/slices/showFormModalSlice';
import { setEditModeForm } from '../../redux/slices/toggleEditModeSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import ModalComponent from '../ModalComponent/ModalComponent';
import styles from './styles.module.css';

const Favorite = () => {
    const saveRequest = useAppSelector((state) => state.saveRequest.saveRequest);
    const dispatch = useAppDispatch();
    const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

    const handleShowAndEditForm = (id: number) => {
        setSelectedId(id);
        dispatch(setShowFormModal(true))
        dispatch(setEditModeForm(true))
    }

    return (
        <main className={styles.favorite}>
            <h1>Сохраненные запросы:</h1>
            {
                saveRequest.map((el) => {
                    return (
                        <div className={styles.item__container} key={el.id}>
                            <div className={styles.item__save}>
                                <p>{el.title}</p>
                                <div >
                                    <button className={styles.button} onClick={() => handleShowAndEditForm(Number(el.id))}>Редактировать</button>
                                    <button className={styles.button}>Поиск</button>
                                </div>
                            </div>
                            {selectedId === el.id && <ModalComponent el={el} />}
                        </div>
                    )
                })
            }
        </main>
    );
};

export default Favorite;