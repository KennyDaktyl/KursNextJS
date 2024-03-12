import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { ListOrdered } from "lucide-react"
import Link from "next/link"

export const AccountItems = () => {

return (
    <div className='w-32 flex justify-center align-middle'>
        <SignedIn>
            <Link
                href="/orders"
                className="h-full group m-2 flex items-center p-2"
            >
                <ListOrdered className='ml-4 h-6 w-6 flex-shrink' aria-hidden="true" />
            </Link>
            <div className='p-2 flex justify-center align-middle items-center'>
                <UserButton
                    userProfileMode="navigation" />
            </div>
        </SignedIn>
        <SignedOut>
            <SignInButton />
        </SignedOut>
    </div>
)
}