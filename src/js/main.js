import * as THREE from "three";
import earthTexture from '../textures/earth.jpg'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import sunTexture from '../textures/sun.jpg'
import mercuryTexture from '../textures/mercury.jpg'
import venusTexture from '../textures/venus.jpg'
import starTexture from '../textures/stars.jpg'
import moonTexture from '../textures/moon.jpg'
import marsTexture from '../textures/mars.jpg'
import jupiterTexture from '../textures/jupiter.jpg'
import saturnTexture from '../textures/saturn.jpg'
import saturnringTexture from '../textures/saturn_ring.png'
import uranusTexture from '../textures/uranus.jpg'
import neptuneTexture from '../textures/neptune.jpg'


function planet(size,texture,position){
    
    let geo = new THREE.SphereGeometry(size,30,30)
    let mat = new THREE.MeshStandardMaterial({map:textureLoader.load(texture)})
    let planet = new THREE.Mesh(geo,mat);
    let obj = new THREE.Object3D();
  
    planet.position.x=position;
    obj.add(planet)
    
    if (texture !=moonTexture)
    
    {

        scene.add(obj)

    }
    return {planet,obj}
}


var textureLoader = new THREE.TextureLoader();
const renderer = new THREE.WebGL1Renderer();
backLoader = new THREE.CubeTextureLoader();

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000)

const orbit = new OrbitControls(camera,renderer.domElement);

camera.position.set(0,400,0);
orbit.update();


//Lights :
const sunLight = new THREE.PointLight(0xFFFFFFFF,2,300);
sunLight.position.set(0, 0, 0);
const generalLight =  new THREE.AmbientLight(0x33333333);
scene.add(generalLight);

scene.background= backLoader.load([
    starTexture,
    starTexture,
    starTexture,
    starTexture,
    starTexture,
    starTexture]);


//SUN
const sunGeometry = new THREE.SphereGeometry(15, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({map:textureLoader.load(sunTexture)})
const sun = new THREE.Mesh(sunGeometry,sunMaterial);
sun.minPolarAngle = 0;

const mercury = planet(3.2,mercuryTexture,30);
const venus = planet(4.3,venusTexture,60);
const earth = planet (5.3,earthTexture,90);
const moon = planet(1.5,moonTexture,10);
const mars = planet(4.7,marsTexture,120);
const jupiter = planet(11,jupiterTexture,160);
const saturn = planet(8.5,saturnTexture,200);
const uranus = planet(5.6,uranusTexture,230)
const neptune = planet(5,neptuneTexture,260)

earth.planet.add(moon.obj)

const saturnringGeo = new THREE.RingGeometry(10,16,32)
const saturnringMat = new THREE.MeshStandardMaterial({map:textureLoader.load(saturnringTexture)})
const saturnring = new THREE.Mesh(saturnringGeo,saturnringMat);
saturn.obj.add(saturnring)
saturnring.position.x=200
saturnring.rotation.x = -0.5 * Math.PI
sun.add(sunLight);
scene.add(sun);

function animation(){

    sun.rotateY(0.004);
    
    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.0244);
    earth.obj.rotateY(0.01);
    moon.obj.rotateY(0.05);
    mars.obj.rotateY(0.007);
    jupiter.obj.rotateY(0.005)
    saturn.obj.rotateY(0.004)
    saturnring.rotateZ(0.015)
    uranus.obj.rotateY(0.002)  
    neptune.obj.rotateY(0.001)
    
    
    
    neptune.planet.rotateY(0.40)
    mercury.planet.rotateY(0.004);
    venus.planet.rotateY(0.000125);
    earth.planet.rotateY(0.025) ;
    mars.planet.rotateY(0.026)
    jupiter.planet.rotateY(0.030)
    saturn.planet.rotateY(0.33)
    uranus.planet.rotateY(0.37)

    renderer.render(scene,camera);

}

sun.rotation.x=0;
sun.rotation.y=5;

renderer.setAnimationLoop(animation)
