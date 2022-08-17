
import * as THREE from '/three.js-master/build/three.module.js';
import { OrbitControls } from '/three.js-master/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '/three.js-master/examples/jsm/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();


const gltfLoader = new GLTFLoader();
const url = 'board.glb';
gltfLoader.load(url, (gltf) => {
    const root = gltf.scene;
    scene.add(root);
    root.position.y = -1.3;
    root.scale.set(1.1, 1.1, 1.1);


});

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableZoom = true;
orbit.minDistance = 30;
orbit.maxDistance = 40;
orbit.enablePan = false;
orbit.maxPolarAngle = Math.PI / 2.3;

camera.position.set(10, 15, -22);

orbit.update();

const goBoard = new THREE.Mesh(
    new THREE.PlaneGeometry(20.1, 20.1),
    new THREE.MeshBasicMaterial({
        color: 0xaf6c26,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.0

    }),

)

goBoard.rotateX(Math.PI / 2);
goBoard.position.set(0, 0, 0)
scene.add(goBoard);
goBoard.name = 'board'

const highlight = new THREE.Mesh(
    new THREE.CircleGeometry(0.5, 10),
    new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    })
)
highlight.name = 'board';

highlight.rotateX(Math.PI / 2);
scene.add(highlight);

const light = new THREE.AmbientLight()
scene.add(light);

const light2 = new THREE.PointLight();
scene.add(light2);
light2.position.y = 16;

const grid = new THREE.GridHelper(19, 19);
scene.add(grid);


const mousePosition = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let intersects;

window.addEventListener('mousemove', function (e) {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mousePosition, camera);
    intersects = raycaster.intersectObjects(scene.children);
    intersects.forEach(function (intersect) {

        if (intersect.object.name === "board") {

            const highlightPos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
            highlight.position.set(highlightPos.x, 0.001, highlightPos.z);
           
            const objectExists = objects.find(function (object) {
                return (object.position.x === highlight.position.x) &&
                    (object.position.z === highlight.position.z)

            });

            if (!objectExists)
                highlight.material.color.setHex(0xFFFFFF);
            else
                highlight.material.color.setHex(0xFF0000);

        }


    });
});

const goPiece = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 10, 10),
    new THREE.MeshBasicMaterial({
        color: 0xFFFFFF
    })

);


const goPieceB = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 10, 10),
    new THREE.MeshBasicMaterial({
        color: 0x000000
    })

);



const objects = [];
let player = 0;

window.addEventListener('mousedown', function () {

 


    const objectExists = objects.find(function (object) {
        return (object.position.x === highlight.position.x) &&
            (object.position.z === highlight.position.z)

    });

    if (!objectExists) {
        player = player + 1;
        intersects.forEach(function (intersect) {
           
            if (intersect.object.name === "board") {
                const goPieceWhite = goPiece.clone();
                const goPieceBlack = goPieceB.clone();
                

                if (player % 2 === 0) {
                    goPieceWhite.position.copy(highlight.position);
                    scene.add(goPieceWhite);
                    objects.push(goPieceWhite);
                    
                } else {
                    goPieceBlack.position.copy(highlight.position);
                    scene.add(goPieceBlack);
                    objects.push(goPieceBlack);
                }

                highlight.material.color.setHex(0xFF0000);
            }


        });
    }
});




function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


