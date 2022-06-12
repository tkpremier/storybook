import React from "react";
import Drawer from "./Drawer";
import styles from "./drawer.module.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: "Example/Drawer",
	component: Drawer
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
	<ul className={styles["panel-wrapper"]}>
		<Drawer {...args} />
	</ul>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
	header: "Drawer",
	children: (
		<ul>
			<li>Develop hybrid applications using Javascript, jQuery, HTML, SCSS</li>
			<li>Build iOS apps with PhoneGap and Xcode</li>
			<li>Improve app performance and prevent memory leaks using browser devtools</li>
		</ul>
	)
};

// export const Secondary = Template.bind({});
// Secondary.args = {
// 	header: "Drawer"
// };
