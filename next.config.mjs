/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["tsx", "jsx", "js", "ts"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
		],
	},
};

export default nextConfig;
