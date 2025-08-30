import mongoose from "mongoose";
import { Song } from "./models/song.model.js";
import { Album } from "./models/album.model.js";
import { config } from "dotenv";

config({ path: "../.env" });


const migrateArtistFields = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        // Update all songs' artistId to "Admin"
        const songResult = await Song.updateMany({}, { artistName: "Admin" });
        console.log(`Updated ${songResult.modifiedCount} songs' artistId to "Admin"`);

        // Update all albums' artistId to "Admin"
        const albumResult = await Album.updateMany({}, { artistName: "Admin" });
        console.log(`Updated ${albumResult.modifiedCount} albums' artistId to "Admin"`);

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
