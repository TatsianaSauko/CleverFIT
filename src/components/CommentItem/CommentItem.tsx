import { Rate } from 'antd';
import { CommentItemProps } from '../../types/Props';
import { formattedDate } from '@utils/formattedDate';
import { StarFillIcon, StarIcon } from '../../icons';
import avatar from '/png/avatar.png';

import './commentItem.css';

export const CommentItem = ({ data }: CommentItemProps) => (
    <div className='comment'>
        <div className='comment__info-author'>
            <img src={data.imageSrc ? data.imageSrc : avatar} alt='avatar' className='avatar' />
            <div className='fullName'>
                <div className='name'>
                    {data.fullName ? data.fullName.split(' ')[0] : 'Пользователь'}
                </div>
                <div className='surname'>{data.fullName && data.fullName.split(' ')[1]}</div>
            </div>
        </div>
        <div className='comment__content'>
            <div className='comment__metadata'>
                <Rate
                    value={data.rating}
                    disabled
                    character={({ index }) => {
                        if (typeof index !== 'undefined') {
                            return data.rating !== 0 && index < data.rating ? (
                                <StarFillIcon />
                            ) : (
                                <StarIcon />
                            );
                        }
                        return null;
                    }}
                />
                <div className='date'>{formattedDate(data.createdAt)}</div>
            </div>
            <div className='message'>{data.message}</div>
        </div>
    </div>
);
