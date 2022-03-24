const fs = require("fs");
const path = require("path");

exports.defaultAvatar = () => {
    const avatarPath = fs.readdirSync(path.resolve(__dirname, "../public/upload/avatar"))
        .map(name => `/upload/avatar/${name}`);
    return avatarPath;
}

exports.getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}