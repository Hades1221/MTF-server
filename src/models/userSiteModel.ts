import  { Schema, model, Document } from "mongoose";

export interface IUSERSITE extends Document {
    role: string;
    firstName: string;
    familyName: string;
    phoneNumber: string;
    email: string; 
}

const userSiteShema = new Schema ({
    role: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    familyName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})

const UserSite = model<IUSERSITE>('User', userSiteShema);

export default UserSite;
