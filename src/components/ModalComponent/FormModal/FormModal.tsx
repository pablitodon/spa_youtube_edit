import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './styles.module.css';
import { Button, Input, MenuItem, Select, Slider } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { setEditRequest, setSaveRequst } from '../../../redux/slices/saveRequestSlice';
import { DataForm } from '../../../interfaces';
import { setShowFormModal } from '../../../redux/slices/showFormModalSlice';
import { setEditModeForm } from '../../../redux/slices/toggleEditModeSlice';
import { useEffect } from 'react';




const schemaValidModal = yup.object().shape({
    request: yup
        .string()
        .required("Поле обязательно для заполнения"),
    title: yup.string().required("Поле обязательно для заполнения"),
    sortBy: yup.string().nullable(),
    maxResults: yup.number().integer().min(0).max(50).nullable(),
});

const SORT_OPTIONS = [
    { value: 'relevance', label: 'По релевантности' },
    { value: 'date', label: 'По дате' },
    { value: 'viewCount', label: 'По просмотрам' },
    { value: 'rating', label: 'По рейтингу' }
];

const FormModal = ({ el }: { el?: DataForm }) => {
    console.log(el);
    const dispatch = useAppDispatch();
    const saveText = useAppSelector((state) => state.saveText.saveText);
    const editMode = useAppSelector(state => state.editModeForm.editMode)

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schemaValidModal),
        defaultValues: {
            request: saveText,
            title: '',
            maxResults: 4,
            sortBy: 'relevance',
        },
    });

    useEffect(() => {
        if (editMode && el) {
            setValue('request', el.request);
            setValue('title', el.title);
            setValue('maxResults', el.maxResults);
            setValue('sortBy', el.sortBy);
        }
    }, [editMode, el, setValue, saveText]);


    const onSubmit: SubmitHandler<DataForm> = (data) => {
        if (editMode) {
            dispatch(setEditRequest({ ...data, id: el?.id }))
            dispatch(setEditModeForm(false))
            dispatch(setShowFormModal(false));
        } else {
            dispatch(setSaveRequst(data))
            dispatch(setShowFormModal(false));
        }
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)} >
            <div>
                <label className={styles.label}>Запрос</label>
                <Controller
                    name="request"
                    control={control}
                    render={({ field }) =>
                        editMode ?
                            (<Input
                                {...field}
                                className={styles.inputField}
                            />) : (
                                <Input
                                    {...field}
                                    className={styles.inputField}
                                    readOnly
                                    style={{ 'backgroundColor': '#666 ', 'color': '#fff' }}
                                />)
                    }
                />
                <p className={styles.error}>{errors.request?.message}</p>
            </div>
            <div>
                <label className={styles.label}>
                    <FiberManualRecordIcon style={{ color: 'red', fontSize: '0.55rem', verticalAlign: 'middle', marginLeft: '4px' }} />
                    Название
                </label>
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) => <Input {...field} className={styles.inputField} placeholder="Укажите название запроса" />}
                />
                <p className={styles.error}>{errors.title?.message}</p>
            </div>
            <div>
                <label className={styles.label}>Сортировать по:</label>
                <Controller
                    name="sortBy"
                    control={control}
                    render={({ field }) => (
                        <Select
                            className={styles.select}
                            labelId="sort-select-label"
                            value={field.value}
                            onChange={field.onChange}
                            displayEmpty
                        >
                            {SORT_OPTIONS.map((option) => (
                                <MenuItem key={option.value} className={styles.selectMenuItem} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
            </div>
            <div >
                <label className={styles.label}>Максимальное количество:</label>
                <div className={styles.sliderContainer}>
                    <Controller
                        name="maxResults"
                        control={control}
                        render={({ field }) => (
                            <>
                                <Slider
                                    {...field}
                                    className={styles.slider}
                                    value={field.value || 0}
                                    min={0}
                                    max={50}
                                    valueLabelDisplay="auto"
                                    onChange={(newValue) => field.onChange(newValue)}
                                />
                                <Input
                                    type="number"
                                    value={field.value || 0}
                                    onChange={(event) => field.onChange(Number(event.target.value))}
                                    className={styles.numberInput}
                                    inputProps={{
                                        min: 0,
                                        max: 50,
                                        style: { textAlign: 'center' } // Центрирование текста в поле
                                    }}
                                />
                            </>
                        )}
                    />
                </div>
            </div>
            <Button type="submit" className={styles.button}>Сохранить</Button>
        </form >
    );
};

export default FormModal;

