const Banner = require("../models/Banner");

exports.getBanners = async function () {
    const result = await Banner.find({}, { __v: 0 });
    return result;
}

exports.setBanners = async function (bannerInfo) {
    await Banner.deleteMany();
    const result = await Banner.create(bannerInfo);
    return result;
}