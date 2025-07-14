export interface Song {
    _id: string;
    title: string;
    artist: string;
    artistId: string;
    artistName: string;
    albumId: string | null;
    imageUrl: string;
    audioUrl: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
}

export interface Album {
    _id: string;
    title: string;
    artist: string;
    artistId: string;
    artistName: string;
    imageUrl: string;
    releaseYear: number;
    songs: Song[];
}

export interface Stats {
    totalSongs: number;
    totalAlbums: number;
    totalUsers: number;
    totalArtists: number;
}

export interface UserStats {
    totalSongs: number;
    totalAlbums: number;
    totalFriends: number;
    totalStorage: number;
}