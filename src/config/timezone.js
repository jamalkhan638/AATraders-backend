function timezone(req, res, next) {
    req.timezone = req.get('timezone') || process.env.TIMEZONE || "Europe/London";
    next();
}

module.exports = timezone;