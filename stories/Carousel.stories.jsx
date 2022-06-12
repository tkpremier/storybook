import React, { Fragment } from "react";
import Carousel from "./Carousel";
import styles from "./carousel.module.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: "Carousel",
	component: Carousel,
	argTypes: {
		label: {
			name: "children",
			type: { name: "array", required: true }
		}
	}
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Carousel {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
	header: "Carousel",
	data: [
		"Develop hybrid applications using Javascript, jQuery, HTML, SCSS",
		"Build iOS apps with PhoneGap and Xcode",
		"Improve app performance and prevent memory leaks using browser devtools"
	]
};

// export const Secondary = Template.bind({});
// Secondary.args = {
// 	header: "Drawer"
// };
