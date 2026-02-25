const moduleCatalog = [
  'Fiori (SAPUI5)',
  'ABAP (Development)',
  'BASIS (System Administration)',
  'MM (Materials Management)',
  'SD (Sales & Distribution)',
  'FI (Financial Accounting)',
  'CO (Controlling)',
  'HR (Human Resources)',
  'PM (Plant Maintenance)',
  'QM (Quality Management)',
  'PP (Production Planning)',
  'PS (Project System)',
  'WM (Warehouse Management)',
  'IM (Inventory Management)',
  'BW/BI (Business Intelligence)',
  'HANA (Database)'
];

const moduleProductMap = {
  'Fiori (SAPUI5)': 'SAP S/4HANA',
  'ABAP (Development)': 'SAP NetWeaver',
  'BASIS (System Administration)': 'SAP NetWeaver',
  'MM (Materials Management)': 'SAP S/4HANA',
  'SD (Sales & Distribution)': 'SAP S/4HANA',
  'FI (Financial Accounting)': 'SAP S/4HANA',
  'CO (Controlling)': 'SAP S/4HANA',
  'HR (Human Resources)': 'SAP SuccessFactors',
  'PM (Plant Maintenance)': 'SAP S/4HANA',
  'QM (Quality Management)': 'SAP S/4HANA',
  'PP (Production Planning)': 'SAP S/4HANA',
  'PS (Project System)': 'SAP S/4HANA',
  'WM (Warehouse Management)': 'SAP EWM',
  'IM (Inventory Management)': 'SAP S/4HANA',
  'BW/BI (Business Intelligence)': 'SAP BW/4HANA',
  'HANA (Database)': 'SAP HANA Platform'
};

const productCatalog = Array.from(new Set(Object.values(moduleProductMap)));

export const sapProducts = ['All', ...productCatalog];
export const sapModules = ['All', ...moduleCatalog];
export const bugSeverity = ['All', 'Critical', 'High', 'Medium', 'Low'];

const categoryCatalog = [
  'Runtime Error',
  'Configuration Error',
  'Missing Data',
  'Authentication',
  'Performance',
  'Database',
  'Integration',
  'Customization',
  'Authorization',
  'Network',
  'UI Rendering',
  'OData Service'
];

export const bugCategories = ['All', ...categoryCatalog];

const coreBugs = [
  {
    id: 'err_00001',
    errorCode: 'FIORI_RENDER_BLOCKED',
    title: 'Fiori tile shell fails to render after transport import',
    product: 'SAP S/4HANA',
    module: 'Fiori (SAPUI5)',
    severity: 'High',
    category: 'UI Rendering',
    description: 'Launchpad target mapping resolves, but UI5 component preload fails and the tile remains blank.',
    solution:
      '1. Validate target mapping in /UI2/FLPD_CUST\n2. Check /IWFND/ERROR_LOG for service issues\n3. Rebuild UI5 cache in /UI5/APP_INDEX_CALCULATE\n4. Clear browser cache and verify version alignment\n5. Reimport transport sequence if mismatch exists',
    relatedErrors: ['ODATA_HTTP_500', 'CACHE_VERSION_MISMATCH'],
    sapNotes: ['3210045', '3289121'],
    keywords: ['fiori', 'launchpad', 'ui5', 'render', 'tile'],
    resolutionTime: '20-40 mins',
    frequency: 'High'
  },
  {
    id: 'err_00002',
    errorCode: 'ABAP_DUMP_CALL_STACK_OVERFLOW',
    title: 'ABAP short dump from recursive call stack overflow',
    product: 'SAP NetWeaver',
    module: 'ABAP (Development)',
    severity: 'Critical',
    category: 'Runtime Error',
    description: 'Recursive FORM/method call exceeds stack depth and terminates work process.',
    solution:
      '1. Inspect dump in ST22\n2. Trace execution flow in SAT\n3. Add recursion guards and max depth controls\n4. Refactor recursive routine into iterative loop\n5. Transport tested correction to quality',
    relatedErrors: ['TIME_OUT', 'MEMORY_NO_MORE_PAGING'],
    sapNotes: ['3017731', '2441552'],
    keywords: ['abap', 'dump', 'stack', 'recursion'],
    resolutionTime: '30-60 mins',
    frequency: 'Medium'
  },
  {
    id: 'err_00003',
    errorCode: 'BASIS_RFC_GATEWAY_TIMEOUT',
    title: 'RFC gateway timeout under high parallel load',
    product: 'SAP NetWeaver',
    module: 'BASIS (System Administration)',
    severity: 'High',
    category: 'Network',
    description: 'Gateway process accepts connection but backend session allocation times out during peaks.',
    solution:
      '1. Review gateway stats in SMGW\n2. Validate RFC destinations in SM59\n3. Check work process saturation in SM50\n4. Tune gw/max_conn and timeout parameters\n5. Re-test with controlled load',
    relatedErrors: ['RFC_COMMUNICATION_FAILURE', 'WORK_PROCESS_TIMEOUT'],
    sapNotes: ['3535978', '2547167'],
    keywords: ['basis', 'rfc', 'gateway', 'timeout', 'smgw'],
    resolutionTime: '25-45 mins',
    frequency: 'High'
  },
  {
    id: 'err_00004',
    errorCode: 'FI_POSTING_PERIOD_CLOSED',
    title: 'Financial posting rejected due to closed period',
    product: 'SAP S/4HANA',
    module: 'FI (Financial Accounting)',
    severity: 'Medium',
    category: 'Configuration Error',
    description: 'Posting date is valid, but the company code period control is closed for the ledger variant.',
    solution:
      '1. Verify OB52 period controls\n2. Confirm document type authorization\n3. Validate posting date/user variant\n4. Reopen required period with approval\n5. Retry posting and audit trail',
    relatedErrors: ['AUTH_PERIOD_LOCK', 'DOC_TYPE_NOT_ALLOWED'],
    sapNotes: ['3098420', '2851012'],
    keywords: ['fi', 'posting', 'period', 'ob52'],
    resolutionTime: '10-20 mins',
    frequency: 'High'
  },
  {
    id: 'err_00005',
    errorCode: 'MM_FOREIGN_KEY_INCONSISTENT',
    title: 'Material master update violates reference integrity',
    product: 'SAP S/4HANA',
    module: 'MM (Materials Management)',
    severity: 'High',
    category: 'Database',
    description: 'Material extension attempts to persist records without matching organizational reference entries.',
    solution:
      '1. Validate dependent records in SE16N\n2. Compare reference configuration in SPRO\n3. Correct incomplete org-level master data\n4. Reprocess failed update task in SM13\n5. Execute consistency checks',
    relatedErrors: ['FOREIGN_KEY_VIOLATION', 'UPDATE_TASK_FAILED'],
    sapNotes: ['2774182', '3087433'],
    keywords: ['mm', 'material', 'foreign key', 'integrity'],
    resolutionTime: '20-35 mins',
    frequency: 'Medium'
  },
  {
    id: 'err_00006',
    errorCode: 'SD_PRICING_CONDITION_MISSING',
    title: 'Sales order pricing incomplete for key combination',
    product: 'SAP S/4HANA',
    module: 'SD (Sales & Distribution)',
    severity: 'Medium',
    category: 'Missing Data',
    description: 'Pricing procedure executes but condition record is absent for customer/material/date combination.',
    solution:
      '1. Analyze condition determination in V/08\n2. Check records in VK13\n3. Validate access sequence and requirement routines\n4. Extend condition record validity\n5. Reprice order and compare logs',
    relatedErrors: ['NO_CONDITION_FOUND', 'PRICING_INCOMPLETE'],
    sapNotes: ['2496194', '3127098'],
    keywords: ['sd', 'pricing', 'condition', 'vk13'],
    resolutionTime: '15-30 mins',
    frequency: 'High'
  },
  {
    id: 'err_00007',
    errorCode: 'HANA_SQL_PLAN_REGRESSION',
    title: 'HANA plan regression increases statement runtime',
    product: 'SAP HANA Platform',
    module: 'HANA (Database)',
    severity: 'Critical',
    category: 'Performance',
    description: 'Statement hash unchanged but optimizer plan drift causes severe runtime degradation.',
    solution:
      '1. Review expensive statements in HANA studio\n2. Compare current vs baseline execution plans\n3. Refresh statistics for impacted tables\n4. Introduce plan stability hint where required\n5. Re-evaluate after transport/import',
    relatedErrors: ['RESOURCE_TIMEOUT', 'DB_LOCK_WAIT_TIMEOUT'],
    sapNotes: ['3311179', '3340051'],
    keywords: ['hana', 'sql', 'plan', 'performance'],
    resolutionTime: '40-90 mins',
    frequency: 'Medium'
  },
  {
    id: 'err_00008',
    errorCode: 'ODATA_HTTP_500',
    title: 'OData service returns HTTP 500 for valid payload',
    product: 'SAP S/4HANA',
    module: 'Fiori (SAPUI5)',
    severity: 'High',
    category: 'OData Service',
    description: 'Gateway runtime rejects inbound entity update due to backend exception mapping failure.',
    solution:
      '1. Inspect /IWFND/ERROR_LOG and /IWBEP/ERROR_LOG\n2. Debug DPC_EXT implementation\n3. Validate metadata annotations and nullability\n4. Align payload with backend structure\n5. Retest through /IWFND/GW_CLIENT',
    relatedErrors: ['ABAP_DUMP_CALL_STACK_OVERFLOW', 'GATEWAY_TIMEOUT'],
    sapNotes: ['3174104', '3198128'],
    keywords: ['odata', 'http 500', 'gateway', 'fiori'],
    resolutionTime: '20-45 mins',
    frequency: 'High'
  }
];

const severityScale = bugSeverity.slice(1);
const frequencyScale = ['High', 'Medium', 'Low'];
const resolutionScale = ['5-15 mins', '10-25 mins', '20-40 mins', '30-60 mins', '45-90 mins'];

const makeToken = (value) =>
  value
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

const buildSyntheticBug = (index, template) => {
  const module = moduleCatalog[index % moduleCatalog.length];
  const category = categoryCatalog[index % categoryCatalog.length];
  const severity = severityScale[index % severityScale.length];
  const frequency = frequencyScale[index % frequencyScale.length];
  const resolutionTime = resolutionScale[index % resolutionScale.length];
  const product = moduleProductMap[module] || 'SAP S/4HANA';
  const itemNo = String(index + 1).padStart(5, '0');
  const moduleToken = makeToken(module.split('(')[0]);
  const categoryToken = makeToken(category);

  return {
    ...template,
    id: `err_${itemNo}`,
    errorCode: `${moduleToken}_${categoryToken}_${itemNo}`,
    title: `${template.title} (${itemNo})`,
    product,
    module,
    severity,
    category,
    description: `${template.description} Variant ${itemNo} models a large-scale production incident pattern.`,
    solution: `${template.solution}\n6. Capture incident timeline and close change record ${itemNo}.`,
    relatedErrors: [template.errorCode, `${moduleToken}_REFERENCE_${itemNo}`],
    sapNotes: [String(9000000 + index), String(9100000 + index)],
    keywords: Array.from(
      new Set([...template.keywords, product.toLowerCase(), moduleToken.toLowerCase(), categoryToken.toLowerCase()])
    ),
    resolutionTime,
    frequency
  };
};

const generateBugDataset = (baseBugs, targetCount = 12000) => {
  if (baseBugs.length >= targetCount) {
    return baseBugs;
  }

  const generated = [...baseBugs];
  let index = generated.length;

  while (generated.length < targetCount) {
    const template = baseBugs[index % baseBugs.length];
    generated.push(buildSyntheticBug(index, template));
    index += 1;
  }

  return generated;
};

export const sapBugDatabase = generateBugDataset(coreBugs, 12000);
