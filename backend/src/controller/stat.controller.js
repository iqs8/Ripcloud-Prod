import {Song} from "../models/song.model.js"
import {User} from "../models/user.models.js"
import {Album} from "../models/album.model.js"
import { getAuth } from "@clerk/express";

export const getStats = async (req, res, next) => {
    try {
        const [totalAlbums, totalSongs, totalUsers, uniqueArtists] = await Promise.all([
            Album.countDocuments(),
            Song.countDocuments(),
            User.countDocuments(),

            Song.aggregate([
                {
                    $unionWith:{
                        coll:"albums",
                        pipeline:[]
                    }
                },
                {
                    $group:{
                        _id:"$artistId",
                    }
                },
                {
                    $count: "count"
                }
            ])
        ])

        res.status(200).json({
            totalAlbums,
            totalSongs,
            totalUsers,
            totalArtists: uniqueArtists[0]?.count || 0
        })
    } catch (error) {
        next(error)
    }
}

export const getUserStats = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Count albums and songs where artist matches userId
        const [albumCount, songCount] = await Promise.all([
            Album.countDocuments({ artistId: userId }),
            Song.countDocuments({ artistId: userId })
        ]);

        res.status(200).json({
            totalAlbums: albumCount,
            totalSongs: songCount,
            totalStorage: songCount,
            totalFriends: 0
        });
    } catch (error) {
        next(error);
    }
};