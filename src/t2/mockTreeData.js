// mockTreeData.js
// Example mock data for department, system, and person views

export const departmentTree = [
  {
    id: 'dept-1',
    name: '研发部',
    children: [
      {
        id: 'proj-1',
        name: '项目A',
        children: [
          {
            id: 'sys-1',
            name: '系统Alpha',
            children: [
              {
                id: 'task-1',
                name: '任务1',
                person: '张逊徐',
                children: [
                  {
                    id: 'prog-1',
                    name: '进度1',
                    status: '进行中',
                    styleContent: { backgroundColor: '#eaf3ff', fontColor: '#409eff' },
                  },
                  {
                    id: 'prog-2',
                    name: '进度2',
                    status: '已完成',
                    styleContent: { backgroundColor: '#e0ffe0', fontColor: '#67c23a', strikethrough: true },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'dept-2',
    name: '市场部',
    children: [
      {
        id: 'proj-2',
        name: '项目B',
        children: [
          {
            id: 'sys-2',
            name: '系统Beta',
            children: [
              {
                id: 'task-2',
                name: '任务2',
                person: '李怡然',
                children: [
                  {
                    id: 'prog-3',
                    name: '进度1',
                    status: '未开始',
                    styleContent: { backgroundColor: '#fffbe6', fontColor: '#e6a23c' },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const systemTree = [
  {
    id: 'sys-1',
    name: '系统Alpha',
    children: [
      {
        id: 'proj-1',
        name: '项目A',
        children: [
          {
            id: 'task-1',
            name: '任务1',
            person: '张逊徐',
            children: [
              {
                id: 'prog-1',
                name: '进度1',
                status: '进行中',
                styleContent: { backgroundColor: '#eaf3ff', fontColor: '#409eff' },
              },
              {
                id: 'prog-2',
                name: '进度2',
                status: '已完成',
                styleContent: { backgroundColor: '#e0ffe0', fontColor: '#67c23a', strikethrough: true },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sys-2',
    name: '系统Beta',
    children: [
      {
        id: 'proj-2',
        name: '项目B',
        children: [
          {
            id: 'task-2',
            name: '任务2',
            person: '李怡然',
            children: [
              {
                id: 'prog-3',
                name: '进度1',
                status: '未开始',
                styleContent: { backgroundColor: '#fffbe6', fontColor: '#e6a23c' },
              },
            ],
          },
        ],
      },
    ],
  },
];

export const personTree = [
  {
    id: 'person-1',
    name: '张逊徐',
    children: [
      {
        id: 'proj-1',
        name: '项目A',
        children: [
          {
            id: 'sys-1',
            name: '系统Alpha',
            children: [
              {
                id: 'task-1',
                name: '任务1',
                children: [
                  {
                    id: 'prog-1',
                    name: '进度1',
                    status: '进行中',
                    styleContent: { backgroundColor: '#eaf3ff', fontColor: '#409eff' },
                  },
                  {
                    id: 'prog-2',
                    name: '进度2',
                    status: '已完成',
                    styleContent: { backgroundColor: '#e0ffe0', fontColor: '#67c23a', strikethrough: true },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'person-2',
    name: '李怡然',
    children: [
      {
        id: 'proj-2',
        name: '项目B',
        children: [
          {
            id: 'sys-2',
            name: '系统Beta',
            children: [
              {
                id: 'task-2',
                name: '任务2',
                children: [
                  {
                    id: 'prog-3',
                    name: '进度1',
                    status: '未开始',
                    styleContent: { backgroundColor: '#fffbe6', fontColor: '#e6a23c' },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
