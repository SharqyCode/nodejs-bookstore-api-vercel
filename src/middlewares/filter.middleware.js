function cleanRequestData(req, res, next) {
    if (!req.body || typeof req.body !== "object") return next();

    const cleaned = {};
    for (const key in req.body) {
        const value = req.body[key];
        // keep only non-empty, defined values
        if (value !== "" && value !== null && value !== undefined) {
            cleaned[key] = value;
        }
    }
    console.log(
        "cleaned:", cleaned
    );

    req.body = cleaned; // replace body with sanitized version
    next();
}

module.exports = cleanRequestData;
