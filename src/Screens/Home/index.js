import HomeCarousel from "./CarouselControl";

import classes from './styles.module.css';

export default function Home() {
    return (
        <div className={classes.root}>
            <HomeCarousel />
        </div>
    )
}
