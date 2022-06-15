import React, { useRef, useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./carousel.module.scss";

const Slider = (props) => {
	const carouselRef = useRef(null);
	const wrapperRef = useRef(null);
	const intervalRef = useRef(null);
	const [state, setState] = useState({
		animating: false,
		curIndex: 0,
		itemWidth: 278,
		itemsPerSlide: 1,
		nextDisabled: props.data.length < 2,
		prevDisabled: props.data.length < 2,
		wrapperWidth: 1110
	});

	useEffect(() => {
		if (carouselRef.current !== null) {
			const newItemWidth = Math.ceil(wrapperRef.current.offsetWidth / state.itemsPerSlide);
			if (newItemWidth !== state.itemWidth) {
				console.log("itemWidth: ", newItemWidth);

				console.log("wrapperWidth: ", newItemWidth * (props.data.length + 2));
				setState({
					...state,
					itemWidth: newItemWidth,
					wrapperWidth: newItemWidth * (props.data.length + 2),
					prevDisabled: state.curIndex === 0,
					nextDisabled: state.curIndex === props.data.length - 1
				});
			}
		}
		// if (props.autoplay) {
		// 	setTimeout(() => {
		// 		if (intervalRef.current === null) {
		// 			intervalRef.current = setInterval(() => {
		// 				const increment = 1;
		// 				let newIndex = (state.curIndex += increment);
		// 				console.log("neIndex: ", newIndex);

		// 				if (newIndex === props.data.length) {
		// 					return null;
		// 				}
		// 				setState({
		// 					...state,
		// 					curIndex: newIndex === props.data.length ? 0 : newIndex,
		// 					animating: true
		// 				});
		// 			}, props.interval);
		// 		}
		// 	}, props.interval);
		// }
		return () => {
			if (intervalRef.current !== null) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);
	const changeIndex = (int) => {
		let { curIndex } = state;
		if ((int === 1 && curIndex === props.data.length) || (int === -1 && curIndex === -1)) {
			console.log("too much");
			return null;
		}
		setState({
			...state,
			curIndex: (curIndex += int),
			animating: true
		});
	};
	const handleClick = (e) => {
		changeIndex(parseInt(e.target.value, 10));
	};
	const handleTransitionEnd = (e) => {
		setState({
			...state,
			animating: false,
			curIndex:
				state.curIndex === -1 ? props.data.length - 1 : state.curIndex === props.data.length ? 0 : state.curIndex
		});
	};
	const carouselData = [props.data[props.data.length - 1], ...props.data, props.data[0]];
	return (
		<div className={classNames(styles.slider, props.classNames)} ref={carouselRef}>
			{props.data.length > 1 ? (
				<Fragment>
					<button
						className={classNames(styles.button, styles.buttonPrevious)}
						value={-1}
						onClick={handleClick}
						type="button"
					/>
					<button
						className={classNames(styles.button, styles.buttonNext)}
						value={1}
						onClick={handleClick}
						type="button"
					/>
				</Fragment>
			) : null}
			{props.carouselTitle.length > 0 ? (
				<h2 className="phillips-carousel__title" dangerouslySetInnerHTML={{ __html: props.carouselTitle }} />
			) : null}
			{props.carouselDesc.length > 0 ? (
				<span className="phillips-carousel__description" dangerouslySetInnerHTML={{ __html: props.carouselDesc }} />
			) : null}
			<div className={styles.sliderWrapper} ref={wrapperRef}>
				<ul
					className={classNames(styles.carouselTrack, { [styles.carouselTrackIsAnimating]: state.animating })}
					style={{
						width: `${state.wrapperWidth}px`,
						transform: `translateX(-${state.itemWidth * (state.curIndex + 1)}px)`
					}}
					onTransitionEnd={handleTransitionEnd}
				>
					{carouselData.map((child, i) => (
						<li key={`${child}-${i}`} style={{ width: `${state.itemWidth}px` }}>
							{child}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

Slider.defaultProps = {
	autoplay: false,
	carouselTitle: "Slider",
	carouselDesc: "Enter description",
	interval: 5000,
	loop: false,
	pagination: false
};

Slider.propTypes = {
	arrows: PropTypes.bool,
	autoplay: PropTypes.bool,
	carouselTitle: PropTypes.string,
	carouselDesc: PropTypes.string,
	interval: PropTypes.number,
	loop: PropTypes.bool,
	pagination: PropTypes.bool,
	data: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Slider;
