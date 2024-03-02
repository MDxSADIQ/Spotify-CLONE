let currentSong = new Audio();

async function getSongs() {

    let a = await fetch("http://127.0.0.1:3000/spotify%20clone/songs/")
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split('/songs/')[1])

        }

    }
    return songs
}
const playMusic = (track, pause=false)=>{
   currentSong.src ='/spotify%20clone/songs/'+track
    if(!false){
    currentSong.play()
    play.src = "SVGs/play.svg"
    }

    
   
    document.querySelector('.songinfo').innerHTML = decodeURI(track)
    

}
function StoMS(seconds) {
           
    const minutes = Math.floor(seconds / 60);
    const remainingSec = Math.floor(seconds % 60);
    const formatedmin = String(minutes).padStart(2,'0')
    const formatedsec = String(remainingSec).padStart(2,'0')
    return `${formatedmin}:${formatedsec}`
   
}
async function main() {
    

    let songs = await getSongs()
    playMusic(songs[0],true)
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `
        <li>
            <img class="invert" src="SVGs/music.svg" alt="">
            <div class="info">
                <div class="songname">${song.replaceAll("%20", " ")}</div>
                <div class="artistname">Arijit Singh</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="SVGs/play.svg" alt="">
            </div>
        </li>`

    }

    // attach an enent lisner to each song
    Array.from(document.querySelector('.songlist').getElementsByTagName('li')).forEach(e=>{
        e.addEventListener('click', element=>{
            console.log(e.querySelector('.info').firstElementChild.innerHTML)
            playMusic(e.querySelector('.info').firstElementChild.innerHTML)
        })
      
       
       
    })
    
    // attach an event listener to previous play and next
    play.addEventListener('click', ()=>{
        if (currentSong.paused) {
            currentSong.play() 
            play.src = "SVGs/pause.svg"
        }
        else{
            currentSong.pause()
            play.src = 'SVGs/play.svg'

        }
    })
    // listen for timeupdate event
    
    currentSong.addEventListener('timeupdate', ()=>{
        console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector('.songtime').innerHTML = `${StoMS(currentSong.currentTime)} / ${StoMS(currentSong.duration)}`
        document.querySelector('.circle').style.left = (currentSong.currentTime / currentSong.duration) *100 +'%';

    })
    // adding event listener to seekbar
    document.querySelector('.seekbar').addEventListener('click',e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width) *100;
        document.querySelector('.circle').style.left = percent +'%';
        currentSong.currentTime = ((currentSong.duration)*percent)/100
    })


   
}
main()




