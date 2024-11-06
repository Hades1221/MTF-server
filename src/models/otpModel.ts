import mongoose, { Schema, Document } from 'mongoose';

// Define an interface representing an OTP document in MongoDB.
interface IOTP extends Document {
  email: string; // Replace with userId if needed
  otpCode: string;
  expirationTime: Date;
  status: 'active' | 'used';
  createdAt: Date;
}

// Create the schema corresponding to the document interface.
const OTPSchema: Schema = new Schema<IOTP>({
  email: { type: String, required: true }, // Replace with userId if necessary
  otpCode: { type: String, required: true },
  expirationTime: { type: Date, required: true },
  status: { type: String, required: true, enum: ['active', 'used'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
});

// Set up a pre-save hook to ensure uniqueness of OTP and set expiration
OTPSchema.pre<IOTP>('save', async function (next) {
  const otp = this;
  const EXPIRATION_DURATION = 60 * 60 * 1000; // 60 minutes in milliseconds

  // Set the expiration time to 60 minutes from now if not provided
  if (!otp.expirationTime) {
    otp.expirationTime = new Date(Date.now() + EXPIRATION_DURATION);
  }

  try {
    // Check if an OTP with the same email and active status already exists
    const existingOTP = await OTP.findOne({
      email: otp.email, 
      expirationTime: { $gt: new Date() }, // Ensure it's not expired
      status: 'active',
    });

    if (existingOTP) {
      // If OTP already exists for this email and is active, regenerate a new one
      otp.otpCode = generateUniqueOTP();
    }

    next(); // Proceed to save the new OTP
  } catch (err) {
    next(err as mongoose.CallbackError);
  }
});

// Function to generate a 6-digit unique OTP
const generateUniqueOTP = (): string => {
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10).toString(); // Generates a digit between 0-9
  }
  return otp;
};

// Export the OTP model
const OTP = mongoose.model<IOTP>('OTP', OTPSchema);

export default OTP;

// Service Function to Insert New OTP
export const insertOTP = async (email: string): Promise<IOTP> => {
  // Generate new OTP code
  const otpCode = generateUniqueOTP();

  // Create a new OTP entry
  const newOTP = new OTP({
    email,
    otpCode,
    expirationTime: new Date(Date.now() + 60 * 60 * 1000), // 60 minutes from now
    status: 'active',
  });

  // Save the OTP in the database
  return await newOTP.save();
};
