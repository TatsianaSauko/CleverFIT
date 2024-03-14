import './formAddTraining.css';
import { Form, Input, Checkbox } from 'antd';
import { trainingSelector } from '@redux/slices/TrainingSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { FieldData } from 'rc-field-form/lib/interface';
import { useState } from 'react';
import { Exercise } from '../../types/Types';
import { useForm } from 'antd/lib/form/Form';
import { FormAddTrainingProps } from '../../types/Props';

export const FormAddTraining = ({ item, index }: FormAddTrainingProps) => {
    // console.log('item',item)
    // const dispatch = useAppDispatch();
    // const { training} = useSelector(trainingSelector);
    const [name, setName] = useState('');
    const [replays, setReplays] = useState(0);
    const [weight, setWeight] = useState(0);
    const [approaches, setApproaches] = useState(0);
    const [exercise, setExercise] = useState<Exercise>();
    const [checked, setChecked] = useState(false);
    const [form] = useForm();


    const handleFieldsChange = (allFields: FieldData[]) => {
console.log(allFields)
        const nameFieldValue = allFields.find(field => field.name[0] === 'name')?.value;
    const replaysFieldValue = allFields.find(field => field.name[0] === 'replays')?.value;
    const weightFieldValue = allFields.find(field => field.name[0] === 'weight')?.value;
    const approachesFieldValue = allFields.find(field => field.name[0] === 'approaches')?.value;
    const checkedValue = allFields.find(field => field.name[0] === 'checked')?.value;

    if (nameFieldValue) {
        setName(nameFieldValue);
            const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
            if (hasErrors === false) {
                setExercise({
                    name: name,
                    replays: replays,
                    weight: weight,
                    approaches: approaches,
                    isImplementation: false,
                    checked: checked,
                })
                // if (exercise) {
                //     dispatch(setExercises({exercise, id}))
                // }

            }

    }
    if (replaysFieldValue) {
        setReplays(replaysFieldValue);
    }
    if (weightFieldValue) {
        setWeight(weightFieldValue);
    }
    if (approachesFieldValue) {
        setApproaches(approachesFieldValue);
    }
    if (checkedValue) {
        setChecked(checkedValue);
    }
    };

    return (
        <Form
        form={form}
            layout='vertical'
            onFieldsChange={(_, allFields): void => {
                handleFieldsChange(allFields);
            }}
            size='small'
            initialValues={{ approaches: item.approaches, name: item.name, replays: item.replays, weight: item.weight }}
        >
            <div  className='name__wrapper'>
            <Form.Item name='name' className='name' rules={[
                        {
                            required: true,
                            message: '',
}]}>
                <Input addonBefore='' placeholder='Упражнение' />
            </Form.Item>
            <Form.Item name="checked" valuePropName="checked">
            <Checkbox className='checkbox'></Checkbox>
      </Form.Item>
            </div>

            <div className='form__wrapper'>
                <Form.Item label='Подходы'  name='approaches'  rules={[
                        {
                            required: true,
                            message: '',
                        },
                        {
                            validator(_, value) {
                                if (value >= 1) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error(''));
                            },
                        },
                    ]}
                    >
                    <Input placeholder={'1'}  addonBefore={'+'} />
                </Form.Item>
                <div className='form__block'>
                    <Form.Item label='Вес, кг'  name='weight' rules={[
                        {
                            required: true,
                            message: '',
                        },
                        {
                            validator(_, value) {
                                if (value >= 0) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error(''));
                            },
                        },
                    ]}>
                        <Input placeholder={'0'} />
                    </Form.Item>
                    <div className='icon'>x</div>
                    <Form.Item label='Количество'  name='replays' rules={[
                        {
                            required: true,
                            message: '',
                        },
                        {
                            validator(_, value) {
                                if (value >= 1) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error(''));
                            },
                        },
                    ]}>
                        <Input placeholder={'1'} />
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};
