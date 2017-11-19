$(function () {
  $player = $('#player');

  // load songs
  function loadSongs() {
    $.ajax({
      url: '/songs'
    })
    .done(function (songs) {
      var listHTML = $('.songs-list-container');
      // cleaning interface
      listHTML.empty();

      console.log(songs);
      songs.forEach(function (song) {
        var songHTML = $('<li class="song">'+ song.name +'</li>');
        songHTML
        .on('click', song, play)
        .appendTo(listHTML);
      });
    })
    .fail(function () {
      alert('It was an error');
    });
  }

  // player: play
  function play(e) {
    console.log($player[0]);
    $player[0].pause();
    $player.attr('src', '/songs/' + e.data.name);
    $player[0].play();
  }

  loadSongs();
});
