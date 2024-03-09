"use client";


export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {

    return (
		<div className="w-screen h-screen flex justify-center items-center">
			<h2>There was an error!</h2>
            <p>ERROR {error.digest}</p>
            <button onClick={() => reset()}>Reset</button>
		</div>
	);
}
