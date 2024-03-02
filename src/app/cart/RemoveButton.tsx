"use client";

import { useFormStatus } from "react-dom";


export const RemoveButton = () => {
	const formStatus = useFormStatus();

	
	return (
		<button
			disabled={formStatus.pending}
			className="text-sm font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-wait disabled:text-slate-400"
		>
			Remove
		</button>
	);
}