import { UserInfoRepository } from "../models/user.InfoModel.js";

export class UserInfoController {
    static getAll = async (req, res) => {
        try {
            const users = await UserInfoRepository.getAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message });
        }
    } 
    
}