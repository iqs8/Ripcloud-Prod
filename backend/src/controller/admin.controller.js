import {Song} from "../models/song.model.js"
import {Album} from "../models/album.model.js"
import cloudinary from "../lib/cloudinary.js"
import fs from "fs";

//helper for cloudinary uploads
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {resource_type: "auto", })
        return result.secure_url
    } catch (error) {
        console.log("error in uploadToCloudinary", error)
        throw new Error("Error uploading to cloudinary")
    }
}

const cleanupTempFile = async (file) => {
    try {
        if (file && file.tempFilePath) {
            await fs.promises.unlink(file.tempFilePath)
            console.log(`Cleaned up temp file: ${file.tempFilePath}`)
        }
    } catch (error) {
        console.log("Error cleaning up temp file:", error)
        // Don't throw error for cleanup failures
    }
}

export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: "Please upload all files"})
        }
        const {title, artist, artistId, artistName, albumId, duration} = req.body
        const audioFile = req.files.audioFile
        const imageFile = req.files.imageFile

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        await cleanupTempFile(audioFile);
        await cleanupTempFile(imageFile);

        const song = new Song({
            title,
            artist: artistId,
            artistId,
            artistName,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null
        })

        await song.save()

        //if song belongs to existing album update album songs array
        if (albumId){
            await Album.findByIdAndUpdate(albumId, {
                $push:{songs:song._id},
            })
        }
        res.status(201).json(song)

    } catch (error){
        console.log("Error in createSong", error)
        next(error)
    }
}

export const deleteSong = async (req, res, next) => {
    try {
        const { id }= req.params
        
        const song = await Song.findById(id)

        //if song belongs to album delete from it
        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { song: song._id},
            })
        }

        await Song.findByIdAndDelete(id)

        res.status(200).json({ message: "Song deleted successfully "})

    } catch (err) {
        console.log("Error in deleteSong", error)
        next(error)
    }
}

export const createAlbum = async (req, res, next) => {
    try{
        const {title, artist, artistId, artistName, releaseYear} = req.body
        const {imageFile} = req.files

        const imageUrl = await uploadToCloudinary(imageFile)

        await cleanupTempFile(imageFile);

        const album = new Album({
            title, 
            artist: artistId, 
            artistId,
            artistName,
            imageUrl, 
            releaseYear
        })

        await album.save()

        res.status(201).json(album);

    } catch (error) {
        next(error)
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {

        const {id} = req.params
        await Song.deleteMany({ albumId: id })
        await Album.findByIdAndDelete(id)
        res.status(200).json({ message: "Album deleted succesfully"})

    } catch (error) {
        next(error)
    }
}

export const checkAdmin = async (req, res, next) => {
    res.status(200).json({ admin: true})
}