const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(require("./server/db.js")());
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

router.render = (req, res) => {
  res.jsonp(res.locals.data);
};

server.use(router);
server.listen(3001, function () {
  console.log("JSON Server is running at port 3001");
});
