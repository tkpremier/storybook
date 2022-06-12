const path = require("path");

module.exports = {
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.s(a|c)ss$/,
			include: path.resolve(__dirname, "../"),
			use: [
				"style-loader",
				{
					loader: "css-loader",
					options: {
						modules: {
							auto: true,
							localIdentName: "[name]__[local]--[hash:base64:5]"
						}
					}
				},
				"sass-loader"
			]
		});
		return config;
	},
	core: {
		builder: {
			name: "webpack5",
			options: {
				fsCache: true
			}
		}
	},
	stories: ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
	framework: "@storybook/react"
};
