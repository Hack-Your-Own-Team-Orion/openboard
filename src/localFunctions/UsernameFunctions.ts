import { sha256 } from "js-sha256"

export function usernameFromIp(ip: string): string {
    let hash: string = sha256(ip);
    if (hash.length > 32) {
        hash = hash.slice(0, 32);
    }
    return hash;
}

export function colorFromUsername(username: string): string {
    let colors: Array<string> = [
        "#1abc9c",
        "#2ecc71",
        "#3498db",
        "#9b59b6",
        "#34495e",
        "#16a085",
        "#27ae60",
        "#2980b9",
        "#8e44ad",
        "#2c3e50",
        "#f1c40f",
        "#e67e22",
        "#e74c3c",
        "#ecf0f1",
        "#95a5a6",
        "#f39c12",
        "#d35400",
        "#c0392b",
        "#bdc3c7",
        "#7f8c8d"
    ];
    let hash: number = 0;
    if (username.length === 0) return "#1abc9c"; // return default color
    for (let i: number = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    hash = ((hash % colors.length) + colors.length) % colors.length;
    return colors[hash];
}

export function condensedUsername(username: string): string {
    return username.substr(0, 4) + '...' + username.substring(username.length - 4);
}

export default {
    usernameFromIp: usernameFromIp,
    colorFromUsername: colorFromUsername
}