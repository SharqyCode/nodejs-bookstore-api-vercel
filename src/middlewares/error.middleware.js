module.exports = (err, req, res, next) => {
    console.log(123);
    console.log(err.stack);
    res.status(404).json({ status: "NOT FOUND" })
}