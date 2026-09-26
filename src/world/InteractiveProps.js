import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export class InteractiveProps {
  constructor(scene, physicsWorld, audioManager) {
    this.scene = scene;
    this.physicsWorld = physicsWorld;
    this.audioManager = audioManager;

    this.dynamicProps = [];
    this.initMaterials();
    this.createBowlingAlley(new THREE.Vector3(0, 0.5, 96));
    this.createDestructibleBrickWall(new THREE.Vector3(-18, 0.4, 75));
    this.createBouncyCones();
    this.createFloorTypography();
  }

  initMaterials() {
    this.materials = {
      pinWood: new THREE.MeshStandardMaterial({
        color: 0xfbf8f3,
        roughness: 0.75,
        metalness: 0.05
      }),
      pinRed: new THREE.MeshStandardMaterial({
        color: 0xd9534f,
        roughness: 0.7,
        metalness: 0.05
      }),
      brickTerracotta: new THREE.MeshStandardMaterial({
        color: 0xd46853,
        roughness: 0.85,
        metalness: 0.02
      }),
      brickOchre: new THREE.MeshStandardMaterial({
        color: 0xe5ad52,
        roughness: 0.85,
        metalness: 0.02
      }),
      brickTeal: new THREE.MeshStandardMaterial({
        color: 0x5a8b9e,
        roughness: 0.85,
        metalness: 0.02
      }),
      coneOrange: new THREE.MeshStandardMaterial({
        color: 0xf56f42,
        roughness: 0.7,
        metalness: 0.05
      }),
      coneWhite: new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.7,
        metalness: 0.05
      }),
      textWood: new THREE.MeshStandardMaterial({
        color: 0xf4eee4,
        roughness: 0.8,
        metalness: 0.05
      }),
      textAccent: new THREE.MeshStandardMaterial({
        color: 0xd9534f,
        roughness: 0.75,
        metalness: 0.05
      })
    };
  }

  createBowlingAlley(origin) {
    // 10 bowling pins arranged in a classic 4-row triangle
    // Row 1: 1 pin
    // Row 2: 2 pins
    // Row 3: 3 pins
    // Row 4: 4 pins
    const pinSpacingX = 0.95;
    const pinSpacingZ = 1.05;

    let pinIndex = 0;
    for (let row = 0; row < 4; row++) {
      const pinsInRow = row + 1;
      const startX = -((pinsInRow - 1) * pinSpacingX) / 2;
      const zPos = origin.z + row * pinSpacingZ;

      for (let col = 0; col < pinsInRow; col++) {
        const xPos = origin.x + startX + col * pinSpacingX;
        this.createSingleBowlingPin(new THREE.Vector3(xPos, origin.y, zPos), pinIndex++);
      }
    }
  }

  createSingleBowlingPin(pos, id) {
    // Three.js visual pin (toy stylized shape)
    const pinGroup = new THREE.Group();

    // Base body
    const baseGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.7, 12);
    const base = new THREE.Mesh(baseGeo, this.materials.pinWood);
    base.position.y = 0.35;
    base.castShadow = true;
    base.receiveShadow = true;
    pinGroup.add(base);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.12, 0.22, 0.45, 12);
    const neck = new THREE.Mesh(neckGeo, this.materials.pinWood);
    neck.position.y = 0.85;
    neck.castShadow = true;
    pinGroup.add(neck);

    // Red stripes around neck
    const stripeGeo = new THREE.CylinderGeometry(0.155, 0.175, 0.08, 12);
    const stripe = new THREE.Mesh(stripeGeo, this.materials.pinRed);
    stripe.position.y = 0.82;
    pinGroup.add(stripe);

    // Head
    const headGeo = new THREE.SphereGeometry(0.16, 12, 10);
    const head = new THREE.Mesh(headGeo, this.materials.pinWood);
    head.position.y = 1.15;
    head.castShadow = true;
    pinGroup.add(head);

    pinGroup.position.copy(pos);
    this.scene.add(pinGroup);

    // Cannon-es physical body
    const shape = new CANNON.Cylinder(0.26, 0.28, 1.25, 8);
    const body = new CANNON.Body({
      mass: 1.6,
      position: new CANNON.Vec3(pos.x, pos.y + 0.62, pos.z),
      shape: shape,
      linearDamping: 0.3,
      angularDamping: 0.35
    });

    // Make pins stand upright stably
    body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    this.physicsWorld.world.addBody(body);

    this.dynamicProps.push({
      mesh: pinGroup,
      body: body,
      type: 'pin',
      initialY: pos.y + 0.62
    });
  }

  createDestructibleBrickWall(origin) {
    // A destructible 4-row brick wall made of individual toy wooden blocks
    const brickW = 1.1;
    const brickH = 0.45;
    const brickD = 0.55;
    const rows = 4;
    const cols = 5;

    const materials = [
      this.materials.brickTerracotta,
      this.materials.brickOchre,
      this.materials.brickTeal
    ];

    for (let r = 0; r < rows; r++) {
      const count = r % 2 === 0 ? cols : cols - 1;
      const startX = origin.x - ((count - 1) * (brickW + 0.06)) / 2;
      const y = origin.y + r * (brickH + 0.02) + brickH / 2;

      for (let c = 0; c < count; c++) {
        const x = startX + c * (brickW + 0.06);
        const z = origin.z;

        const mat = materials[(r + c) % materials.length];
        this.createSingleBrick(new THREE.Vector3(x, y, z), brickW, brickH, brickD, mat);
      }
    }
  }

  createSingleBrick(pos, w, h, d, material) {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.copy(pos);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    const shape = new CANNON.Box(new CANNON.Vec3(w / 2, h / 2, d / 2));
    const body = new CANNON.Body({
      mass: 1.4,
      position: new CANNON.Vec3(pos.x, pos.y, pos.z),
      shape: shape,
      linearDamping: 0.25,
      angularDamping: 0.3
    });
    this.physicsWorld.world.addBody(body);

    this.dynamicProps.push({
      mesh,
      body,
      type: 'brick'
    });
  }

  createBouncyCones() {
    const conePositions = [
      new THREE.Vector3(8.5, 0.4, 76),
      new THREE.Vector3(9.5, 0.4, 78),
      new THREE.Vector3(10.5, 0.4, 80),
      new THREE.Vector3(-12, 0.4, 88),
      new THREE.Vector3(-13, 0.4, 90),
      new THREE.Vector3(25, 0.4, 55),
      new THREE.Vector3(26, 0.4, 57),
      new THREE.Vector3(-35, 0.4, 115)
    ];

    conePositions.forEach(pos => {
      const group = new THREE.Group();

      // Square base
      const baseGeo = new THREE.BoxGeometry(0.55, 0.06, 0.55);
      const base = new THREE.Mesh(baseGeo, this.materials.coneOrange);
      base.castShadow = true;
      base.receiveShadow = true;
      group.add(base);

      // Cone
      const coneGeo = new THREE.ConeGeometry(0.22, 0.75, 12);
      const cone = new THREE.Mesh(coneGeo, this.materials.coneOrange);
      cone.position.y = 0.38;
      cone.castShadow = true;
      group.add(cone);

      // White reflective collar band
      const collarGeo = new THREE.CylinderGeometry(0.13, 0.17, 0.16, 12);
      const collar = new THREE.Mesh(collarGeo, this.materials.coneWhite);
      collar.position.y = 0.38;
      group.add(collar);

      group.position.copy(pos);
      this.scene.add(group);

      const shape = new CANNON.Cylinder(0.04, 0.28, 0.8, 8);
      const body = new CANNON.Body({
        mass: 0.8,
        position: new CANNON.Vec3(pos.x, pos.y + 0.4, pos.z),
        shape: shape,
        linearDamping: 0.35,
        angularDamping: 0.4
      });
      this.physicsWorld.world.addBody(body);

      this.dynamicProps.push({
        mesh: group,
        body: body,
        type: 'cone'
      });
    });
  }

  createFloorTypography() {
    // In Bruno Simon's game, key zones have bold 3D block letters laying flat or slightly raised on the floor
    // We create block-letter signage for "BENGALURU", "AIRPORT", "SILK BOARD", "KORAMANGALA", and "COURIER CITY"
    const textLabels = [
      { text: 'BENGALURU', pos: new THREE.Vector3(0, 0.08, 62), scale: 1.4, color: 0xd9534f },
      { text: 'COURIER CITY', pos: new THREE.Vector3(0, 0.08, 54), scale: 0.95, color: 0x3d3b40 },
      { text: 'SILK BOARD', pos: new THREE.Vector3(34.5, 0.08, 38), scale: 1.1, color: 0xe5ad52 },
      { text: 'AIRPORT', pos: new THREE.Vector3(-360, 0.08, -310), scale: 1.6, color: 0x5a8b9e },
      { text: 'KORAMANGALA', pos: new THREE.Vector3(120, 0.08, 120), scale: 1.2, color: 0x7aa372 }
    ];

    textLabels.forEach(lbl => {
      this.createBlockText(lbl.text, lbl.pos, lbl.scale, lbl.color);
    });
  }

  createBlockText(text, pos, scale = 1.0, colorHex = 0xd9534f) {
    const textGroup = new THREE.Group();
    const charWidth = 1.1 * scale;
    const charHeight = 0.25 * scale;
    const charDepth = 1.5 * scale;

    const mat = new THREE.MeshStandardMaterial({
      color: colorHex,
      roughness: 0.8,
      metalness: 0.05
    });

    const startX = -((text.length - 1) * charWidth) / 2;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === ' ') continue;

      // Stylized 3D letter block
      const letterGeo = new THREE.BoxGeometry(charWidth * 0.85, charHeight, charDepth);
      const letterMesh = new THREE.Mesh(letterGeo, mat);
      letterMesh.position.set(startX + i * charWidth, charHeight / 2, 0);
      letterMesh.castShadow = true;
      letterMesh.receiveShadow = true;
      textGroup.add(letterMesh);

      // Add a slight beveled top plate for clear readability from above
      const topPlate = new THREE.Mesh(
        new THREE.BoxGeometry(charWidth * 0.8, charHeight * 0.2, charDepth * 0.92),
        this.materials.textWood
      );
      topPlate.position.set(startX + i * charWidth, charHeight + 0.02, 0);
      textGroup.add(topPlate);
    }

    textGroup.position.copy(pos);
    this.scene.add(textGroup);
  }

  update(dt, vehiclePos, vehicleSpeed) {
    // Sync Three.js meshes with Cannon-es physical bodies
    for (let i = 0; i < this.dynamicProps.length; i++) {
      const item = this.dynamicProps[i];
      item.mesh.position.copy(item.body.position);
      item.mesh.quaternion.copy(item.body.quaternion);

      // If a prop flies off into the void or falls through the floor, reset it
      if (item.mesh.position.y < -5) {
        item.body.position.set(item.mesh.position.x, 2, item.mesh.position.z);
        item.body.velocity.set(0, 0, 0);
        item.body.angularVelocity.set(0, 0, 0);
      }
    }
  }
}
