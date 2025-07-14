import mongoose from "mongoose";
import { Song } from "./models/song.model.js";
import { Album } from "./models/album.model.js";
import { config } from "dotenv";

config();

const migrateArtistFields = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        // Update songs
        const songs = await Song.find({});
        console.log(`Found ${songs.length} songs to migrate`);

        for (const song of songs) {
            // If artistName doesn't exist, set it to the artist field (which contains the Clerk ID)
            if (!song.artistName) {
                song.artistName = song.artist === "Default" ? "Default Artist" : "Unknown Artist";
                song.artistId = song.artist;
                await song.save();
                console.log(`Updated song: ${song.title}`);
            }
        }

        // Update albums
        const albums = await Album.find({});
        console.log(`Found ${albums.length} albums to migrate`);

        for (const album of albums) {
            // If artistName doesn't exist, set it to the artist field
            if (!album.artistName) {
                album.artistName = album.artist === "Default" ? "Default Artist" : "Unknown Artist";
                album.artistId = album.artist;
                await album.save();
                console.log(`Updated album: ${album.title}`);
            }
        }

        console.log("Migration completed successfully!");
    } catch (error) {
        console.error("Error during migration:", error);
    } finally {
        await mongoose.connection.close();
        console.log("Database connection closed");
    }
};

// Run migration
migrateArtistFields();