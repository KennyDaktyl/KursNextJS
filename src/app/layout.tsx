import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { NavBar } from "./ui/organism/NavBar";

const montserrat = Montserrat({
	subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
	title: "Products list",
	description: "E-commerce.",
};

export default function RootLayout({
	children,
	modal
}: {
	children: React.ReactNode;
	modal: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<NavBar />
				<section className="mx-auto max-w-md p-12 sm:max-w-2xl sm:py-16 md:max-w-4xl lg:max-w-7xl">
					{children}
				</section>
				<footer>
					<p className="text-center text-sm text-grey-500">&copy;&nbsp;Michał Pielak 2024</p>
				</footer>
				{modal}
			</body>
		</html>
	);
}
