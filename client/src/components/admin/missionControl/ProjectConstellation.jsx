import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getAPI, postAPI, deleteAPI } from '../../../utils/fetchData';
import { useSelector } from 'react-redux';
import { Add, Close, Save, ZoomIn, ZoomOut, MyLocation } from '@material-ui/icons';
import './ProjectConstellation.css';

const ProjectConstellation = () => {
  const { auth } = useSelector(state => state);
  const mountRef = useRef(null);
  const labelsRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const worldRef = useRef(null);
  const nodesRef = useRef([]);
  const edgesRef = useRef([]);
  const particlesRef = useRef([]);
  const animationIdRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const selectedRef = useRef(null);
  const hoverEdgeRef = useRef(null);

  const [nodes, setNodes] = useState([]);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [hiddenFlows, setHiddenFlows] = useState(new Set());
  const [selectedNode, setSelectedNode] = useState(null);
  const [readoutText, setReadoutText] = useState('Drag to rotate · scroll to zoom · right-drag to pan · hover a line for its metric');
  const [readoutColor, setReadoutColor] = useState('#64748B');

  const [formData, setFormData] = useState({
    name: '',
    type: 'Company',
    health: 'green',
    connectTo: '',
    flowType: 'money',
    note: ''
  });

  // Health colors
  const HC = {
    red: '#EF4444',
    amber: '#F59E0B',
    green: '#10B981',
    gray: '#6B7280',
    blue: '#3B82F6',
    white: '#E2E8F0',
    purple: '#8B5CF6'
  };

  // Flow colors and labels
  const FC = {
    money: ['Money', '#10B981'],
    time: ['Time', '#3B82F6'],
    people: ['People', '#8B5CF6'],
    tech: ['Tech', '#F97316'],
    integration: ['Integration', '#FCD34D'],
    future: ['Pending', '#6B7280']
  };

  // Base nodes (High Commander and core projects)
  const BASE_NODES = [
    { id: 'C', name: 'High Commander', sub: 'Mohamad', c: 'white', r: 0.9, p: [0, 0, 0], rows: [['Roles', 'CEO · CTO · CFO'], ['Status', 'Overloaded'], ['Location', 'Buea']] },
    { id: 'camsol', name: 'Camsol Technology', sub: 'Maxed out', c: 'red', r: 0.72, p: [-4.2, 0.4, 1.2], rows: [['Revenue', '300K XAF/mo'], ['Client', 'SDO'], ['Next', 'Report Oct 20']] },
    { id: 'suberfood', name: 'SuberFood', sub: 'Launch Dec 1', c: 'red', r: 0.8, p: [4.2, 0.2, -0.6], rows: [['Platform', '70%'], ['Team', 'Ali (Oct 10)'], ['Target', '200K XAF/mo'], ['Missing', 'Pre-orders, wallet, PWC']] },
    { id: 'pwc', name: 'PayWithCamsol', sub: 'Stable', c: 'green', r: 0.58, p: [0, 3.6, -1.6], rows: [['Rails', 'MTN MoMo, Orange Money'], ['Client', 'Icons (integrating)'], ['Revenue', 'TBD']] },
    { id: 'profundra', name: 'ProFundra', sub: 'Not monetized', c: 'amber', r: 0.52, p: [-2.6, -2.9, -1.8], rows: [['Revenue', '0 XAF'], ['URL', 'profundra.com'], ['Future', 'NGO partnerships']] },
    { id: 'craftex', name: 'SuberCraftex', sub: 'Low revenue', c: 'amber', r: 0.52, p: [2.9, -2.7, 2], rows: [['Products', '106'], ['Investors', '7'], ['Revenue', '0–50K XAF/mo']] },
    { id: 'ali', name: 'Ali Barkat', sub: 'Arrives Oct 10', c: 'purple', r: 0.3, p: [6, 2.6, 1.6], rows: [['Role', 'SuberFood Ops Manager']] },
    { id: 'kd', name: 'KD', sub: 'Waiting', c: 'gray', r: 0.28, p: [-4.8, 3.1, -2.2], rows: [['Role', 'Accountant'], ['Hire when', 'SuberFood ≥ 200K/mo']] }
  ];

  // Base edges
  const BASE_EDGES = [
    ['camsol', 'C', 'money', 4, '300,000 XAF/month from SDO contract → you'],
    ['C', 'camsol', 'time', 6, '60% of your week (24h) → Camsol'],
    ['C', 'suberfood', 'time', 3, '30% of your week (12h) → SuberFood'],
    ['C', 'profundra', 'time', 1.5, 'Planning/admin 4h, tracked in ProFundra'],
    ['camsol', 'profundra', 'tech', 2, 'Camsol builds ProFundra'],
    ['camsol', 'pwc', 'tech', 2, 'Camsol builds PayWithCamsol'],
    ['camsol', 'suberfood', 'tech', 2, 'Camsol builds the SuberFood platform (70%)'],
    ['pwc', 'suberfood', 'integration', 2, 'PayWithCamsol → SuberFood checkout (planned)', 1],
    ['pwc', 'C', 'money', 1.5, 'Icons integration · revenue TBD', 1],
    ['ali', 'suberfood', 'people', 2.5, 'Ali Barkat joins SuberFood operations Oct 10'],
    ['craftex', 'C', 'money', 1, 'SuberCraftex 0–50K XAF/month (inconsistent)'],
    ['kd', 'C', 'future', 1, 'KD — hire once SuberFood hits 200K/mo', 1]
  ];

  // Load custom nodes from backend
  useEffect(() => {
    loadNodes();
  }, []);

  const loadNodes = async () => {
    try {
      const res = await getAPI('constellation-nodes', auth.token);
      setNodes(res.data.data || []);
    } catch (err) {
      console.error('Error loading constellation nodes:', err);
      setNodes([]);
    }
  };

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0F172A');
    scene.fog = new THREE.Fog('#0F172A', 18, 40);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      200
    );
    camera.position.set(2, 4, 15);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 4;
    controls.maxDistance = 40;
    controls.autoRotateSpeed = 0.8;
    controlsRef.current = controls;

    // Lighting
    scene.add(new THREE.AmbientLight('#ffffff', 0.55));
    const directionalLight = new THREE.DirectionalLight('#ffffff', 1.6);
    directionalLight.position.set(5, 8, 6);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight('#93C5FD', 30, 20);
    scene.add(pointLight);

    // Grid
    const grid = new THREE.PolarGridHelper(9, 16, 6, 64, '#1E3A5F', '#172338');
    grid.position.y = -4.2;
    scene.add(grid);

    // Background stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsPositions = [];
    for (let i = 0; i < 900; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(25 + Math.random() * 30);
      starsPositions.push(v.x, v.y, v.z);
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsPositions, 3));
    scene.add(new THREE.Points(starsGeometry, new THREE.PointsMaterial({ color: '#475569', size: 0.12, fog: false })));

    // World group (for nodes and edges)
    const world = new THREE.Group();
    scene.add(world);
    worldRef.current = world;

    // Mouse interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let downPos = null;

    const onMouseMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Check node hover
      const nodeIntersects = raycaster.intersectObjects(nodesRef.current.map(n => n.mesh));
      if (nodeIntersects.length > 0) {
        renderer.domElement.style.cursor = 'pointer';
        if (!selectedRef.current) {
          setSelectedNode(nodeIntersects[0].object.userData);
        }
        setHoverEdge(null);
        return;
      }

      renderer.domElement.style.cursor = '';
      if (!selectedRef.current) {
        setSelectedNode(null);
      }

      // Check edge hover
      const edgeIntersects = raycaster.intersectObjects(
        edgesRef.current.filter(e => !e.hit.userData.off).map(e => e.hit)
      );
      if (edgeIntersects.length > 0) {
        setHoverEdge(edgeIntersects[0].object.userData);
      } else {
        setHoverEdge(null);
      }
    };

    const onMouseDown = (e) => {
      downPos = [e.clientX, e.clientY];
    };

    const onMouseUp = (e) => {
      if (!downPos || Math.hypot(e.clientX - downPos[0], e.clientY - downPos[1]) > 4) return;

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const nodeIntersects = raycaster.intersectObjects(nodesRef.current.map(n => n.mesh));

      if (nodeIntersects.length > 0) {
        selectedRef.current = nodeIntersects[0].object.userData;
        setSelectedNode(selectedRef.current);
      } else {
        selectedRef.current = null;
        setSelectedNode(null);
      }
    };

    renderer.domElement.addEventListener('pointermove', onMouseMove);
    renderer.domElement.addEventListener('pointerdown', onMouseDown);
    renderer.domElement.addEventListener('pointerup', onMouseUp);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      const dt = clockRef.current.getDelta();
      const t = clockRef.current.getElapsedTime();

      // Animate particles
      particlesRef.current.forEach(p => {
        const u = p.userData;
        u.t = (u.t + dt * u.speed) % 1;
        u.curve.getPoint(u.t, p.position);
      });

      // Animate red node halos (pulsing warning)
      nodesRef.current.forEach(o => {
        if (o.n.c === 'red') {
          const s = 1 + 0.25 * ((t * 0.7) % 1);
          o.halo.scale.setScalar(s);
          o.halo.material.opacity = 0.22 * (1 - (t * 0.7) % 1);
        }
      });

      controls.update();
      renderer.render(scene, camera);

      // Update label positions
      updateLabels();
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointermove', onMouseMove);
      renderer.domElement.removeEventListener('pointerdown', onMouseDown);
      renderer.domElement.removeEventListener('pointerup', onMouseUp);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Update labels to match 3D positions
  const updateLabels = () => {
    if (!labelsRef.current || !mountRef.current || !cameraRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const v = new THREE.Vector3();

    nodesRef.current.forEach(o => {
      v.copy(o.mesh.position);
      v.y -= o.n.r + 0.15;
      v.project(cameraRef.current);

      const vis = v.z < 1 && Math.abs(v.x) < 1.1 && Math.abs(v.y) < 1.1;
      o.el.style.display = vis ? '' : 'none';

      if (vis) {
        o.el.style.left = ((v.x + 1) / 2 * width) + 'px';
        o.el.style.top = ((1 - v.y) / 2 * height) + 'px';
        const d = cameraRef.current.position.distanceTo(o.mesh.position);
        o.el.style.opacity = Math.max(0.35, Math.min(1, 22 / d / 1.4));
      }
    });
  };

  // Set hover edge
  const setHoverEdge = (userData) => {
    if (hoverEdgeRef.current && hoverEdgeRef.current !== userData) {
      hoverEdgeRef.current.tube.material.opacity = hoverEdgeRef.current.text.includes('planned') || hoverEdgeRef.current.flow === 'future' ? 0.25 : 0.45;
    }

    hoverEdgeRef.current = userData;

    if (userData) {
      userData.tube.material.opacity = 1;
      setReadoutText(userData.text);
      setReadoutColor(userData.color);
    } else {
      setReadoutText('Drag to rotate · scroll to zoom · right-drag to pan · hover a line for its metric');
      setReadoutColor('#64748B');
    }
  };

  // Build the constellation (nodes + edges)
  useEffect(() => {
    if (!worldRef.current || !labelsRef.current) return;

    buildConstellation();
  }, [nodes, hiddenFlows]);

  const buildConstellation = () => {
    // Clear existing
    while (worldRef.current.children.length > 0) {
      worldRef.current.remove(worldRef.current.children[0]);
    }
    labelsRef.current.innerHTML = '';
    nodesRef.current = [];
    edgesRef.current = [];
    particlesRef.current = [];

    const nodeList = [...BASE_NODES, ...nodes];
    const edgeList = [...BASE_EDGES, ...nodes.map(n => [n.id, n.connectTo, n.flowType, 2, n.note || `${n.name} ↔ ${n.connectToName}`])];

    const byId = {};

    // Build nodes
    nodeList.forEach(n => {
      const col = new THREE.Color(HC[n.c]);

      // Sphere mesh
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(n.r, 48, 32),
        new THREE.MeshStandardMaterial({
          color: col,
          emissive: col,
          emissiveIntensity: n.id === 'C' ? 0.15 : 0.45,
          roughness: 0.35,
          metalness: 0.2
        })
      );
      mesh.position.set(...n.p);
      mesh.userData = n;
      worldRef.current.add(mesh);

      // Halo
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(n.r * 1.35, 32, 24),
        new THREE.MeshBasicMaterial({
          color: col,
          transparent: true,
          opacity: 0.12,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        })
      );
      halo.position.copy(mesh.position);
      worldRef.current.add(halo);

      // Commander ring
      if (n.id === 'C') {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(1.25, 0.025, 12, 96),
          new THREE.MeshBasicMaterial({ color: '#93C5FD' })
        );
        ring.rotation.x = Math.PI / 2.3;
        mesh.add(ring);
      }

      // Label
      const el = document.createElement('div');
      el.className = 'nl';
      el.innerHTML = `<b>${n.name}</b><span style="color:${n.c === 'gray' || n.c === 'white' ? '#94A3B8' : HC[n.c]}">${(n.sub || '').toUpperCase()}</span>`;
      labelsRef.current.appendChild(el);

      const o = { n, mesh, halo, el };
      nodesRef.current.push(o);
      byId[n.id] = o;
    });

    // Build edges
    edgeList.forEach(([a, b, flow, w, text, dashed], i) => {
      const A = byId[a];
      const B = byId[b];
      if (!A || !B) return;

      const pa = A.mesh.position;
      const pb = B.mesh.position;
      const mid = pa.clone().add(pb).multiplyScalar(0.5);

      const off = new THREE.Vector3()
        .subVectors(pb, pa)
        .cross(new THREE.Vector3(0, 1, 0))
        .normalize()
        .multiplyScalar(pa.distanceTo(pb) * 0.12 * (i % 2 ? 1 : -1));

      if (off.lengthSq() === 0) off.set(0, 0.6, 0);
      mid.add(off).add(new THREE.Vector3(0, 0.4, 0));

      const curve = new THREE.QuadraticBezierCurve3(pa.clone(), mid, pb.clone());
      const col = new THREE.Color(FC[flow][1]);

      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 48, 0.012 + w * 0.012, 8, false),
        new THREE.MeshBasicMaterial({
          color: col,
          transparent: true,
          opacity: dashed ? 0.25 : 0.45,
          depthWrite: false
        })
      );
      tube.userData = { text: `${FC[flow][0]} · ${text}`, color: FC[flow][1], flow };
      worldRef.current.add(tube);

      const hit = new THREE.Mesh(
        new THREE.TubeGeometry(curve, 32, 0.18, 6, false),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hit.userData = tube.userData;
      hit.userData.tube = tube;
      worldRef.current.add(hit);

      const n = dashed ? 1 : Math.max(1, Math.round(w / 1.4));
      const e = { tube, hit, flow, parts: [] };

      for (let j = 0; j < n; j++) {
        const p = new THREE.Mesh(
          new THREE.SphereGeometry(dashed ? 0.06 : 0.085, 12, 8),
          new THREE.MeshBasicMaterial({ color: col })
        );
        p.userData = { curve, t: j / n, speed: dashed ? 0.12 : 0.22 };
        worldRef.current.add(p);
        particlesRef.current.push(p);
        e.parts.push(p);
      }

      edgesRef.current.push(e);
    });

    // Apply hidden flows
    applyHidden();
  };

  const applyHidden = () => {
    edgesRef.current.forEach(e => {
      const v = !hiddenFlows.has(e.flow);
      e.tube.visible = v;
      e.hit.userData.off = !v;
      e.parts.forEach(p => p.visible = v);
    });
  };

  const toggleFlow = (flow) => {
    setHiddenFlows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(flow)) {
        newSet.delete(flow);
      } else {
        newSet.add(flow);
      }
      return newSet;
    });
  };

  const handleAddNode = async () => {
    if (!formData.name.trim()) {
      alert('Please enter a node name');
      return;
    }

    try {
      // Find target node
      const allNodes = [...BASE_NODES, ...nodes];
      const target = allNodes.find(n => n.id === formData.connectTo);
      if (!target) {
        alert('Please select a node to connect to');
        return;
      }

      // Calculate position near target
      const tp = new THREE.Vector3(...target.p);
      const out = (tp.lengthSq() < 0.01
        ? new THREE.Vector3().randomDirection()
        : tp.clone().normalize())
        .add(new THREE.Vector3().randomDirection().multiplyScalar(0.6))
        .normalize();

      const p = tp.clone().add(out.multiplyScalar(2.6));
      p.y = Math.max(-3.6, Math.min(5, p.y));

      const newNode = {
        name: formData.name,
        type: formData.type,
        sub: formData.type,
        c: formData.health,
        r: formData.type === 'Person' ? 0.3 : 0.45,
        p: [p.x, p.y, p.z],
        connectTo: formData.connectTo,
        connectToName: target.name,
        flowType: formData.flowType,
        note: formData.note.trim()
      };

      const res = await postAPI('constellation-nodes', newNode, auth.token);
      setNodes([...nodes, res.data.data]);
      setShowAddModal(false);
      setFormData({
        name: '',
        type: 'Company',
        health: 'green',
        connectTo: '',
        flowType: 'money',
        note: ''
      });
    } catch (err) {
      alert('Error adding node: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleDeleteNode = async (nodeId) => {
    if (!window.confirm('Delete this node and all its connections?')) return;

    try {
      await deleteAPI(`constellation-nodes/${nodeId}`, auth.token);
      setNodes(nodes.filter(n => n.id !== nodeId));
      if (selectedNode?.id === nodeId) {
        selectedRef.current = null;
        setSelectedNode(null);
      }
    } catch (err) {
      alert('Error deleting node: ' + (err.response?.data?.msg || err.message));
    }
  };

  const handleResetView = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(2, 4, 15);
      controlsRef.current.target.set(0, 0, 0);
    }
  };

  const allNodes = [...BASE_NODES, ...nodes];

  return (
    <div className="constellation-container">
      {/* 3D Canvas */}
      <div ref={mountRef} className="constellation-stage"></div>

      {/* Labels */}
      <div ref={labelsRef} className="constellation-labels"></div>

      {/* Controls Bar */}
      <div className="constellation-bar">
        <button className="btn-add" onClick={() => setShowAddModal(true)}>
          <Add /> Add node
        </button>
        <button className={autoRotate ? 'on' : ''} onClick={() => {
          setAutoRotate(!autoRotate);
          if (controlsRef.current) {
            controlsRef.current.autoRotate = !autoRotate;
          }
        }}>
          Auto-rotate
        </button>
        <button onClick={handleResetView}>
          <MyLocation /> Reset view
        </button>
      </div>

      {/* Readout */}
      <div className="constellation-readout" style={{ color: readoutColor }}>
        {readoutText}
      </div>

      {/* Legend */}
      <div className="constellation-legend">
        {Object.entries(FC).map(([k, [name, color]]) => (
          <button
            key={k}
            className={hiddenFlows.has(k) ? 'off' : ''}
            onClick={() => toggleFlow(k)}
          >
            <span className="sw" style={{ backgroundColor: color }}></span>
            {name}
          </button>
        ))}
      </div>

      {/* Selected Node Info */}
      {selectedNode && (
        <div className="constellation-info">
          <div className="info-header">
            <div>
              <div className="mono">{selectedNode.custom ? 'CUSTOM NODE' : 'CORE NODE'}</div>
              <h4>{selectedNode.name}</h4>
              <div className="sub-text" style={{ color: HC[selectedNode.c] === '#E2E8F0' ? '#94A3B8' : HC[selectedNode.c] }}>
                {(selectedNode.sub || '').toUpperCase()}
              </div>
            </div>
            <button onClick={() => { selectedRef.current = null; setSelectedNode(null); }}>
              <Close />
            </button>
          </div>
          <div className="info-body">
            {selectedNode.rows && selectedNode.rows.map(([k, v], i) => (
              <div key={i} className="row">
                <span>{k}</span>
                <span>{v}</span>
              </div>
            ))}
            {selectedNode.note && (
              <div className="row">
                <span>Note</span>
                <span>{selectedNode.note}</span>
              </div>
            )}
          </div>
          {selectedNode.custom && (
            <div className="info-footer">
              <button className="btn-delete" onClick={() => handleDeleteNode(selectedNode.id)}>
                Remove
              </button>
            </div>
          )}
        </div>
      )}

      {/* Add Node Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add node to the constellation</h2>
              <button onClick={() => setShowAddModal(false)}>
                <Close />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Douala Branch"
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                  <option>Company</option>
                  <option>Person</option>
                  <option>Partner</option>
                  <option>Location</option>
                  <option>Client</option>
                </select>
              </div>
              <div className="form-group">
                <label>Health</label>
                <select value={formData.health} onChange={(e) => setFormData({ ...formData, health: e.target.value })}>
                  <option value="green">Healthy</option>
                  <option value="amber">Active / warning</option>
                  <option value="red">Critical</option>
                  <option value="gray">On hold</option>
                  <option value="blue">Future</option>
                </select>
              </div>
              <div className="form-group">
                <label>Connect to</label>
                <select value={formData.connectTo} onChange={(e) => setFormData({ ...formData, connectTo: e.target.value })}>
                  <option value="">Select node...</option>
                  {allNodes.map(n => (
                    <option key={n.id} value={n.id}>{n.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Flow type</label>
                <select value={formData.flowType} onChange={(e) => setFormData({ ...formData, flowType: e.target.value })}>
                  <option value="money">Money</option>
                  <option value="time">Time</option>
                  <option value="people">People</option>
                  <option value="tech">Tech</option>
                  <option value="integration">Integration</option>
                </select>
              </div>
              <div className="form-group">
                <label>Note / metric</label>
                <input
                  type="text"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="e.g. 50K XAF/month from retainers"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddNode}>
                <Save /> Add node
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectConstellation;
