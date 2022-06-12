import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./carousel.module.scss";

const Carousel = (props) => {
	const [currentIndex, setIndex] = useState(0);
	const playInterval = useRef(null);

	const changeIndex = (int) => {
		if (playInterval.current !== null) {
			clearInterval(playInterval.current);
		}
		const totalCount = props.data.length;
		const newIndex =
			currentIndex + int < 0 ? totalCount - 1 : currentIndex + int === totalCount ? 0 : currentIndex + int;
		return setIndex(newIndex);
	};
	const handleChange = (e) => changeIndex(parseInt(e.target.value, 10));
	return (
		<div className={styles.slider}>
			<ul className={styles.sliderTrack}>
				{props.data.map((item, index) => (
					<li
						className={classNames(styles.slide, {
							[styles.slideIsActive]: index === currentIndex
						})}
					>
						{item}
					</li>
				))}
			</ul>
			<button
				className={classNames(styles.button, styles.buttonPrevious)}
				onClick={handleChange}
				type="button"
				value={-1}
			>
				Previous
			</button>
			<button onClick={handleChange} className={classNames(styles.button, styles.buttonNext)} type="button" value={1}>
				Next
			</button>
		</div>
	);
};

Carousel.defaultProps = {
	animation: "slide",
	arrows: true,
	loop: true,
	pagination: false
};

Carousel.propTypes = {
	animation: PropTypes.string,
	arrows: PropTypes.bool,
	loop: PropTypes.bool,
	pagination: PropTypes.bool,
	children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Carousel;
