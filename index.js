
        import * as THREE from '/three.js-master/build/three.module.js';
        import {OrbitControls} from '/three.js-master/examples/jsm/controls/OrbitControls.js';
        const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(10, 15, -22);

orbit.update();

const goBoard = new THREE.Mesh (
    new THREE.PlaneGeometry(19,19),
    new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        visible: false
    })
)

goBoard.rotateX(Math.PI / 2);
scene.add(goBoard);

const highlight = new THREE.Mesh (
    new THREE.PlaneGeometry(1,1),
    new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        
    })
)

highlight.rotateX(Math.PI / 2);
scene.add(highlight);



const grid = new THREE.GridHelper(19, 19)
scene.add(grid);




function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
      

