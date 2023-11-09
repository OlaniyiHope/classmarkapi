import crypto from "crypto";

export const genspecialId = () => {
    const randomBytes = crypto.randomBytes(4).toString('hex');
    return randomBytes;
} 