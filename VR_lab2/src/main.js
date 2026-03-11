import "./style.css";
import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// ============================================
// МЕНЮ ВИБОРУ ЗАВДАНЬ
// ============================================

function showMenu() {
  document.body.innerHTML = "";
  document.body.style.cssText =
    "margin:0; background:#1a1a2e; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; font-family:Arial,sans-serif;";

  const title = document.createElement("h1");
  title.textContent = "AR Лабораторна робота 2";
  title.style.cssText =
    "color:white; margin-bottom:10px; text-align:center; font-size:28px;";
  document.body.appendChild(title);

  const subtitle = document.createElement("p");
  subtitle.textContent = "Оберіть завдання для запуску";
  subtitle.style.cssText =
    "color:rgba(255,255,255,0.6); margin-bottom:40px; font-size:16px;";
  document.body.appendChild(subtitle);

  const tasks = [
    { num: 1, name: "Геометричні фігури з анімацією", fn: initTask1 },
    { num: 2, name: "3D модель планети (Lava Planet)", fn: initTask2 },
    { num: 3, name: "Hit Test + Зірки (ExtrudeGeometry)", fn: initTask3 },
    { num: 4, name: "Hit Test + Музичні інструменти", fn: initTask4 },
  ];

  tasks.forEach(({ num, name, fn }) => {
    const btn = document.createElement("button");
    btn.innerHTML = `<strong>Завдання ${num}</strong><br><small style="opacity:0.8">${name}</small>`;
    btn.style.cssText =
      "display:block; width:320px; margin:10px; padding:18px 24px; background:rgba(255,255,255,0.08); color:white; border:1px solid rgba(255,255,255,0.25); border-radius:12px; cursor:pointer; font-size:16px; text-align:center;";
    btn.addEventListener("mouseover", () => {
      btn.style.background = "rgba(255,255,255,0.2)";
    });
    btn.addEventListener("mouseout", () => {
      btn.style.background = "rgba(255,255,255,0.08)";
    });
    btn.addEventListener("click", fn);
    document.body.appendChild(btn);
  });
}

function addBackButton() {
  const btn = document.createElement("button");
  btn.textContent = "\u2190 Меню";
  btn.style.cssText =
    "position:absolute; top:20px; left:20px; z-index:9999; padding:10px 20px; background:rgba(0,0,0,0.7); color:white; border:1px solid rgba(255,255,255,0.5); border-radius:8px; cursor:pointer; font-size:15px; font-family:Arial,sans-serif;";
  btn.addEventListener("click", showMenu);
  document.body.appendChild(btn);
}

// ============================================
// ЗАВДАННЯ 1: Геометричні фігури з анімацією
// ============================================

function initTask1() {
  // Очистити body
  document.body.innerHTML = "";

  // Створення сцени
  const scene = new THREE.Scene();

  // Створення камери
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 0, 0);

  // Створення рендерера з підтримкою XR
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  // Додати ARButton
  document.body.appendChild(ARButton.createButton(renderer));

  // Додати освітлення
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // ============================================
  // Створення 3 геометричних фігур
  // ============================================

  // 1. CircleGeometry (червоний колір)
  const circleGeometry = new THREE.CircleGeometry(0.3, 32);
  const circleMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
  });
  const circle = new THREE.Mesh(circleGeometry, circleMaterial);
  circle.position.set(-0.8, 0.5, -3);
  scene.add(circle);

  // 2. BoxGeometry (зелений колір)
  const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.set(0, 0.5, -3);
  scene.add(box);

  // 3. ShapeGeometry (синій колір) - форма серця
  const heartShape = new THREE.Shape();
  const x = 0,
    y = 0;
  heartShape.moveTo(x + 0.25, y + 0.25);
  heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
  heartShape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
  heartShape.bezierCurveTo(
    x - 0.3,
    y + 0.55,
    x - 0.1,
    y + 0.77,
    x + 0.25,
    y + 0.95,
  );
  heartShape.bezierCurveTo(
    x + 0.6,
    y + 0.77,
    x + 0.8,
    y + 0.55,
    x + 0.8,
    y + 0.35,
  );
  heartShape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
  heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

  const shapeGeometry = new THREE.ShapeGeometry(heartShape);
  const shapeMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000ff,
    side: THREE.DoubleSide,
  });
  const shape = new THREE.Mesh(shapeGeometry, shapeMaterial);
  shape.position.set(0.8, 0.5, -3);
  shape.scale.set(0.5, 0.5, 0.5);
  scene.add(shape);

  // ============================================
  // Анімація
  // ============================================

  function animate() {
    renderer.setAnimationLoop(() => {
      // Повільне обертання фігур
      circle.rotation.z += 0.01;

      box.rotation.x += 0.01;
      box.rotation.y += 0.01;

      shape.rotation.z += 0.01;

      renderer.render(scene, camera);
    });
  }

  // Обробка зміни розміру вікна
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Запустити анімацію
  addBackButton();
  animate();
}

// Запуск меню вибору завдань
showMenu();

function initTask2() {
  // Очистити body
  document.body.innerHTML = "";

  // Створення сцени
  const scene = new THREE.Scene();

  // Створення камери
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 0, 0);

  // Створення рендерера з підтримкою XR
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  // Додати ARButton
  document.body.appendChild(ARButton.createButton(renderer));

  // Додати освітлення
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
  directionalLight.position.set(2, 2, 2);
  scene.add(directionalLight);

  // Додаткове освітлення для кращого вигляду планети
  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.set(-2, 1, -3);
  scene.add(pointLight);

  // ============================================
  // Завантаження 3D моделі планети
  // ============================================

  let planetModel = null;
  const loader = new GLTFLoader();

  // Завантаження моделі
  loader.load(
    "/lava_planet.glb", // Шлях до моделі
    // onLoad callback
    (gltf) => {
      planetModel = gltf.scene;

      // Налаштування масштабу та позиції
      planetModel.scale.set(0.15, 0.15, 0.15);
      planetModel.position.set(0, 0.5, -3);

      // Додати модель до сцени
      scene.add(planetModel);

      console.log("✅ Модель планети успішно завантажена!");
    },
    // onProgress callback
    (xhr) => {
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log(`Завантаження моделі: ${Math.round(percentComplete)}%`);
    },
    // onError callback
    (error) => {
      console.error("❌ Помилка завантаження моделі планети:", error);
      console.error(
        "Переконайтеся, що файл lava_planet.glb знаходиться в папці public/",
      );
    },
  );

  // ============================================
  // Анімація
  // ============================================

  function animate() {
    renderer.setAnimationLoop(() => {
      // Повільне обертання планети навколо осі Y
      if (planetModel) {
        planetModel.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    });
  }

  // Обробка зміни розміру вікна
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Запустити анімацію
  addBackButton();
  animate();
}

// ============================================
// ЗАВДАННЯ 3: Hit Test + ExtrudeGeometry
// ============================================

function initTask3() {
  // Очистити body
  document.body.innerHTML = "";

  // Створення сцени
  const scene = new THREE.Scene();

  // Створення камери
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );

  // Створення рендерера з підтримкою XR
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  // Додати ARButton
  const arButton = ARButton.createButton(renderer, {
    requiredFeatures: ["hit-test"],
  });
  document.body.appendChild(arButton);

  // Додати освітлення
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 2, 1);
  scene.add(directionalLight);

  // ============================================
  // Створення Reticle (прицілу)
  // ============================================

  const reticleGeometry = new THREE.RingGeometry(0.15, 0.2, 32).rotateX(
    -Math.PI / 2,
  );
  const reticleMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.6,
  });
  const reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  scene.add(reticle);

  // ============================================
  // Функція створення випадкової зірки (ExtrudeGeometry)
  // ============================================

  function createStarShape() {
    const shape = new THREE.Shape();
    const outerRadius = 0.1;
    const innerRadius = 0.05;
    const points = 5;

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();

    return shape;
  }

  function placeExtrudedShape(matrix) {
    // Створення форми зірки
    const starShape = createStarShape();

    // Налаштування екструзії
    const extrudeSettings = {
      depth: 0.05,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 3,
    };

    // Створення геометрії
    const geometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);

    // Випадковий колір
    const randomColor = Math.random() * 0xffffff;
    const material = new THREE.MeshStandardMaterial({
      color: randomColor,
      metalness: 0.3,
      roughness: 0.4,
    });

    // Створення меша
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.setFromMatrixPosition(matrix);
    mesh.rotation.x = -Math.PI / 2; // Повернути горизонтально
    scene.add(mesh);

    console.log(
      `✨ Додано зірку з кольором: #${randomColor.toString(16).padStart(6, "0")}`,
    );
  }

  // ============================================
  // Hit Test
  // ============================================

  let hitTestSource = null;
  let hitTestSourceRequested = false;

  // Обробник натискання (select)
  function onSelect() {
    if (reticle.visible) {
      placeExtrudedShape(reticle.matrix);
    }
  }

  renderer.xr.addEventListener("sessionstart", async () => {
    const session = renderer.xr.getSession();

    // Запит hit test source
    session.requestReferenceSpace("viewer").then((referenceSpace) => {
      session
        .requestHitTestSource({ space: referenceSpace })
        .then((source) => {
          hitTestSource = source;
          console.log("✅ Hit Test активовано!");
        })
        .catch((error) => {
          console.error("❌ Помилка ініціалізації Hit Test:", error);
        });
    });

    // Додати обробник select
    session.addEventListener("select", onSelect);
  });

  renderer.xr.addEventListener("sessionend", () => {
    hitTestSourceRequested = false;
    hitTestSource = null;
  });

  // ============================================
  // Анімація з Hit Test
  // ============================================

  function animate(timestamp, frame) {
    if (frame) {
      const referenceSpace = renderer.xr.getReferenceSpace();
      const hitTestResults = frame.getHitTestResults(hitTestSource || []);

      if (hitTestResults.length > 0) {
        const hit = hitTestResults[0];
        const pose = hit.getPose(referenceSpace);

        if (pose) {
          reticle.visible = true;
          reticle.matrix.fromArray(pose.transform.matrix);
        }
      } else {
        reticle.visible = false;
      }
    }

    renderer.render(scene, camera);
  }

  // Обробка зміни розміру вікна
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Запустити анімацію
  addBackButton();
  renderer.setAnimationLoop(animate);
}

// ============================================
// ЗАВДАННЯ 4: Hit Test + Музичні інструменти (3D моделі)
// ============================================

function initTask4() {
  // Очистити body
  document.body.innerHTML = "";

  // Створення сцени
  const scene = new THREE.Scene();

  // Створення камери
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  );

  // Створення рендерера з підтримкою XR
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.xr.enabled = true;
  document.body.appendChild(renderer.domElement);

  // Додати ARButton
  const arButton = ARButton.createButton(renderer, {
    requiredFeatures: ["hit-test"],
  });
  document.body.appendChild(arButton);

  // Додати освітлення
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 2, 1);
  scene.add(directionalLight);

  // Додаткове освітлення
  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.set(-2, 2, 0);
  scene.add(pointLight);

  // ============================================
  // Створення Reticle (прицілу)
  // ============================================

  const reticleGeometry = new THREE.RingGeometry(0.15, 0.2, 32).rotateX(
    -Math.PI / 2,
  );
  const reticleMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.6,
  });
  const reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  scene.add(reticle);

  // ============================================
  // Завантаження 3D моделей інструментів
  // ============================================

  let guitarModel = null;
  let drumModel = null;
  let currentInstrument = 0; // 0 - гітара, 1 - барабан
  let modelsLoaded = false;

  const loader = new GLTFLoader();

  // Індикатор завантаження
  const loadingInfo = document.createElement("div");
  loadingInfo.style.position = "absolute";
  loadingInfo.style.top = "20px";
  loadingInfo.style.left = "50%";
  loadingInfo.style.transform = "translateX(-50%)";
  loadingInfo.style.padding = "15px 25px";
  loadingInfo.style.backgroundColor = "rgba(76, 175, 80, 0.9)";
  loadingInfo.style.color = "white";
  loadingInfo.style.fontFamily = "Arial, sans-serif";
  loadingInfo.style.borderRadius = "10px";
  loadingInfo.style.textAlign = "center";
  loadingInfo.style.zIndex = "1000";
  loadingInfo.style.fontSize = "14px";
  loadingInfo.innerHTML = "⏳ Завантаження моделей...";
  document.body.appendChild(loadingInfo);

  // Завантаження гітари
  loader.load(
    "/gitar_blend_2.glb",
    (gltf) => {
      guitarModel = gltf.scene;
      guitarModel.scale.set(0.3, 0.3, 0.3);
      console.log("✅ Гітара завантажена!");
      checkModelsLoaded();
    },
    (xhr) => {
      console.log(`Гітара: ${Math.round((xhr.loaded / xhr.total) * 100)}%`);
    },
    (error) => {
      console.error("❌ Помилка завантаження гітари:", error);
      loadingInfo.innerHTML = "❌ Помилка завантаження гітари";
      loadingInfo.style.backgroundColor = "rgba(244, 67, 54, 0.9)";
    },
  );

  // Завантаження барабанів
  loader.load(
    "/drum_set_with_blender_armature.glb",
    (gltf) => {
      drumModel = gltf.scene;
      drumModel.scale.set(0.3, 0.3, 0.3);
      console.log("✅ Барабан завантажений!");
      checkModelsLoaded();
    },
    (xhr) => {
      console.log(`Барабан: ${Math.round((xhr.loaded / xhr.total) * 100)}%`);
    },
    (error) => {
      console.error("❌ Помилка завантаження барабана:", error);
      loadingInfo.innerHTML = "❌ Помилка завантаження барабана";
      loadingInfo.style.backgroundColor = "rgba(244, 67, 54, 0.9)";
    },
  );

  function checkModelsLoaded() {
    if (guitarModel && drumModel) {
      modelsLoaded = true;
      loadingInfo.innerHTML =
        "✅ Моделі завантажені!<br><small>Запустіть AR і торкайтеся екрану</small>";
      setTimeout(() => {
        loadingInfo.style.display = "none";
      }, 3000);
    }
  }

  // ============================================
  // Функція розміщення інструменту
  // ============================================

  function placeInstrument(matrix) {
    if (!modelsLoaded) {
      console.warn("⚠️ Моделі ще не завантажені!");
      return;
    }

    let modelToPlace;
    let instrumentName;

    // Почергово вибираємо інструмент
    if (currentInstrument === 0) {
      modelToPlace = guitarModel.clone();
      instrumentName = "🎸 Гітара";
      currentInstrument = 1;
    } else {
      modelToPlace = drumModel.clone();
      instrumentName = "🥁 Барабан";
      currentInstrument = 0;
    }

    // Встановлюємо позицію з матриці reticle
    modelToPlace.position.setFromMatrixPosition(matrix);

    // Обертаємо модель для правильної орієнтації
    modelToPlace.rotation.y = Math.random() * Math.PI * 2; // Випадковий поворот

    scene.add(modelToPlace);

    console.log(`✨ Додано ${instrumentName}`);

    // Показати повідомлення
    showNotification(instrumentName);
  }

  // Функція показу повідомлення
  function showNotification(text) {
    const notification = document.createElement("div");
    notification.style.position = "absolute";
    notification.style.top = "80px";
    notification.style.left = "50%";
    notification.style.transform = "translateX(-50%)";
    notification.style.padding = "10px 20px";
    notification.style.backgroundColor = "rgba(33, 150, 243, 0.9)";
    notification.style.color = "white";
    notification.style.fontFamily = "Arial, sans-serif";
    notification.style.borderRadius = "8px";
    notification.style.fontSize = "16px";
    notification.style.zIndex = "999";
    notification.innerHTML = text;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  }

  // ============================================
  // Hit Test
  // ============================================

  let hitTestSource = null;
  let hitTestSourceRequested = false;

  // Обробник натискання (select)
  function onSelect() {
    if (reticle.visible) {
      placeInstrument(reticle.matrix);
    }
  }

  renderer.xr.addEventListener("sessionstart", async () => {
    const session = renderer.xr.getSession();

    // Запит hit test source
    session.requestReferenceSpace("viewer").then((referenceSpace) => {
      session
        .requestHitTestSource({ space: referenceSpace })
        .then((source) => {
          hitTestSource = source;
          console.log("✅ Hit Test активовано!");
        })
        .catch((error) => {
          console.error("❌ Помилка ініціалізації Hit Test:", error);
        });
    });

    // Додати обробник select
    session.addEventListener("select", onSelect);
  });

  renderer.xr.addEventListener("sessionend", () => {
    hitTestSourceRequested = false;
    hitTestSource = null;
  });

  // ============================================
  // Анімація з Hit Test
  // ============================================

  function animate(timestamp, frame) {
    if (frame) {
      const referenceSpace = renderer.xr.getReferenceSpace();
      const hitTestResults = frame.getHitTestResults(hitTestSource || []);

      if (hitTestResults.length > 0) {
        const hit = hitTestResults[0];
        const pose = hit.getPose(referenceSpace);

        if (pose) {
          reticle.visible = true;
          reticle.matrix.fromArray(pose.transform.matrix);
        }
      } else {
        reticle.visible = false;
      }
    }

    renderer.render(scene, camera);
  }

  // Обробка зміни розміру вікна
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Запустити анімацію
  addBackButton();
  renderer.setAnimationLoop(animate);
}
