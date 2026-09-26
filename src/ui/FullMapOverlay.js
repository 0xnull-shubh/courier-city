export class FullMapOverlay {
  constructor(game) {
    this.game = game;
    this.isOpen = false;

    this.landmarks = [
      { id: 'founders_stark', name: "⚡ Founder's Building (Stark Tower)", x: -70, z: 130, icon: '⚡', color: '#38bdf8', desc: "Futuristic Stark Tower with cantilevered penthouse flight deck & Arc Reactor in BTM Layout!" },
      { id: 'bnmit', name: '🎓 BNM Institute of Technology (BNMIT)', x: -140, z: 160, icon: '🎓', color: '#9f1239', desc: 'Premier engineering campus with academic quad & 34m campanile tower!' },
      { id: 'ks_layout', name: '⛰️ Kumaraswamy Layout (KS Layout)', x: -200, z: 180, icon: '⛰️', color: '#c2410c', desc: 'Hilltop layout terrace, panoramic views & Sri Kumaraswamy Temple!' },
      { id: 'indian_flag', name: '🇮🇳 Monumental Indian National Flag (55m)', x: 0, z: -20, icon: '🇮🇳', color: '#f97316', desc: '55m high Tiranga waving over Amar Jawan Jyoti and Central Plaza!' },
      { id: 'iaf_hq', name: '🛩️ Indian Air Force (IAF) HQ Command', x: 180, z: -240, icon: '🛩️', color: '#0284c7', desc: 'IAF Training Command HQ with supersonic MiG-21 / Tejas jet & radar dome!' },
      { id: 'army_hq', name: '🎖️ Indian Army Cantonment & ASC Centre', x: -180, z: 220, icon: '🎖️', color: '#15803d', desc: 'Army Cantonment HQ with battle tank memorial, sentry towers & parade ground!' },
      { id: 'someshwara_temple', name: '🛕 Sri Someshwara Chola Temple', x: -60, z: -160, icon: '🛕', color: '#d97706', desc: 'Ancient Dravidian temple with 32m 5-tier Rajagopuram, Kalasas & Kalyani tank!' },
      { id: 'bull_temple', name: '🐂 Dodda Basavana Gudi (Bull Temple)', x: 100, z: 180, icon: '🐂', color: '#78350f', desc: 'Sacred Basavanagudi shrine with monolithic black granite Nandi & Deepasthambha!' },
      { id: 'iskcon_temple', name: '✨ ISKCON Bangalore Sri Radha Krishna', x: 220, z: -120, icon: '✨', color: '#eab308', desc: 'White marble temple atop Hare Krishna hill with soaring gold Shikhara!' },
      { id: 'bms_college', name: '🎓 BMS College of Engineering (1946)', x: -120, z: -120, icon: '🎓', color: '#991b1b', desc: 'Historic red-brick engineering quad with 38m clock tower & library!' },
      { id: 'iisc_campus', name: '🔬 IISc Heritage Science Campus', x: -60, z: 180, icon: '🔬', color: '#475569', desc: 'Classical colonial stone science quad with Tuscan colonnade & research hall!' },
      { id: 'hsr_bda_complex', name: '🏢 HSR BDA Shopping Complex', x: 60, z: 100, icon: '🏢', color: '#0284c7', desc: '4-story civic commercial complex with Bangalore One, bank & shops!' },
      { id: 'koramangala_bda_complex', name: '🏢 Koramangala BDA Hub', x: -100, z: 120, icon: '🏢', color: '#d97706', desc: 'Koramangala commercial centre with stores, cafes & civic plaza!' },
      { id: 'hsr_bda_park', name: '🌳 HSR Sector 2 BDA Public Park', x: 80, z: 40, icon: '🌳', color: '#16a34a', desc: 'BDA park with red-earth walking track, gazebo bandstand & Tabebuia blooms!' },
      { id: 'koramangala_bda_park', name: '🌳 Koramangala 4th Block BDA Park', x: -140, z: 60, icon: '🌳', color: '#15803d', desc: 'Landscaped public walking gardens with ornamental gazebo & benches!' },
      { id: 'indiranagar_bda_park', name: '🌳 Indiranagar Defence BDA Park', x: 120, z: -60, icon: '🌳', color: '#059669', desc: 'Serene BDA park with jogging trail, fountain & flowering trees!' },
      { id: 'silkboard_metro', name: '🚊 Silk Board Metro Station', x: 24, z: 20, icon: '🚊', color: '#10b981', desc: 'Elevated Namma Metro station connecting Outer Ring Road & Hosur Road!' },
      { id: 'hsr_metro', name: '🚊 HSR Layout Metro Station', x: 24, z: 180, icon: '🚊', color: '#059669', desc: 'Elevated modern station with canopy concourse & 27th Main connectivity!' },
      { id: 'vidhana', name: '🏛️ Vidhana Soudha', x: -240, z: -40, icon: '🏛️', color: '#f59e0b', desc: 'Karnataka State Legislature with 50m illuminated dome & grand boulevard!' },
      { id: 'ubcity', name: '🏙️ UB City Tower (120m)', x: -60, z: -100, icon: '🏙️', color: '#eab308', desc: 'Luxury skyscraper, rooftop helipad & boutique amphitheatre piazza!' },
      { id: 'orion', name: '🛍️ Orion Mall & WTC Bangalore', x: 240, z: 320, icon: '🛍️', color: '#ec4899', desc: 'Contemporary glass shopping mall, 92m WTC tower & lake boardwalk!' },
      { id: 'lalbagh', name: '🌿 Lalbagh Royal Glass House', x: -140, z: 280, icon: '🌿', color: '#16a34a', desc: 'Crystal Palace conservatory, flower shows & Kempegowda rock tower!' },
      { id: 'nandihills', name: '⛰️ Nandi Hills Ghats & Viewpoint', x: 440, z: -460, icon: '⛰️', color: '#8b5cf6', desc: 'Drive/walk 75m winding ghat road to panoramic sunrise cliff!' },
      { id: 'airport', name: '✈️ International Airport & Runway', x: 300, z: -380, icon: '✈️', color: '#2563eb', desc: 'Take off in airplanes down the 280m runway!' },
      { id: 'tipu_palace', name: "🏰 Tipu Sultan's Summer Palace", x: -160, z: -80, icon: '🏰', color: '#b45309', desc: 'Historic 1791 Indo-Islamic teakwood palace & museum in Kalasipalya!' },
      { id: 'mysore_palace', name: '👑 Mysore Palace (Amba Vilas)', x: -300, z: 120, icon: '👑', color: '#f59e0b', desc: 'Grand royal palace with 42m golden dome, pink chhatris & 100k night lights!' },
      { id: 'vvpuram_food', name: '🍲 V.V. Puram Food Street (Thindi Beedi)', x: -40, z: 220, icon: '🍲', color: '#ef4444', desc: 'Bengaluru street food hub: VB Bakery, Hot Butter Dosa, Gulkand & Filter Coffee!' },
      { id: 'russell_market', name: '🏛️ Russell Market & Commercial St', x: 100, z: -140, icon: '🏛️', color: '#991b1b', desc: 'Colonial 1927 clock tower & bustling Commercial Street shopping alleys!' }
    ];

    // Default target: Vidhana Soudha!
    this.gpsTarget = this.landmarks.find(l => l.id === 'vidhana') || this.landmarks[0];
    this.selectedTarget = null;
    this.lastTapTime = 0;
    this.lastTapCoords = { x: 0, y: 0 };

    this.createDom();
    this.initEvents();
  }

  createDom() {
    this.overlay = document.createElement('div');
    this.overlay.id = 'full-map-overlay';
    this.overlay.className = 'map-overlay-hidden';

    this.overlay.innerHTML = `
      <div class="map-modal">
        <div class="map-header">
          <div class="map-title-group">
            <span class="map-badge">🌍 BENGALURU GLOBE MAP</span>
            <h2>Interactive City Satellite & Landmark Navigation</h2>
          </div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <div class="map-double-tap-pill">⚡ Double-Tap anywhere to Spawn / Land</div>
            <button id="close-map-btn" class="map-close-btn" title="Close Map">&times;</button>
          </div>
        </div>

        <div class="map-canvas-wrapper">
          <canvas id="fullscreen-map-canvas" width="800" height="800"></canvas>
          
          <!-- Floating Action Bubble on tap -->
          <div id="map-action-card" class="map-action-card hidden">
            <div class="card-header">
              <span id="card-icon" class="card-icon">📍</span>
              <div class="card-titles">
                <h4 id="card-title">Vidhana Soudha</h4>
                <span id="card-coords" class="card-coords">(-240, -40) &bull; 180m away</span>
              </div>
            </div>
            <p id="card-desc" class="card-desc">Karnataka State Legislature dome.</p>
            <div class="card-btn-row">
              <button id="card-spawn-btn" class="card-btn card-spawn-btn">⚡ Spawn & Land Here</button>
              <button id="card-gps-btn" class="card-btn card-gps-btn">🎯 Set GPS Route</button>
            </div>
            <div class="card-tip">⚡ Quick Tip: Double-tap anywhere to teleport instantly!</div>
          </div>
        </div>

        <div class="map-footer">
          <div class="map-legend">
            <span><span class="legend-dot" style="background:#38bdf8;"></span> ⚡ Founder's (Stark)</span>
            <span><span class="legend-dot" style="background:#9f1239;"></span> 🎓 BNMIT</span>
            <span><span class="legend-dot" style="background:#c2410c;"></span> ⛰️ KS Layout</span>
            <span><span class="legend-dot" style="background:#f97316;"></span> 🇮🇳 Flag</span>
            <span><span class="legend-dot" style="background:#0284c7;"></span> 🛩️ IAF HQ</span>
            <span><span class="legend-dot" style="background:#15803d;"></span> 🎖️ Army HQ</span>
            <span><span class="legend-dot" style="background:#d97706;"></span> 🛕 Temple</span>
            <span><span class="legend-dot" style="background:#78350f;"></span> 🐂 Bull Temple</span>
            <span><span class="legend-dot" style="background:#991b1b;"></span> 🎓 BMS College</span>
            <span><span class="legend-dot" style="background:#16a34a;"></span> 🌳 BDA Parks</span>
            <span><span class="legend-dot" style="background:#0284c7;"></span> 🏢 BDA Complexes</span>
            <span><span class="legend-dot" style="background:#10b981;"></span> 🚊 Namma Metro</span>
            <span><span class="legend-dot" style="background:#f59e0b;"></span> 🏛️ Vidhana Soudha</span>
            <span><span class="legend-dot" style="background:#b45309;"></span> 🏰 Tipu Palace</span>
            <span><span class="legend-dot" style="background:#f59e0b;"></span> 👑 Mysore Palace</span>
            <span><span class="legend-dot" style="background:#ef4444;"></span> 🍲 Food Street</span>
            <span><span class="legend-dot" style="background:#991b1b;"></span> 🏛️ Russell Market</span>
          </div>
          <div class="map-hint" style="font-weight: 600; color: #0284c7;">
            ⚡ <strong>DOUBLE-TAP ANYWHERE</strong> to teleport & land with your vehicle &middot; Tap once to inspect or set GPS route
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(this.overlay);
    this.canvas = document.getElementById('fullscreen-map-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.actionCard = document.getElementById('map-action-card');
  }

  initEvents() {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'KeyM') {
        this.toggle();
      }
    });

    const closeBtn = document.getElementById('close-map-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.toggle(false));

    // Card buttons
    const spawnBtn = document.getElementById('card-spawn-btn');
    const gpsBtn = document.getElementById('card-gps-btn');

    if (spawnBtn) {
      spawnBtn.addEventListener('click', () => {
        if (this.selectedTarget && this.game) {
          this.executeSpawn(this.selectedTarget.x, this.selectedTarget.z);
        }
      });
    }

    if (gpsBtn) {
      gpsBtn.addEventListener('click', () => {
        if (this.selectedTarget) {
          this.gpsTarget = this.selectedTarget;
          if (this.game && this.game.onGpsTargetChanged) {
            this.game.onGpsTargetChanged(this.gpsTarget);
          }
          if (this.game && this.game.hud) {
            this.game.hud.showToast(`🎯 GPS Route set to ${this.selectedTarget.name}!`);
          }
          this.hideActionCard();
          this.render();
        }
      });
    }

    // Handle Tap and Double-Tap
    const handleMapTap = (clientX, clientY, isDoubleClick = false) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = (clientX - rect.left) * (this.canvas.width / rect.width);
      const clickY = (clientY - rect.top) * (this.canvas.height / rect.height);

      const mapScale = this.canvas.width / 1300;
      const originX = this.canvas.width / 2;
      const originY = this.canvas.height / 2;

      const worldX = Math.round((clickX - originX) / mapScale);
      const worldZ = Math.round((clickY - originY) / mapScale);

      // Check nearest landmark
      let nearestLandmark = null;
      let minDistanceSq = 28 * 28;

      for (const lm of this.landmarks) {
        const lx = originX + lm.x * mapScale;
        const ly = originY + lm.z * mapScale;
        const distSq = (clickX - lx) * (clickX - lx) + (clickY - ly) * (clickY - ly);
        if (distSq < minDistanceSq) {
          minDistanceSq = distSq;
          nearestLandmark = lm;
        }
      }

      const spawnX = nearestLandmark ? nearestLandmark.x : worldX;
      const spawnZ = nearestLandmark ? nearestLandmark.z : worldZ;

      const now = performance.now();
      const timeSinceLast = now - this.lastTapTime;
      const distFromLast = Math.hypot(clientX - this.lastTapCoords.x, clientY - this.lastTapCoords.y);

      // DOUBLE TAP TRIGGER!
      if (isDoubleClick || (timeSinceLast < 380 && distFromLast < 35)) {
        this.executeSpawn(spawnX, spawnZ);
        this.lastTapTime = 0;
        return;
      }

      this.lastTapTime = now;
      this.lastTapCoords = { x: clientX, y: clientY };

      // Single Tap -> Show Action Card
      const targetObj = nearestLandmark || {
        id: 'custom_pin',
        name: `📍 Custom Point (${worldX}, ${worldZ})`,
        x: worldX,
        z: worldZ,
        icon: '📍',
        color: '#06b6d4',
        desc: 'Custom location in Bengaluru open world'
      };

      this.selectedTarget = targetObj;
      this.showActionCard(clientX - rect.left, clientY - rect.top, targetObj);
      this.render();
    };

    // Canvas click
    this.canvas.addEventListener('click', (e) => {
      handleMapTap(e.clientX, e.clientY, false);
    });

    // Double-click
    this.canvas.addEventListener('dblclick', (e) => {
      handleMapTap(e.clientX, e.clientY, true);
    });

    // Touch handling for mobile
    let touchStartTime = 0;
    this.canvas.addEventListener('touchstart', (e) => {
      touchStartTime = performance.now();
    }, { passive: true });

    this.canvas.addEventListener('touchend', (e) => {
      if (e.changedTouches.length > 0) {
        const t = e.changedTouches[0];
        handleMapTap(t.clientX, t.clientY, false);
      }
    });
  }

  showActionCard(cssX, cssY, target) {
    if (!this.actionCard) return;

    const titleEl = document.getElementById('card-title');
    const iconEl = document.getElementById('card-icon');
    const coordsEl = document.getElementById('card-coords');
    const descEl = document.getElementById('card-desc');

    if (titleEl) titleEl.textContent = target.name;
    if (iconEl) iconEl.textContent = target.icon || '📍';
    if (descEl) descEl.textContent = target.desc || 'Tap to spawn or navigate to this location.';

    if (coordsEl && this.game && this.game.player) {
      const pPos = (this.game.player.isDriving && this.game.activeVehicle)
        ? this.game.activeVehicle.position
        : this.game.player.position;
      const distM = Math.round(Math.hypot(target.x - pPos.x, target.z - pPos.z));
      coordsEl.textContent = `Coordinates: (${target.x}, ${target.z}) &bull; ${distM}m away`;
    }

    // Keep card inside wrapper boundary
    const wrapW = this.canvas.parentElement.clientWidth || 800;
    const wrapH = this.canvas.parentElement.clientHeight || 800;
    const cardW = 300;
    const cardH = 175;

    let posX = Math.max(16, Math.min(wrapW - cardW - 16, cssX - cardW / 2));
    let posY = (cssY - cardH - 18 > 10) ? (cssY - cardH - 18) : (cssY + 22);

    this.actionCard.style.left = `${posX}px`;
    this.actionCard.style.top = `${posY}px`;
    this.actionCard.classList.remove('hidden');
  }

  hideActionCard() {
    if (this.actionCard) {
      this.actionCard.classList.add('hidden');
    }
  }

  executeSpawn(worldX, worldZ) {
    if (this.game && typeof this.game.spawnPlayerAt === 'function') {
      this.game.spawnPlayerAt(worldX, worldZ);
      this.hideActionCard();
      this.toggle(false);
    }
  }

  toggle(forceState = null) {
    this.isOpen = (forceState !== null) ? forceState : !this.isOpen;
    if (this.isOpen) {
      this.overlay.classList.remove('map-overlay-hidden');
      this.hideActionCard();
      this.render();
    } else {
      this.overlay.classList.add('map-overlay-hidden');
      this.hideActionCard();
    }
  }

  render() {
    if (!this.isOpen || !this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const scale = w / 1300;

    // 1. Satellite Base / Warm Diorama Studio Floor
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    // Subtle coordinate grid
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // 2. East River (Ulsoor / Sankey water corridor)
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(cx + 340 * scale, 0, 80 * scale, h);

    // River water edge highlight
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(cx + 340 * scale, 0, 80 * scale, h);

    // 3. Arterial 4-Lane Highways (Central Spine & Ring Roads)
    ctx.fillStyle = '#334155';
    ctx.fillRect(cx - 10 * scale, 0, 20 * scale, h); // N-S Central Expressway
    ctx.fillRect(0, cy - 10 * scale, w, 20 * scale); // E-W Boulevard

    [-200, 200].forEach(c => {
      ctx.fillRect(cx + (c - 8) * scale, 0, 16 * scale, h);
      ctx.fillRect(0, cy + (c - 8) * scale, w, 16 * scale);
    });

    // Highway yellow centerlines
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
    ctx.moveTo(0, cy); ctx.lineTo(w, cy);
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. BDA Public Parks
    ctx.fillStyle = 'rgba(34, 197, 94, 0.35)';
    ctx.fillRect(cx + (80 - 35) * scale, cy + (40 - 30) * scale, 70 * scale, 60 * scale);   // HSR Park
    ctx.fillRect(cx + (-140 - 32) * scale, cy + (60 - 27) * scale, 65 * scale, 55 * scale); // Koramangala Park
    ctx.fillRect(cx + (120 - 30) * scale, cy + (-60 - 25) * scale, 60 * scale, 50 * scale); // Indiranagar Park

    // 5. Namma Metro Elevated Viaduct Corridor (Green Line)
    ctx.fillStyle = '#10b981';
    ctx.fillRect(cx + (24 - 3) * scale, cy - 60 * scale, 6 * scale, 320 * scale);

    // 6. Airport Runway
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(cx + 160 * scale, cy - 390 * scale, 280 * scale, 26 * scale);
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 8]);
    ctx.beginPath();
    ctx.moveTo(cx + 170 * scale, cy - 377 * scale);
    ctx.lineTo(cx + 430 * scale, cy - 377 * scale);
    ctx.stroke();
    ctx.setLineDash([]);

    // 7. Active Player Position & Heading
    let px = cx, py = cy;
    let playerPos = null;
    let playerYaw = 0;
    if (this.game && this.game.player) {
      playerPos = (this.game.player.isDriving && this.game.activeVehicle)
        ? this.game.activeVehicle.position
        : this.game.player.position;
      playerYaw = (this.game.player.isDriving && this.game.activeVehicle)
        ? this.game.activeVehicle.yaw
        : this.game.player.rotation;
      px = cx + playerPos.x * scale;
      py = cy + playerPos.z * scale;
    }

    // 8. Active GPS Route Dash
    if (this.gpsTarget && playerPos) {
      const tx = cx + this.gpsTarget.x * scale;
      const ty = cy + this.gpsTarget.z * scale;

      ctx.save();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3.5;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(tx, ty);
      ctx.stroke();

      const midX = (px + tx) / 2;
      const midY = (py + ty) / 2;
      const distM = Math.round(Math.hypot(this.gpsTarget.x - playerPos.x, this.gpsTarget.z - playerPos.z));

      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.roundRect(midX - 34, midY - 11, 68, 22, 6);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${distM}m`, midX, midY + 4);
      ctx.restore();
    }

    // 9. Render Landmark Pins
    this.landmarks.forEach(lm => {
      const lx = cx + lm.x * scale;
      const ly = cy + lm.z * scale;
      const isTarget = (this.gpsTarget && this.gpsTarget.id === lm.id);
      const isSelected = (this.selectedTarget && this.selectedTarget.id === lm.id);

      if (isTarget || isSelected) {
        ctx.beginPath();
        ctx.arc(lx, ly, 22, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? 'rgba(239, 68, 68, 0.35)' : 'rgba(56, 189, 248, 0.35)';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(lx, ly, 12, 0, Math.PI * 2);
      ctx.fillStyle = lm.color;
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Landmark Name Tag
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${lm.icon} ${lm.name.split(' ')[1] || lm.name}`, lx, ly - 16);
    });

    // 10. Selected Custom Pin Marker
    if (this.selectedTarget && this.selectedTarget.id === 'custom_pin') {
      const tx = cx + this.selectedTarget.x * scale;
      const ty = cy + this.selectedTarget.z * scale;

      ctx.beginPath();
      ctx.arc(tx, ty, 20, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(tx, ty, 11, 0, Math.PI * 2);
      ctx.fillStyle = '#06b6d4';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
    }

    // 11. Live Player Pin with Sonar Ping
    if (playerPos) {
      // Outer sonar pulse
      const now = performance.now();
      const pulseSize = 14 + (Math.sin(now * 0.006) + 1) * 6;
      ctx.beginPath();
      ctx.arc(px, py, pulseSize, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(-playerYaw);

      ctx.beginPath();
      ctx.arc(0, 0, 9, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Heading arrow
      ctx.beginPath();
      ctx.moveTo(0, -14);
      ctx.lineTo(6, 6);
      ctx.lineTo(0, 2);
      ctx.lineTo(-6, 6);
      ctx.closePath();
      ctx.fillStyle = '#f87171';
      ctx.fill();
      ctx.restore();
    }
  }

  getGpsDirection(playerPos) {
    if (!this.gpsTarget || !playerPos) return null;

    const dx = this.gpsTarget.x - playerPos.x;
    const dz = this.gpsTarget.z - playerPos.z;
    const distance = Math.round(Math.sqrt(dx * dx + dz * dz));
    const targetAngle = Math.atan2(dx, dz);

    return {
      name: this.gpsTarget.name,
      icon: this.gpsTarget.icon,
      distance,
      angle: targetAngle
    };
  }
}
