import {
  Gantt,
  Toolbar,
  Edit,
  Selection,
  Sort,
  ContextMenu,
} from '@syncfusion/ej2-gantt';

import { registerLicense } from '@syncfusion/ej2-base';

import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

let dataSource: DataManager = new DataManager({
  url: 'http://localhost:3001/api/ganttData',
  adaptor: new UrlAdaptor(),
  batchUrl: 'http://localhost:3001/api/batchData',
});

Gantt.Inject(Toolbar, Edit, ContextMenu, Selection, Sort);

registerLicense('<your-license-key>');

let gantt: Gantt = new Gantt({
  dataSource: dataSource,
  height: '450px',
  taskFields: {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    parentID: 'ParentID',
    dependency: 'Predecessor',
    child: 'subtasks',
  },

  allowSorting: true,
  sortSettings: {
    columns: [{ field: 'TaskName', direction: 'Ascending' }],
  },

  enableContextMenu: true,

  actionBegin: function (args) {
    if (args.requestType == 'validateLinkedTask') {
      args.validateMode.preserveLinkWithEditing = false;
    }
  },

  editSettings: {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
  },
  toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel'],
});

gantt.appendTo('#Gantt');
