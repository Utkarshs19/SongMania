const main=document.getElementById("main-button");
const music= document.querySelector('audio');
const img = document.getElementById("image");
const next= document.getElementById("next");
const prev = document.getElementById("prev");
const nam = document.getElementById("name");
const singer=document.getElementById("singer");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const start = document.getElementById("start");
const end = document.getElementById("end");
const barWidth= document.getElementById("progress").clientWidth;
const volume = document.getElementById("volume");
const plus= document.getElementById("plus");
const minus = document.getElementById("minus");
const toggle = document.getElementById("toggle");


let duration;
music.onloadedmetadata= ()=>{
    duration = music.duration;
    // console.log(duration);
    end.innerText=Math.floor(duration/60)+':'+Math.floor(duration%60);
}

toggle.addEventListener('click',()=>{
    let curTitle = toggle.getAttribute('title');
    if(curTitle==='sound'){
        toggle.setAttribute('title',"silent");
        music.volume=1;
        toggle.classList.remove("silent");
    }else{
        toggle.setAttribute('title',"sound");
        toggle.classList.add("silent");
        music.volume=0;
    }
})

plus.addEventListener('click',()=>{
    if(music.volume<1){
        music.volume+=.1;
    }
    plus.classList.add("pressed");
    setTimeout(()=>{
        plus.classList.remove("pressed");
    },200)
})
minus.addEventListener('click',()=>{
    if(music.volume>0){
        music.volume-=.1;
    }
    minus.classList.add("pressed");
    setTimeout(()=>{
        minus.classList.remove("pressed");
    },200)
})

music.addEventListener("timeupdate",()=>{
    const per=music.currentTime*100/duration;
    progressBar.style.width=`${per}%`;
    let sec = Math.floor(music.currentTime%60);
    if(sec<10) sec= '0'+sec;
    start.innerText = Math.floor(music.currentTime/60)+':'+sec;
    if(music.currentTime===duration){
        next.click();
    }
})


progress.addEventListener('click',(e)=>{
    const clickedPos = e.offsetX;
    const per=Math.round(clickedPos*100/barWidth);
    progressBar.style.width=`${per}%`;
    const curDuration = Math.round(per*duration/100);
    music.currentTime=curDuration;
    let sec = Math.floor(music.currentTime%60);
    if(sec<10) sec= '0'+sec;
    start.innerText = Math.floor(curDuration/60)+':'+sec;
  
})

let cur =0;

let curVol=1;




const songs = [
    {
        name:"Barish Ban Jana",
        url:"barish.mp3",
        singer:"Steben",
        imgUrl:"tape.jpg"
    },
    {
        name:"Bijli Bijli",
        url:"bijli.mp3",
        singer:"Harrdy Sandhu",
        imgUrl:"guitar.jpg"
    },
    {
        name:"Dil Galti Kar Baitha",
        url:"galti.mp3",
        singer:"Jubin Nautiyal",
        imgUrl:"headphone.jpg"
    },
    {
        name:"Your Power",
        url:"power.mp3",
        singer:"Billie Eilish",
        imgUrl:"cd.jpg"
    }
]
nam.innerText= songs[cur].name;
singer.innerText= songs[cur].singer;
music.setAttribute('src',songs[cur].url);

main.addEventListener('click',()=>{
    music.play();
    const title = main.getAttribute('title');
    console.log(title);
    if(title==='Pause'){
        main.setAttribute('title','Play');
        main.setAttribute('class',"fa fa-solid fa-play");
        music.pause();
        img.setAttribute('class','');
    }else{
        main.setAttribute('title','Pause');
        main.setAttribute('class',"fa fa-solid fa-pause");
        music.play();
        img.setAttribute('class','anime');

    }
})

next.addEventListener('click',()=>{
    cur++;
    if(cur===songs.length) cur=0;
    img.setAttribute('src',songs[cur].imgUrl)
    nam.innerText= songs[cur].name;
    singer.innerText= songs[cur].singer;
    music.setAttribute('src',songs[cur].url);
    music.play();
        main.setAttribute('title','Pause');
        main.setAttribute('class',"fa fa-solid fa-pause");
        music.play();
        img.setAttribute('class','anime');

    

})

prev.addEventListener('click',()=>{
    cur--;
    if(cur<0) cur=songs.length-1;
    img.setAttribute('src',songs[cur].imgUrl)
    nam.innerText= songs[cur].name;

    singer.innerText= songs[cur].singer;
    music.setAttribute('src',songs[cur].url);
    music.play();
   
        main.setAttribute('title','Pause');
        main.setAttribute('class',"fa fa-solid fa-pause");
        music.play();
        img.setAttribute('class','anime');
})

