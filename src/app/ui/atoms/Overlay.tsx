"use client"
import { useRouter } from "next/navigation";


export function Overlay({children}: {children: React.ReactNode}) {
    const router = useRouter();
    return (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
            <aside className="absolute right-0 top-0 z-60 h-screen w-full max-w-sm bg-white">
                <button
                onClick={() => {
                    router.back();
                }}
                className="mt-3 ml-2 p-4 bg-opacity-50 flex justify-center items-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2 dark:text-gray-800"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                <span className="dark:text-gray-800">Close Modal</span>
                </button>
                    {children}
            </aside>
        </div>
    );
}
