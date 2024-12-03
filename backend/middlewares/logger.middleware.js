function logger(req, res, rext) {
  console.log(req.method, req.url);
  next();
}

export default logger;
