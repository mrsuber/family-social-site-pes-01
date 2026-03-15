import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './MissionControlDashboard.css';
import GeneralNode from './nodes/GeneralNode';
import PersonNode from './nodes/PersonNode';
import ProjectNode from './nodes/ProjectNode';
import CommanderNode from './nodes/CommanderNode';
import AssetNode from './nodes/AssetNode';
import PersonalCircleNode from './nodes/PersonalCircleNode';
import DepartmentNode from './nodes/DepartmentNode';
import LifeOpsCardNode from './nodes/LifeOpsCardNode';
import PersonDetailModal from './PersonDetailModal';
import AssetDetailModal from './AssetDetailModal';
import LifeOperationsCanvas from './LifeOperationsCanvas';
import { getAPI, postAPI, putAPI, deleteAPI } from '../../../utils/fetchData';
import { Search, Add, Brightness4, Brightness7, Dashboard, People, Assessment, Business, Refresh, Delete, AccountBalanceWallet } from '@material-ui/icons';
import { useReactFlow } from 'reactflow';

const STORAGE_KEY = 'missionControl_nodePositions';

const nodeTypes = {
  commander: CommanderNode,
  general: GeneralNode,
  person: PersonNode,
  project: ProjectNode,
  asset: AssetNode,
  personalCircle: PersonalCircleNode,
  department: DepartmentNode,
  lifeOpsCard: LifeOpsCardNode,
};

const MissionControlDashboard = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedView, setSelectedView] = useState('overview');
  const [stats, setStats] = useState(null);
  const [generals, setGenerals] = useState([]);
  const [people, setPeople] = useState([]);
  const [assets, setAssets] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [lifeOpsData, setLifeOpsData] = useState({
    financial: null,
    connections: null,
    dailyOps: null,
    calendar: null,
    diary: null
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [addResourceType, setAddResourceType] = useState('person');
  const [focusedGeneral, setFocusedGeneral] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showPersonDetail, setShowPersonDetail] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showAssetDetail, setShowAssetDetail] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [formData, setFormData] = useState({});
  const [parentNodeForNewResource, setParentNodeForNewResource] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handle edge click for deletion
  const onEdgeClick = useCallback((event, edge) => {
    if (window.confirm('Remove this connection?')) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
  }, [setEdges]);

  // Handle edges deletion with delete/backspace key
  const onEdgesDelete = useCallback((edgesToDelete) => {
    setEdges((eds) => eds.filter((edge) => !edgesToDelete.find((e) => e.id === edge.id)));
  }, [setEdges]);

  // Handle right-click on node
  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();

    setContextMenu({
      nodeId: node.id,
      nodeType: node.type,
      nodeLabel: node.data.label,
      x: event.clientX,
      y: event.clientY,
      isCommander: node.type === 'commander',
    });
  }, []);

  // Delete node
  const handleDeleteNode = useCallback(async () => {
    if (!contextMenu) return;

    if (window.confirm(`Delete ${contextMenu.nodeLabel}?`)) {
      try {
        // Extract the actual ID from the nodeId (format: "type-uuid")
        const actualId = contextMenu.nodeId.split('-').slice(1).join('-');

        // Call appropriate delete API based on node type
        switch (contextMenu.nodeType) {
          case 'general':
            await deleteAPI(`generals/${actualId}`);
            break;
          case 'person':
          case 'personalCircle':
            await deleteAPI(`people/${actualId}`);
            break;
          case 'project':
            await deleteAPI(`projects/${actualId}`);
            break;
          case 'asset':
            await deleteAPI(`assets/${actualId}`);
            break;
          case 'department':
            await deleteAPI(`departments/${actualId}`);
            break;
          default:
            console.warn('Unknown node type:', contextMenu.nodeType);
        }

        // Remove node from UI
        setNodes((nds) => nds.filter((n) => n.id !== contextMenu.nodeId));

        // Remove connected edges
        setEdges((eds) => eds.filter((e) =>
          e.source !== contextMenu.nodeId && e.target !== contextMenu.nodeId
        ));
      } catch (err) {
        console.error('Error deleting node:', err);
        alert('Failed to delete. Please try again.');
      }
    }

    setContextMenu(null);
  }, [contextMenu, setNodes, setEdges]);

  // Close context menu when clicking anywhere
  const handleCloseContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  // Handle create resource from context menu
  const handleCreateResourceFromNode = useCallback(() => {
    if (!contextMenu) return;

    // Store the parent node information
    setParentNodeForNewResource(contextMenu);

    // Determine default resource type based on parent node type
    let defaultResourceType = 'person';
    if (contextMenu.nodeType === 'general') {
      defaultResourceType = 'person'; // or 'department'
    } else if (contextMenu.nodeType === 'commander') {
      defaultResourceType = 'general';
    } else if (contextMenu.nodeType === 'department') {
      defaultResourceType = 'person';
    }

    setAddResourceType(defaultResourceType);
    setShowAddModal(true);
    setContextMenu(null);
  }, [contextMenu]);

  // Helper function to close modal and clean up
  const handleCloseAddModal = useCallback(() => {
    setShowAddModal(false);
    setParentNodeForNewResource(null);
  }, []);

  // Handle add resource form submission
  const handleAddResource = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formDataObj = new FormData(form);
    const data = Object.fromEntries(formDataObj.entries());

    try {
      let endpoint = '';
      let payload = {};

      // Auto-assign parent generalId/departmentId if creating from context menu
      let autoGeneralId = null;
      let autoDepartmentId = null;

      if (parentNodeForNewResource) {
        if (parentNodeForNewResource.nodeType === 'general') {
          // Extract UUID from nodeId (format: "general-uuid")
          autoGeneralId = parentNodeForNewResource.nodeId.split('-').slice(1).join('-');
        } else if (parentNodeForNewResource.nodeType === 'department') {
          // Extract UUID from nodeId (format: "department-uuid")
          autoDepartmentId = parentNodeForNewResource.nodeId.split('-').slice(1).join('-');
          // Department resources also need to inherit the department's generalId
          // We'll get this from the departments data
          const deptData = departments.find(d => d.id === autoDepartmentId);
          if (deptData) {
            autoGeneralId = deptData.generalId;
          }
        } else if (parentNodeForNewResource.nodeType === 'commander') {
          // Creating from commander - no auto assignment needed for generals
          autoGeneralId = null;
        }
      }

      switch (addResourceType) {
        case 'person':
        case 'evaluation':
          endpoint = 'people';
          payload = {
            fullName: data.fullName,
            title: data.title,
            email: data.email || null,
            phone: data.phone || null,
            photoUrl: data.photoUrl || null,
            relationshipType: data.relationshipType,
            // Priority: auto-assigned values override form values
            generalId: autoGeneralId !== null ? autoGeneralId : (data.generalId || null),
            departmentId: autoDepartmentId !== null ? autoDepartmentId : (data.departmentId || null),
            status: 'active',
            notes: data.notes || null
          };

          // Debug logging
          console.log('Creating person with payload:', payload);
          console.log('Parent context:', parentNodeForNewResource);
          console.log('Auto assignments - GeneralId:', autoGeneralId, 'DepartmentId:', autoDepartmentId);
          break;

        case 'department':
          endpoint = 'departments';
          payload = {
            name: data.name,
            description: data.description || null,
            generalId: autoGeneralId !== null ? autoGeneralId : (data.generalId || null),
            budget: data.budget ? parseFloat(data.budget) : null,
            status: data.status || 'active'
          };
          console.log('Creating department with generalId:', payload.generalId);
          break;

        case 'general':
          endpoint = 'generals';
          payload = {
            name: data.name,
            description: data.description || null,
            orderNumber: data.orderNumber ? parseInt(data.orderNumber) : 1,
            status: data.status || 'operational',
            objectives: []
          };
          break;

        case 'project':
          endpoint = 'projects';
          payload = {
            name: data.name,
            description: data.description || null,
            generalId: autoGeneralId !== null ? autoGeneralId : (data.generalId || null),
            status: data.status || 'active'
          };
          console.log('Creating project with generalId:', payload.generalId);
          break;

        case 'asset':
          endpoint = 'assets';
          payload = {
            name: data.name,
            assetType: 'equipment',
            generalId: autoGeneralId !== null ? autoGeneralId : (data.generalId || null),
            purchaseCost: data.value ? parseFloat(data.value) : null,
            status: data.status === 'acquired' ? 'working' : 'planning',
            condition: 100
          };
          console.log('Creating asset with generalId:', payload.generalId);
          break;

        default:
          return;
      }

      await postAPI(endpoint, payload);

      // Refresh the data
      const [generalsRes, peopleRes, assetsRes, departmentsRes] = await Promise.all([
        getAPI('generals'),
        getAPI('people?limit=1000'),
        getAPI('assets'),
        getAPI('departments')
      ]);

      setGenerals(generalsRes.data.data);
      setPeople(peopleRes.data.data);
      setAssets(assetsRes.data.data);
      setDepartments(departmentsRes.data.data);

      // Rebuild the graph with new data
      if (stats) {
        await buildNodeGraph(
          stats,
          generalsRes.data.data,
          peopleRes.data.data,
          assetsRes.data.data,
          departmentsRes.data.data,
          lifeOpsData
        );
      }

      // Close modal and reset form
      handleCloseAddModal();
      setFormData({});
      form.reset();
    } catch (err) {
      console.error('Error adding resource:', err);
      alert('Failed to add resource. Please try again.');
    }
  };

  // Handle node click - focus on general or show person details
  const onNodeClick = useCallback((event, node) => {
    if (node.type === 'general') {
      setFocusedGeneral(node.id);
      // Highlight this general and its connected nodes
      setNodes(nds =>
        nds.map(n => ({
          ...n,
          data: {
            ...n.data,
            focused: n.id === node.id || edges.some(
              e => (e.source === node.id && e.target === n.id) ||
                   (e.target === node.id && e.source === n.id)
            )
          }
        }))
      );
    } else if (node.type === 'person' || node.type === 'personalCircle' || node.type === 'commander') {
      // Show comprehensive person detail modal
      setSelectedPerson(node.data);
      setShowPersonDetail(true);
    } else if (node.type === 'asset') {
      // Show asset detail modal
      setSelectedAsset(node.data);
      setShowAssetDetail(true);
    } else if (node.type === 'lifeOpsCard') {
      // For Life Ops cards, open commander modal with specific tab
      const commander = people.find(p => p.relationshipType === 'high_commander');
      if (commander) {
        const tabMap = {
          'financial': 'financial',
          'network': 'connections',
          'daily': 'operations',
          'calendar': 'calendar',
          'diary': 'diary'
        };
        setSelectedPerson({
          label: commander.fullName,
          title: commander.title,
          photo: commander.photoUrl,
          relationshipType: commander.relationshipType,
          fullData: commander,
          initialTab: tabMap[node.data.cardType] // Pass the tab to open
        });
        setShowPersonDetail(true);
      }
    }
  }, [edges, setNodes, people]);

  // Clear focus when clicking canvas
  const onPaneClick = useCallback(() => {
    setFocusedGeneral(null);
    setContextMenu(null);
    setNodes(nds =>
      nds.map(n => ({
        ...n,
        data: {
          ...n.data,
          focused: false
        }
      }))
    );
  }, [setNodes]);

  // Save node positions to both localStorage and database
  const saveNodePositions = useCallback(async (nodes) => {
    const positions = {};
    nodes.forEach(node => {
      positions[node.id] = node.position;
    });

    // Save to localStorage for immediate access
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));

    // Save to database for persistence
    try {
      await postAPI('mission-control/positions', { positions });
    } catch (err) {
      console.error('Error saving positions to database:', err);
    }
  }, []);

  // Load saved positions from database (with localStorage fallback)
  const loadSavedPositions = useCallback(async () => {
    try {
      // Try to load from database first
      const res = await getAPI('mission-control/positions');
      if (res.data.success && res.data.data && Object.keys(res.data.data).length > 0) {
        // Also save to localStorage for offline access
        localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data.data));
        return res.data.data;
      }
    } catch (err) {
      console.error('Error loading positions from database:', err);
    }

    // Fallback to localStorage if database fails or is empty
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  }, []);

  // Reset layout to default
  const resetLayout = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY);
    // Also clear database positions
    try {
      await deleteAPI('mission-control/positions');
    } catch (err) {
      console.error('Error clearing positions from database:', err);
    }
    window.location.reload();
  }, []);

  // Handle node drag end - save positions
  const onNodeDragStop = useCallback((event, node) => {
    saveNodePositions(nodes);
  }, [nodes, saveNodePositions]);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, generalsRes, peopleRes, assetsRes, departmentsRes] = await Promise.all([
          getAPI('analytics/dashboard'),
          getAPI('generals'),
          getAPI('people?limit=1000'),
          getAPI('assets'),
          getAPI('departments')
        ]);

        console.log('People data:', peopleRes.data.data);
        console.log('Assets data:', assetsRes.data.data);
        console.log('Departments data:', departmentsRes.data.data);

        setStats(statsRes.data.data);
        setGenerals(generalsRes.data.data);
        setPeople(peopleRes.data.data);
        setAssets(assetsRes.data.data);
        setDepartments(departmentsRes.data.data);

        // Fetch Life Operations data for commander
        const commander = peopleRes.data.data.find(p => p.relationshipType === 'high_commander');
        if (commander) {
          try {
            const [financialRes, connectionsRes, dailyLogsRes, calendarRes, diaryRes] = await Promise.all([
              getAPI(`life-ops/financial-dashboard/${commander.id}`).catch(() => ({ data: null })),
              getAPI(`connections/${commander.id}`).catch(() => ({ data: { data: [] } })),
              getAPI(`life-ops/daily-logs/${commander.id}`).catch(() => ({ data: { data: [] } })),
              getAPI(`calendar/person/${commander.id}`).catch(() => ({ data: { data: [] } })),
              getAPI(`diary/person/${commander.id}`).catch(() => ({ data: { data: [] } }))
            ]);

            setLifeOpsData({
              financial: financialRes.data?.data || financialRes.data,
              connections: connectionsRes.data?.data || [],
              dailyOps: dailyLogsRes.data?.data || [],
              calendar: calendarRes.data?.data || [],
              diary: diaryRes.data?.data || []
            });
          } catch (lifeOpsErr) {
            console.error('Error fetching life ops data:', lifeOpsErr);
          }
        }

        // Build node graph
        await buildNodeGraph(
          statsRes.data.data,
          generalsRes.data.data,
          peopleRes.data.data,
          assetsRes.data.data,
          departmentsRes.data.data,
          lifeOpsData
        );
      } catch (err) {
        console.error('Error fetching mission control data:', err);
      }
    };

    fetchData();
  }, []);

  const buildNodeGraph = async (statsData, generalsData, peopleData, assetsData, departmentsData = [], lifeOpsData = {}) => {
    const newNodes = [];
    const newEdges = [];
    const savedPositions = await loadSavedPositions();

    // Commander node (center top)
    const commander = peopleData.find(p => p.relationshipType === 'high_commander');
    if (commander) {
      const commanderId = 'commander-1';
      newNodes.push({
        id: commanderId,
        type: 'commander',
        position: savedPositions?.[commanderId] || { x: 600, y: 50 },
        data: {
          label: commander.fullName || 'High Commander',
          title: commander.title || 'Mission Commander',
          photo: commander.photoUrl,
          relationshipType: commander.relationshipType,
          fullData: commander,
          stats: {
            generals: generalsData.length,
            people: statsData.people.total,
            projects: statsData.projects.activeProjects
          }
        },
      });

      // Add Life Operations Cards around commander
      const lifeOpsCards = [
        {
          id: 'life-ops-financial',
          type: 'lifeOpsCard',
          position: savedPositions?.['life-ops-financial'] || { x: 300, y: 100 },
          data: {
            cardType: 'financial',
            label: '💰 Financial Command',
            icon: '💰',
            stats: {
              totalIncome: lifeOpsData.financial?.totalIncome || 0,
              totalExpenses: lifeOpsData.financial?.totalExpenses || 0,
              runway: lifeOpsData.financial?.runway || 0,
              savingsRate: lifeOpsData.financial?.savingsRate || 0
            }
          }
        },
        {
          id: 'life-ops-network',
          type: 'lifeOpsCard',
          position: savedPositions?.['life-ops-network'] || { x: 900, y: 100 },
          data: {
            cardType: 'network',
            label: '🤝 Network',
            icon: '🤝',
            stats: {
              total: lifeOpsData.connections?.length || 0,
              active: lifeOpsData.connections?.filter(c => c.status === 'active').length || 0,
              upcoming: lifeOpsData.connections?.filter(c => c.nextOutreachDate && new Date(c.nextOutreachDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length || 0
            }
          }
        },
        {
          id: 'life-ops-daily',
          type: 'lifeOpsCard',
          position: savedPositions?.['life-ops-daily'] || { x: 300, y: 250 },
          data: {
            cardType: 'daily',
            label: '✅ Daily Ops',
            icon: '✅',
            stats: {
              totalLogs: lifeOpsData.dailyOps?.length || 0,
              recentLogs: lifeOpsData.dailyOps?.filter(log => {
                const logDate = new Date(log.date);
                const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                return logDate >= weekAgo;
              }).length || 0
            }
          }
        },
        {
          id: 'life-ops-calendar',
          type: 'lifeOpsCard',
          position: savedPositions?.['life-ops-calendar'] || { x: 900, y: 250 },
          data: {
            cardType: 'calendar',
            label: '📅 Calendar',
            icon: '📅',
            stats: {
              totalEvents: lifeOpsData.calendar?.length || 0,
              upcoming: lifeOpsData.calendar?.filter(e => new Date(e.date) >= new Date()).length || 0,
              today: lifeOpsData.calendar?.filter(e => {
                const eventDate = new Date(e.date);
                const today = new Date();
                return eventDate.toDateString() === today.toDateString();
              }).length || 0
            }
          }
        },
        {
          id: 'life-ops-diary',
          type: 'lifeOpsCard',
          position: savedPositions?.['life-ops-diary'] || { x: 600, y: 300 },
          data: {
            cardType: 'diary',
            label: '📖 Diary',
            icon: '📖',
            stats: {
              totalEntries: lifeOpsData.diary?.length || 0,
              thisWeek: lifeOpsData.diary?.filter(e => {
                const entryDate = new Date(e.date);
                const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                return entryDate >= weekAgo;
              }).length || 0,
              lastEntry: lifeOpsData.diary?.[0]?.date || 'N/A'
            }
          }
        }
      ];

      // Add life ops card nodes
      lifeOpsCards.forEach(card => {
        newNodes.push(card);

        // Connect to commander
        newEdges.push({
          id: `commander-${card.id}`,
          source: commanderId,
          target: card.id,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#a855f7', strokeWidth: 2, strokeDasharray: '5,5' }
        });
      });
    }

    // Personal Circle People (not assigned to any general yet)
    const personalCirclePeople = peopleData.filter(p =>
      !p.generalId &&
      p.relationshipType !== 'high_commander' &&
      (p.assignmentStatus === 'personal_circle' || p.assignmentStatus === 'evaluating' || !p.assignmentStatus)
    );

    personalCirclePeople.forEach((person, index) => {
      const nodeId = `personal-${person.id}`;
      const angle = (index / personalCirclePeople.length) * Math.PI; // Spread in arc above commander
      const radius = 200;
      const xPos = 600 + radius * Math.cos(angle);
      const yPos = 50 - radius * Math.sin(angle) + 50;

      newNodes.push({
        id: nodeId,
        type: 'personalCircle',
        position: savedPositions?.[nodeId] || { x: xPos, y: yPos },
        data: {
          label: person.fullName,
          title: person.title,
          photo: person.photoUrl,
          relationshipType: person.relationshipType,
          fullData: person
        },
      });

      // Connect to commander
      if (commander) {
        newEdges.push({
          id: `commander-personal-${person.id}`,
          source: 'commander-1',
          target: nodeId,
          type: 'smoothstep',
          animated: false,
          style: { stroke: '#ec4899', strokeDasharray: '5,5' }
        });
      }
    });

    // General nodes (spread below commander)
    generalsData.forEach((general, index) => {
      const xPos = 200 + (index * 350);
      const nodeId = `general-${general.id}`;

      newNodes.push({
        id: nodeId,
        type: 'general',
        position: savedPositions?.[nodeId] || { x: xPos, y: 250 },
        data: {
          label: general.name,
          description: general.description,
          status: general.status,
          orderNumber: general.orderNumber,
          objectives: general.objectives
        },
      });

      // Connect commander to generals
      if (commander) {
        newEdges.push({
          id: `commander-${nodeId}`,
          source: 'commander-1',
          target: nodeId,
          type: 'smoothstep',
          animated: general.status === 'operational',
          style: { stroke: general.status === 'operational' ? '#10b981' : '#6b7280' }
        });
      }
    });

    // Add department nodes under their generals
    // Group departments by general
    const departmentsByGeneral = {};
    departmentsData.forEach(dept => {
      if (dept.generalId) {
        if (!departmentsByGeneral[dept.generalId]) {
          departmentsByGeneral[dept.generalId] = [];
        }
        departmentsByGeneral[dept.generalId].push(dept);
      }
    });

    // Add department nodes for each general
    generalsData.forEach((general, generalIndex) => {
      const generalDepartments = departmentsByGeneral[general.id] || [];
      const xBase = 200 + (generalIndex * 350);

      generalDepartments.forEach((dept, deptIndex) => {
        const nodeId = `department-${dept.id}`;
        const col = deptIndex % 2;
        const row = Math.floor(deptIndex / 2);

        newNodes.push({
          id: nodeId,
          type: 'department',
          position: savedPositions?.[nodeId] || {
            x: xBase - 50 + (col * 150),
            y: 380 + (row * 120)
          },
          data: {
            label: dept.name,
            description: dept.description,
            status: dept.status,
            peopleCount: dept.peopleCount || 0,
            objectives: dept.objectives || [],
            fullData: dept
          },
        });

        // Connect to general
        newEdges.push({
          id: `general-${general.id}-dept-${dept.id}`,
          source: `general-${general.id}`,
          target: nodeId,
          type: 'smoothstep',
          style: { stroke: '#3b82f6' }
        });
      });
    });

    // Add people nodes under their generals/departments
    // Group people by general first
    const peopleByGeneral = {};
    const peopleByDepartment = {};
    peopleData.forEach(person => {
      if (person.generalId && person.relationshipType !== 'high_commander') {
        if (!peopleByGeneral[person.generalId]) {
          peopleByGeneral[person.generalId] = [];
        }
        peopleByGeneral[person.generalId].push(person);

        // Also group by department if they have one
        if (person.departmentId) {
          if (!peopleByDepartment[person.departmentId]) {
            peopleByDepartment[person.departmentId] = [];
          }
          peopleByDepartment[person.departmentId].push(person);
        }
      }
    });

    // Add people nodes for each general
    generalsData.forEach((general, generalIndex) => {
      const generalPeople = peopleByGeneral[general.id] || [];
      const xBase = 150 + (generalIndex * 350);

      generalPeople.forEach((person, personIndex) => {
        const nodeId = `person-${person.id}`;
        const col = personIndex % 3;
        const row = Math.floor(personIndex / 3);

        newNodes.push({
          id: nodeId,
          type: 'person',
          position: savedPositions?.[nodeId] || {
            x: xBase + (col * 100),
            y: 450 + (row * 130)
          },
          data: {
            label: person.fullName,
            title: person.title,
            photo: person.photoUrl,
            relationshipType: person.relationshipType,
            performanceRating: person.performanceRating,
            fullData: person
          },
        });

        // Connect to department if assigned, otherwise to general
        if (person.departmentId) {
          newEdges.push({
            id: `dept-${person.departmentId}-person-${person.id}`,
            source: `department-${person.departmentId}`,
            target: nodeId,
            type: 'smoothstep',
            style: { stroke: '#3b82f6' }
          });
        } else {
          newEdges.push({
            id: `general-${general.id}-person-${person.id}`,
            source: `general-${general.id}`,
            target: nodeId,
            type: 'smoothstep',
            style: { stroke: '#6b7280' }
          });
        }
      });
    });

    // Add asset nodes under their generals
    // Group assets by general
    const assetsByGeneral = {};
    assetsData.forEach(asset => {
      if (asset.generalId) {
        if (!assetsByGeneral[asset.generalId]) {
          assetsByGeneral[asset.generalId] = [];
        }
        assetsByGeneral[asset.generalId].push(asset);
      }
    });

    // Add asset nodes for each general
    generalsData.forEach((general, generalIndex) => {
      const generalAssets = assetsByGeneral[general.id] || [];
      const generalPeople = peopleByGeneral[general.id] || [];
      const xBase = 150 + (generalIndex * 350);

      // Calculate starting Y position for assets (below people)
      const peopleRows = Math.ceil(generalPeople.length / 3);
      const assetsStartY = 450 + (peopleRows * 130) + 50;

      generalAssets.slice(0, 3).forEach((asset, assetIndex) => {
        const nodeId = `asset-${asset.id}`;

        newNodes.push({
          id: nodeId,
          type: 'asset',
          position: savedPositions?.[nodeId] || {
            x: xBase + (assetIndex % 2) * 120,
            y: assetsStartY + Math.floor(assetIndex / 2) * 120
          },
          data: {
            label: asset.name,
            value: asset.purchaseCost,
            assetType: asset.assetType,
            condition: asset.condition,
            notes: asset.notes,
            fullData: asset
          },
        });

        // Connect to general
        newEdges.push({
          id: `general-${general.id}-asset-${asset.id}`,
          source: `general-${general.id}`,
          target: nodeId,
          type: 'smoothstep',
          style: { stroke: '#f59e0b', strokeDasharray: asset.notes && asset.notes.includes('TARGET') ? '5,5' : '0' }
        });
      });
    });

    setNodes(newNodes);
    setEdges(newEdges);
  };

  // Filter nodes and edges based on selected view
  const getFilteredNodesAndEdges = () => {
    switch (selectedView) {
      case 'people':
        // Show only commander and people nodes
        const peopleNodes = nodes.filter(n => n.type === 'commander' || n.type === 'person');
        const peopleNodeIds = peopleNodes.map(n => n.id);
        const peopleEdges = edges.filter(e => peopleNodeIds.includes(e.source) && peopleNodeIds.includes(e.target));
        return { filteredNodes: peopleNodes, filteredEdges: peopleEdges };

      case 'projects':
        // Show only commander, generals, and project nodes
        const projectNodes = nodes.filter(n => n.type === 'commander' || n.type === 'general' || n.type === 'project');
        const projectNodeIds = projectNodes.map(n => n.id);
        const projectEdges = edges.filter(e => projectNodeIds.includes(e.source) && projectNodeIds.includes(e.target));
        return { filteredNodes: projectNodes, filteredEdges: projectEdges };

      case 'analytics':
        // Show only commander and generals for analytics view
        const analyticsNodes = nodes.filter(n => n.type === 'commander' || n.type === 'general');
        const analyticsNodeIds = analyticsNodes.map(n => n.id);
        const analyticsEdges = edges.filter(e => analyticsNodeIds.includes(e.source) && analyticsNodeIds.includes(e.target));
        return { filteredNodes: analyticsNodes, filteredEdges: analyticsEdges };

      case 'overview':
      default:
        // Show all nodes
        return { filteredNodes: nodes, filteredEdges: edges };
    }
  };

  const { filteredNodes, filteredEdges } = getFilteredNodesAndEdges();

  return (
    <div className={`mission-control ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Top Bar */}
      <div className="mc-topbar">
        <div className="mc-topbar-left">
          <h1 className="mc-title">Mission Control</h1>
          <div className="mc-search">
            <Search />
            <input type="text" placeholder="Search resources..." />
          </div>
        </div>
        <div className="mc-topbar-right">
          <button className="mc-icon-btn" onClick={resetLayout} title="Reset Layout">
            <Refresh />
          </button>
          <button className="mc-icon-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </button>
          <button className="mc-add-btn" onClick={() => setShowAddModal(true)}>
            <Add /> Add Resource
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="mc-main-layout">
        {/* Sidebar */}
        <div className="mc-sidebar">
          <div className="mc-sidebar-section">
            <h3>Views</h3>
            <button
              className={`mc-sidebar-item ${selectedView === 'overview' ? 'active' : ''}`}
              onClick={() => setSelectedView('overview')}
            >
              <Dashboard /> Overview
            </button>
            <button
              className={`mc-sidebar-item ${selectedView === 'people' ? 'active' : ''}`}
              onClick={() => setSelectedView('people')}
            >
              <People /> People
            </button>
            <button
              className={`mc-sidebar-item ${selectedView === 'projects' ? 'active' : ''}`}
              onClick={() => setSelectedView('projects')}
            >
              <Business /> Projects
            </button>
            <button
              className={`mc-sidebar-item ${selectedView === 'analytics' ? 'active' : ''}`}
              onClick={() => setSelectedView('analytics')}
            >
              <Assessment /> Analytics
            </button>
            <button
              className={`mc-sidebar-item ${selectedView === 'lifeops' ? 'active' : ''}`}
              onClick={() => setSelectedView('lifeops')}
            >
              <AccountBalanceWallet /> Life Operations
            </button>
          </div>

          <div className="mc-sidebar-section">
            <h3>Generals</h3>
            {generals.map((general) => (
              <div key={general.id} className="mc-general-item">
                <div className={`mc-status-dot ${general.status}`}></div>
                <span>{general.name}</span>
              </div>
            ))}
          </div>

          {stats && (
            <div className="mc-sidebar-section mc-stats">
              <h3>Quick Stats</h3>
              <div className="mc-stat">
                <span>Total People</span>
                <strong>{stats.people.total}</strong>
              </div>
              <div className="mc-stat">
                <span>Active Projects</span>
                <strong>{stats.projects.activeProjects}</strong>
              </div>
              <div className="mc-stat">
                <span>Total Assets</span>
                <strong>{stats.resources.totalAssets}</strong>
              </div>
              <div className="mc-stat">
                <span>Active Loans</span>
                <strong className={stats.resources.activeLoans > 0 ? 'warning' : ''}>
                  {stats.resources.activeLoans}
                </strong>
              </div>
            </div>
          )}
        </div>

        {/* Canvas Area */}
        <div className="mc-canvas-container">
          {selectedView === 'lifeops' ? (
            <LifeOperationsCanvas />
          ) : (
            <ReactFlow
              nodes={filteredNodes}
              edges={filteredEdges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeDragStop={onNodeDragStop}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              onEdgeClick={onEdgeClick}
              onEdgesDelete={onEdgesDelete}
              onNodeContextMenu={onNodeContextMenu}
              nodeTypes={nodeTypes}
              edgesUpdatable={true}
              edgesFocusable={true}
              deleteKeyCode="Delete"
              minZoom={0.1}
              maxZoom={2}
              defaultZoom={0.5}
              fitView
              className="mc-canvas"
            >
              <Background color={darkMode ? '#1f2937' : '#f3f4f6'} gap={16} />
              <Controls className="mc-controls" />
              <MiniMap
                className="mc-minimap"
                nodeColor={(node) => {
                  switch (node.type) {
                    case 'commander': return '#8b5cf6';
                    case 'general': return '#3b82f6';
                    case 'person': return '#10b981';
                    case 'project': return '#f59e0b';
                    default: return '#6b7280';
                  }
                }}
              />
              <Panel position="top-right" className="mc-panel">
                <div className="mc-panel-content">
                  <h4>Empire Overview</h4>
                  <p>Visualizing the strategic empire structure</p>
                </div>
              </Panel>
            </ReactFlow>
          )}
        </div>
      </div>

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="mc-modal-overlay" onClick={handleCloseAddModal}>
          <div className="mc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mc-modal-header">
              <h2>Add New Resource</h2>
              <button className="mc-modal-close" onClick={handleCloseAddModal}>×</button>
            </div>
            {parentNodeForNewResource && (
              <div style={{
                padding: '10px 20px',
                background: '#1e3a8a',
                color: '#fff',
                fontSize: '14px',
                borderBottom: '1px solid #374151'
              }}>
                📌 Will be connected to: <strong>{parentNodeForNewResource.nodeLabel}</strong> ({parentNodeForNewResource.nodeType})
              </div>
            )}
            <div className="mc-modal-body">
              <div className="mc-modal-tabs">
                <button
                  className={`mc-modal-tab ${addResourceType === 'person' ? 'active' : ''}`}
                  onClick={() => setAddResourceType('person')}
                >
                  Person
                </button>
                <button
                  className={`mc-modal-tab ${addResourceType === 'evaluation' ? 'active' : ''}`}
                  onClick={() => setAddResourceType('evaluation')}
                >
                  Under Evaluation
                </button>
                <button
                  className={`mc-modal-tab ${addResourceType === 'department' ? 'active' : ''}`}
                  onClick={() => setAddResourceType('department')}
                >
                  Department
                </button>
                <button
                  className={`mc-modal-tab ${addResourceType === 'general' ? 'active' : ''}`}
                  onClick={() => setAddResourceType('general')}
                >
                  General
                </button>
                <button
                  className={`mc-modal-tab ${addResourceType === 'project' ? 'active' : ''}`}
                  onClick={() => setAddResourceType('project')}
                >
                  Project
                </button>
                <button
                  className={`mc-modal-tab ${addResourceType === 'asset' ? 'active' : ''}`}
                  onClick={() => setAddResourceType('asset')}
                >
                  Asset
                </button>
              </div>

              <form className="mc-modal-form" onSubmit={handleAddResource}>
                {addResourceType === 'person' && (
                  <>
                    <input type="text" name="fullName" placeholder="Full Name" required />
                    <input type="text" name="title" placeholder="Title" required />
                    {/* Only show general dropdown if NOT creating from context menu */}
                    {!parentNodeForNewResource && (
                      <select name="generalId">
                        <option value="">Select General</option>
                        {generals.map(g => (
                          <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                      </select>
                    )}
                    <input type="text" name="photoUrl" placeholder="Photo URL" />
                    <select name="relationshipType" required>
                      <option value="employee">Employee</option>
                      <option value="business_contact">Business Contact</option>
                      <option value="current_candidate">Current Candidate</option>
                    </select>
                  </>
                )}

                {addResourceType === 'evaluation' && (
                  <>
                    <input type="text" name="fullName" placeholder="Full Name" required />
                    <input type="text" name="title" placeholder="Title" required />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="text" name="phone" placeholder="Phone" />
                    <input type="text" name="photoUrl" placeholder="Photo URL" />
                    <select name="relationshipType" required>
                      <option value="girlfriend_candidate">Girlfriend Candidate</option>
                      <option value="current_candidate">Under Evaluation</option>
                      <option value="business_contact">Business Contact (Evaluating)</option>
                    </select>
                    <textarea name="notes" placeholder="Notes about this person..." rows={3}></textarea>
                  </>
                )}

                {addResourceType === 'department' && (
                  <>
                    <input type="text" name="name" placeholder="Department Name" required />
                    <textarea name="description" placeholder="Description" rows={3}></textarea>
                    {!parentNodeForNewResource && (
                      <select name="generalId">
                        <option value="">Assign to General</option>
                        {generals.map(g => (
                          <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                      </select>
                    )}
                    <input type="number" name="budget" placeholder="Budget (optional)" />
                    <select name="status">
                      <option value="active">Active</option>
                      <option value="planning">Planning</option>
                      <option value="restructuring">Restructuring</option>
                    </select>
                  </>
                )}

                {addResourceType === 'general' && (
                  <>
                    <input type="text" name="name" placeholder="General Name" required />
                    <textarea name="description" placeholder="Description"></textarea>
                    <input type="number" name="orderNumber" placeholder="Order Number" />
                    <select name="status">
                      <option value="operational">Operational</option>
                      <option value="planning">Planning</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </>
                )}

                {addResourceType === 'project' && (
                  <>
                    <input type="text" name="name" placeholder="Project Name" required />
                    <textarea name="description" placeholder="Description"></textarea>
                    {!parentNodeForNewResource && (
                      <select name="generalId">
                        <option value="">Select General</option>
                        {generals.map(g => (
                          <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                      </select>
                    )}
                    <select name="status">
                      <option value="active">Active</option>
                      <option value="planning">Planning</option>
                      <option value="completed">Completed</option>
                    </select>
                  </>
                )}

                {addResourceType === 'asset' && (
                  <>
                    <input type="text" name="name" placeholder="Asset Name" required />
                    <textarea name="description" placeholder="Description"></textarea>
                    <input type="number" name="value" placeholder="Value ($)" />
                    <select name="status">
                      <option value="acquired">Acquired</option>
                      <option value="target">Target to Acquire</option>
                    </select>
                    {!parentNodeForNewResource && (
                      <select name="generalId">
                        <option value="">Assign to General (optional)</option>
                        {generals.map(g => (
                          <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                      </select>
                    )}
                  </>
                )}

                <div className="mc-modal-actions">
                  <button type="button" className="mc-btn-secondary" onClick={handleCloseAddModal}>
                    Cancel
                  </button>
                  <button type="submit" className="mc-btn-primary">
                    Add Resource
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Person Detail Modal */}
      {showPersonDetail && selectedPerson && (
        <PersonDetailModal
          person={selectedPerson}
          onClose={() => setShowPersonDetail(false)}
          onUpdate={async (updatedData) => {
            try {
              // Get the person ID from fullData
              const personId = selectedPerson.fullData?.id;
              if (!personId) {
                alert('Error: Person ID not found');
                return;
              }

              // Make API call to update person (using PUT method)
              const res = await putAPI(`people/${personId}`, updatedData);

              if (res.data.success) {
                alert('Person updated successfully!');

                // Refresh the data and rebuild the graph
                const [generalsRes, peopleRes, assetsRes, departmentsRes] = await Promise.all([
                  getAPI('generals'),
                  getAPI('people?limit=1000'),
                  getAPI('assets'),
                  getAPI('departments')
                ]);

                setGenerals(generalsRes.data.data);
                setPeople(peopleRes.data.data);
                setAssets(assetsRes.data.data);
                setDepartments(departmentsRes.data.data);

                // Rebuild the graph with updated data
                if (stats) {
                  await buildNodeGraph(
                    stats,
                    generalsRes.data.data,
                    peopleRes.data.data,
                    assetsRes.data.data,
                    departmentsRes.data.data,
                    lifeOpsData
                  );
                }
              } else {
                alert('Failed to update person: ' + (res.data.msg || 'Unknown error'));
              }
            } catch (err) {
              console.error('Error updating person:', err);
              alert('Error updating person: ' + (err.response?.data?.msg || err.message));
            }
          }}
        />
      )}

      {/* Asset Detail Modal */}
      {showAssetDetail && selectedAsset && (
        <AssetDetailModal
          asset={selectedAsset}
          onClose={() => setShowAssetDetail(false)}
          onUpdate={async (updatedData) => {
            try {
              // Get the asset ID from fullData
              const assetId = selectedAsset.fullData?.id || selectedAsset.id;
              if (!assetId) {
                alert('Error: Asset ID not found');
                return;
              }

              // Make API call to update asset (using PUT method)
              const res = await putAPI(`assets/${assetId}`, updatedData);

              if (res.data.success) {
                alert('Asset updated successfully!');

                // Refresh the data and rebuild the graph
                const [generalsRes, peopleRes, assetsRes, departmentsRes] = await Promise.all([
                  getAPI('generals'),
                  getAPI('people?limit=1000'),
                  getAPI('assets'),
                  getAPI('departments')
                ]);

                setGenerals(generalsRes.data.data);
                setPeople(peopleRes.data.data);
                setAssets(assetsRes.data.data);
                setDepartments(departmentsRes.data.data);

                // Rebuild the graph with updated data
                if (stats) {
                  await buildNodeGraph(
                    stats,
                    generalsRes.data.data,
                    peopleRes.data.data,
                    assetsRes.data.data,
                    departmentsRes.data.data,
                    lifeOpsData
                  );
                }
              } else {
                alert('Failed to update asset: ' + (res.data.msg || 'Unknown error'));
              }
            } catch (err) {
              console.error('Error updating asset:', err);
              alert('Error updating asset: ' + (err.response?.data?.msg || err.message));
            }
          }}
        />
      )}

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="mc-context-menu"
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            zIndex: 10000,
          }}
          onClick={handleCloseContextMenu}
        >
          <div className="mc-context-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="mc-context-menu-header">{contextMenu.nodeLabel}</div>
            <button className="mc-context-menu-item" onClick={handleCreateResourceFromNode}>
              <Add style={{ fontSize: 18, marginRight: 8 }} />
              Create Resource
            </button>
            {!contextMenu.isCommander && (
              <button className="mc-context-menu-item danger" onClick={handleDeleteNode}>
                <Delete style={{ fontSize: 18, marginRight: 8 }} />
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionControlDashboard;
