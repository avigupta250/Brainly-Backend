"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContent = exports.getAllContent = exports.createContent = void 0;
const Content_1 = require("../models/Content");
const createContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, title, type, description, tags } = req.body;
        if (!link || !type || !title || !description || !tags) {
            res.status(400).json({
                success: false,
                message: "All fields are required"
            });
            return;
        }
        yield Content_1.Content.create({
            link,
            type,
            title: title,
            description,
            userId: req.userId,
            tags,
        });
        const content = yield Content_1.Content.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.status(200).json({
            message: "Content added",
            user: req.userId,
            userContent: content
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error
        });
    }
});
exports.createContent = createContent;
const getAllContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const content = yield Content_1.Content.find({
            userId: userId,
        }).populate("userId", ["email"]).sort({ createdAt: -1 }).populate("tags");
        res.status(200).json({
            content,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            error: err
        });
    }
});
exports.getAllContent = getAllContent;
const deleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.body.contentId;
        console.log({ "conetentID": contentId,
            "UserID": req.userId
        });
        yield Content_1.Content.deleteMany({
            _id: contentId,
            userId: req.userId,
        });
        res.status(200).json({
            message: "Deleted"
        });
    }
    catch (err) { }
});
exports.deleteContent = deleteContent;
