import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DepartmentView from './views/DepartmentView';
import SystemView from './views/SystemView';
import PersonView from './views/PersonView';
import { departmentTree, systemTree, personTree } from './mockTreeData';
import { filterTree } from './utils/treeUtils';

function PrintTreePage() {
  const { view } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filters = {
    projectName: searchParams.get('projectName') || '',
    department: searchParams.get('department') || '',
    systemName: searchParams.get('systemName') || '',
    person: searchParams.get('person') || '',
  };

  // Debug log for troubleshooting
  console.log('[PrintTreePage] view param:', view);
  console.log('[PrintTreePage] filters:', filters);

  let data = [];
  if (view === 'department') data = departmentTree;
  else if (view === 'system') data = systemTree;
  else if (view === 'person') data = personTree;

  // Filtering logic (same as App.js)
  const { projectName, department, systemName, person } = filters;
  const predicate = (node) => {
    if (projectName && node.id && node.id.startsWith('proj-') && node.name && node.name.toLowerCase().includes(projectName.toLowerCase())) return true;
    if (department && node.id && node.id.startsWith('dept-') && node.name && node.name.toLowerCase().includes(department.toLowerCase())) return true;
    if (systemName && node.id && node.id.startsWith('sys-') && node.name && node.name.toLowerCase().includes(systemName.toLowerCase())) return true;
    if (person) {
      if (node.id && node.id.startsWith('person-') && node.name && node.name.toLowerCase().includes(person.toLowerCase())) return true;
      if (node.person && node.person.toLowerCase().includes(person.toLowerCase())) return true;
    }
    return false;
  };
  if (projectName || department || systemName || person) {
    data = filterTree(data, predicate);
  }

  let content = null;
  if (view === 'department') {
    content = <DepartmentView data={data} printMode={true} />;
  } else if (view === 'system') {
    content = <SystemView data={data} printMode={true} />;
  } else if (view === 'person') {
    content = <PersonView data={data} printMode={true} />;
  }
  // Remove all other CSS by resetting styles inline
  return (
    <div style={{ all: 'unset', background: '#fff', color: '#000', padding: 0, margin: 0 }}>
      {content}
    </div>
  );
}

export default PrintTreePage;
