import React, { Fragment, useEffect } from 'react';
import generateStarData from './GenerateStarData';

const Stars = () => {

    const STAR_DATA = generateStarData();


    useEffect(() => {
        const starGroup = document.getElementById('starGroup');
        createNightSky({ container: starGroup, data: STAR_DATA });
        // eslint-disable-next-line
    }, [])

    const createStar = ({ x, y }, index, debug) => {
        const starInstance = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        starInstance.classList.add('star-instance');
        starInstance.setAttribute('transform', `translate(${x} ${y})`);

        const radius = debug ? 10 : 1;
        const starReference = document.createElementNS("http://www.w3.org/2000/svg", 'circle');

        starReference.setAttribute('r', radius);
        starReference.classList.add('star');

        const delay = index * 100 + 500 * Math.random();
        const duration = 3000 + Math.random() * 4000;
        const brightness = 0.7 + Math.random() * 0.3;

        starReference.style.setProperty('--star-animation-delay', `${delay}ms`);
        starReference.style.setProperty('--star-animation-duration', `${duration}ms`);
        starReference.style.setProperty('--star-animation-glow-duration', `10000ms`);
        starReference.style.setProperty('--star-brightness', `${brightness}`);

        starInstance.appendChild(starReference);
        return starInstance;
    }

    const createNightSky = ({ container, debug, starReference }) => {


        STAR_DATA.forEach((data, index) => {
            const star = createStar(data, index, debug);
            container.appendChild(star);
        })
    };







    return (
        <Fragment>
            <div className="stars">
                <svg id="svgCanvas" viewBox="0 0 2000 1000" preserveAspectRatio="xMinYMin slice" width="100%" height="100%" >
                    <g id="starGroup"></g>

                </svg>
            </div>

        </Fragment>
    )


};

export default Stars
