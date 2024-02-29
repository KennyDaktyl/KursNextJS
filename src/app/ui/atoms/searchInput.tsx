'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";


export const SearchInput = () => {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);
    
    const router = useRouter();
    const delayTime = 500; 
    
    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value); 
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearchQuery(value); 
        if (value.length >= 2) {
            if (typingTimer) {
                clearTimeout(typingTimer);
            }
            const timer = setTimeout(() => {
                const queryParamString = encodeURIComponent(value);
                router.push(`/search?query=${queryParamString}`);
                setSearchQuery("");
            }, delayTime);
            setTypingTimer(timer);
        }
    };
    return (
        <div className="flex bg-white border border-gray-300 rounded-full">
            <input
                type="text"
                name="query"
                minLength={1}
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchInput}
                onKeyUp={handleKeyUp}
                className="bg-white text-gray-700 px-3 py-1 rounded-full focus:outline-none"
            />
        </div>
    )
}