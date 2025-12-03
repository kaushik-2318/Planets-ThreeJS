import './style.css'
import * as THREE from "three"
import gsap from 'gsap';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

// Preloader
const preloader = document.getElementById('preloader');
const preloaderProgress = document.getElementById('preloader-progress');
const preloaderPercent = document.getElementById('preloader-percent');

let loadedAssets = 0;
const totalAssets = 6; // 1 HDR + 4 planet textures + 1 star texture

function updatePreloader() {
    loadedAssets++;
    const progress = (loadedAssets / totalAssets) * 100;
    preloaderProgress.style.width = progress + '%';
    preloaderPercent.textContent = Math.round(progress) + '%';
    
    if (loadedAssets === totalAssets) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    }
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('canvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const loader = new RGBELoader();
loader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/moonlit_golf_1k.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    updatePreloader();
});

const radius = 1.3;
const segment = 64;
const orbitRadius = 4.5;
const textures = ['./csilla/color.png', './earth/map.jpg', './venus/map.jpg', './volcanic/color.png'];
const spheres = new THREE.Group();

const starTexture = new THREE.TextureLoader().load("./stars.jpg", () => {
    updatePreloader();
});
starTexture.colorSpace = THREE.SRGBColorSpace;
const starGeometry = new THREE.SphereGeometry(50, 64, 64);
const starMaterial = new THREE.MeshBasicMaterial({
    map: starTexture,
    transparent: true,
    opacity: 0.5,
    side: THREE.BackSide,
});
scene.add(new THREE.Mesh(starGeometry, starMaterial));

const sphereMesh = [];
for (let i = 0; i < 4; i++) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(textures[i], () => {
        updatePreloader();
    });
    texture.colorSpace = THREE.SRGBColorSpace;

    const geometry = new THREE.SphereGeometry(radius, segment, segment);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);

    sphereMesh.push(sphere);

    const angle = (i / 4) * (Math.PI * 2);
    sphere.position.x = orbitRadius * Math.cos(angle);
    sphere.position.z = orbitRadius * Math.sin(angle);
    spheres.add(sphere);
}

spheres.rotation.x = 0.13;
spheres.position.y = -0.6;
scene.add(spheres);
camera.position.z = 9;

let lastWheelTime = 0;
const delay = 2000;
let scrollCount = 0;

const headings = document.querySelectorAll(".heading");
const descriptions = document.querySelectorAll(".desc");


function rotation(event) {
    const currentTime = Date.now();
    if (currentTime - lastWheelTime >= delay) {
        lastWheelTime = currentTime;
        const direction = event.deltaY > 0 ? "down" : "up";

        if (direction === "down") {
            scrollCount = (scrollCount + 1) % headings.length;
        } else {
            scrollCount = (scrollCount - 1 + headings.length) % headings.length;
        }

        gsap.to(headings, {
            yPercent: -scrollCount * 100,
            duration: 1,
            ease: "power2.inOut",
        });
        gsap.to(descriptions, {
            yPercent: -scrollCount * 100,
            duration: 1,
            ease: "power2.inOut",
        });
        gsap.to(spheres.rotation, {
            duration: 1,
            y: direction === "down" ? "+=" + Math.PI / 2 : "-=" + Math.PI / 2,
            ease: "expo.inOut",
        });

    }
}

window.addEventListener("wheel", rotation);

const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    for (let i = 0; i < sphereMesh.length; i++) {
        sphereMesh[i].rotation.y = clock.getElapsedTime() * 0.06;
    }
    renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
