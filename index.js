const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('.'));

let apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/', (req, res) => {
    res.json({data: "here's your data"});
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: '.' });
});
console.log('test1')
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})