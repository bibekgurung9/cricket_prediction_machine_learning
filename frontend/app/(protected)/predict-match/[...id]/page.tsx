"use client";
import MatchDetails from "@/components/cricket/MatchDetails";
import { usePathname, useRouter } from "next/navigation";
export default function MatchIdPage() {
    const pathname = usePathname();
    const matchId = pathname.split('/').pop()
    const router = useRouter();

    if(matchId){
        return <MatchDetails matchId={matchId!} />;
    }

    setTimeout(() => {
        router.push('/profile')
    })
    
    return (
        <div>No Match Found! Redirecting to profile....</div>
    )


}