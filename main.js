import * as THREE from 'https://unpkg.com/three@0.179.1/build/three.module.js';
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);
const cube=new THREE.Mesh(new THREE.BoxGeometry(),new THREE.MeshNormalMaterial());
scene.add(cube);
camera.position.z=3;
function animate(){requestAnimationFrame(animate);cube.rotation.y+=0.01;renderer.render(scene,camera);}
animate();