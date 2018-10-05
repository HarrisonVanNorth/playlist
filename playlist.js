const albumContainer = document.querySelector('.albumContainer')
const textBox = document.querySelector('.textBox')
const tracker = document.querySelector('.tracker')
const submitBin = document.querySelector('.submitBin')
const splashAlbums = document.querySelector('.splashAlbums')

function imgDivs (e){
  axios.get('https://lit-fortress-6467.herokuapp.com/object')
  .then(function (response) {
    console.log(response)
    let albumList = response.data.results
    for(i = 0; i < albumList.length; i++){
      let cover = document.createElement('img')
      cover.classList.add('cover')
      cover.setAttribute('src', "images/" + albumList[i].cover_art)
      cover.setAttribute('id', albumList[i].id)

      albumContainer.appendChild(cover)
    }
  })
}
function albumInfo (e){
  axios.get('https://lit-fortress-6467.herokuapp.com/object')
  .then(function (response) {
    let albumList = response.data.results
    for(i = 0; i < albumList.length; i++){
      if(e.target.getAttribute('id') == albumList[i].id){
        let p = document.createElement('p')
        p.setAttribute('id', albumList[i].id)
        p.innerText =`${albumList[i].artist}: ${albumList[i].title}`
        textBox.appendChild(p)
      }
    }
  })
}
function clearTracker(e){
  textBox.innerHTML = ''
}
function postPlaylist (e){
  //Rather then posting the names, I thought it would be cleaner to
  //post the id associated with each album
  let pAll = document.querySelectorAll('p')
  let arr = []
  for(let x = 0; x < pAll.length; x++){
    arr.push(pAll[x].getAttribute('id'))
  }
  axios.post('https://lit-fortress-6467.herokuapp.com/post', arr)
  .then(function (response) {
    console.log(response)
  }).catch(function (error){
    console.log(error);
  })
}


imgDivs()

albumContainer.addEventListener('click', albumInfo)
tracker.addEventListener('click', clearTracker)
submitBin.addEventListener('click', postPlaylist)
