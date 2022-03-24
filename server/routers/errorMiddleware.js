const getMsg = require("./getSendResult");
const multer = require("multer");


module.exports = function (err, req, res, next) {
    if (err) {
        if (err instanceof multer.MulterError) {
            res.status(200).send(getMsg.getErr(err.message));
            return;
        }
        const errObj = err instanceof Error ? err.message : err;
        res.status(500).send(getMsg.getErr(errObj));
    }
    else {
        next();
    }
}