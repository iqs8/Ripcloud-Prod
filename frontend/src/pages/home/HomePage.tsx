import Topbar from "@/components/Topbar"
import { useMusicStore } from "@/stores/useMusicStore"
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SectionGrid } from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";

const HomePage = () => {

    const {fetchDefaultSongs, 
        fetchMostListenedToSongs, 
        fetchSharedWithMeSongs, 
        isLoading, 
        mostListenedToSongs, 
        defaultSongs, 
        sharedWithMeSongs} = useMusicStore();

        const {initializeQueue} = usePlayerStore()

        useEffect(() => {
            if (mostListenedToSongs.length > 0 && defaultSongs.length > 0) {
                const allSongs = [
                ...defaultSongs,
                ...mostListenedToSongs,
                ...(sharedWithMeSongs ?? [])
                ];
                initializeQueue(allSongs);
            }
            }, [initializeQueue, mostListenedToSongs, defaultSongs, sharedWithMeSongs]);

        useEffect(() => {
            fetchDefaultSongs();
            fetchMostListenedToSongs();
            fetchSharedWithMeSongs();
        }, [fetchDefaultSongs, fetchMostListenedToSongs, fetchSharedWithMeSongs])


    return (
        <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900"> 
            <Topbar/>
            <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-4 sm:p-6">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-6">Sample Music</h1>
                    <FeaturedSection/>
                
                    <div className="space-y-8">
                        <SectionGrid title="Most Listened To" songs={mostListenedToSongs} isLoading={isLoading}/>
                        <SectionGrid title="Shared With Me" songs={sharedWithMeSongs} isLoading={isLoading}/>
                    </div>
                </div>


            </ScrollArea>
        </div>
)}
export default HomePage