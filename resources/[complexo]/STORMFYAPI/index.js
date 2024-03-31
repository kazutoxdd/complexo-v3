const express = require("express");
const axios = require("axios");
const app = express();
const mysql = require("mysql2");
const config = require("./config.json");
const PORT = config.Server.Port;
const HOST = config.Server.Host;
app.use(express.json());

//CONFIGURAÇÃO DE PESQUISA SOUND CLOUND
const clientid = config.Sound.ClientId;
const maxresults = config.Sound.MaxResults;

function getStr(string, start, end) {
   const str = string.split(start);
   const strEnd = str[1].split(end);
   return strEnd[0];
 }
 
 const connection = mysql.createConnection({
   host: config.Database.Host,
   user: config.Database.User,
   password: config.Database.Password,
   database: config.Database.Database,
 });

connection.connect((err) => {
   if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
      return;
   }
   console.log("Conexão ao banco de dados estabelecida.");
});

app.get('/client/history', async (req, res) => {
   const url = 'http://131.196.197.2/history.json'
   const response = await axios.get(url);
   res.status(200).json(response.data)
});

app.post('/client/history', async (req, res) => {
   const url = 'http://131.196.197.2/history.json'
   const response = await axios.get(url);
   res.status(200).json(response.data)
});

//iniciO likes

app.post("/client/likes/:id", async (req, res) => {
   try {
     const _id = req.params.id;
     const x_player_id = req.headers["x-player-id"];
     const url = `https://api-v2.soundcloud.com/tracks/${_id}?client_id=${clientid}`;
     const response = await axios.get(url);
     const { artwork_url, user, title, permalink_url } = response.data;
     const image_url = artwork_url || `https://picsum.photos/seed/${_id}/100`;
     const selectQuery = `SELECT * FROM curtidas WHERE x_player_id = ?`;
 
     connection.query(
       selectQuery,
       [x_player_id],
       async (selectErr, selectResults) => {
         if (selectErr) {
           console.error("Erro ao buscar informações de curtidas:", selectErr);
           res.status(500).json({
             error: "Ocorreu um erro ao buscar informações de curtidas.",
           });
           return;
         }
 
         let likedInfos = [];
         if (selectResults.length > 0) {
           likedInfos = JSON.parse(selectResults[0].infos);
         } else {
           const insertQuery = `INSERT INTO curtidas (x_player_id, infos) VALUES (?, ?)`;
           likedInfos.push({
             _id: _id,
             image_url: image_url,
             name: title,
             author: user.username,
             url: permalink_url,
           });
 
           connection.query(
             insertQuery,
             [x_player_id, JSON.stringify(likedInfos)],
             (insertErr) => {
               if (insertErr) {
                 console.error(
                   "Erro ao inserir informações de curtidas:",
                   insertErr
                 );
                 res.status(500).json({
                   error: "Ocorreu um erro ao inserir informações de curtidas.",
                 });
                 return;
               }
               res.status(200).json(likedInfos);
             }
           );
           return;
         }
 
         const existingEntry = likedInfos.find((info) => info._id === _id);
         if (!existingEntry) {
           likedInfos.push({
             _id: _id,
             image_url: image_url,
             name: title,
             author: user.username,
             url: permalink_url,
           });
 
           const updateQuery = `UPDATE curtidas SET infos = ? WHERE x_player_id = ?`;
 
           connection.query(
             updateQuery,
             [JSON.stringify(likedInfos), x_player_id],
             (updateErr) => {
               if (updateErr) {
                 console.error(
                   "Erro ao atualizar informações de curtidas:",
                   updateErr
                 );
                 res.status(500).json({
                   error:
                     "Ocorreu um erro ao atualizar informações de curtidas.",
                 });
                 return;
               }
               res.status(200).json(likedInfos);
             }
           );
         } else {
           res.status(200).json(likedInfos);
         }
       }
     );
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: "Ocorreu um erro ao processar o ID." });
   }
 });


 app.get("/client/playlist", async (req, res) => {
   try {
     const { songs } = req.query;
     if (!songs) {
       res.status(400).json({ error: 'Parâmetro "songs" é obrigatório.' });
       return;
     }
     const songIds = songs.split(",");
     const responses = [];
     await Promise.all(
       songIds.map(async (songId) => {
         const url = `https://api-v2.soundcloud.com/tracks/${songId}?client_id=${clientid}`;
         try {
           const response = await axios.get(url);
           const { id, artwork_url, title, user } = response.data;
           const image_url = artwork_url
             ? artwork_url
             : `https://picsum.photos/seed/${id}/100`;
           responses.push({
             _id: `${id}`,
             image_url,
             name: title,
             author: user.username,
           });
         } catch (error) {
           if (error.response && error.response.status === 404) {
             return;
           } else {
             console.error("Erro na requisição:", error);
           }
         }
       })
     );
     res.status(200).json(responses.filter(Boolean));
   } catch (error) {
     console.error("Erro na requisição:", error);
     res.status(500).json({ error: "Ocorreu um erro na requisição." });
   }
 });

app.get('/client/likes', async (req, res) => {
   try {
      const x_player_id = req.headers['x-player-id'];

      const selectQuery = `SELECT infos FROM curtidas WHERE x_player_id = ?`;

      connection.query(selectQuery, [x_player_id], (selectErr, selectResults) => {
         if (selectErr) {
            console.error('Erro ao buscar informações de curtidas:', selectErr);
            res.status(500).json({
               error: 'Ocorreu um erro ao buscar informações de curtidas.'
            });
            return;
         }

         if (selectResults.length === 0) {
            res.status(200).json([]);
            return;
         }

         const likedInfos = JSON.parse(selectResults[0].infos);
         const likedIds = likedInfos.filter(info => info !== null).map(info => info._id);

         res.status(200).json(likedIds);
      });

   } catch (error) {
      console.error(error);
      res.status(500).json({
         error: 'Ocorreu um erro ao buscar as músicas curtidas.'
      });
   }
});

app.get('/client/playlists', async (req, res) => {
   try {
      const x_player_id = req.headers['x-player-id'];

      connection.query('SELECT playlists FROM playlists WHERE x_player_id = ?', [x_player_id], (err, results) => {
         if (err) {
            console.error('Erro ao obter playlists:', err);
            res.status(500).json({
               error: 'Ocorreu um erro ao obter as playlists.'
            });
            return;
         }

         if (results.length === 0) {
            res.status(200).json([]);
         } else {
            const playlists = JSON.parse(results[0].playlists);
            res.status(200).json(playlists);
         }
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         error: 'Ocorreu um erro ao obter as playlists.'
      });
   }
});

app.post('/client/playlists', async (req, res) => {
   try {
      const x_player_id = req.headers['x-player-id'];

      const {
         name,
         image_url
      } = req.body;

      connection.query('SELECT playlists FROM playlists WHERE x_player_id = ?', [x_player_id], (err, results) => {
         if (err) {
            console.error('Erro ao verificar as playlists existentes:', err);
            res.status(500).json({
               error: 'Ocorreu um erro ao verificar as playlists existentes.'
            });
            return;
         }

         let playlistsArray = [];
         if (results.length > 0) {
            playlistsArray = JSON.parse(results[0].playlists);
         }

         const lastPlaylist = playlistsArray[playlistsArray.length - 1];
         const lastId = lastPlaylist ? lastPlaylist.id : 0;
         const nextId = lastId + 1;

         const newPlaylist = {
            id: nextId,
            _id: name,
            name,
            image_url,
            songs: []
         };

         playlistsArray.push(newPlaylist);

         if (results.length === 0) {
            connection.query(
               'INSERT INTO playlists (x_player_id, playlists) VALUES (?, ?)',
               [x_player_id, JSON.stringify([newPlaylist])],
               (insertErr) => {
                  if (insertErr) {
                     console.error('Erro ao inserir a playlist:', insertErr);
                     res.status(500).json({
                        error: 'Ocorreu um erro ao inserir a playlist.'
                     });
                     return;
                  }

                  res.status(200).json(newPlaylist);
               }
            );
         } else {
            connection.query(
               'UPDATE playlists SET playlists = ? WHERE x_player_id = ?',
               [JSON.stringify(playlistsArray), x_player_id],
               (updateErr) => {
                  if (updateErr) {
                     console.error('Erro ao atualizar a playlist:', updateErr);
                     res.status(500).json({
                        error: 'Ocorreu um erro ao atualizar a playlist.'
                     });
                     return;
                  }

                  res.status(200).json(newPlaylist);
               }
            );
         }
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         error: 'Ocorreu um erro ao salvar a playlist.'
      });
   }
});

app.get('/client/playlists', async (req, res) => {
   try {
      const x_player_id = req.headers['x-player-id'];

      connection.query('SELECT playlists FROM playlists WHERE x_player_id = ?', [x_player_id], (err, results) => {
         if (err) {
            console.error('Erro ao obter playlists:', err);
            res.status(500).json({
               error: 'Ocorreu um erro ao obter as playlists.'
            });
            return;
         } 

         if (results.length === 0) {
            res.status(200).json([]);
         } else {
            const playlists = JSON.parse(results[0].playlists);
            res.status(200).json(playlists);
         }
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         error: 'Ocorreu um erro ao obter as playlists.'
      });
   }
});

//add musica musica
app.post('/client/playlists/:playlistId/:songId', async (req, res) => {
   try {
      const playlistId = req.params.playlistId;
      const songId = req.params.songId;

      connection.query('SELECT playlists FROM playlists WHERE x_player_id = ?', [req.headers['x-player-id']], (err, results) => {
         if (err) {
            console.error('Erro ao obter playlists:', err);
            res.status(500).json({
               error: 'Ocorreu um erro ao obter as playlists.'
            });
            return;
         }

         if (results.length === 0) {
            res.status(404).json({
               error: 'Playlist não encontrada.'
            });
         } else {
            const playlists = JSON.parse(results[0].playlists);
            const targetPlaylist = playlists.find(playlist => playlist._id === playlistId);

            if (!targetPlaylist) {
               res.status(404).json({
                  error: 'Playlist não encontrada.'
               });
               return;
            }

            targetPlaylist.songs.push(songId);

            connection.query(
               'UPDATE playlists SET playlists = ? WHERE x_player_id = ?',
               [JSON.stringify(playlists), req.headers['x-player-id']],
               (updateErr) => {
                  if (updateErr) {
                     console.error('Erro ao atualizar a playlist:', updateErr);
                     res.status(500).json({
                        error: 'Ocorreu um erro ao atualizar a playlist.'
                     });
                     return;
                  }

                  res.status(200).json(targetPlaylist);
               }
            );
         }
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({
         error: 'Ocorreu um erro ao adicionar a música à playlist.'
      });
   }
});

app.post('/client/download', async (req, res) => {
   const {
      songs
   } = req.body;

   if (!songs || !Array.isArray(songs)) {
      return res.status(400).json({
         error: 'O parâmetro "songs" deve ser um array de IDs de músicas.'
      });
   }

   try {

      const responses = await Promise.all(songs.map(async (songId) => {
         const url = `https://api-v2.soundcloud.com/tracks/${songId}?client_id=${clientid}`;
         const response = await axios.get(url);

         const {
            permalink_url
         } = response.data;

         const forhubUrl = 'https://www.forhub.io/download.php';
         const forhubResponse = await axios.post(forhubUrl, `formurl=${permalink_url}`);

         const urltouse = getStr(forhubResponse.data, "downloadFile('", "'");
         const response2 = response.data

         return {
            _id: `${songId}`,
            url: urltouse,
            image_url: response2.artwork_url || 'https://picsum.photos/200',
            name: response2.title,
            author: response2.user.username,
         };
      }));

      res.json(responses);
   } catch (error) {
      console.error('Erro na requisição:', error);
      res.status(500).json({
         error: 'Ocorreu um erro na requisição.'
      });
   }
});

app.get('/client/search', async (req, res) => {
   const { title } = req.query;

   try {
      const response = await axios.get(`https://api-v2.soundcloud.com/search/tracks?q=${title}&client_id=${clientid}&limit=${maxresults}&app_locale=pt_BR`);

      const responseData = response.data.collection;

      const formattedData = responseData.map(result => ({
         _id: `${result.id}`,
         image_url: result.artwork_url || 'https://picsum.photos/200',
         name: result.title,
         author: result.user.username,
      }));

      res.json(formattedData);
   } catch (error) {
      console.error('Erro na requisição:', error);
      res.status(500).json({
         error: 'Ocorreu um erro na requisição.'
      });
   }
});

app.listen(PORT, () => {
   console.log(`APLICAÇÃO STORM API Ligada e Rodando em http://${HOST}:${PORT}/client`);
}); 


