import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the document structure
interface ISite extends Document {
  name: string;
  address: string;
  description: string;
  coordinates: [number, number]; // [longitude, latitude]
  creationDate: Date;
  lastUpdated: Date;
  status: string;
}

// Define the schema for the collection
const SiteSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: {type: String},
    address: { type: String, required: true },
    coordinates: {
      type: [Number], // An array of numbers: [longitude, latitude]
      required: true,
      validate: {
        validator: function (arr: number[]) {
          return arr.length === 2;
        },
        message: 'Coordinates must be an array with two elements [longitude, latitude]',
      },
    },
    creationDate: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    status: { type: String, enum: ['Active', 'Not Active'], default: 'Not Active'}
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

// Pre-save middleware to update the `lastUpdated` field before each save
SiteSchema.pre<ISite>('save', function (next) {
  this.lastUpdated = new Date();
  next();
});

// Export the model
const Site = mongoose.model<ISite>('Site', SiteSchema);

export default Site;
