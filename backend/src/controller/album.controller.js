import { Router } from "express"
import { Album } from "../models/album.model.js"
import { getAuth } from "@clerk/express";


export const getAllUserAlbums = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);
        console.log("User token/userId:", userId);

        // Only return albums where artist is "Default" or the user's token
        const albums = await Album.find({
            artistId: { $in: ["Admin", userId] }
        });
        res.status(200).json(albums)
    } catch (error) {
        next(error)
    }
}

export const getAllAlbums = async (req, res, next) => {
    try {
        const albums = await Album.find().populate("songs");
        res.status(200).json(albums);
    } catch (error) {
        next(error)
    }
}

export const getAlbumById = async (req, res, next) => {
    try {
        const {albumId} = req.params
        const album = await Album.findById(albumId).populate("songs")

        if (!album) {
            return res.status(400).json({ message: "Album not found"})
        }
        res.status(200).json(album)

    } catch (error) {
        next(error)
    }
}
