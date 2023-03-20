const clientId = "d2728f2995374c0bab2d085003d0915b";
const clientSecret = "027d6c6706d84588825b101d29e17a5d";
let i = 0;
const getToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  console.log(data);
  const accessToken = data.access_token;
  console.log(accessToken);
  const artistId = "4YRxDV8wJFPHPTeXepOstw";
  fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(response => response.json())
    .then(data =>{
      let arr=[];
      let imgarr=[];
      let namearr=[];
    let sound="sound"
      data.tracks.map(m => {
       
       
      //  console.log(m)

       let display=document.getElementById("rightAside")
       let show =document.createElement("div");

       
      
       show.innerHTML +=`
           <div>
           <img src="${m.album.images[0].url}" alt="img" style="length:250px; width:250px" id="Img">
          
           </div>`
       
          //  console.log(show.children[0].children[0])
           let sou   =show.children[0].children[0]
           sou.onclick=function(){
              random_bg_color()
          
          //  let gga  = document.getElementById('jaja')
          //  let songDis =document.getElementById("songDis")
           let audio=document.getElementById("audio")
        let songImg=document.getElementById("songImg")
        let nameImg=document.getElementById("nameImg")

         nameImg.innerHTML=`${m.name}`.slice(0,15);
          //  gga.innerHTML = `<audio src="${m.preview_url}" controls autoplay  id="${sound}"></audio>`
          audio.setAttribute("src" ,m.preview_url);
          songImg.setAttribute("src",m.album.images[0].url)
           
          
          //  songDis.innerHTML=`<div> <img src="${m.album.images[0].url}" alt="img" style="length:50px; width:50px" id="Img">
          //  <span style="color:white; margin-left:10px">${m.name.slice(0,15)}</span>
          //  <span><i class="fa-regular fa-heart" id="bottom"></i></span> </div>`
           let playbtn=document.getElementById("play")
           playbtn.innerHTML=`<i class="fa-solid fa-pause"></i>`
           audio.play()
        }  
       display.appendChild(show)
       arr.push(m.preview_url)
       imgarr.push(m.album.images[0].url)
       namearr.push(m.name)
       
      })
      console.log(arr)
    
      let nextSong =document.getElementById("nextSong")
      let img=document.getElementById("img")
      let nameImg=document.getElementById("nameImg")
     nextSong.addEventListener("click",e=>{
       e.preventDefault();
       e.stopPropagation(); 
       random_bg_color()

       let audio = document.getElementById("audio")
       let songImg=document.getElementById("songImg")
       let nameImg=document.getElementById("nameImg")
     
   
       let currentSong=arr.indexOf(audio.getAttribute("src")) ;console.log(currentSong)
       let currentImg=imgarr.indexOf(songImg.getAttribute("src"));
       console.log(currentImg)
       console.log(audio.getAttribute("src"))
       currentSong++;
       if(currentSong<=arr.length-1 && currentSong>=0){
        audio.setAttribute("src",arr[currentSong])
        songImg.setAttribute("src",imgarr[[currentSong]])
          nameImg.innerHTML=`${namearr[currentSong]}`.slice(0,15);

       }
       else{
       audio.setAttribute("src",arr[0]);
       }
        
      
     })
     let prevousSong=document.getElementById("prevousSong")
     prevousSong.addEventListener("click",e=>{
      e.preventDefault();
      e.stopPropagation(); 
      random_bg_color()
      let audio = document.getElementById("audio")
      let songImg=document.getElementById("songImg")
      let currentSong=arr.indexOf(audio.getAttribute("src")) ;console.log(currentSong)
    
      console.log(audio.getAttribute("src"))
      currentSong--;
      if(currentSong>=0 && currentSong<=arr.length-1){
       audio.setAttribute("src",arr[currentSong])
       songImg.setAttribute("src",imgarr[[currentSong]])
       nameImg.innerHTML=`${namearr[currentSong]}`.slice(0,15);
      }
      else{
        audio.setAttribute("src",arr[0])
      }
       
     
    }) 
   
  });
      let playbtn=document.getElementById("play")
      playbtn.addEventListener("click",e=>{
        e.stopPropagation();
        e.preventDefault();
        let value=audio.classList.toggle("active")
        if(value===true){
          playbtn.innerHTML=`<i class="fa-solid fa-pause"></i>`
          audio.play()
        }
        else{
          playbtn.innerHTML=`<i class="fa-solid fa-circle-play"></i>`
          audio.pause();
        }
      })

      let suffle =document.getElementById("suffle");

      suffle.addEventListener("click",e=>{
        let currentSong=arr.indexOf(audio.getAttribute("src"))
        console.log(currentSong)
        let audio = document.getElementById("audio")
        audio.setAttribute("src",arr[currentSong])
      
        
      })



   
};
getToken();


function random_bg_color() {

  let yellow = Math.floor(Math.random() *220) ;
  let red = Math.floor(Math.random()*220) ;
  let blue = Math.floor(Math.random() * 220) ;


  let bgColor = "rgb(" + yellow + "," + red + "," + blue + ")";
  let bgColor1 = "rgb(" + blue + "," + yellow + "," + red + ")";

  let color=document.getElementById("navBar")
  //  color.style.backgroundImage = `linear-Gradient(to bottom right, ${bgColor},${bgColor1})`;
  let colorplayer =document.getElementById("colorplayer")
  console.log(colorplayer)
  colorplayer.style.backgroundImage = `linear-Gradient(to bottom right, ${bgColor},${bgColor1})`;
  // let rightAside=document.getElementById("rightSection")
  // rightAside.style.backgroundImage = `linear-Gradient(to bottom right, ${bgColor},${bgColor1})`;

}
// background-image: linear-gradient(
//   to bottom right,
//   rgb(154, 154, 215),
//   rgb(129, 129, 227),
//   rgb(102, 102, 239)
// );