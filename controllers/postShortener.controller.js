import crypto from "crypto";
import { loadLinks,saveLinks } from "../models/shortener.model.js";

export const getShortenerPage=async (req, res) => {
    try {
        const links = await loadLinks()
        return res.render("index",{links,host:req.host})
    } catch (error) {
        console.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

export const postURLShortener = async (req, res) => {
    try {
        const { url, shortCode } = req.body
        const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex")
        const links = await loadLinks()

        if (links[finalShortCode]) {
            return res.status(400).send("Short Code already exists. Please choose another.")
        }

        links[finalShortCode] = url
        await saveLinks(links)
        return res.redirect("/")
    } catch (error) {
        console.error(error)
        return res.status(500).send("Internal Server Error")
    }
}

export const redirectToShortLink=async(req,res)=>{
    try {
        const {shortCode}=req.params
        const links=await loadLinks()

        if(!links[shortCode]) return res.status(404).send("404 error occurred")
        return res.redirect(links[shortCode])
    } catch (error) {
        console.error(error)
        return res.status(500).send("Internal Server Error")
    }
}