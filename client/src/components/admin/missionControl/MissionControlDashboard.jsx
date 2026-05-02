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
import InvestorNode from './nodes/InvestorNode';
import ProjectNode from './nodes/ProjectNode';
import CommanderNode from './nodes/CommanderNode';
import AssetNode from './nodes/AssetNode';
import PersonalCircleNode from './nodes/PersonalCircleNode';
import DepartmentNode from './nodes/DepartmentNode';
import LifeOpsCardNode from './nodes/LifeOpsCardNode';
import RevenueNode from './nodes/RevenueNode';
import ExpenseNode from './nodes/ExpenseNode';
import LandmarkNode from './nodes/LandmarkNode';
import RestaurantResourceNode from './nodes/RestaurantResourceNode';
import MenuNode from './nodes/MenuNode';
import InventoryNode from './nodes/InventoryNode';
import OrdersPOSNode from './nodes/OrdersPOSNode';
import SuppliersNode from './nodes/SuppliersNode';
import StaffScheduleNode from './nodes/StaffScheduleNode';
import PersonDetailModal from './PersonDetailModal';
import AssetDetailModal from './AssetDetailModal';
import DepartmentDetailModal from './DepartmentDetailModal';
import ProjectDetailModal from './ProjectDetailModal';
import GeneralDetailModal from './GeneralDetailModal';
import LandmarkDetailModal from './LandmarkDetailModal';
import RestaurantDetailModal from './RestaurantDetailModal';
import LifeOperationsCanvas from './LifeOperationsCanvas';
import { getAPI, postAPI, putAPI, deleteAPI } from '../../../utils/fetchData';
import { Search, Add, Brightness4, Brightness7, Dashboard, People, Assessment, Business, Refresh, Delete, AccountBalanceWallet } from '@material-ui/icons';
import { useReactFlow } from 'reactflow';
import { useSelector } from 'react-redux';

const STORAGE_KEY = 'missionControl_nodePositions';

const nodeTypes = {
  commander: CommanderNode,
  general: GeneralNode,
  person: PersonNode,
  investor: InvestorNode,
  project: ProjectNode,
  asset: AssetNode,
  personalCircle: PersonalCircleNode,
  department: DepartmentNode,
  lifeOpsCard: LifeOpsCardNode,
  revenue: RevenueNode,
  expense: ExpenseNode,
  landmark: LandmarkNode,
  restaurantResource: RestaurantResourceNode,
  menuNode: MenuNode,
  inventoryNode: InventoryNode,
  ordersNode: OrdersPOSNode,
  suppliersNode: SuppliersNode,
  staffNode: StaffScheduleNode,
};

const MissionControlDashboard = () => {
  const { auth } = useSelector(state => state);
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
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showDepartmentDetail, setShowDepartmentDetail] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectDetail, setShowProjectDetail] = useState(false);
  const [selectedGeneral, setSelectedGeneral] = useState(null);
  const [showGeneralDetail, setShowGeneralDetail] = useState(false);
  const [selectedLandmark, setSelectedLandmark] = useState(null);
  const [showLandmarkDetail, setShowLandmarkDetail] = useState(false);
  const [landmarks, setLandmarks] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);
  const [selectedRestaurantNode, setSelectedRestaurantNode] = useState(null);
  const [showRestaurantDetail, setShowRestaurantDetail] = useState(false);
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

        // Try to call appropriate delete API based on node type
        // If it's a virtual node (404), just remove from UI
        try {
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
            case 'menuNode':
            case 'inventoryNode':
            case 'ordersNode':
            case 'suppliersNode':
            case 'staffNode':
              // For restaurant nodes, we need to get the restaurant ID from node data
              const node = nodes.find(n => n.id === contextMenu.nodeId);
              if (node && node.data.restaurantId) {
                // Ask user if they want to delete the entire restaurant
                const confirmDelete = window.confirm(
                  `This will delete the entire restaurant and all its data (menu, inventory, orders, etc.). Continue?`
                );
                if (confirmDelete) {
                  await deleteAPI(`restaurants/${node.data.restaurantId}`);
                  // Remove all related restaurant nodes from UI
                  setNodes((nds) => nds.filter((n) =>
                    !(n.data.restaurantId === node.data.restaurantId)
                  ));
                  // Remove all related edges
                  const restaurantNodeIds = nodes
                    .filter(n => n.data.restaurantId === node.data.restaurantId)
                    .map(n => n.id);
                  setEdges((eds) => eds.filter((e) =>
                    !restaurantNodeIds.includes(e.source) && !restaurantNodeIds.includes(e.target)
                  ));
                  alert('Restaurant and all related data deleted successfully');
                  setContextMenu(null);
                  return;
                } else {
                  setContextMenu(null);
                  return;
                }
              }
              break;
            default:
              console.warn('Unknown node type:', contextMenu.nodeType);
          }
        } catch (apiErr) {
          // If 404, it's a virtual node or already deleted - just remove from UI
          // For other errors, re-throw
          if (apiErr.response?.status !== 404) {
            throw apiErr;
          }
          console.log('Virtual node or already deleted, removing from UI:', contextMenu.nodeLabel);
        }

        // Remove node from UI
        setNodes((nds) => nds.filter((n) => n.id !== contextMenu.nodeId));

        // Remove connected edges
        setEdges((eds) => eds.filter((e) =>
          e.source !== contextMenu.nodeId && e.target !== contextMenu.nodeId
        ));

        alert(`${contextMenu.nodeLabel} deleted successfully`);
      } catch (err) {
        console.error('Error deleting node:', err);
        const errorMsg = err.response?.data?.msg || err.message || 'Failed to delete. Please try again.';
        alert(errorMsg);
      }
    }

    setContextMenu(null);
  }, [contextMenu, setNodes, setEdges, nodes]);

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

  // Handle view project details from context menu
  const handleViewProjectDetails = useCallback(() => {
    if (!contextMenu || contextMenu.nodeType !== 'project') return;

    // Find the project node and get its full data
    const projectNode = nodes.find(n => n.id === contextMenu.nodeId);
    if (projectNode && projectNode.data.fullData) {
      setSelectedProject(projectNode.data.fullData);
      setShowProjectDetail(true);
    }

    setContextMenu(null);
  }, [contextMenu, nodes]);

  // Handle view department details from context menu
  const handleViewDepartmentDetails = useCallback(() => {
    if (!contextMenu || contextMenu.nodeType !== 'department') return;

    // Find the department node and get its full data
    const departmentNode = nodes.find(n => n.id === contextMenu.nodeId);
    if (departmentNode && departmentNode.data.fullData) {
      setSelectedDepartment(departmentNode.data.fullData);
      setShowDepartmentDetail(true);
    }

    setContextMenu(null);
  }, [contextMenu, nodes]);

  // Handle view general details from context menu
  const handleViewGeneralDetails = useCallback(() => {
    if (!contextMenu || contextMenu.nodeType !== 'general') return;

    // Find the general in the generals array
    const general = generals.find(g => `general-${g.id}` === contextMenu.nodeId);
    if (general) {
      setSelectedGeneral(general);
      setShowGeneralDetail(true);
    }

    setContextMenu(null);
  }, [contextMenu, generals]);

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
          // Get the commander's generalId from people data
          const commanderId = parentNodeForNewResource.nodeId.split('-').slice(1).join('-');
          const commanderData = people.find(p => p.id === commanderId);
          if (commanderData) {
            autoGeneralId = commanderData.generalId;
          }
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
          // Priority: auto-assigned generalId > user-selected generalId from form
          const projectGeneralId = autoGeneralId !== null ? autoGeneralId : (data.generalId || null);

          // Projects MUST have a generalId
          if (!projectGeneralId) {
            if (generals.length === 0) {
              alert('Cannot create project: No generals exist. Please create a General first.');
            } else {
              alert('Error: Projects must be assigned to a General. Please select a General from the dropdown.');
            }
            return;
          }

          payload = {
            name: data.name,
            description: data.description || null,
            generalId: projectGeneralId,
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

        case 'investor':
          endpoint = 'people';
          payload = {
            fullName: data.fullName,
            title: data.title || null,
            email: data.email || null,
            phone: data.phone || null,
            photoUrl: data.photoUrl || null,
            relationshipType: 'investor',
            generalId: autoGeneralId !== null ? autoGeneralId : (data.generalId || null),
            departmentId: autoDepartmentId !== null ? autoDepartmentId : null,
            status: 'active',
            investmentAmount: data.investmentAmount ? parseFloat(data.investmentAmount) : null,
            investmentCurrency: data.investmentCurrency || 'XAF',
            investmentDate: data.investmentDate || null,
            equityPercentage: data.equityPercentage ? parseFloat(data.equityPercentage) : null,
            notes: data.notes || null
          };
          console.log('Creating investor with payload:', payload);
          break;

        case 'restaurant':
          endpoint = 'restaurants';

          // Parse operating hours if provided
          let operatingHours = {};
          if (data.operatingHours && data.operatingHours.trim()) {
            try {
              operatingHours = JSON.parse(data.operatingHours);
            } catch (e) {
              alert('Invalid operating hours JSON format. Using empty object.');
            }
          }

          payload = {
            name: data.name,
            location: data.location || null,
            address: data.address || null,
            phone: data.phone || null,
            email: data.email || null,
            capacity: data.capacity ? parseInt(data.capacity) : null,
            status: data.status || 'planning',
            departmentId: autoDepartmentId !== null ? autoDepartmentId : (data.departmentId || null),
            operatingHours: operatingHours
          };

          console.log('Creating restaurant with payload:', payload);
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

      // Extract the general's UUID from the node ID (format: "general-uuid")
      const generalId = node.id.split('general-')[1];

      // Highlight this general and all nodes that belong to it
      setNodes(nds =>
        nds.map(n => {
          // Check if this node should be highlighted
          let shouldHighlight = false;

          if (n.id === node.id) {
            // This is the general itself
            shouldHighlight = true;
          } else if (n.data?.fullData?.generalId === generalId) {
            // This node belongs to this general (departments, people, assets, etc.)
            shouldHighlight = true;
          }

          return {
            ...n,
            data: {
              ...n.data,
              focused: shouldHighlight
            }
          };
        })
      );
    } else if (node.type === 'person' || node.type === 'investor' || node.type === 'personalCircle' || node.type === 'commander') {
      // Show comprehensive person detail modal
      setSelectedPerson(node.data);
      setShowPersonDetail(true);
    } else if (node.type === 'asset') {
      // Show asset detail modal
      setSelectedAsset(node.data);
      setShowAssetDetail(true);
    } else if (node.type === 'department') {
      // Show department detail modal
      setSelectedDepartment(node.data.fullData);
      setShowDepartmentDetail(true);
    } else if (node.type === 'landmark') {
      // Show landmark detail modal
      setSelectedLandmark(node.data.fullData);
      setShowLandmarkDetail(true);
    } else if (node.type === 'project') {
      // Highlight project and its connected nodes (same as general)
      setFocusedGeneral(node.id);
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
    } else if (node.type === 'menuNode' || node.type === 'inventoryNode' || node.type === 'ordersNode' || node.type === 'suppliersNode' || node.type === 'staffNode') {
      // Show restaurant detail modal
      setSelectedRestaurantNode(node);
      setShowRestaurantDetail(true);
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
        console.log('Fetching mission control dashboard data...');
        const startTime = Date.now();

        // Fetch all data in one optimized API call
        const dashboardRes = await getAPI('mission-control/dashboard', auth.token);
        const { stats, generals, people, departments, assets, incomeStreams, expenses, landmarks, restaurants } = dashboardRes.data.data;

        const endTime = Date.now();
        console.log(`Dashboard data loaded in ${endTime - startTime}ms`);
        console.log('People data:', people);
        console.log('Assets data:', assets);
        console.log('Departments data:', departments);
        console.log('Landmarks data:', landmarks);

        setStats(stats);
        setGenerals(generals);
        setPeople(people);
        setAssets(assets);
        setDepartments(departments);
        setLandmarks(landmarks || []);
        setRestaurantData(restaurants || []);

        // Fetch Life Operations data for commander
        const commander = people.find(p => p.relationshipType === 'high_commander');
        if (commander) {
          try {
            const [financialRes, connectionsRes, dailyLogsRes, calendarRes, diaryRes] = await Promise.all([
              getAPI(`life-ops/financial-dashboard/${commander.id}`, auth.token).catch(() => ({ data: null })),
              getAPI(`connections/${commander.id}`, auth.token).catch(() => ({ data: { data: [] } })),
              getAPI(`life-ops/daily-logs/${commander.id}`, auth.token).catch(() => ({ data: { data: [] } })),
              getAPI(`calendar/person/${commander.id}`, auth.token).catch(() => ({ data: { data: [] } })),
              getAPI(`diary/person/${commander.id}`, auth.token).catch(() => ({ data: { data: [] } }))
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
          stats,
          generals,
          people,
          assets,
          departments,
          lifeOpsData,
          incomeStreams || [],
          expenses || [],
          landmarks || [],
          restaurants || []
        );
      } catch (err) {
        console.error('Error fetching mission control data:', err);
      }
    };

    fetchData();
  }, []);

  const buildNodeGraph = async (statsData, generalsData, peopleData, assetsData, departmentsData = [], lifeOpsData = {}, incomeStreamsData = [], expensesData = [], landmarksData = [], restaurantsData = []) => {
    const newNodes = [];
    const newEdges = [];
    const savedPositions = await loadSavedPositions();

    console.log('Building node graph with landmarks:', landmarksData);

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
              totalIncome: statsData.financial?.monthlyRevenue || 0,
              totalExpenses: statsData.financial?.monthlyExpenses || 0,
              runway: (statsData.financial?.monthlyRevenue || 0) - (statsData.financial?.monthlyExpenses || 0) <= 0
                ? 0
                : Math.floor((lifeOpsData.financial?.currentSavings || 0) / ((statsData.financial?.monthlyExpenses || 1))),
              savingsRate: ((statsData.financial?.monthlyRevenue || 0) - (statsData.financial?.monthlyExpenses || 0)) / (statsData.financial?.monthlyRevenue || 1) * 100
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

    // Add landmark nodes attached to generals
    generalsData.forEach((general, generalIndex) => {
      const generalLandmarks = landmarksData.filter(lm => lm.generalId === general.id);
      const xBase = 200 + (generalIndex * 350);
      const generalNodeId = `general-${general.id}`;

      generalLandmarks.forEach((landmark, landmarkIndex) => {
        const landmarkId = `landmark-${landmark.id}`;
        const yPosition = 400 + (landmarkIndex * 180); // Space landmarks vertically

        newNodes.push({
          id: landmarkId,
          type: 'landmark',
          position: savedPositions?.[landmarkId] || { x: xBase, y: yPosition },
          data: {
            label: landmark.title,
            description: landmark.description,
            status: landmark.status,
            priority: landmark.priority,
            progress: landmark.progress,
            amount: landmark.amount,
            currency: landmark.currency,
            paymentStatus: landmark.paymentStatus,
            amountPaid: landmark.amountPaid,
            startDate: landmark.startDate,
            endDate: landmark.endDate,
            category: landmark.category,
            reminderDays: landmark.reminderDays,
            fullData: landmark,
            onClick: () => {
              setSelectedLandmark(landmark);
              setShowLandmarkDetail(true);
            }
          },
        });

        // Connect general to landmark
        newEdges.push({
          id: `${generalNodeId}-${landmarkId}`,
          source: generalNodeId,
          target: landmarkId,
          type: 'smoothstep',
          animated: landmark.status === 'processing',
          style: {
            stroke: landmark.status === 'done' ? '#10b981' :
                   landmark.status === 'processing' ? '#3b82f6' : '#6b7280'
          }
        });
      });
    });

    // Add landmark nodes attached to High Commander
    if (commander) {
      const commanderLandmarks = landmarksData.filter(lm => lm.personId === commander.id);
      const commanderNodeId = 'commander-1';

      commanderLandmarks.forEach((landmark, landmarkIndex) => {
        const landmarkId = `landmark-${landmark.id}`;
        const yPosition = 400 + (landmarkIndex * 180); // Space landmarks vertically below commander
        const xPosition = 600; // Same x as commander

        newNodes.push({
          id: landmarkId,
          type: 'landmark',
          position: savedPositions?.[landmarkId] || { x: xPosition, y: yPosition },
          data: {
            label: landmark.title,
            description: landmark.description,
            status: landmark.status,
            priority: landmark.priority,
            progress: landmark.progress,
            amount: landmark.amount,
            currency: landmark.currency,
            paymentStatus: landmark.paymentStatus,
            amountPaid: landmark.amountPaid,
            startDate: landmark.startDate,
            endDate: landmark.endDate,
            category: landmark.category,
            reminderDays: landmark.reminderDays,
            fullData: landmark,
            onClick: () => {
              setSelectedLandmark(landmark);
              setShowLandmarkDetail(true);
            }
          },
        });

        // Connect commander to landmark
        newEdges.push({
          id: `${commanderNodeId}-${landmarkId}`,
          source: commanderNodeId,
          target: landmarkId,
          type: 'smoothstep',
          animated: landmark.status === 'processing',
          style: {
            stroke: landmark.status === 'done' ? '#10b981' :
                   landmark.status === 'processing' ? '#3b82f6' : '#6b7280'
          }
        });
      });
    }

    // Add department nodes under their generals with hierarchical support
    // Group departments by general, separating parents and children
    const departmentsByGeneral = {};
    const parentDepartments = [];
    const childDepartments = [];

    departmentsData.forEach(dept => {
      if (dept.generalId) {
        if (!departmentsByGeneral[dept.generalId]) {
          departmentsByGeneral[dept.generalId] = { parents: [], children: [] };
        }

        // Separate parent and child departments
        if (dept.parentDepartmentId === null) {
          departmentsByGeneral[dept.generalId].parents.push(dept);
          parentDepartments.push(dept);
        } else {
          departmentsByGeneral[dept.generalId].children.push(dept);
          childDepartments.push(dept);
        }
      }
    });

    // Add department nodes for each general
    generalsData.forEach((general, generalIndex) => {
      const generalDepts = departmentsByGeneral[general.id] || { parents: [], children: [] };
      const xBase = 200 + (generalIndex * 350);

      // First, render parent departments
      generalDepts.parents.forEach((dept, deptIndex) => {
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
            fullData: dept,
            isParent: true
          },
        });

        // Connect parent department to general
        newEdges.push({
          id: `general-${general.id}-dept-${dept.id}`,
          source: `general-${general.id}`,
          target: nodeId,
          type: 'smoothstep',
          style: { stroke: '#3b82f6', strokeWidth: 2 }
        });
      });
    });

    // Now render child departments under their parents
    childDepartments.forEach((dept, globalChildIndex) => {
      const nodeId = `department-${dept.id}`;
      const parentNodeId = `department-${dept.parentDepartmentId}`;

      // Find the parent department to position children relative to it
      const parentDept = parentDepartments.find(p => p.id === dept.parentDepartmentId);
      const parentPosition = savedPositions?.[parentNodeId];

      // Get all siblings (other children of the same parent)
      const siblings = childDepartments.filter(d => d.parentDepartmentId === dept.parentDepartmentId);
      const siblingIndex = siblings.findIndex(s => s.id === dept.id);

      // Position children in a grid under parent
      const col = siblingIndex % 3;
      const row = Math.floor(siblingIndex / 3);

      newNodes.push({
        id: nodeId,
        type: 'department',
        position: savedPositions?.[nodeId] || {
          x: (parentPosition?.x || 200) - 100 + (col * 100),
          y: (parentPosition?.y || 500) + 130 + (row * 100)
        },
        data: {
          label: dept.name,
          description: dept.description,
          status: dept.status,
          peopleCount: dept.peopleCount || 0,
          objectives: dept.objectives || [],
          fullData: dept,
          isChild: true,
          parentDepartmentId: dept.parentDepartmentId
        },
      });

      // Connect child department to parent department
      newEdges.push({
        id: `parent-dept-${dept.parentDepartmentId}-child-${dept.id}`,
        source: parentNodeId,
        target: nodeId,
        type: 'smoothstep',
        style: { stroke: '#8b5cf6', strokeWidth: 1 }
      });
    });

    // Add people nodes under their departments
    // Group people by department and track those without departments
    const peopleByDepartment = {};
    const peopleWithoutDepartment = [];

    peopleData.forEach(person => {
      if (person.generalId && person.relationshipType !== 'high_commander') {
        if (person.departmentId) {
          // Group by department
          if (!peopleByDepartment[person.departmentId]) {
            peopleByDepartment[person.departmentId] = [];
          }
          peopleByDepartment[person.departmentId].push(person);
        } else {
          // Track people without departments (like general commanders)
          peopleWithoutDepartment.push(person);
        }
      }
    });

    // Add people under their departments
    [...parentDepartments, ...childDepartments].forEach(dept => {
      const deptPeople = peopleByDepartment[dept.id] || [];
      const deptNodeId = `department-${dept.id}`;
      const deptPosition = savedPositions?.[deptNodeId];

      deptPeople.forEach((person, personIndex) => {
        const nodeId = `person-${person.id}`;
        const col = personIndex % 2; // 2 columns for people under departments
        const row = Math.floor(personIndex / 2);

        newNodes.push({
          id: nodeId,
          type: person.relationshipType === 'investor' ? 'investor' : 'person',
          position: savedPositions?.[nodeId] || {
            x: (deptPosition?.x || 200) - 40 + (col * 80),
            y: (deptPosition?.y || 600) + 100 + (row * 90)
          },
          data: {
            label: person.fullName,
            title: person.title,
            photo: person.photoUrl,
            relationshipType: person.relationshipType,
            performanceRating: person.performanceRating,
            investmentAmount: person.investmentAmount,
            currency: person.investmentCurrency || 'XAF',
            investmentDate: person.investmentDate,
            equityPercentage: person.equityPercentage,
            fullData: person
          },
        });

        // Connect person to their department
        newEdges.push({
          id: `dept-${person.departmentId}-person-${person.id}`,
          source: deptNodeId,
          target: nodeId,
          type: 'smoothstep',
          style: { stroke: '#10b981' }
        });
      });
    });

    // Add people without departments (like general commanders) under their general
    generalsData.forEach((general, generalIndex) => {
      const generalPeopleNoDept = peopleWithoutDepartment.filter(p => p.generalId === general.id);
      const xBase = 200 + (generalIndex * 350);

      generalPeopleNoDept.forEach((person, personIndex) => {
        const nodeId = `person-${person.id}`;

        newNodes.push({
          id: nodeId,
          type: person.relationshipType === 'investor' ? 'investor' : 'person',
          position: savedPositions?.[nodeId] || {
            x: xBase + (personIndex * 100),
            y: 330
          },
          data: {
            label: person.fullName,
            title: person.title,
            photo: person.photoUrl,
            relationshipType: person.relationshipType,
            performanceRating: person.performanceRating,
            investmentAmount: person.investmentAmount,
            currency: person.investmentCurrency || 'XAF',
            investmentDate: person.investmentDate,
            equityPercentage: person.equityPercentage,
            fullData: person
          },
        });

        // Connect person to general
        newEdges.push({
          id: `general-${general.id}-person-${person.id}`,
          source: `general-${general.id}`,
          target: nodeId,
          type: 'smoothstep',
          style: { stroke: '#6b7280' }
        });
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
      const xBase = 150 + (generalIndex * 350);

      // Position assets at a fixed Y position (they're under generals, not departments)
      const assetsStartY = 750;

      generalAssets.forEach((asset, assetIndex) => {
        const nodeId = `asset-${asset.id}`;

        newNodes.push({
          id: nodeId,
          type: 'asset',
          position: savedPositions?.[nodeId] || {
            x: xBase + (assetIndex % 3) * 120,
            y: assetsStartY + Math.floor(assetIndex / 3) * 100
          },
          data: {
            label: asset.name,
            value: asset.purchaseCost,
            currency: asset.currency || 'XAF',
            assetType: asset.assetType,
            condition: asset.condition,
            acquisitionStatus: asset.acquisitionStatus || 'target',
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
          style: { stroke: '#f59e0b', strokeDasharray: asset.acquisitionStatus === 'target' ? '5,5' : '0' }
        });
      });
    });

    // Add restaurant operational nodes under their departments
    restaurantsData.forEach((restaurantItem, restaurantIndex) => {
      const { restaurant, menuItems, inventoryItems, suppliers, orders } = restaurantItem;
      const deptNodeId = `department-${restaurant.departmentId}`;
      const deptPosition = savedPositions?.[deptNodeId];

      if (!deptPosition) return; // Skip if department position not found

      // Calculate aggregate restaurant stats
      const activeOrders = orders?.filter(o => ['received', 'preparing', 'ready'].includes(o.orderStatus)).length || 0;
      const todaySales = orders?.reduce((sum, o) => {
        if (new Date(o.orderedAt).toDateString() === new Date().toDateString()) {
          return sum + parseFloat(o.total);
        }
        return sum;
      }, 0) || 0;

      const preparingCount = orders?.filter(o => o.orderStatus === 'preparing').length || 0;
      const readyCount = orders?.filter(o => o.orderStatus === 'ready').length || 0;
      const completedToday = orders?.filter(o => {
        return o.orderStatus === 'completed' &&
               new Date(o.orderedAt).toDateString() === new Date().toDateString();
      }).length || 0;

      const lowStockCount = inventoryItems?.filter(i => i.status === 'low_stock').length || 0;
      const inStockCount = inventoryItems?.filter(i => i.status === 'in_stock').length || 0;
      const outOfStockCount = inventoryItems?.filter(i => i.status === 'out_of_stock').length || 0;

      const activeSuppliers = suppliers?.filter(s => s.status === 'active').length || 0;
      const averageRating = suppliers?.length > 0
        ? suppliers.reduce((sum, s) => sum + parseFloat(s.rating || 0), 0) / suppliers.length
        : 0;

      const availableMenuItems = menuItems?.filter(m => m.isAvailable).length || 0;
      const popularCount = menuItems?.filter(m => m.isPopular).length || 0;
      const categories = [...new Set(menuItems?.map(m => m.category))].length || 0;

      // Base position for this restaurant's nodes
      const baseX = (deptPosition.x || 200) + (restaurantIndex * 300);
      const baseY = (deptPosition.y || 500) + 150;

      // 0. Restaurant Resource Node (Main restaurant card)
      const restaurantNodeId = `restaurant-${restaurant.id}`;
      newNodes.push({
        id: restaurantNodeId,
        type: 'restaurantResource',
        position: savedPositions?.[restaurantNodeId] || {
          x: baseX,
          y: baseY - 100
        },
        data: {
          label: restaurant.name,
          resourceType: 'restaurant',
          restaurantId: restaurant.id,
          location: restaurant.location,
          status: restaurant.status,
          capacity: restaurant.capacity,
          count: menuItems?.length || 0
        },
      });

      newEdges.push({
        id: `dept-${restaurant.departmentId}-restaurant-${restaurant.id}`,
        source: deptNodeId,
        target: restaurantNodeId,
        type: 'smoothstep',
        style: { stroke: '#f59e0b', strokeWidth: 2 }
      });

      // 1. Menu Node
      const menuNodeId = `menu-${restaurant.id}`;
      newNodes.push({
        id: menuNodeId,
        type: 'menuNode',
        position: savedPositions?.[menuNodeId] || {
          x: baseX - 320,
          y: baseY
        },
        data: {
          label: 'Menu Management',
          restaurantNodeType: 'menu',
          restaurantId: restaurant.id,
          totalItems: menuItems?.length || 0,
          categories: categories,
          popularCount: popularCount,
          availableItems: availableMenuItems
        },
      });

      newEdges.push({
        id: `restaurant-${restaurant.id}-menu-${restaurant.id}`,
        source: restaurantNodeId,
        target: menuNodeId,
        type: 'smoothstep',
        style: { stroke: '#10b981', strokeWidth: 2 }
      });

      // 2. Inventory Node
      const invNodeId = `inventory-${restaurant.id}`;
      newNodes.push({
        id: invNodeId,
        type: 'inventoryNode',
        position: savedPositions?.[invNodeId] || {
          x: baseX - 80,
          y: baseY
        },
        data: {
          label: 'Inventory',
          restaurantNodeType: 'inventory',
          restaurantId: restaurant.id,
          totalItems: inventoryItems?.length || 0,
          lowStockCount: lowStockCount,
          inStockCount: inStockCount,
          outOfStockCount: outOfStockCount,
          lastRestockDate: inventoryItems?.[0]?.lastRestocked
        },
      });

      newEdges.push({
        id: `restaurant-${restaurant.id}-inventory-${restaurant.id}`,
        source: restaurantNodeId,
        target: invNodeId,
        type: 'smoothstep',
        style: { stroke: '#3b82f6', strokeWidth: 2 }
      });

      // 3. Orders/POS Node
      const ordersNodeId = `orders-${restaurant.id}`;
      newNodes.push({
        id: ordersNodeId,
        type: 'ordersNode',
        position: savedPositions?.[ordersNodeId] || {
          x: baseX + 160,
          y: baseY
        },
        data: {
          label: 'Orders & POS',
          restaurantNodeType: 'orders',
          restaurantId: restaurant.id,
          activeOrders: activeOrders,
          todaySales: todaySales,
          currency: restaurant.currency || 'XAF',
          preparingCount: preparingCount,
          readyCount: readyCount,
          completedToday: completedToday,
          performanceStatus: activeOrders > 10 ? 'high' : activeOrders > 5 ? 'medium' : 'low'
        },
      });

      newEdges.push({
        id: `restaurant-${restaurant.id}-orders-${restaurant.id}`,
        source: restaurantNodeId,
        target: ordersNodeId,
        type: 'smoothstep',
        style: { stroke: '#f59e0b', strokeWidth: 2 }
      });

      // 4. Suppliers Node
      const suppNodeId = `suppliers-${restaurant.id}`;
      newNodes.push({
        id: suppNodeId,
        type: 'suppliersNode',
        position: savedPositions?.[suppNodeId] || {
          x: baseX - 200,
          y: baseY + 250
        },
        data: {
          label: 'Suppliers',
          restaurantNodeType: 'suppliers',
          restaurantId: restaurant.id,
          totalSuppliers: suppliers?.length || 0,
          activeSuppliers: activeSuppliers,
          inactiveSuppliers: (suppliers?.length || 0) - activeSuppliers,
          averageRating: averageRating,
          nextDeliveryDate: suppliers?.[0]?.nextDeliveryDate,
          totalContacts: suppliers?.filter(s => s.phone || s.email).length || 0
        },
      });

      newEdges.push({
        id: `menu-${restaurant.id}-suppliers`,
        source: menuNodeId,
        target: suppNodeId,
        type: 'smoothstep',
        style: { stroke: '#8b5cf6', strokeWidth: 1 }
      });

      // 5. Staff Schedule Node
      const staffNodeId = `staff-${restaurant.id}`;
      newNodes.push({
        id: staffNodeId,
        type: 'staffNode',
        position: savedPositions?.[staffNodeId] || {
          x: baseX + 60,
          y: baseY + 250
        },
        data: {
          label: 'Staff Schedule',
          restaurantNodeType: 'staff',
          restaurantId: restaurant.id,
          totalStaff: 0, // TODO: Fetch from staff shifts API
          onDutyToday: 0,
          shiftsToday: 0,
          morningShifts: 0,
          afternoonShifts: 0,
          eveningShifts: 0,
          roles: [],
          checkedIn: 0,
          absent: 0
        },
      });

      newEdges.push({
        id: `orders-${restaurant.id}-staff`,
        source: ordersNodeId,
        target: staffNodeId,
        type: 'smoothstep',
        style: { stroke: '#ec4899', strokeWidth: 1 }
      });
    });

    // Add Revenue/Income Streams
    incomeStreamsData.forEach((income, index) => {
      const nodeId = `income-${income.id}`;
      const yPosition = 200 + (index * 180); // Stack vertically on the left

      newNodes.push({
        id: nodeId,
        type: 'revenue',
        position: savedPositions?.[nodeId] || {
          x: -400, // Left side of canvas
          y: yPosition
        },
        data: {
          label: income.name,
          amount: income.amount,
          currency: income.currency || 'XAF',
          incomeType: income.incomeType,
          frequency: income.frequency,
          status: income.status,
          clientName: income.clientName,
          fullData: income
        }
      });

      // Connect to High Commander with green animated edge if active
      if (income.status === 'active') {
        newEdges.push({
          id: `income-${income.id}-commander`,
          source: nodeId,
          target: 'commander-1',
          type: 'smoothstep',
          animated: true,
          style: {
            stroke: '#10b981',
            strokeWidth: 2.5,
            filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))'
          }
        });
      }

      // Also connect to the assigned general if specified
      if (income.generalId) {
        newEdges.push({
          id: `income-${income.id}-general-${income.generalId}`,
          source: nodeId,
          target: `general-${income.generalId}`,
          type: 'smoothstep',
          animated: income.status === 'active',
          style: {
            stroke: income.status === 'active' ? '#10b981' : '#9ca3af',
            strokeWidth: income.status === 'active' ? 2 : 1
          }
        });
      }
    });

    // Add Expenses
    expensesData.forEach((expense, index) => {
      const nodeId = `expense-${expense.id}`;
      const yPosition = 200 + (index * 160); // Stack vertically on the right

      newNodes.push({
        id: nodeId,
        type: 'expense',
        position: savedPositions?.[nodeId] || {
          x: 1800, // Right side of canvas
          y: yPosition
        },
        data: {
          label: expense.name,
          amount: expense.amount,
          monthlyEquivalent: expense.monthlyEquivalent,
          currency: expense.currency || 'XAF',
          category: expense.category,
          frequency: expense.frequency,
          status: expense.status,
          provider: expense.provider,
          isEssential: expense.isEssential,
          fullData: expense
        }
      });

      // Connect to High Commander with red edge
      newEdges.push({
        id: `expense-${expense.id}-commander`,
        source: 'commander-1',
        target: nodeId,
        type: 'smoothstep',
        style: {
          stroke: expense.isEssential ? '#dc2626' : '#f59e0b',
          strokeWidth: expense.isEssential ? 2 : 1.5,
          strokeDasharray: expense.status === 'active' ? '0' : '5,5'
        }
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
                <button
                  className={`mc-modal-tab ${addResourceType === 'investor' ? 'active' : ''}`}
                  onClick={() => setAddResourceType('investor')}
                >
                  Investor
                </button>
                <button
                  className={`mc-modal-tab ${addResourceType === 'restaurant' ? 'active' : ''}`}
                  onClick={() => setAddResourceType('restaurant')}
                >
                  Restaurant
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
                    {/* Show general dropdown if:
                        1. No parent node, OR
                        2. Parent node has no generalId (like High Commander) */}
                    {(!parentNodeForNewResource ||
                      (parentNodeForNewResource && !parentNodeForNewResource.generalId)) && (
                      <select name="generalId" required>
                        <option value="">Select General (Required)</option>
                        {generals.length === 0 && (
                          <option value="" disabled>No generals available - create a general first</option>
                        )}
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
                    <textarea name="notes" placeholder="Description/Notes"></textarea>
                    <select name="assetType" required>
                      <option value="">Select Asset Type</option>
                      <option value="technology">Technology</option>
                      <option value="equipment">Equipment</option>
                      <option value="vehicle">Vehicle</option>
                      <option value="property">Property</option>
                      <option value="financial">Financial</option>
                      <option value="other">Other</option>
                    </select>
                    <select name="acquisitionStatus" required>
                      <option value="target">TARGET - To Acquire</option>
                      <option value="acquired">ACQUIRED - Already Owned</option>
                    </select>
                    <input type="number" name="purchaseCost" placeholder="Purchase Cost ($)" />
                    <input type="number" name="condition" placeholder="Condition (0-100)" min="0" max="100" defaultValue="100" />
                    <select name="status">
                      <option value="working">Working</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="broken">Broken</option>
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

                {addResourceType === 'investor' && (
                  <>
                    <input type="text" name="fullName" placeholder="Investor Full Name" required />
                    <input type="text" name="title" placeholder="Title/Company" />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="text" name="phone" placeholder="Phone" />
                    <input type="text" name="photoUrl" placeholder="Photo URL" />
                    <input
                      type="number"
                      name="investmentAmount"
                      placeholder="Investment Amount"
                      required
                      step="0.01"
                      min="0"
                    />
                    <select name="investmentCurrency">
                      <option value="XAF">XAF (Central African CFA)</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                    <label style={{ color: '#94a3b8', fontSize: '14px', marginTop: '10px' }}>
                      Investment Date
                    </label>
                    <input
                      type="date"
                      name="investmentDate"
                      required
                    />
                    <input
                      type="number"
                      name="equityPercentage"
                      placeholder="Equity Percentage (0-100)"
                      step="0.01"
                      min="0"
                      max="100"
                    />
                    {!parentNodeForNewResource && (
                      <select name="generalId">
                        <option value="">Assign to General (optional)</option>
                        {generals.map(g => (
                          <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                      </select>
                    )}
                    <textarea name="notes" placeholder="Notes about this investor..." rows={3}></textarea>
                  </>
                )}

                {addResourceType === 'restaurant' && (
                  <>
                    <input type="text" name="name" placeholder="Restaurant Name" required />
                    <input type="text" name="location" placeholder="Location (e.g., Downtown Yaoundé)" required />
                    <textarea name="address" placeholder="Full Address" rows={2}></textarea>
                    <input type="tel" name="phone" placeholder="Phone Number" />
                    <input type="email" name="email" placeholder="Email Address" />
                    <input
                      type="number"
                      name="capacity"
                      placeholder="Seating Capacity"
                      min="1"
                    />
                    <select name="status" required>
                      <option value="planning">Planning</option>
                      <option value="active">Active</option>
                      <option value="closed">Closed</option>
                    </select>
                    {!parentNodeForNewResource && (
                      <select name="departmentId" required>
                        <option value="">Select Department</option>
                        {departments.map(d => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    )}
                    <label style={{ color: '#94a3b8', fontSize: '14px', marginTop: '10px' }}>
                      Operating Hours (JSON format, optional)
                    </label>
                    <textarea
                      name="operatingHours"
                      placeholder='{"monday":"11:00-22:00","tuesday":"11:00-22:00"}'
                      rows={3}
                    ></textarea>
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

      {/* Department Detail Modal */}
      {showDepartmentDetail && selectedDepartment && (
        <DepartmentDetailModal
          department={selectedDepartment}
          onClose={() => setShowDepartmentDetail(false)}
          onSave={async (updatedData) => {
            try {
              const departmentId = updatedData.id;
              if (!departmentId) {
                alert('Error: Department ID not found');
                return;
              }

              // Make API call to update department
              const res = await putAPI(`departments/${departmentId}`, updatedData);

              if (res.data.success) {
                alert('Department updated successfully!');

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

                setShowDepartmentDetail(false);
              } else {
                alert('Failed to update department: ' + (res.data.msg || 'Unknown error'));
              }
            } catch (err) {
              console.error('Error updating department:', err);
              alert('Error updating department: ' + (err.response?.data?.msg || err.message));
            }
          }}
        />
      )}

      {/* Project Detail Modal */}
      {showProjectDetail && selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setShowProjectDetail(false)}
          onSave={async (updatedData) => {
            try {
              const projectId = updatedData.id;
              if (!projectId) {
                alert('Error: Project ID not found');
                return;
              }

              // Make API call to update project
              const res = await putAPI(`projects/${projectId}`, updatedData);

              if (res.data.success) {
                alert('Project updated successfully!');

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

                setShowProjectDetail(false);
              } else {
                alert('Failed to update project: ' + (res.data.msg || 'Unknown error'));
              }
            } catch (err) {
              console.error('Error updating project:', err);
              alert('Error updating project: ' + (err.response?.data?.msg || err.message));
            }
          }}
        />
      )}

      {/* Restaurant Detail Modal */}
      {showRestaurantDetail && selectedRestaurantNode && (
        <RestaurantDetailModal
          node={selectedRestaurantNode}
          onClose={() => setShowRestaurantDetail(false)}
          onUpdate={async () => {
            // Reload restaurant data
            const dashboardRes = await getAPI('mission-control/dashboard', auth.token);
            if (dashboardRes.data.success) {
              const { stats, generals, people, departments, assets, incomeStreams, expenses, landmarks, restaurants } = dashboardRes.data.data;
              setRestaurantData(restaurants || []);
              await buildNodeGraph(stats, generals, people, assets, departments, lifeOpsData, incomeStreams || [], expenses || [], landmarks || [], restaurants || []);
            }
            setShowRestaurantDetail(false);
          }}
        />
      )}

      {/* Landmark Detail Modal */}
      {showLandmarkDetail && selectedLandmark && (
        <LandmarkDetailModal
          landmark={selectedLandmark}
          onClose={() => setShowLandmarkDetail(false)}
          onSave={async (updatedData) => {
            try {
              const landmarkId = updatedData.id || selectedLandmark.id;
              if (!landmarkId) {
                alert('Error: Landmark ID not found');
                return;
              }

              // Debug: Check if token exists
              console.log('=== DEBUG LANDMARK UPDATE ===');
              console.log('Auth object:', auth);
              console.log('Token:', auth.token);
              console.log('Token exists:', !!auth.token);

              if (!auth.token) {
                alert('Error: No authentication token found. Please try logging in again.');
                return;
              }

              // Make API call to update landmark
              const res = await putAPI(`landmarks/${landmarkId}`, updatedData, auth.token);

              if (res.data.success) {
                alert('Landmark updated successfully!');

                // Fetch all data to rebuild the graph
                const dashboardRes = await getAPI('mission-control/dashboard', auth.token);
                if (dashboardRes.data.success) {
                  const { stats, generals, people, departments, assets, incomeStreams, expenses, landmarks } = dashboardRes.data.data;
                  setStats(stats);
                  setGenerals(generals);
                  setPeople(people);
                  setDepartments(departments);
                  setAssets(assets);
                  setLandmarks(landmarks);

                  // Rebuild the graph with updated data
                  await buildNodeGraph(stats, generals, people, assets, departments, lifeOpsData, incomeStreams || [], expenses || [], landmarks);
                }

                setShowLandmarkDetail(false);
              } else {
                alert('Failed to update landmark: ' + (res.data.msg || 'Unknown error'));
              }
            } catch (err) {
              console.error('Error updating landmark:', err);
              alert('Error updating landmark: ' + (err.response?.data?.msg || err.message));
            }
          }}
        />
      )}

      {/* General Detail Modal */}
      {showGeneralDetail && selectedGeneral && (
        <GeneralDetailModal
          general={selectedGeneral}
          onClose={() => setShowGeneralDetail(false)}
          onSave={async (updatedData) => {
            try {
              const generalId = updatedData.id;
              if (!generalId) {
                alert('Error: General ID not found');
                return;
              }

              // Make API call to update general
              const res = await putAPI(`generals/${generalId}`, updatedData);

              if (res.data.success) {
                alert('General updated successfully!');

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

                setShowGeneralDetail(false);
              } else {
                alert('Failed to update general: ' + (res.data.msg || 'Unknown error'));
              }
            } catch (err) {
              console.error('Error updating general:', err);
              alert('Error updating general: ' + (err.response?.data?.msg || err.message));
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
            {contextMenu.nodeType === 'general' && (
              <button className="mc-context-menu-item" onClick={handleViewGeneralDetails}>
                <Dashboard style={{ fontSize: 18, marginRight: 8 }} />
                View Details
              </button>
            )}
            {contextMenu.nodeType === 'project' && (
              <button className="mc-context-menu-item" onClick={handleViewProjectDetails}>
                <Assessment style={{ fontSize: 18, marginRight: 8 }} />
                View Details
              </button>
            )}
            {contextMenu.nodeType === 'department' && (
              <button className="mc-context-menu-item" onClick={handleViewDepartmentDetails}>
                <Business style={{ fontSize: 18, marginRight: 8 }} />
                View Details
              </button>
            )}
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
