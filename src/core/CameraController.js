import * as THREE from 'three';

export class CameraController {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;

    // View modes:
    // 'chase': Elevated 45-degree smooth trailing view
    // 'isometric': Classic Bruno Simon 3/4 isometric diorama view
    // 'topDown': High strategy navigation map view
    // 'free': Mouse orbital view
    this.viewMode = 'chase';

    // Camera parameters: Bruno Simon low-FOV diorama perspective
    this.yaw = 0;
    this.pitch = 0.82; // ~47 degree elevated look-down angle
    this.minPitch = 0.35;
    this.maxPitch = 1.45;

    this.distance = 16.0;
    this.targetDistance = 16.0;
    this.eyeHeight = 2.0;

    // Camera position smoothing
    this.currentPosition = new THREE.Vector3(0, 14.0, 95.0);
    this.currentLookAt = new THREE.Vector3(0, 1.0, 80.0);

    // Mouse drag orbit
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;

    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false
    };

    this.initInputListeners();
  }

  initInputListeners() {
    window.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'CANVAS') {
        this.isDragging = true;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
      }
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const dx = e.clientX - this.lastMouseX;
        const dy = e.clientY - this.lastMouseY;

        this.yaw -= dx * 0.005;
        this.pitch = Math.max(this.minPitch, Math.min(this.maxPitch, this.pitch + dy * 0.005));

        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
      }
    });

    window.addEventListener('contextmenu', (e) => {
      if (e.target.tagName === 'CANVAS') {
        e.preventDefault();
      }
    });

    window.addEventListener('wheel', (e) => {
      this.targetDistance = Math.max(6.0, Math.min(50.0, this.targetDistance + e.deltaY * 0.015));
    }, { passive: true });

    // Keyboard controls
    window.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowUp' || e.code === 'KeyI') {
        this.keys.up = true;
      } else if (e.code === 'ArrowDown' || e.code === 'KeyK') {
        this.keys.down = true;
      } else if (e.code === 'ArrowLeft' || e.code === 'KeyJ') {
        this.keys.left = true;
      } else if (e.code === 'ArrowRight' || e.code === 'KeyL') {
        this.keys.right = true;
      } else if (e.code === 'KeyV') {
        this.toggleViewMode();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'ArrowUp' || e.code === 'KeyI') {
        this.keys.up = false;
      } else if (e.code === 'ArrowDown' || e.code === 'KeyK') {
        this.keys.down = false;
      } else if (e.code === 'ArrowLeft' || e.code === 'KeyJ') {
        this.keys.left = false;
      } else if (e.code === 'ArrowRight' || e.code === 'KeyL') {
        this.keys.right = false;
      }
    });
  }

  toggleViewMode() {
    if (this.viewMode === 'chase') {
      this.viewMode = 'isometric';
      this.pitch = 0.82;
      this.targetDistance = 20.0;
    } else if (this.viewMode === 'isometric') {
      this.viewMode = 'topDown';
      this.pitch = 1.38;
      this.targetDistance = 32.0;
    } else if (this.viewMode === 'topDown') {
      this.viewMode = 'free';
      this.pitch = 0.82;
      this.targetDistance = 16.0;
    } else {
      this.viewMode = 'chase';
      this.pitch = 0.82;
      this.targetDistance = 16.0;
    }
  }

  setMode(mode) {
    if (mode === 'vehicle') {
      this.targetDistance = 18.0;
      this.eyeHeight = 2.0;
      if (this.viewMode === 'chase' || this.viewMode === 'isometric') this.pitch = 0.82;
    } else if (mode === 'airplane' || mode === 'helicopter') {
      this.targetDistance = 36.0;
      this.eyeHeight = 3.5;
      this.pitch = 0.78;
    } else {
      // On foot
      this.targetDistance = 13.0;
      this.eyeHeight = 1.8;
      if (this.viewMode === 'chase' || this.viewMode === 'isometric') this.pitch = 0.82;
    }
  }

  update(dt, targetPos, entityYaw = 0, speedKmh = 0) {
    if (!targetPos || !Number.isFinite(targetPos.x)) return;

    // 1. View Mode yaw updates
    if (this.viewMode === 'chase') {
      if (!this.isDragging && !this.keys.left && !this.keys.right) {
        let desiredYaw = entityYaw - Math.PI;
        let diff = desiredYaw - this.yaw;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        // Smoothly follow vehicle orientation
        this.yaw += diff * Math.min(1, dt * 5.5);
      }
    } else if (this.viewMode === 'isometric') {
      // Classic fixed 3/4 isometric perspective
      const desiredYaw = -Math.PI * 0.25; // 45 degree angle
      let diff = desiredYaw - this.yaw;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.yaw += diff * Math.min(1, dt * 6.0);
    }

    // 2. Keyboard pitch/yaw adjustments
    const keyRotSpeed = 2.0;
    if (this.keys.up) {
      this.pitch = Math.max(this.minPitch, this.pitch - keyRotSpeed * dt);
    }
    if (this.keys.down) {
      this.pitch = Math.min(this.maxPitch, this.pitch + keyRotSpeed * dt);
    }
    if (this.keys.left) {
      this.yaw += keyRotSpeed * dt;
    }
    if (this.keys.right) {
      this.yaw -= keyRotSpeed * dt;
    }

    // 3. Smooth zoom damping with exponential decay
    const zoomAlpha = 1 - Math.exp(-8 * dt);
    this.distance += (this.targetDistance - this.distance) * zoomAlpha;

    // 4. Low-FOV Diorama lens (Bruno Simon style: 38 deg base, gentle speed expansion)
    const safeSpeed = (Number.isFinite(speedKmh) && speedKmh > 0) ? speedKmh : 0;
    const baseFov = 38; // Clean diorama look without fisheye distortion
    const extraFov = Math.min(safeSpeed * 0.1, 8);
    const targetFov = baseFov + extraFov;
    const fovAlpha = 1 - Math.exp(-5 * dt);
    const currentFov = (Number.isFinite(this.camera.fov) && this.camera.fov > 10) ? this.camera.fov : baseFov;
    this.camera.fov = currentFov + (targetFov - currentFov) * fovAlpha;
    this.camera.updateProjectionMatrix();

    // 5. Spherical camera offset calculations
    const safePitch = Math.max(this.minPitch, Math.min(this.maxPitch, this.pitch));
    const cosPitch = Math.cos(safePitch);
    const sinPitch = Math.sin(safePitch);

    const offsetX = Math.sin(this.yaw) * cosPitch * this.distance;
    const offsetY = sinPitch * this.distance + this.eyeHeight;
    const offsetZ = Math.cos(this.yaw) * cosPitch * this.distance;

    const minCamY = targetPos.y + 2.5;
    const desiredCamY = targetPos.y + offsetY;

    const desiredCamPos = new THREE.Vector3(
      targetPos.x + offsetX,
      Math.max(minCamY, desiredCamY),
      targetPos.z + offsetZ
    );

    // Frame-rate independent exponential smoothing (butter smooth, zero jitter)
    const posAlpha = 1 - Math.exp(-11 * dt);
    this.currentPosition.lerp(desiredCamPos, posAlpha);
    this.camera.position.copy(this.currentPosition);

    // Look at vehicle / character center with smooth exponential tracking
    const lookTargetY = targetPos.y + Math.min(1.2, this.eyeHeight * 0.6);
    const desiredLookAt = new THREE.Vector3(targetPos.x, lookTargetY, targetPos.z);
    const lookAlpha = 1 - Math.exp(-14 * dt);
    this.currentLookAt.lerp(desiredLookAt, lookAlpha);
    this.camera.lookAt(this.currentLookAt);
  }
}
