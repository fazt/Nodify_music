const router = require('express').Router();

const fs = require('fs');
const path = require('path');

const mediaServer = require('mediaserver');
const multer = require('multer');
const multerSettings = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../songs_store'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({storage: multerSettings});

router.get('/', (req, res) => {
  res.render('index.html');
});

router.get('/songs', (req, res) => {
  fs.readFile(
    path.join(__dirname, '../songs.json'),
    'utf-8',
    (err, songs) => {
      if (err) return next(err);
      res.json(JSON.parse(songs));
    }
  )
});

router.get('/songs/:name', (req, res) => {
  const song = path.join(__dirname, '../songs_store', req.params.name);
  mediaServer.pipe(req, res, song);
});

router.post('/songs', upload.single('song'), (req, res) => {
  const songName = req.file.originalname;
  const songsFile = path.join(__dirname, '../songs.json');
  fs.readFile(songsFile,'utf-8', (err, songs) => {
      if (err) return next(err);
      const songsJSON = JSON.parse(songs);
      songsJSON.push({name: songName});
      fs.writeFile(songsFile, JSON.stringify(songsJSON), (err) => {
        if (err) return next(err);
        console.log('redirecting');
        res.redirect('/');
      })
    });
});

module.exports = router;
