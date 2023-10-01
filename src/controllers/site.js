const home = (req, res, next) => {
    console.log('hello home')
    res.send('hello home')
}

module.exports = {
    home,
}
