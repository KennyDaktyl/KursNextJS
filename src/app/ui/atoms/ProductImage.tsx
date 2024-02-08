import Image from "next/image";

export const ProductImage = ({
	width,
	height,
	src,
	alt,
}: {
	width: number;
	height: number;
	src: string;
	alt: string;
}) => {
	return (
		<div className="h-[460px] w-full overflow-hidden rounded-md bg-slate-50 hover:bg-slate-100">
			<Image
				width={width}
				height={height}
				alt={alt}
				src={src}
				className="h-full w-full object-cover object-center p-4 transition-transform hover:scale-105"
			/>
		</div>
	);
};
