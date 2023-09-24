$(`#abrir-tab-disponiveis`).on(`click`, (event) => {
    openTab(event, `disponiveis`)
  })
  $(`#abrir-tab-curtidas`).on(`click`, (event) => {
    openTab(event, `curtidas`)
  })
  $(`#abrir-tab-playlists`).on(`click`, (event) => {
    openTab(event, `playlists`)
  })
  $(`#btn-abrir-modal-music`).on(`click`, (event) => {
    abrirModal('#modal-musica')
  })
  $(`#btn-close-modal`).on(`click`, (event) => {
    fecharModal('#modal-musica')
  })
  $(`#abrir-modal-pesquisar`).on(`click`, (event) => {
    abrirModal('#modal-pesquisar')
  })
  $(`.mudar-volume-changevol`).on(`click`, (event) => {
    changeVol()
  })
  $(`#music-like`).on(`click`, (event) => {
    likeMusicPlaying(event)
  })
  $(`.music-previous`).on(`click`, (event) => {
    musicaAnterior()
  })
  $(`.btnPlay`).on(`click`, (event) => {
    toggleMusic(event)
  })
  $(`.music-next`).on(`click`, (event) => {
    proximaMusica()
  })
  $(`.fechar-modal-pesquisa`).on(`click`, (event) => {
    fecharModal('#modal-pesquisar')
  })
  $(`.curtir-musica-like`).on(`click`, (event) => {
    likeMusicPlaying(event)
  })
  $(`.fechar-modal-playlist`).on(`click`, (event) => {
    fecharModal('#modal-playlist')
  })
  $(`#btn-play-playlist`).on(`click`, (event) => {
    playPlaylist()
  })
  $(`#close-nui`).on(`click`, (event) => {
    $.post(
      "https://SavaFy/action",
      JSON.stringify({
        action: "exit",
      })
    )
  })
  const searchMusics = () => {
    while (musicInfo.length > 0) {
      musicInfo.splice(0, musicInfo.length);
    }
    var val = document.getElementById('input-pesquisar').value;
    var izan = $(".pesquisa").val();
  //  console.log(val)
    makeRequest(val);
  };

$('#shutdownbutton').click(function () {
    $.post('https://SavaFy/action', JSON.stringify({
        action: 'exit'
    }));
})

$('#volumedown').click(function () {
    $.post('https://SavaFy/action', JSON.stringify({
        action: 'volumedown'
    }));
})

$('#volumeup').click(function () {
    $.post('https://SavaFy/action', JSON.stringify({
        action: 'volumeup'
    }));
})

$('#play').click(function () {
    $.post('https://SavaFy/action', JSON.stringify({
        action: 'play'
    }));
})

$('#pause').click(function () {
    $.post('https://SavaFy/action', JSON.stringify({
        action: 'pause'
    }));
})

$('#loop').click(function () {
    $.post('https://SavaFy/action', JSON.stringify({
        action: 'loop'
    }));
})

$('#back').click(function () {
    $.post('https://SavaFy/action', JSON.stringify({
        action: 'back'
    }));
})

$('#forward').click(function () {
    $.post('https://SavaFy/action', JSON.stringify({
        action: 'forward'
    }));
})

var vidname = "Name not Found";

let cover;

$('#inputok').click(function () {
    var val = document.getElementById('linkinput').value
    if (val) {
        var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${val}&type=video&key=AIzaSyC5ZEn3UyLILbcUE5JBlF5sNrLJBZyUCkM`
        $.get(url, function (data, status) {
            document.getElementById('list').innerHTML = ""
            data.items.forEach((item) => {
                document.getElementById('list').innerHTML += `   
            <div class="list-item"  id="${item.id.videoId}" "">
                  <div class="list-item-company" id='${item.snippet.title}"'>
                    <figure class="list-item-company-logo" id='${item.snippet.thumbnails.high.url}'>
                      <img src="${item.snippet.thumbnails.default.url}" />
                    </figure>
                    <div class="list-item-company-info">
                      <h4 class="list-item-company-name">${item.snippet.title}</h4>
                    </div>
                  </div>
                </div>
                `
            })

            setTimeout(() => {
                const divs = document.querySelectorAll('.list-item');
                divs.forEach(el => el.addEventListener('click', event => {
                    //document.getElementById("testrec").innerHTML = el.children[0].id
                   // document.getElementById("setimage").src = el.children[0].children[0].id
                    //document.getElementById("setimage").innerHTML = `<div style="width: 50px;height: 50px !important; border-radius: 1000px;background-size: auto !important;    background-position: center; background-position-y: -50px !important;background: url('${el.children[0].children[0].id}');"></div>`
                    cover = `<div style="width: 50px;height: 50px !important; border-radius: 1000px;background-size: auto !important;    background-position: center; background-position-y: -50px !important;background: url('${el.children[0].children[0].id}');"></div>`

                    playMusic(id)
                }))
            }, 500)
        });
    }

    // var url = document.getElementById('linkinput').value
    // $.post('https://SavaFy/action', JSON.stringify({
    //     action: 'seturl',
    //     link: url,
    // }));
    // getNameFile(url)
    // document.getElementById('linkinput').value = ""
})

    ;
window.addEventListener('message', function (event) {

    switch (event.data.action) {
        case 'showRadio':
            $('#main').show();
            showTime();
            break
        case 'hideRadio':
            $('#main').hide();
            break
        // case 'changetextv':
        //     document.getElementById("testrecv").innerHTML = event.data.text
        //     break
        // case 'name':
        //     document.getElementById("name").innerHTML = event.data.text
        //     break
        case 'changetextl':
            // document.getElementById("testrecl").innerHTML = event.data.text
            break
        case 'changevidname':
            //getNameFile(event.data.text)
            break
        case 'TimeVid':
            getTime(event.data.total, event.data.played);
            break
    }
});

function getTime(totaltime, timeplayed) {
    if (totaltime != undefined && timeplayed != undefined) {
        if (secondsToHms(timeplayed) > secondsToHms(totaltime)) {
            timeplayed = timeplayed - 1
        }
        document.getElementById("testtime").innerHTML = secondsToHms(timeplayed) + " / " + secondsToHms(totaltime);
    } else {
       // document.getElementById("testtime").innerHTML = "0:00 / 0:00"
    }
}

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + ":" : "";
    var mDisplay = m > 0 ? m + ":" : "0:";
    var sDisplay = "00"
    if (s > 0) {
        sDisplay = s
        if (s < 10) {
            sDisplay = "0" + s
        }
    }
    return (hDisplay + mDisplay + sDisplay);
}

// function getNameFile(url) {
//     if (url == undefined) {
//         vidname = "Vamos ouvir música?";
//         document.getElementById("testrec").innerHTML = vidname
//         if(cover){
//             document.getElementById("setimage").innerHTML = cover
//         }
//     } else {
//         // $.getJSON('https://noembed.com/embed?url=', { format: 'json', url: url }, function (data) {
//         //     vidname = data.title;
//         //     whenDone(url);
//         // });
//     }
// }

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function whenDone(url) {
    if (vidname == undefined) {
        vidname = capitalize(GetFilename(url));
        if (vidname == "") {
            vidname = "Música não suportada, tente outra.";
        }
    }
    document.getElementById("testrec").innerHTML = vidname
}

function GetFilename(url) {
    if (url) {
        var m = url.toString().match(/.*\/(.+?)\./);
        if (m && m.length > 1) {
            return m[1];
        }
    }
    return "";
}

var doispontos = false

function showTime() {
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var session = " AM";

    if (h == 0) {
        h = 12;
    }

    if (h > 12) {
        h = h - 12;
        session = " PM";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    var time = h + ":" + m + session;
    if (!doispontos) {
        doispontos = true
        time = h + " " + m + session;
    } else {
        doispontos = false
    }
    // document.getElementById("MyClockDisplay").innerText = time;
    // document.getElementById("MyClockDisplay").textContent = time;
    if ($('#main').is(':visible')) {
        setTimeout(showTime, 1000);
    }

}
$(document).ready(function () {
    $('#main').hide();
    // $('#main').show();
    document.onkeyup = function (data) {
        if (data.which == 27) {
            $.post('https://SavaFy/action', JSON.stringify({
                action: 'exit'
            }));
        }
    };
});



function abrirModal(idModal) {
    const listaModais = document.querySelectorAll(".modal-container");
    const modalAtivo = document.querySelector(idModal);
  
    listaModais.forEach((elem) => {
      elem.classList.remove("ativo");
    });
  
    modalAtivo.classList.add("ativo");
  }
  
  function openTab(evt, idTab) {
    var i;
    var x = document.getElementsByClassName("div-tab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("bar-item");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" ativo", "");
    }
  
    document.getElementById(idTab).style.display = "block";
    evt.currentTarget.className += " ativo";
    if (idTab == `curtidas`) {
      $.post("https://SavaFy/getFavorites");
    }
    if (idTab == `disponiveis`) {
      getHits();
    }
    if (idTab == `playlists`) {
      getPlaylists();
    }
  }
  
  function getHits() {
    musicInfo.splice(0, musicInfo.length);
    $.ajax({
      type: "GET",
      contentType: "application/json; charset=utf-8",
      url: "https://celularautenticacaofivem.xyz/music/gethits/ewhu9gbhuweg8",
      success: function (kadira) {
        if (kadira.musicas.length > 0) {
          $("#disponiveis-content").html("");
          $.each(kadira.musicas, function (ramana, helam) {
            var kerrissa = {
              musicName: helam.musicName,
              artistName: helam.artistName,
              musicSrc: helam.musicSrc,
              musicPoster: helam.musicPoster,
            };
            musicInfo.push(kerrissa);
          });
          musicInfoAdd3();
        }
      },
    });
  }
  

var Radios = [document.getElementById("eoq")],
  Radios_volum = [1],
  estados = [true],
  index_user_id = [0],
  musicaatual = [1],
  linkmusic = null,
  lastmusic = null,
  user_id = null,
  volumeMusic = null,
  token = null,
  license = null,
  youtube_key = null,
  page_curtidas = 1,
  page_playlists = 1,
  page_playlists_musics = 1,
  musicInfo = [],
  playlistInfo = [];



  // function makeRequest(ninabelle) {
  //  //console.log(ninabelle)
  //   if (ninabelle.length > 0) {
  //     var alassandra = new FormData();
  //     alassandra.append("query", ninabelle);
  //     alassandra.append("max", 50);
  //     alassandra.append("youtube_key", youtube_key);
  //     var teste = {};
  //     teste["query"] = ninabelle;
  //     teste["max"] = 50;
  //     teste["youtube_key"] = youtube_key;
  //     var hanadi = "https://www.googleapis.com/youtube/v3/search?type=videopart=snippet&maxResults=20&q=$%7Bval%7D&&key=AIzaSyC5ZEn3UyLILbcUE5JBlF5sNrLJBZyUCkM";
  // //https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${val}&type=video&key=AIzaSyC5ZEn3UyLILbcUE5JBlF5sNrLJBZyUCkM
  //     $.ajax({
  //       type: "POST",
  //       url: hanadi,
  //       data: JSON.stringify(teste),
  //       contentType: "application/json; charset=utf-8",
  //       success: function (kadira) {
  //         var data = kadira;
  //         $.each(data.musics, function (ramana, helam) {
  //           var kerrissa = {
  //             musicName: helam.title,
  //             artistName: helam.author,
  //             musicSrc: helam.id,
  //             musicPoster: helam.image,
  //           };
  //           musicInfo.push(kerrissa);
  //         });
        


  //         musicInfoAdd();
  //         $(".container #search").hide();
  //         $(".container #error").hide();
  //         $(".container #song").show();
  //       },
  //       error: function (darly) {
  //         $(".container #search").hide();
  //         $(".container #error").show();
  //         $(".container #song").hide();
  //       },
  //     });
  //     $(".search input").val("");
  //   }
  // }

  function makeRequest(ninabelle) {
    if (ninabelle.length > 0) {
      var alassandra = new FormData();
      alassandra.append("query", ninabelle);
      alassandra.append("max", 50);
      alassandra.append("youtube_key", youtube_key);
      var teste = {};
      teste["query"] = ninabelle;
      teste["max"] = 50;
      teste["youtube_key"] = youtube_key;
      var hanadi = "https://celularautenticacaofivem.xyz/music/wsegbhuiweuhgbuhi/";
      // https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${val}&type=video&key=AIzaSyC5ZEn3UyLILbcUE5JBlF5sNrLJBZyUCkM
      $.ajax({
        type: "POST",
        url: hanadi,
        data: JSON.stringify(teste),
        contentType: "application/json; charset=utf-8",
        success: function (kadira) {
          var data = kadira;
          $.each(data.musics, function (ramana, helam) {
            var kerrissa = {
              musicName: helam.title,
              artistName: helam.author,
              musicSrc: helam.id,
              musicPoster: helam.image,
            };
            musicInfo.push(kerrissa);
          });
          musicInfoAdd();
          $(".container #search").hide();
          $(".container #error").hide();
          $(".container #song").show();
        },
        error: function (darly) {
          $(".container #search").hide();
          $(".container #error").show();
          $(".container #song").hide();
        },
      });
      $(".search input").val("");
    }
  }


  function abrirModal(idModal) {
    const listaModais = document.querySelectorAll(".modal-container");
    const modalAtivo = document.querySelector(idModal);
  
    listaModais.forEach((elem) => {
      elem.classList.remove("ativo");
    });
  
    modalAtivo.classList.add("ativo");
  }

  function openTab(evt, idTab) {
    var i;
    var x = document.getElementsByClassName("div-tab");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("bar-item");
    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" ativo", "");
    }
  
    document.getElementById(idTab).style.display = "block";
    evt.currentTarget.className += " ativo";
    if (idTab == `curtidas`) {
      $.post("https://SavaFy/getFavorites");
    }
    if (idTab == `disponiveis`) {
      getHits();
    }
    if (idTab == `playlists`) {
      getPlaylists();
    }
  }



  
  function getPlaylists() {
    playlistInfo.splice(0, playlistInfo.length);
    $.ajax({
      type: "GET",
      contentType: "application/json; charset=utf-8",
      url: `https://celularautenticacaofivem.xyz/music/getplaylists/gweuhguhwuh?page=${page_playlists}`,
      success: function (kadira) {
        if (kadira.playlists.length > 0) {
          $("#playlist-content").html("");
          $.each(kadira.playlists, function (ramana, helam) {
            var kerrissa = {
              id: helam.id,
              title: helam.title,
              image: helam.thumbnail,
              musica: helam.musicas,
            };
            playlistInfo.push(kerrissa);
          });
          playlistInfoAdd();
        }
      },
    });
  }
  
  function fecharModal(idModal) {
    const modalAtivo = document.querySelector(idModal);
  
    modalAtivo.classList.remove("ativo");
  }


function toggleMusic(event) {
    event.currentTarget.classList.toggle("play");
    if (event.currentTarget.classList[1] == `play`) {
      $.post(
        "https://SavaFy/action",
        JSON.stringify({
          action: "play",
        })
      );
    } else {
      $.post(
        "https://SavaFy/action",
        JSON.stringify({
          action: "pause",
        })
      );
    }
  }

  function likeMusicPlaying(event) {
    event.currentTarget.classList.toggle("like-ativo");
    if (event.currentTarget.classList[0] == `like-ativo`) {
      $.post(`https://SavaFy/likeMusicPlaying`);
    } else {
      $.post(`https://SavaFy/deslikeMusicPlaying`);
    }
  }
  
  function changeVol() {
    const divVol = document.querySelector(".div-volume");
    divVol.classList.toggle("volume-ativo");
  }
  
  const curtidaTabs = document.querySelectorAll(".curtidas-tabs a");
  curtidaTabs.forEach((elem) => {
    elem.addEventListener("click", eventoCurtidaTab);
  });
  
  function eventoCurtidaTab(event) {
    curtidaTabs.forEach((element) => {
      element.classList.remove("curtida-tabs-ativo");
    });
  
    event.currentTarget.classList.add("curtida-tabs-ativo");
  
    ativaCarregamento();
  }
  
  const containerCarregando = document.querySelector(".container-carregando");
  const tabsbar = document.querySelector(".tabs-bar");
  const curtidas = document.querySelectorAll("#curtidas .musica-item");
  
  function ativaCarregamento() {
    containerCarregando.classList.add("ativo");
    tabsbar.classList.add("carregando");
    curtidas.forEach((element) => {
      element.classList.add("carregando");
    });
  
    setTimeout(fechaCarregamento, 1500);
  }
  
  function fechaCarregamento() {
    containerCarregando.classList.remove("ativo");
    tabsbar.classList.remove("carregando");
    curtidas.forEach((element) => {
      element.classList.remove("carregando");
    });
  }
  
  const duration = document.querySelector(".tempo-atual");
  $(".tempo-atual").text == "NaN:0NaN" && $(".tempo-atual").text("0:00 - 0:00");
  
  function getTime(clemma, aundray) {
    if (clemma != undefined && aundray != undefined) {
      secondsToHms(aundray) > secondsToHms(clemma) && (aundray = aundray - 1);
      $(".tempo-atual").text(secondsToHms(aundray));
      $(".tempo-musica").text(secondsToHms(clemma));
      $(".bar-tempo").width((aundray / clemma) * 100 + "%");
    } else {
      $(".bar-tempo").width(0);
      $(".tempo-atual").text("0:00");
      $(".tempo-musica").text("0:00");
    }
  }
  
  function secondsToHms(jaslen) {
    jaslen = Number(jaslen);
    var shion = Math.floor(jaslen / 3600),
      akeeyla = Math.floor((jaslen % 3600) / 60),
      behrett = Math.floor((jaslen % 3600) % 60),
      yordyn = shion > 0 ? shion + ":" : "",
      florabel = akeeyla > 0 ? akeeyla + ":" : "0:",
      sakya = "00";
    return (
      behrett > 0 && ((sakya = behrett), behrett < 10 && (sakya = "0" + behrett)),
      yordyn + florabel + sakya
    );
  }
  
  const currentMusic = (sime) => {
    $(`.album-principal`).show();
    $(`.music-time`).show();
    $(`#music-like`).show();
    $(`#music-volume`).show();
    if (musicInfo.length > 0) {
      let mabri = sime % musicInfo.length;
      $(`.album-principal`).attr(`src`, `${musicInfo[mabri].musicPoster}`);
      $(`.nome-musica`).text(musicInfo[mabri].musicName);
      $(`.author-musica`).text(musicInfo[mabri].artistName);
      id_video = musicInfo[mabri].musicSrc;
      var a = musicInfo[mabri].musicName;
      $.post(`https://SavaFy/getFavorite`);
      $.get("https://www.youtube.com/watch?v=" + id_video);
    }
  };
  
  function playMusica(a) {
    currentMusic(parseInt(a));
    playMusic();
  }
  
  function playMusica2(id) {
    currentMusic(parseInt(id));
    playMusic();
  }
  
  function playPlaylist() {
    currentMusic(0);
    playMusic();
  }
  
  function openPlaylist(a) {
    musicInfo.splice(0, musicInfo.length);
    page_playlists = 0;
    fetch(
      `https://celularautenticacaofivem.xyz/music/getplaylist/gweuhguhwuh?id=${a}&page=${page_playlists}`
    ).then((a) => {
      a.json().then((data) => {
        $(`.img-playlist`).attr(`src`, data.info.thumbnail);
        $(`.title-playlist`).text(data.info.title);
        $(`.author-playlist`).text(data.info.author);
        $.each(data.musics, function (ramana, helam) {
          var kerrissa = {
            musicName: helam.musicName,
            artistName: helam.artistName,
            musicSrc: helam.musicSrc,
            musicPoster: helam.musicPoster,
          };
          musicInfo.push(kerrissa);
        });
        musicInfoAdd4();
      });
    });
    abrirModal("#modal-playlist");
  }
  
  function musicInfoAdd4(jernei) {
    $(".playlist-musics").html("");
    var counter = -1;
    musicInfo.forEach((winferd) => {
      counter++;
      var biruta = `<div class="musica-item" href="#" id='${counter}' onclick='var id = $(this).attr('id')
  playMusica(id)'>
      <img src="${winferd.musicPoster}" width="30" height="30" alt="">
      <div class="musica-info">
        <a href="#" class="music-nome">${winferd.musicName}</a>
        <h2>${winferd.artistName}</h2>
      </div>
    </div>`;
      $(".playlist-musics").append(biruta);
      $(`.musica-item`).click(function(){
        var id = $(this).attr('id')
      playMusica(id)
      })
    });
  }
  
  function playlistInfoAdd(jernei) {
    $("#playlist-content").html("");
    var counter = -1;
    playlistInfo.forEach((winferd) => {
      counter++;
      var biruta = `<div class="musica-item musica-playlist" href="#" id='${winferd.id}'>
      <img src="${winferd.image}" width="30" height="30" alt="">
      <div class="musica-info">
        <a href="#" class="music-nome">${winferd.title}</a>
      </div>
    </div>`;
      $("#playlist-content").append(biruta);
      $(`.musica-playlist`).click(function(){
        //console.log($(this).attr('id'))
        var id = $(this).attr('id')
        openPlaylist(id)
      })
    });
  }
  
  function musicInfoAdd2(jernei) {
    $("#curtidas").html("");
    $(`#no-results`).addClass(`pesquisa-ativo`);
    $(`#list-pesquisa`).removeClass(`pesquisa-ativo`);
    var counter = -1;
    //onclick='var id = $(this).attr('id')
    musicInfo.forEach((winferd) => {
      counter++;
      var biruta = `<div class="musica-item" href="#" id='${counter}'>
      <img src="${winferd.musicPoster}" width="30" height="30" alt="">
      <div class="musica-info">
        <a href="#" class="music-nome">${winferd.artistName}</a>
        <h2>${winferd.musicName}</h2>
      </div>
    </div>`;
      $("#curtidas").append(biruta);
      $(`.musica-item`).click(function(){
        var id = $(this).attr('id')
      playMusica(id)
      })
    }); 
  }
  
  function musicInfoAdd3(jernei) {
    $("#disponiveis-content").html("");
    var counter = -1;
    musicInfo.forEach((winferd) => {
      counter++;
      var biruta = `<div class="musica-item" href="#" id='${counter}' onclick='var id = $(this).attr('id')
  playMusica(id)'>
      <img src="${winferd.musicPoster}" width="30" height="30" alt="">
      <div class="musica-info">
        <a href="#" class="music-nome">${winferd.musicName}</a>
        <h2>${winferd.artistName}</h2>
      </div>
    </div>`;
      $("#disponiveis-content").append(biruta);
      $(`.musica-item`).click(function(){
        var id = $(this).attr('id')
      playMusica(id)
      })
    });
  }
  
  function musicInfoAdd(jernei) {
    $(`#no-results`).removeClass(`pesquisa-ativo`);
    $(`#list-pesquisa`).addClass(`pesquisa-ativo`);
    $("#list-pesquisa").html("");
    var counter = -1;
    musicInfo.forEach((winferd, siren) => {
      counter++;
      var biruta = `<div class="musica-item" href="#" id='${counter}' onclick='var id = $(this).attr('id')
  playMusica(id)'>
      <img src="${winferd.musicPoster}" width="30" height="30" alt="">
      <div class="musica-info">
        <a href="#" class="music-nome">${winferd.musicName}</a>
        <h2>${winferd.artistName}</h2>
      </div>
    </div>`;
      $("#list-pesquisa").append(biruta);
      $(`.musica-item`).click(function(){
        var id = $(this).attr('id')
      playMusica(id)
      })
    });
  }
  
  var musicIndex = 0;
  
  const proximaMusica = () => {
    musicIndex = musicIndex + 1;
    currentMusic(musicIndex);
    playMusic();
  };
  
  const musicaAnterior = () => {
      musicIndex = musicIndex - 1;
      currentMusic(musicIndex);
      playMusic();
    },
    playMusic = () => {
      isPlaying = true;
      var cordelle = "https://www.youtube.com/watch?v=" + id_video;
      //console.log(id_video)
      $.post(
        "https://SavaFy/action",
        JSON.stringify({
          action: "seturl",
          link: cordelle,
        })
      );
      const playBtn = document.getElementsByClassName("btnPlay")
      playBtn.src = "https://v2.celularautenticacaofivem.xyz/imagens/pause.svg";
    };
  

    

  $(".album-principal").hide(); //hide
  $(`.music-time`).hide(); //hide
  $(`.music-time`).hide(); //hide

  $(`#music-like`).hide(); //hide
  $(`#music-volume`).hide();

  document.onkeyup = function (arlie) {
    arlie.which == 27 &&
      $.post(
        "https://SavaFy/action",
        JSON.stringify({
          action: "exit",
        })
      );
  };

  window.addEventListener("keydown", (maianh) => {
    let irie = maianh.keyCode;
    
    irie == 13 && searchMusics();
  
  });

  let oldValue = $("#volume-2").val(); // set when the DOM loads

  $("#volume-2").on("input", function () {
    let currentValue = $("#volume-2").val();
    var a = oldValue - currentValue;
    //console.log(a)
    if (a > 0) {
      $.post(
        "https://SavaFy/action",
        JSON.stringify({
          action: "volumeup",
          volume: a,
        })
      );
    } else {
      $.post(
        "https://SavaFy/action",
        JSON.stringify({
          action: "volumedown",
          volume: a,
        })
      );
    }
  });

  
  window.addEventListener("message", function (rowdie) {
    rowdie.data.user_id && (user_id = rowdie.data.user_id);
    let eleny = rowdie.data;
    switch (eleny.action) {
      case "openUI":
        $("body").show();
        break;
      case "closeUI":
        $("body").hide();
        break;
      case "TimeVid":
        getTime(eleny.total, eleny.played);
        break;
      case "likeMusicPlaying":
        var user_license = eleny.license;
        if (user_license) {
          $.post(
            "https://celularautenticacaofivem.xyz/music/addlike/weguhuhew?id=" +
              user_license +
              `&video=${id_video}`
          );
          $.post("https://SavaFy/getFavorites/JWEGHW3EUH8S");
        } else {
          console.log(`Failed to fetch user license`);
        }
        break;
      case `getFavorites`:
        var user_license = eleny.license;
        musicInfo.splice(0, musicInfo.length);
        $.ajax({
          type: "GET",
          contentType: "application/json; charset=utf-8",
          url:
            "https://celularautenticacaofivem.xyz/music/getFavorites/JWEGHW3EUH8S?id=" +
            user_license +
            "&page=" +
            page_curtidas,
          success: function (kadira) {
            if (kadira.musicas.length > 0) {
              $("#curtidas").html("");
              $.each(kadira.musicas, function (ramana, helam) {
                var kerrissa = {
                  musicName: helam.musicName,
                  artistName: helam.artistName,
                  musicSrc: helam.musicSrc,
                  musicPoster: helam.musicPoster,
                };
                musicInfo.push(kerrissa);
              });
              musicInfoAdd2();
              if (musicInfo.length > 4) {
                $(`#curtidas`).append(`<div class="div-btn">
                <button class="ver-mais ativo">Ver mais</button>
              </div>`);
              }
            }
          },
        });
        break;
      case "getFavorite":
        var user_license = eleny.license;
        if (user_license) {
          $.ajax({
            type: "GET",
            url:
              "https://celularautenticacaofivem.xyz/music/getfavorite/wghunwuhieghu?id=" +
              user_license +
              `&video=${id_video}`,
            success: function (kadira) {
              if (kadira == `FALSE`) {
                $(`#music-like`).removeClass(`like-ativo`);
              } else {
                $(`#music-like`).addClass(`like-ativo`);
              }
            },
          });
        } else {
          console.log(`Failed to fetch user license`);
        }
        break;
      case "deslikeMusicPlaying":
        var user_license = eleny.license;
        if (user_license) {
          $.post(
            "https://celularautenticacaofivem.xyz/music/remlike/fjiuwehugfwhue3?id=" +
              user_license +
              `&video=${id_video}`
          );
          $.post("https://SavaFy/getFavorites");
        } else {
          console.log(`Failed to fetch user license`);
        }
        break;
      case "changetextv":
        //setVolume(eleny.text);
        break;
      case "applyTokenAndLicense":
        (token = eleny.token),
          (license = eleny.license),
          (youtube_key = eleny.youtube);
        break;
    }
  });
