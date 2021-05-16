import { useState, useEffect, useCallback } from 'react';

import { data } from '../../../Services/endpoints';
import Carousel from '../../../Components/Carousel';

import classes from './styles.module.css';

export default function HomeCarousel() {

    const [numOfDisplayBlocks, setNumOfDisplayBlocks] = useState(4); // number of blocks to display
    const [index, setIndex] = useState(0);
    const [startBlock, setStartBlock] = useState(0); // index of the first block to display
    const [endBlock, setEndBlock] = useState(numOfDisplayBlocks - 1); // index of the last block to display
    const [currentBlocks, setCurrentBlocks] = useState([]);

    useEffect(() => {
        setStartBlock(numOfDisplayBlocks * index); // move to the new first block to display
        setEndBlock(numOfDisplayBlocks * (index + 1) - 1); // move to the new last block to display   
    }, [index, numOfDisplayBlocks]);

    useEffect(() => {
        if (endBlock > data.length) { // the total number of blocks is not divisble by 'numOfDisplayBlocks' so we padding the needed blocks.
            const needed = endBlock - data.length + 1;
            // in case the  number of blocks less than 'numOfDisplayBlocks'
            setCurrentBlocks(data.filter((block, index) => Math.max(0, startBlock - needed) <= index && index <= endBlock));
        } else {
            setCurrentBlocks(data.filter((block, index) => startBlock <= index && index <= endBlock));
        }

    }, [endBlock, startBlock]);


    const getLastPossibleIndex = useCallback(
        () => {
            if (data.length === 0) return 0;
            return Math.ceil(data.length / numOfDisplayBlocks) - 1;
        },
        [numOfDisplayBlocks],
    );

    const handleChange = useCallback(
        (e) => {
            e.preventDefault();
            setNumOfDisplayBlocks(e.target.value);
            setIndex(0);
        },
        [],
    );

    return (
        <div className={classes.root}>

            <Carousel
                data={currentBlocks}
                handleChange={setIndex}
                disablePrev={index === 0}
                disableNext={index === getLastPossibleIndex()}
            />

            <div classes={classes.container}>
                <span>Number of Displayed Blocks:</span>
                <input
                    name={'Number of DisplayBlocks'}
                    onChange={handleChange}
                    value={numOfDisplayBlocks}
                />
            </div>

        </div>
    )
}
