import classes from './styles.module.css';
import { useCallback } from 'react';

export default function Carousel(props) {

    const { data, handleChange, disablePrev, disableNext } = props;

    const handleClick = useCallback(
        (dif) => () => {
            handleChange(oldIndex => oldIndex + dif);
        },
        [handleChange],
    );

    const getRandomImg = useCallback(
        (block) => {
            if (!!!block.images) return 'no-images';
            return block.images[Math.floor(Math.random() * block.images.length)];
        },
        [],
    );

    return (
        <div className={classes.root}>

            <button
                className={classes.btn}
                onClick={handleClick(-1)}
                disabled={disablePrev}
            >
                prev
             </button>

            {!!data && data.map((block, index) => (
                <div className={classes.block} key={`carousel-${index}`}>
                    <img
                        className={classes.slide}
                        src={getRandomImg(block)}
                        alt={`carousel-${block.title}`}
                    />
                    <p>{block.title}</p>
                </div>
            ))}

            <button
                className={classes.btn}
                onClick={handleClick(+1)}
                disabled={disableNext}
            >
                next
            </button>
            
        </div>
    )
}
