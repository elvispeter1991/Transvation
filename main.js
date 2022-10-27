import {loadGLTF, loadVideo} from "./libs/loader.js";
import {CSS3DObject} from "./libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js";
const THREE = window.MINDAR.IMAGE.THREE;



document.addEventListener('DOMContentLoaded', () => {
 
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: 'newimagetarget.mind',
    });
    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;
    
    const objtwo = new CSS3DObject(document.querySelector("#ar-div")); 
    const cssAnchor = mindarThree.addCSSAnchor(0);
    cssAnchor.group.add(objtwo);
    
   const el = document.getElementById("container");

    const video = await loadVideo("Transavation-Final.mp4");
    const texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(1, 900/450);
    const material = new THREE.MeshBasicMaterial({map: texture});
    const plane = new THREE.Mesh(geometry, material);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    anchor.onTargetFound = () => {
      video.play();
     
      
     
    }
    anchor.onTargetLost = () => {
      video.pause();
       
    }
    video.addEventListener( 'play', () => {
      video.currentTime = 0;
      document.getElementById("newimage").style.display = "none";
      
    });
    
   
    
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);
      console.log(video.currentTime);
      if(video.currentTime > 74.1){
       const x = document.getElementById("newimage");
 
  x.addEventListener("click", function () {
    window.open("https://forms.gle/3sRR8cvYHjoeEz7H9");
 });
  x.style.display = "block";
      }
      
    });
  }
  start();

  
});




