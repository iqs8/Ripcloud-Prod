import { axiosInstance } from '@/lib/axios';
import {create} from 'zustand';
import type { Song, Album, Stats, UserStats } from '@/types';
import toast from 'react-hot-toast';

interface MusicStore {
    songs: Song[];
    allSongs: Song[];
    albums: Album[];
    allAlbums: Album[];
    isLoading: boolean;
    error: string | null;
    currentAlbum: Album | null;
    mostListenedToSongs: Song[];
    sharedWithMeSongs: Song[] | null;
    defaultSongs: Song[];
    stats: Stats;
    userStats: UserStats;


    fetchAlbums: () => Promise<void>;
    fetchAllAlbums: () => Promise<void>;
    fetchAlbumById: (id: string) => Promise<void>;
    fetchMostListenedToSongs: () => Promise<void>;
    fetchSharedWithMeSongs: () => Promise<void>;
    fetchDefaultSongs: () => Promise<void>;
    fetchStats: () => Promise<void>;
    fetchUserStats: () => Promise<void>;
    fetchSongs: () => Promise<void>;
    fetchAllSongs: () => Promise<void>;
    deleteSong: (id: string) => Promise<void>;
    deleteAlbum: (id: string) => Promise<void>
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    allAlbums: [],
    allSongs: [],
    songs: [],
    isLoading:false,
    error: null,
    currentAlbum: null,
    mostListenedToSongs: [],
    sharedWithMeSongs: null,
    defaultSongs: [],
    stats:{
        totalSongs:0,
        totalAlbums:0,
        totalUsers: 0,
        totalArtists: 0,
    },
    userStats:{
        totalSongs:0,
        totalAlbums:0,
        totalFriends: 0,
        totalStorage: 0,
    },

     deleteAlbum: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/albums/${id}`);
			set((state) => ({
				albums: state.albums.filter((album) => album._id !== id),
				songs: state.songs.map((song) =>
					song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song
				),
			}));
			toast.success("Album deleted successfully");
		} catch (error: any) {
			toast.error("Failed to delete album: " + error.message);
		} finally {
			set({ isLoading: false });
		}
	},

    deleteSong: async (id) => {
        set({ isLoading: true, error: null})
        try{
            await axiosInstance.delete(`/admin/songs/${id}`)
            set(state => ({
                songs: state.songs.filter(song => song._id !== id)
            }))
            toast.success("Song deleted successfully")

        } catch (error: any){
            console.log("Error in deleteSong", error)
            toast.error("Error deleting song")
        } finally {
            set ({ isLoading: false})
        }
    },

    fetchSongs: async () => {
        set({isLoading: true, error: null})
        try {
            const response = await axiosInstance.get("/songs")
            set({songs: response.data})
        } catch (error: any) {
            set({error: error.response.data.message})
        } finally {
            set({ isLoading: false})
        }
    },

     fetchAllSongs: async () => {
        set({isLoading: true, error: null})
        try {
            const response = await axiosInstance.get("/songs/all")
            set({allSongs: response.data})
        } catch (error: any) {
            set({error: error.response.data.message})
        } finally {
            set({ isLoading: false})
        }
    },

    fetchStats: async () => {
        set({isLoading: true, error: null})
        try {
            const response = await axiosInstance.get("/stats")
            set({stats: response.data})
        } catch (error: any) {
            set({error: error.response.data.message})
        } finally {
            set({ isLoading: false})
        }
    },

    fetchUserStats: async () => {
        set({isLoading: true, error: null})
        try {
            const response = await axiosInstance.get("/stats/user")
            set({userStats: response.data})
        } catch (error: any) {
            set({error: error.response.data.message})
        } finally {
            set({ isLoading: false})
        }
    },
    
    fetchAlbums: async () => {

        set({isLoading: true, error: null})
        try {
            const response = await axiosInstance.get("/albums")
            set({albums: response.data})
        } catch (error: any) {
            set({error: error.response.data.message})
        } finally {
            set({ isLoading: false})
        }
    },

    fetchAllAlbums: async () => {

        set({isLoading: true, error: null})
        try {
            const response = await axiosInstance.get("/albums/all")
            set({allAlbums: response.data})
        } catch (error: any) {
            set({error: error.response.data.message})
        } finally {
            set({ isLoading: false})
        }
    },

    fetchAlbumById: async(id) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.get(`/albums/${id}`)
            set({ currentAlbum: response.data })
        } catch (error: any) {
            set({ error: error.response.data.message})
        } finally {
            set({ isLoading: false})
        }
    },

    fetchDefaultSongs: async () => {
        set({isLoading: true, error: null})
        try{
            const response = await axiosInstance.get("/songs/default")
            set({ defaultSongs: response.data})
        } catch (error: any) {
            set({ error: error.response.data.message})
        } finally {
            set({ isLoading: false})
        }
    },

    fetchMostListenedToSongs: async () => {
        set({ isLoading: true, error: null})
        try{ 
            const response = await axiosInstance.get("/songs/most-listened-to")
            set({ mostListenedToSongs: response.data})
        } catch (error: any) {
            set({ error: error.response.data.message})
        } finally {
            set({ isLoading: false})
        }
    },

    fetchSharedWithMeSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs/shared");
            set({ sharedWithMeSongs: response.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || "Failed to fetch" });
            set({ sharedWithMeSongs: null }); // explicitly set to null on failure
        } finally {
            set({ isLoading: false });
        }
    }


}))
