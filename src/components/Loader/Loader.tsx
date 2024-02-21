import Lottie from 'lottie-react';
import animation from '../../animation/animation.json';

import './loader.css';

export const Loader = () => (
    <div className='loader-container'>
        <Lottie animationData={animation} loop={true} />
    </div>
);
