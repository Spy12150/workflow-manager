import React, { useState } from 'react';
import './App.css';
import DepartmentSearchBar from './t1/components/DepartmentSearchBar';
import SystemSearchBar from './t1/components/SystemSearchBar';
import PersonSearchBar from './t1/components/PersonSearchBar';
import DepartmentView from './views/DepartmentView';
import SystemView from './views/SystemView';
import PersonView from './views/PersonView';
import projectApi from './api/projectAPI';
import { departmentTree, systemTree, personTree } from './mockTreeData';
import { filterTree } from './utils/treeUtils';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrintTreePage from './PrintTreePage';

function App() {
  // State for current view, search filters, and tree data
  const [view, setView] = useState('department'); // 'department', 'system', 'person'
  const [filters, setFilters] = useState({
    projectName: '',
    department: '',
    systemName: '',
    person: '',
  });
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data from API or mock, with filter logic
  const fetchData = async (selectedView, selectedFilters) => {
    setLoading(true);
    try {
      let data = [];
      if (selectedView === 'department') data = departmentTree;
      else if (selectedView === 'system') data = systemTree;
      else if (selectedView === 'person') data = personTree;

      // Filtering logic: match each filter to the correct node type only, case-insensitive
      const { projectName, department, systemName, person } = selectedFilters;
      const predicate = (node) => {
        if (projectName && node.id && node.id.startsWith('proj-') && node.name && node.name.toLowerCase().includes(projectName.toLowerCase())) return true;
        if (department && node.id && node.id.startsWith('dept-') && node.name && node.name.toLowerCase().includes(department.toLowerCase())) return true;
        if (systemName && node.id && node.id.startsWith('sys-') && node.name && node.name.toLowerCase().includes(systemName.toLowerCase())) return true;
        // Fix: allow person filter to match both person nodes and task nodes with a person field
        if (person) {
          if (node.id && node.id.startsWith('person-') && node.name && node.name.toLowerCase().includes(person.toLowerCase())) return true;
          if (node.person && node.person.toLowerCase().includes(person.toLowerCase())) return true;
        }
        return false;
      };
      // Only filter if any filter is set
      if (projectName || department || systemName || person) {
        data = filterTree(data, predicate);
      }
      setTreeData(data);
    } catch (err) {
      setTreeData([]);
    } finally {
      setLoading(false);
    }
  };

  // Handler for view switch
  const handleViewChange = (newView) => {
    // If switching away from department view, reset department filter
    setFilters((prev) => {
      if (newView !== 'department') {
        return { ...prev, department: '' };
      }
      return prev;
    });
    setView(newView);
    // Use the updated filters for fetchData
    fetchData(newView, {
      ...filters,
      ...(newView !== 'department' ? { department: '' } : {})
    });
  };

  // Handler for search/filter
  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    fetchData(view, newFilters);
  };

  // Handler for reset
  const handleReset = () => {
    const defaultFilters = { projectName: '', department: '', systemName: '', person: '' };
    setFilters(defaultFilters);
    fetchData(view, defaultFilters);
  };

  // Initial data fetch
  React.useEffect(() => {
    fetchData(view, filters);
    // eslint-disable-next-line
  }, []);

  // Render the correct view and search bar
  let content = null;
  let searchBar = null;
  if (view === 'department') {
    searchBar = (
      <DepartmentSearchBar
        view={view}
        filters={filters}
        onViewChange={handleViewChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />
    );
    content = <DepartmentView data={treeData} />;
  } else if (view === 'system') {
    searchBar = (
      <SystemSearchBar
        view={view}
        filters={filters}
        onViewChange={handleViewChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />
    );
    content = <SystemView data={treeData} />;
  } else if (view === 'person') {
    searchBar = (
      <PersonSearchBar
        view={view}
        filters={filters}
        onViewChange={handleViewChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />
    );
    content = <PersonView data={treeData} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <h1>项目管理仪表盘</h1>
            {searchBar}
            {content}
          </div>
        } />
        <Route path="/print/:view" element={<PrintTreePage />} />
      </Routes>
    </Router>
  );
}

export default App;
