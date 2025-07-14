import {Song} from "../models/song.model.js"
import { getAuth } from "@clerk/express";

export const getAllUserSongs = async(req, res, next) => {
    try {
        const { userId } = getAuth(req);
        console.log("User token/userId:", userId);

        // Only return songs where artist is "Default" or the user's token
        const songs = await Song.find({
            artistId: { $in: ["Default", userId] }
        }).sort({createdAt: -1});
        res.json(songs)
    } catch (error) {
        next(error)
    }
}
export const getAllSongs = async(req, res, next) => {
    try {
        // -1 for newset to oldest, 1 for reverse
        const songs = await Song.find().sort({createdAt: -1})
        res.json(songs)
    } catch (error) {
        next(error)
    }
}

export const getDefaultSongs = async (req, res, next) => {
    try {
        //get 6 random songs using mongo's aggregation pipeline
        const songs = await Song.aggregate([
            {
                $sample: {size:6}
            },
            {
            $project:{
                _id:1,
                title:1,
                artist:1,
                imageUrl:1,
                audioUrl:1,
                },
            },
        ])
        res.json(songs);

    } catch (error) {
        next(error)
    }
}

export const getMostListenedToSongs = async (req, res, next) => {
     try {
        //get 4 random songs using mongo's aggregation pipeline
        const songs = await Song.aggregate([
            {
                $sample: {size:4}
            },
            {
            $project:{
                _id:1,
                title:1,
                artist:1,
                imageUrl:1,
                audioUrl:1,
                },
            },
        ])
        res.json(songs);

    } catch (error) {
        next(error)
    }
}

export const getSharedWithMeSongs = async (req, res, next) => {
  try {
    // Simulate no shared songs
    res.json(null); // Will be interpreted as `null` in the frontend store
  } catch (error) {
    next(error);
  }
}
