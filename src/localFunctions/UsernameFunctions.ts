import crypto from "crypto"

export function usernameFromIp(ip: string): string {
    let hash: string = crypto.createHash("sha256").update(ip).digest("hex");
    if (hash.length > 32) {
        hash = hash.slice(0, 32);
    }
    return hash;
}

export function colorFromUsername(username: string): string {
    return "";
}

export default {
    usernameFromIp: usernameFromIp,
    colorFromUsername: colorFromUsername
}