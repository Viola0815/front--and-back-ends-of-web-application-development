const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(express.static('./dist'));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

const sessionHandler = require('./src/utils/sessions');
const getAllProducts  = require('./src/utils/products');

app.post('/api/v1/login', (req, res) => {
  const { username } = req.body;
  if (!username) {
    res.status(400).json({ error: "Invalid username" });
    return;
  }
  const sid = sessionHandler.setSession(username);
  res.cookie('sid', sid);
  res.json({ sid, username });
});

app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessionHandler.getUsername(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.delete("/api/v2/session", (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessionHandler.getUsername(sid) : "";
  if (sid) {
      res.clearCookie("sid");
      sessionHandler.deleteSession(sid); 
  }
  res.json({ username });
});


app.get('/api/v1/products', (req, res) => {
  const products = getAllProducts();
  res.json(products);
});


app.get('/api/v1/cart', (req, res) => {
  const sid = req.cookies.sid; 
  const username = sessionHandler.getUsername(sid);
  if (!username) {
    return res.status(401).json({ error: 'auth-missing' });
  }
  const cart = sessionHandler.getCart(username);
  res.json({ cart });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
