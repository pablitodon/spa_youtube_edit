import { Modal, Box } from '@mui/material';
import FormModal from './FormModal/FormModal';
import styles from './styles.module.css';
import { setShowFormModal } from '../../redux/slices/showFormModalSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setEditModeForm } from '../../redux/slices/toggleEditModeSlice';
import { DataForm } from '../../interfaces';

interface Props {
    el?: DataForm;
};

const ModalComponent = ({ el }: Props) => {
    const dispatch = useAppDispatch();
    const showModal = useAppSelector(state => state.showFormModal.showModal)
    const editMode = useAppSelector(state => state.editModeForm.editMode)

    const handleCloseAndToggleEditMode = () => {
        if (editMode) {
            dispatch(setEditModeForm(false))
            dispatch(setShowFormModal(false))
        }
        dispatch(setShowFormModal(false))
    }

    return (
        <div>
            <Modal
                open={showModal}
                onClose={() => handleCloseAndToggleEditMode()}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '40%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: '400px',
                        bgcolor: 'background.paper',
                        boxShadow: '0px 4px 10px #fff',
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <h3 className={styles.title__modal}>{editMode ? "Редактировать поиск" : "Сохранить поиск"}</h3>
                    <FormModal el={el} />
                </Box>
            </Modal>
        </div >

    );
};

export default ModalComponent;