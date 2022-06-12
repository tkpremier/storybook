import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./drawer.module.scss";

const Drawer = (props) => {
	const [closed, toggleEl] = useState(props.closed);
	const [maxHeight, setMaxHeight] = useState(props.closed ? "none" : "0px");
	const content = useRef(null);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setMaxHeight(`${content.current.scrollHeight}px`);
		}
	}, []);
	const handleToggle = () => toggleEl(!closed);
	return (
		<li className={classNames(styles.expandable, { closed })}>
			<button
				className={classNames(
					styles.expandable__button,
					{
						[styles.expandable__button__closed]: closed
					},
					props.className
				)}
				onClick={handleToggle}
				type="button"
			>
				{props.header}
			</button>
			<section
				ref={content}
				className={classNames(styles.panel, { [styles.panel__closed]: closed })}
				style={{
					...(!closed && { height: maxHeight })
				}}
			>
				{props.children}
			</section>
		</li>
	);
};

Drawer.defaultProps = {
	className: "",
	closed: false,
	isRoot: false
};

Drawer.propTypes = {
	className: PropTypes.string,
	closed: PropTypes.bool,
	header: PropTypes.string.isRequired,
	isRoot: PropTypes.bool
};

export default Drawer;
