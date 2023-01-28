function animate() {
    if (mixer)
        mixer.update(clock.getDelta());
    renderer.render(scene, camera);
    faceEye.update(clock.getDelta() * 1000);
}
