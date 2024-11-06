import mongoose, { Schema, model, Document } from "mongoose";



export interface ISECURITY extends Document {
    name: string;
    category: string;
    type: string;
    securityId: string;
    status: 'active' | 'inactive' | 'pending';
}

const securitySchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    securityId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive', 'pending'],
    },
})

const Security = model<ISECURITY>('Security', securitySchema);

export default Security;
