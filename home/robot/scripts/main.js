let idleLoop = null;
let idleStop = null;

function initRobotAnimations() {
    let intensity = 0.5;
    let resized = false;
    const scene = new THREE.Scene();

    // прямой
    const color = 0xFFFFFF;
    const dirLight = new THREE.DirectionalLight(color, intensity);
    dirLight.position.set(-4.5, 14.66, 16.655);
    scene.add(dirLight);

    // окружающий
    const skyColor = 0x6883fc;
    const groundColor = 0xf9dbff;
    intensity = 4;
    const hLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    hLight.position.set(4.986, 4.362, 3.882);
    scene.add(hLight);

    //Рендер
    const sceneWrapper = document.querySelector('.firstscreen');
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor( 0xffffff, 0);
    sceneWrapper.prepend(renderer.domElement);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMapping = 1;
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    setAspectOnResize();
    setPositionOnResize();

    // текстуры
    var faceTex = new THREE.TextureLoader().load('robot/images/Texture/FaceFlip2.jpg');
    var faceEye = new TextureAnimator(faceTex, 5, 5, 25, 100); // texture, #horiz, #vert, #total, duration.

    // const btnTex = new THREE.TextureLoader().load('robot/images/Texture/btn.png');
    const headTex = new THREE.TextureLoader().load('robot/images/Texture/Head_D.jpg');
    const bodyTex = new THREE.TextureLoader().load('robot/images/Texture/Body_D.jpg');
    const bodyTexL = new THREE.TextureLoader().load('robot/images/Texture/Body_L.jpg');
    const HeadTexL = new THREE.TextureLoader().load('robot/images/Texture/Head_L.jpg');
    const coneTex = new THREE.TextureLoader().load('robot/images/Texture/gradient2.png');
    const planetDTex = new THREE.TextureLoader().load('robot/images/Texture/PlanetDiff2.png');
    const planetMTex = new THREE.TextureLoader().load('robot/images/Texture/PlanetMask2.png');

    // обновляемые элементы
    const bookDTex = new THREE.TextureLoader().load('robot/images/Texture/Book.jpg');
    const countDTex = new THREE.TextureLoader().load('robot/images/Texture/Count.jpg');

    // Текстура окружения
    let r = "robot/images/Texture/Env/";
    let urls = [
        r + "posx.jpg",
        r + "negx.jpg",
        r + "posy.jpg",
        r + "negy.jpg",
        r + "posz.jpg",
        r + "negz.jpg"
    ];

    let textureCube = new THREE.CubeTextureLoader().load(urls);
    textureCube.format = THREE.RGBAFormat;

    // материалы
    const chrom_mt = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0,
        metalness: 0.7,
        map: bodyTex,
        envMap: textureCube
    });
    const body_mt = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.15,
        metalness: 0.7,
        map: bodyTex,
        emissive: 0xffffff,
        emissiveIntensity: 1,
        emissiveMap: bodyTexL,
        envMap: textureCube,
        envMapIntensity: 0.5
    });
    const head_mt = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.15,
        metalness: 0.7,
        map: headTex,
        emissive: 0xffffff,
        emissiveIntensity: 1,
        emissiveMap: HeadTexL,
        envMap: textureCube,
        envMapIntensity: 0.5
    });
    const rubber_mt = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.5,
        metalness: 0,
        map: bodyTex,


    });
    const glass_mt = new THREE.MeshStandardMaterial({
        color: 0xabcfff,
        roughness: 0,
        metalness: 0.8,
        opacity: 0.2,
        transparent: true,
        envMap: textureCube
    });
    const face_mt = new THREE.MeshBasicMaterial({
        map: faceTex
    });

    const cone_mt = new THREE.MeshToonMaterial({
        color: 0x2890ff,
        transparent: true,
        alphaMap: coneTex,
        emissive: 0x2890ff,
        emissiveIntensity: 1,

    });
    const planet_mt = new THREE.MeshToonMaterial({
        side: THREE.DoubleSide,
        map: planetDTex,
        transparent: true,
        emissive: 0xffffff,
        emissiveMap: planetDTex,
        alphaMap: planetMTex,
        emissiveIntensity: 2,

    });

    const bottle_mt = new THREE.MeshPhysicalMaterial({
        roughness: 0,
        transmission: 1,
        thickness: -0.5,
    });

    const chime_mt = new THREE.MeshToonMaterial({
        color: 0xff00ff,
    });


    // обновляемые элементы
    // const book_mt = new THREE.MeshBasicMaterial({
    //     map: bookDTex,
    //     side: THREE.DoubleSide
    // });
    //
    // const count_mt = new THREE.MeshBasicMaterial({
    //     map: countDTex,
    //     roughness: 0.2
    // });

    const book_mt = new THREE.MeshStandardMaterial({
        map: bookDTex,
        roughness: 0.5,
        metalness: 0.6,
        side: THREE.DoubleSide
    });
    const count_mt = new THREE.MeshStandardMaterial({
        map: countDTex,
        roughness: 0.2,
        metalness: 0.5
    });

    // PlaneShadow----------------------------------------------------------------------------------------/
    const shadowTex = new THREE.TextureLoader().load('robot/images/Texture/shadow.png');
    const shadowColorTex = new THREE.TextureLoader().load('robot/images/Texture/shadowColor.png');
    const planeGeo = new THREE.PlaneGeometry(1, 1);
    const planeMt = new THREE.MeshMatcapMaterial({
        color: 0xff1414,
        map: shadowColorTex,
        transparent: true,
        alphaMap: shadowTex,
    });

    const shadowPlane = new THREE.Mesh(planeGeo, planeMt);
    shadowPlane.scale.set(1.4, 1.4, 0);
    shadowPlane.position.set(6.2, -0.7, 0);
    shadowPlane.rotation.set(-1.65, 0, 0);

    // модель
    const loader = new THREE.GLTFLoader();
    // const robikGeo = await loader.loadAsync('models/Robik.glb');
    const btns = document.querySelectorAll('.firstscreen button');
    let mixer, action, idle = false;
    // let mixer, globusAction, idleAction;

    // загрузка робота
    loader.load('robot/models/Robik.glb', function (obj) {

        // console.log(obj);

        let robot = obj.scene;
        let timer;
        scene.add(robot);
        robot.scale.set(7, 7,7);
        robot.position.set(6.2, -0.7, 0);
        robot.rotation.set(0, -0.5, 0);

        robot.traverse(function(node) {
            if (node.isMesh)
            node.castShadow = true;
        });

        // анимация
        const clips = obj.animations;
        console.log(clips);
        mixer = new THREE.AnimationMixer(robot);

        // console.log(mixer);

        const idleClip = THREE.AnimationClip.findByName(clips, 'Idle');
        const idleAction = mixer.clipAction(idleClip);
        idleAction.play();
        idle = true;

        clips.forEach((anim, i) => {
            const {name} = anim;
            if (name !== 'Idle') {
                // console.log('Button ID =', name);
                const btn = document.querySelector('#' + name);
                const clip = THREE.AnimationClip.findByName(clips, name);
                const clipAction = mixer.clipAction(clip);

                let deley = 6440;

                clip.loop = THREE.LoopOnce;
                // запуск анимации по клику
                btn.addEventListener('click', ev => {
                    btns.forEach(btn => btn.disabled = true);
                    action = clipAction;
                    clipAction.reset();
                    clipAction.play();
                    idleAction.fadeOut(0.25);
                    clipAction.fadeIn(0.25);
                    clearTimeout(timer);


                    timer = setTimeout(function () {
                        idleLoop();
                        btns.forEach(btn => btn.disabled = false);
                    }, deley);
                });
            }
        });

        idleLoop = () => {
            console.log('Loop function');
            idleAction.reset();
            idleAction.play();
            if (action) action.fadeOut(0.25);
            idleAction.fadeIn(0.25);
            idle = true;
        }

        idleStop = () => {
            console.log('stop function');
            idleAction.stop();
            if (action) action.reset();
            idle = false;
        }

        // body
        robot.getObjectByName('Mesh013_1').material = body_mt;
        robot.getObjectByName('Arms_geo').material = body_mt;
        robot.getObjectByName('Chest_geo').material = body_mt;
        robot.getObjectByName('fingers_geo').material = body_mt;
        robot.getObjectByName('FingersJn_geo').material = body_mt;
        robot.getObjectByName('RingTube_geo').material = body_mt;
        robot.getObjectByName('ShouldeA_geo').material = chrom_mt;
        robot.getObjectByName('Palm_geo').material = body_mt;
        // chrome
        robot.getObjectByName('Elbows_01_geo').material = chrom_mt;
        robot.getObjectByName('Elbows_02_geo').material = chrom_mt;
        // head
        robot.getObjectByName('Mesh005').material = head_mt;
        robot.getObjectByName('Antena_geo').material = head_mt;
        robot.getObjectByName('LampHead_geo').material = head_mt;
        // Rubber
        robot.getObjectByName('ShouldeB_geo').material = rubber_mt;
        robot.getObjectByName('Mesh013').material = rubber_mt;
        robot.getObjectByName('Leg_Ball_geo').material = rubber_mt;
        // glass
        robot.getObjectByName('Mesh005_1').material = glass_mt;
        // face
        robot.getObjectByName('WebFace_geo').material = face_mt;
        // globus
        robot.getObjectByName('Earth_geo').material = planet_mt;
        robot.getObjectByName('Ligh_geo').material = cone_mt;
        //bottle
        robot.getObjectByName('bottleGeo').material = bottle_mt;
        robot.getObjectByName('bottleHimGeo').material = chime_mt;

        // обновляемые элементы
        //book
        robot.getObjectByName('Book_geo').material = book_mt;
        robot.getObjectByName('Papper_geo').material = book_mt;
        //Counter
        robot.getObjectByName('Count_geo').material = count_mt;

        // window.addEventListener('scroll', ev => {
        //     if (window.scrollY > sceneWrapper.offsetHeight) {
        //         if (idle) idleStop();
        //         console.log('idleStop');
        //     } else {
        //         if (!idle) idleLoop();
        //         console.log('idleLoop');
        //     }
        // });

    });



    const clock = new THREE.Clock();
    function animate() {
        const delta = clock.getDelta();

        if (mixer) {
            mixer.update(delta);
            renderer.render(scene, camera);
        }
        faceEye.update(delta * 1000);
    };

    renderer.setAnimationLoop(animate);


    function TextureAnimator(faceTex, tilesHoriz, tilesVert, numTiles, tileDispDuration) {

        this.tilesHorizontal = tilesHoriz;
        this.tilesVertical = tilesVert;
        this.numberOfTiles = numTiles;
        faceTex.wrapS = faceTex.wrapT = THREE.RepeatWrapping;
        faceTex.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);
        this.tileDisplayDuration = tileDispDuration;
        this.currentDisplayTime = 0;
        this.currentTile = 0;

        this.update = function (milliSec) {
            this.currentDisplayTime += milliSec;
            while (this.currentDisplayTime > this.tileDisplayDuration) {
                this.currentDisplayTime -= this.tileDisplayDuration;
                this.currentTile++;
                if (this.currentTile == this.numberOfTiles)
                this.currentTile = 0;
                var currentColumn = this.currentTile % this.tilesHorizontal;
                faceTex.offset.x = currentColumn / this.tilesHorizontal;
                var currentRow = Math.floor(this.currentTile / this.tilesHorizontal);
                faceTex.offset.y = currentRow / this.tilesVertical;
            }
        };
    }


    function setPositionOnResize() {
        if (window.innerWidth < 768 && window.innerWidth >= 480) {
            // camera.position.set(0, 4, 17);
            camera.position.set(4, 6, 21);

        }
        if (window.innerWidth < 480) {
            // camera.position.set(4, 6, 21);
            camera.position.set(3, 5, 19);

        }
        if (window.innerWidth >= 768) {
            camera.position.set(0, 4, 17);
        }
    }

    function setAspectOnResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        renderer.setSize(width, height);
        camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', ev => {
        let windowWidth = window.innerWidth;
        // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
        if (resized == windowWidth) { return; }
        resized = windowWidth;

        // console.log('resize');

        setAspectOnResize();
        setPositionOnResize();
    });

    // console.log('init');
    //
    // window.onload = function() {
    //     console.log('window onload');
    //     function onVisible( selector, callback, playback, threshold=[0.5] ) {
    //         let options = {
    //             threshold: threshold
    //         };
    //         let observer = new IntersectionObserver( onEntry, options );
    //         let elements = document.querySelectorAll( selector );
    //         // let play = selector.querySelector('.video__play');
    //         for ( let elm of elements ) {
    //             observer.observe( elm );
    //         }
    //         function onEntry( entry ) {
    //             entry.forEach( change => {
    //                 let elem = change.target;
    //                 let frame = elem.querySelector('iframe');
    //
    //                 if ( change.isIntersecting ) {
    //                     // console.log('show', elem);
    //                     console.log('show');
    //                     callback(elem);
    //                 } else {
    //                     // console.log('hidden', elem);
    //                     console.log('hidden');
    //                     playback(elem);
    //                 }
    //             } );
    //         }
    //     }
    //
    //     onVisible('.firstscreen',idleLoop,idleStop);
    //
    // }

}
initRobotAnimations();
