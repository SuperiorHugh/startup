const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static('public'));

let apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/', (req, res) => {
    res.send({data: "here's your data"});
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
})