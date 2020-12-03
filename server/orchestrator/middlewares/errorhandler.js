// * Error Handler
module.exports = (err, req, res, next) => {
  const { response } = err
  const { statusText } = response
  res.send(statusText)
}
