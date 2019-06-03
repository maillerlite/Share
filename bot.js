var btn = $("#hajar");
var date = new Date();
var jam = date.getHours();
var mnt = date.getMinutes();
var dtk = date.getSeconds();
// var textarea = textarea.replaceArray(rep, find);
var bln = [' Januari ', ' Februari ', ' Maret ', ' April ', ' Mei ', ' Juni ', ' Juli ', ' Agustus ', ' September ', ' Oktober ', ' November ', ' Desember '];
var rep = ['/01/', '/02/', '/03/', '/04/', '/05/', '/06/', '/07/', '/08/', '/09/', '/10/', '/11/', '/12/'];
var mot = ['ðŸ˜Ž','ðŸ¥³','ðŸ¥´','ðŸ˜º','ðŸ˜¸','ðŸ˜¹','ðŸ˜»','ðŸ˜¼','ðŸ˜½','ðŸ•µï¸â€â™€ï¸','ðŸ™‡â€â™‚ï¸','ðŸ™‡â€â™€ï¸','ðŸ†', 'ðŸ‘™', 'ðŸ§šâ€â™€ï¸', 'ðŸ§šâ€â™‚ï¸', 'ðŸ§žâ€â™‚ï¸', 'ðŸ§žâ€â™€ï¸', 'ðŸ§Ÿâ€â™‚ï¸', 'ðŸ™ˆ', 'ðŸ', 'ðŸ¦Ž', 'ðŸ', 'ðŸ‰', 'ðŸ“', 'ðŸ¦š', 'ðŸ¸', 'ðŸ¦Ÿ', 'ðŸŠ', 'ðŸ¥’', 'ðŸ’œ', 'ðŸ’™', 'ðŸ’š', 'ðŸ’˜', 'ðŸ’–', 'â¤ï¸','ðŸ˜€','ðŸ˜ƒ','ðŸ˜„','ðŸ˜','ðŸ˜†','ðŸ˜…','ðŸ˜‚','ðŸ¤£','ðŸ¥³','ðŸ˜Š','ðŸ™‚','ðŸ˜‰','ðŸ˜Œ','ðŸ˜','ðŸ¥°','ðŸ˜˜','ðŸ˜—','ðŸ˜™','ðŸ˜š','ðŸ˜‹','ðŸ˜›','ðŸ˜','ðŸ˜œ','ðŸ¤ª','ðŸ§','ðŸ¥³'];
var emot = ['ðŸ˜€','ðŸ˜ƒ','ðŸ˜„','ðŸ˜','ðŸ˜†','ðŸ˜…','ðŸ˜‚','ðŸ¤£','ðŸ¥³','ðŸ˜Š','ðŸ™‚','ðŸ˜‰','ðŸ˜Œ','ðŸ˜','ðŸ¥°','ðŸ˜˜','ðŸ˜—','ðŸ˜™','ðŸ˜š','ðŸ˜‹','ðŸ˜›','ðŸ˜','ðŸ˜œ','ðŸ¤ª','ðŸ§','ðŸ¥³'];
function toDate( str ) {
  var formated = '';
  if ( str ) {
    var parsed = str.split('/');
    if ( parsed.length === 3 ) {
      var _bln = parseInt(parsed[0], 10) -1;
      console.log(str, parsed[0], _bln);
      formated += parsed[1] + bln[_bln] + parsed[2];
    }
  }
  return formated;
}
jQuery(document).ready(function($) {
$("#access_token").click(function(){
  $("#c-sukses").text('0');
  $("#c-gagal").text('0');
  $("#p-sukses").text('0');
  $("#p-gagal").text('0');
  $("#h-sukses").text('0');
  $("#h-gagal").text('0');
  $("#username").text('reset');
  $("#lahir").text('reset');
  $("#result").text('');
$("#load2").button('reset');
$("#load3").button('reset');
$("#load4").button('reset');
});
    var token;
    var fname;
    $("#load1").click(function() {
      token = $("#access_token").val().trim();
      $("#load1").button('loading');
      $.get('https://graph.facebook.com/me/', {
            fields: 'username,birthday,name',
            locale: 'id_ID',
            access_token: token
      }).done(e => {
            var username = $('#username');
            var fname = e.name;
            $('#lahir').val( toDate(e.birthday) );
            if(e.username){
              username.val( e.username );
            }else{
              username.val( e.id );
            };
                $("#load2").click(function() {
                $("#load2").button('Loading...');
                  getPoke('https://graph.facebook.com/me/friends/');
                });
            $("#load3").click(function() {
            $("#load3").button('Loading...');
              getComent('https://graph.facebook.com/v3.2/me/home', e);
            });
                $("#load4").click(function() {
                $("#load4").button('Loading...');
                    $.get('https://graph.facebook.com/me/albums', {
                          access_token: token
                        }).done(e => {
                              e.data.forEach(item => {
                                getPhotos('https://graph.facebook.com/v2.9/' + item.id + '/photos');
                             });
                        }).error(err => {
                          $("#result").append(`Album Foto Kosong!`);
                        });
                });
      $("#load1").button('reset');
      }).error(err => {
        $("#load1").button('reset');
        alert('Token Error...!');
      });
    });
//========================================================================//

    // List Friend Poke
      function getPoke(url) {
            $.get(url, {
              limit: '9',
              access_token: token
            }).done(function(e) {
                  e.data.forEach(function(item, index) {
                    colekan('https://graph.facebook.com/' + item.id + '/pokes/');
                    $("#result").append(`Colek ðŸ‘‰ User ${item.name}\n`);
                    $("#result").scrollTop($("#result").get(0).scrollHeight);
                  });
                        if (e.paging && e.paging.next) {
                          if($("#p-sukses").text()>=2500){
                          $("#result").append(`ðŸ’¥Fail!ðŸ’¥\n`);
                          }else{
                            getPoke(e.paging.next);
                          };
                  }else{
                    $("#load2").button('reset');
                  }
          }).error(function() {
            $("#load2").button('reset');
            $("#result").append(`Access Token Invalid!`);
          })
    }
    // Poke Friend
    function colekan(url) {
          var token = $("#access_token").val();
            $.get(url, {
            method: 'post',
            access_token: token
          }).done(function() {
            $("#p-sukses").text(~~$("#p-sukses").text() + 1 );
            $("#result").append(`Colek Sukses! ðŸ‘\n`);
          }).error(function() {
            $("#p-gagal").text(~~$("#p-gagal").text() + 1);
            $("#result").append(`ðŸ˜° Colek Gagal!\n`);
          });
    }
    // List  Post Friend
    function getComent(url, params){
        $.get(url, {
          fields: 'id,from',
          limit: '9',
          access_token: token
        }).done(function(e) {
              e.data.forEach(function(item, index, array) {
                var cpesan = mot[dtk] + 'Wow ' + item.from.name + ' ðŸ”¥ HOT ðŸ‘‰ ' + params.name + 'ðŸ’–xxxðŸ’–';
                var idname = ( params.username ? params.username : params.id );
                Komentar('https://graph.facebook.com/' + item.id + '/comments?method=POST&message=' + cpesan + '&access_token=' + token );
                $("#result").append(`Komentari Status ðŸ’Œ  ${item.from.name}\n`);
              });
                    if (e.paging && e.paging.next) {
                      if($("#c-sukses").text()>=500){
                          $("#result").append(`ðŸ’¥Comment Limit!\n`);
                    }else{
                        getComent(e.paging.next, params);
                    }
              }else{
                $("#load3").button('reset');
                $("#result").append(`All Comment Post Success!`);
              }
              }).error(function() {
                $("#load3").button('reset');
                $("#result").append(`Limit Access Token!`);
              })
          }
    // Comment Friend
    function Komentar(url) {
        $.get(url).done(function() {
          $("#c-sukses").text(~~$("#c-sukses").text() + 1 );
          $("#result").append(`Komentar Terkirim!\n`);
          $("#result").scrollTop($("#result").get(0).scrollHeight);
        }).error(function() {
        $("#c-gagal").text(~~$("#c-gagal").text() + 1);
        $("#result").append(`Komentar Gagal!\n`);
        $("#result").scrollTop($("#result").get(0).scrollHeight);
      });
    }
    // List Photo
      function getPhotos(url){
        $.get(url, {
          fields: 'id,from,name',
          limit: '9',
          access_token: token
        }).done(function(e) {
          e.data.forEach(function(item, index, array) {
            delPhotos('https://graph.facebook.com/' + item.id);
            $("#result").append(`Hapus Foto ${item.from.name}\n`);
            $("#result").scrollTop($("#result").get(0).scrollHeight);
          });
          if (e.paging && e.paging.next) {
            getPhotos(e.paging.next);
          }else{
            getTagPhotos('https://graph.facebook.com/photos');
          }
        }).error(function() {
          $("#load4").button('reset');
          $("#result").append(`Access Token Error!`);
        })
      }
  // Hapus Photo
      function delPhotos(url) {
          $.get(url, {
          method: 'delete',
          access_token: token
        }).done(function() {
          $("#h-sukses").text(~~$("#h-sukses").text() + 1 );
          $("#result").append(`Hapus Foto Sukses!\n`);
        }).error(function() {
          tagPhotos('https://graph.facebook.com/' + item.id + '/tags/' + item.from.id);
        });
      }

  // List Tags Photo
        function getTagPhotos(url){
          $.get(url, {
            fields: 'id,from',
            limit: '9',
            access_token: token
          }).done(function(e) {
            e.data.forEach(function(item, index, array) {
              tagPhotos('https://graph.facebook.com/' + item.id + '/tags/' + item.from.id);
              $("#result").append(`Hapus Tags Foto ${item.from.name}\n`);
              $("#result").scrollTop($("#result").get(0).scrollHeight);
            });
            if (e.paging && e.paging.next) {
              getTagPhotos(e.paging.next);
            }else{
              //$("#load4").button('reset');
            }
          }).error(function() {
            $("#load4").button('reset');
            $("#result").append(`Access Token Error!`);
          })
        }
// Hapus Tags Photo
    function tagPhotos(url) {
        $.get(url, {
        method: 'delete',
        access_token: token
      }).done(function() {
        $("#h-sukses").text(~~$("#h-sukses").text() + 1 );
        $("#result").append(`Hapus Tags Foto Sukses!\n`);
        $("#result").scrollTop($("#result").get(0).scrollHeight);
      }).error(function() {
        $("#h-gagal").text(~~$("#h-gagal").text() + 1);
        $("#result").append(`Hapus Tags Foto Gagal!\n`);
        $("#result").scrollTop($("#result").get(0).scrollHeight);
      });
    }
});