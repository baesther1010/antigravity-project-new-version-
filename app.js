/**
 * Freshman Planner 2026 - Application Logic
 * Excel-style interactive planner for Korean university freshman.
 */

// Global State
let state = {
  theme: 'theme-excel',
  gpaStandard: '4.5',
  profile: {
    emoji: '🌸',
    name: '26학번 새내기',
    dept: '전공 미지정 학과',
    quote: '"대학 생활의 첫 단추, 체계적인 계획으로 완벽하게 시작해 보세요."',
    targetCredits: 18
  },
  syllabusRows: [],
  gpaRows: [],
  bucketList: [],
  notes: ''
};

// Default Templates
const defaultTemplates = {
  profile: {
    emoji: '🌸',
    name: '26학번 새내기',
    dept: '전공 미지정 학과',
    quote: '"대학 생활의 첫 단추, 체계적인 계획으로 완벽하게 시작해 보세요."',
    targetCredits: 18
  },
  syllabusRows: [
    { id: 1, subject: '미적분학 1', type: '전공필수', credits: 3, schedule: '화 3,4 / 목 3', professor: '이진우 교수님', task: '중간고사', weight: 35, date: '2026-04-22', status: '완료', score: 92, notes: '기초 공식 암기 필수' },
    { id: 2, subject: '미적분학 1', type: '전공필수', credits: 3, schedule: '화 3,4 / 목 3', professor: '이진우 교수님', task: '기말고사', weight: 40, date: '2026-06-18', status: '미시작', score: '', notes: '범위: 적분법 전체' },
    { id: 3, subject: '일반물리학 1', type: '전공필수', credits: 3, schedule: '월 3,4 / 수 3', professor: '박성민 교수님', task: '실험 보고서 1', weight: 10, date: '2026-03-25', status: '완료', score: 95, notes: '오차 분석 꼼꼼히 쓰기' },
    { id: 4, subject: '일반물리학 1', type: '전공필수', credits: 3, schedule: '월 3,4 / 수 3', professor: '박성민 교수님', task: '기말고사', weight: 40, date: '2026-06-22', status: '진행중', score: '', notes: 'D-day 관리 잘할 것' },
    { id: 5, subject: '컴퓨터프로그래밍', type: '전공선택', credits: 3, schedule: '화 5,6', professor: '최윤석 교수님', task: '개인 프로젝트', weight: 30, date: '2026-06-15', status: '진행중', score: '', notes: '주제: C언어로 만든 미로 게임' },
    { id: 6, subject: '컴퓨터프로그래밍', type: '전공선택', credits: 3, schedule: '화 5,6', professor: '최윤석 교수님', task: '기말 코딩테스트', weight: 40, date: '2026-06-25', status: '미시작', score: '', notes: '포인터, 구조체 위주 복습' },
    { id: 7, subject: '대학 영어', type: '교양필수', credits: 2, schedule: '수 1,2', professor: 'Sarah Smith', task: '중간 에세이', weight: 20, date: '2026-04-18', status: '완료', score: 88, notes: '피드백 반영해서 수정 완료' },
    { id: 8, subject: '대학 영어', type: '교양필수', credits: 2, schedule: '수 1,2', professor: 'Sarah Smith', task: '기말 발표 영상', weight: 20, date: '2026-06-20', status: '미시작', score: '', notes: '주제: 나의 대학 생활 계획' },
    { id: 9, subject: '새내기 세미나', type: '일반선택', credits: 1, schedule: '금 5', professor: '김태식 교수님', task: '진로 탐색 보고서', weight: 100, date: '2026-06-28', status: '미시작', score: '', notes: 'P/F 과목. 제출 시 Pass' }
  ],
  gpaRows: [
    { id: 1, subject: '미적분학 1', type: '전공필수', credits: 3, grade: 'A0', gp: 4.0, isPassFail: 'No', notes: '기말고사 만회하자' },
    { id: 2, subject: '일반물리학 1', type: '전공필수', credits: 3, grade: 'A+', gp: 4.5, isPassFail: 'No', notes: '실험 만점 유지 중' },
    { id: 3, subject: '컴퓨터프로그래밍', type: '전공선택', credits: 3, grade: 'B+', gp: 3.5, isPassFail: 'No', notes: '프로젝트 완성도 높이기' },
    { id: 4, subject: '대학 영어', type: '교양필수', credits: 2, grade: 'A0', gp: 4.0, isPassFail: 'No', notes: '회화 참여도 적극적으로!' },
    { id: 5, subject: '새내기 세미나', type: '일반선택', credits: 1, grade: 'P', gp: 0, isPassFail: 'Yes', notes: '보고서 제출 완료' }
  ],
  bucketList: [
    { id: 1, mission: '동아리 박람회 구경하고 맘에 드는 곳 가입하기 🎸', completed: true, date: '2026-03-08' },
    { id: 2, mission: '신입생 MT 참석해서 선배/동기들과 친해지기 🚌', completed: true, date: '2026-03-14' },
    { id: 3, mission: '중앙도서관 열람실에서 밤샘 시험공부 해보기 ☕', completed: false, date: '' },
    { id: 4, mission: '모바일 학생증 발급받아 도서관 게이트 찍어보기 💳', completed: true, date: '2026-03-03' },
    { id: 5, mission: '교내 학생식당 투어해보고 가장 맛있는 메뉴 찾기 🍛', completed: true, date: '2026-03-10' },
    { id: 6, mission: '대학교 축제 주점 즐기고 라인업 공연 앞에서 보기 🎤', completed: false, date: '' },
    { id: 7, mission: '지도교수님 연구실 노크하고 진로 면담 해보기 💬', completed: false, date: '' },
    { id: 8, mission: '학기 중간에 예쁜 캠퍼스 벚꽃 나무 아래서 동기들과 단체 사진 찍기 🌸', completed: true, date: '2026-04-05' },
    { id: 9, mission: '성적 우수 또는 국가 장학금 수혜 받아보기 🏆', completed: false, date: '' },
    { id: 10, mission: '방학 때 동기들과 첫 우정 해외 배낭여행 계획하기 ✈️', completed: false, date: '' }
  ],
  notes: `[2026학년도 1학기 새내기 다짐]
- 매일 9시 1교시 수업 지각하지 않기!
- 시험 기간 벼락치기 지양하고 최소 2주 전부터 전공 과목 요약하기.
- 매주 목요일은 동아리 밴드 합주 연습일 (18:00 ~ 20:00).
- 방학 대비 토익 인강 알아보기.

[교수님 연락처 및 오피스 정보]
- 이진우 교수님 (미적분학 1): 과학관 402호 / jwlee@univ.ac.kr (오피스 아워: 목요일 14:00~16:00)
- 박성민 교수님 (일반물리학 1): 물리학동 203호 / smpark@univ.ac.kr
`
};

// Excel Column Letter Mappings
const syllabusCols = ['', 'No', 'subject', 'type', 'credits', 'schedule', 'professor', 'task', 'weight', 'date', 'dday', 'status', 'score', 'notes'];
const gpaCols = ['', 'No', 'subject', 'type', 'credits', 'grade', 'gp', 'isPassFail', 'notes'];

// Selected Cell Coordinate
let selectedCell = null; // { tableId, rowIndex, colIndex, element }

// DOM Elements
const elements = {
  themeSelect: document.getElementById('theme-select'),
  btnExportCsv: document.getElementById('btn-export-csv'),
  btnExportJson: document.getElementById('btn-export-json'),
  btnImportJson: document.getElementById('btn-import-json'),
  fileInputJson: document.getElementById('file-input-json'),
  btnReset: document.getElementById('btn-reset'),
  btnPrint: document.getElementById('btn-print'),
  
  // Dashboard
  dashboardDday: document.getElementById('dashboard-dday'),
  kpiGpaVal: document.getElementById('kpi-gpa-val'),
  kpiGpaMax: document.querySelector('#kpi-gpa-card .kpi-max'),
  kpiGpaStatus: document.getElementById('kpi-gpa-status'),
  kpiCreditsVal: document.getElementById('kpi-credits-val'),
  kpiCreditsTarget: document.getElementById('kpi-credits-target'),
  kpiCreditsProgress: document.getElementById('kpi-credits-progress'),
  kpiTasksPct: document.getElementById('kpi-tasks-pct'),
  kpiTasksRatio: document.getElementById('kpi-tasks-ratio'),
  kpiTasksProgress: document.getElementById('kpi-tasks-progress'),
  kpiBucketPct: document.getElementById('kpi-bucket-pct'),
  kpiBucketRatio: document.getElementById('kpi-bucket-ratio'),
  kpiBucketMessage: document.getElementById('kpi-bucket-message'),
  welcomeAvatar: document.getElementById('welcome-avatar'),
  profileEmoji: document.getElementById('profile-emoji'),
  profileDept: document.getElementById('profile-dept'),
  profileName: document.getElementById('profile-name'),
  profileQuote: document.getElementById('profile-quote'),
  
  // Formula Bar
  activeCellId: document.getElementById('active-cell-id'),
  formulaInput: document.getElementById('formula-input'),
  
  // Sheet Contents & Tabs
  tabs: document.querySelectorAll('.sheet-tab'),
  contents: document.querySelectorAll('.sheet-content'),
  
  // Tables
  tableSyllabus: document.getElementById('table-syllabus'),
  tbodySyllabus: document.getElementById('tbody-syllabus'),
  btnAddSyllabusRow: document.getElementById('btn-add-syllabus-row'),
  btnDeleteSyllabusRow: document.getElementById('btn-delete-syllabus-row'),
  
  tableGpa: document.getElementById('table-gpa'),
  tbodyGpa: document.getElementById('tbody-gpa'),
  btnAddGpaRow: document.getElementById('btn-add-gpa-row'),
  btnDeleteGpaRow: document.getElementById('btn-delete-gpa-row'),
  gpaStandard: document.getElementById('gpa-standard'),
  gpaTotalCredits: document.getElementById('gpa-total-credits'),
  gpaAvgGpa: document.getElementById('gpa-avg-gpa'),
  gpaSummaryNote: document.getElementById('gpa-summary-note'),
  
  // Timetable
  tbodyTimetable: document.getElementById('tbody-timetable'),
  btnSyncTimetable: document.getElementById('btn-sync-timetable'),
  
  // Bucketlist & Notes
  tbodyBucket: document.getElementById('tbody-bucket'),
  freeNotes: document.getElementById('free-notes'),
  notesSaveStatus: document.getElementById('notes-save-status'),
  
  // Modal
  modalImport: document.getElementById('modal-import-confirm'),
  btnImportConfirm: document.getElementById('btn-import-confirm'),
  btnImportCancel: document.getElementById('btn-import-cancel')
};

// ----------------------------------------------------
// 1. Data Storage & Init
// ----------------------------------------------------

function renderProfile() {
  if (state.profile) {
    elements.profileEmoji.innerText = state.profile.emoji || '🌸';
    elements.profileDept.innerText = state.profile.dept || '전공 미지정 학과';
    elements.profileName.innerText = state.profile.name || '26학번 새내기';
    elements.profileQuote.innerText = state.profile.quote || '';
  }
}

function init() {
  loadData();
  applyTheme(state.theme);
  elements.themeSelect.value = state.theme;
  elements.gpaStandard.value = state.gpaStandard;
  
  renderSyllabusTable();
  renderGpaTable();
  renderTimetable();
  renderBucketListTable();
  elements.freeNotes.value = state.notes;
  renderProfile();
  
  updateDashboard();
  setupEventListeners();
}

function loadData() {
  const saved = localStorage.getItem('freshman_planner_26_data');
  if (saved) {
    try {
      state = JSON.parse(saved);
      // Fallback for missing keys
      if (!state.theme) state.theme = 'theme-excel';
      if (!state.gpaStandard) state.gpaStandard = '4.5';
      if (!state.profile) state.profile = JSON.parse(JSON.stringify(defaultTemplates.profile));
      if (!state.syllabusRows) state.syllabusRows = [];
      if (!state.gpaRows) state.gpaRows = [];
      if (!state.bucketList) state.bucketList = [];
      if (state.notes === undefined) state.notes = '';
    } catch (e) {
      console.error('데이터 파싱 오류. 기본값을 불러옵니다.', e);
      loadDefaults();
    }
  } else {
    loadDefaults();
  }
}

function loadDefaults() {
  state = {
    theme: 'theme-excel',
    gpaStandard: '4.5',
    profile: JSON.parse(JSON.stringify(defaultTemplates.profile)),
    syllabusRows: JSON.parse(JSON.stringify(defaultTemplates.syllabusRows)),
    gpaRows: JSON.parse(JSON.stringify(defaultTemplates.gpaRows)),
    bucketList: JSON.parse(JSON.stringify(defaultTemplates.bucketList)),
    notes: defaultTemplates.notes
  };
  saveData();
}

function saveData() {
  localStorage.setItem('freshman_planner_26_data', JSON.stringify(state));
}

// ----------------------------------------------------
// 2. Rendering Functions
// ----------------------------------------------------

// Render Syllabus Table Rows
function renderSyllabusTable() {
  elements.tbodySyllabus.innerHTML = '';
  state.syllabusRows.forEach((row, idx) => {
    const tr = document.createElement('tr');
    tr.dataset.id = row.id;
    tr.dataset.index = idx;
    
    // Row header number
    const tdRowHead = document.createElement('td');
    tdRowHead.className = 'row-num-col';
    tdRowHead.innerText = idx + 1;
    tr.appendChild(tdRowHead);
    
    // Syllabus cell values
    syllabusCols.forEach((colName, colIdx) => {
      if (colIdx === 0) return; // skip row header
      
      const td = document.createElement('td');
      td.dataset.row = idx;
      td.dataset.col = colIdx;
      td.dataset.field = colName;
      
      if (colName === 'No') {
        td.innerText = idx + 1;
        td.className = 'text-center';
      } else if (colName === 'dday') {
        const dday = calculateDDay(row.date);
        td.innerText = dday;
        td.className = 'text-center';
        if (dday.startsWith('D-') && !dday.includes('-0') && !dday.includes('+')) {
          td.style.color = '#a80000';
          td.style.fontWeight = 'bold';
        }
      } else if (colName === 'status') {
        td.className = 'text-center';
        const badge = document.createElement('span');
        badge.className = `status-badge ${getStatusClass(row.status)}`;
        badge.innerText = row.status || '미시작';
        td.appendChild(badge);
      } else {
        td.innerText = row[colName] !== undefined ? row[colName] : '';
        if (colName === 'credits' || colName === 'weight' || colName === 'score') {
          td.className = 'text-center';
        }
      }
      
      // Select cell event
      td.addEventListener('click', (e) => selectCell('table-syllabus', td, idx, colIdx));
      td.addEventListener('dblclick', (e) => startEditingCell(td));
      
      tr.appendChild(td);
    });
    
    elements.tbodySyllabus.appendChild(tr);
  });
}

// Get status badge CSS class
function getStatusClass(status) {
  switch (status) {
    case '미시작': return 'not-started';
    case '진행중': return 'in-progress';
    case '완료': return 'completed';
    case '시험': return 'exam';
    default: return 'not-started';
  }
}

// Render GPA Table Rows
function renderGpaTable() {
  elements.tbodyGpa.innerHTML = '';
  state.gpaRows.forEach((row, idx) => {
    const tr = document.createElement('tr');
    tr.dataset.id = row.id;
    tr.dataset.index = idx;
    
    // Row header number
    const tdRowHead = document.createElement('td');
    tdRowHead.className = 'row-num-col';
    tdRowHead.innerText = idx + 1;
    tr.appendChild(tdRowHead);
    
    gpaCols.forEach((colName, colIdx) => {
      if (colIdx === 0) return;
      
      const td = document.createElement('td');
      td.dataset.row = idx;
      td.dataset.col = colIdx;
      td.dataset.field = colName;
      
      if (colName === 'No') {
        td.innerText = idx + 1;
        td.className = 'text-center';
      } else if (colName === 'gp') {
        td.innerText = row.gp !== undefined ? Number(row.gp).toFixed(2) : '0.00';
        td.className = 'text-center';
      } else {
        td.innerText = row[colName] !== undefined ? row[colName] : '';
        if (colName === 'credits' || colName === 'grade' || colName === 'isPassFail') {
          td.className = 'text-center';
        }
      }
      
      td.addEventListener('click', (e) => selectCell('table-gpa', td, idx, colIdx));
      td.addEventListener('dblclick', (e) => startEditingCell(td));
      
      tr.appendChild(td);
    });
    
    elements.tbodyGpa.appendChild(tr);
  });
  
  calculateGpaSummary();
}

// Render Timetable from Syllabus Schedule data
function renderTimetable() {
  // Clear previous cards
  const cells = elements.tbodyTimetable.querySelectorAll('td[data-day]');
  cells.forEach(cell => {
    cell.innerHTML = '';
  });
  
  // Collect unique subjects
  const subjectList = [];
  state.syllabusRows.forEach(row => {
    if (row.subject && !subjectList.includes(row.subject)) {
      subjectList.push(row.subject);
    }
  });
  
  // Parse and render subjects
  state.syllabusRows.forEach(row => {
    if (!row.subject || !row.schedule) return;
    
    const parsedList = parseSchedule(row.schedule);
    const subjectIndex = subjectList.indexOf(row.subject);
    const colorClass = `subject-color-${subjectIndex % 8}`;
    
    parsedList.forEach(item => {
      const { day, periods } = item;
      periods.forEach(period => {
        const cell = elements.tbodyTimetable.querySelector(`td[data-day="${day}"][data-period="${period}"]`);
        if (cell) {
          // If multiple tasks/rows exist for the same subject, avoid duplicating cards
          const existingCard = cell.querySelector(`.timetable-subject-card`);
          if (existingCard) return;
          
          const card = document.createElement('div');
          card.className = `timetable-subject-card ${colorClass}`;
          
          const nameSpan = document.createElement('span');
          nameSpan.className = 'subject-name';
          nameSpan.innerText = row.subject;
          nameSpan.title = `${row.subject} (${row.professor || ''})`;
          
          const roomSpan = document.createElement('span');
          roomSpan.className = 'subject-room';
          roomSpan.innerText = row.professor ? row.professor.split(' ')[0] : '';
          
          card.appendChild(nameSpan);
          if (roomSpan.innerText) card.appendChild(roomSpan);
          
          cell.appendChild(card);
        }
      });
    });
  });
}

// Parse Schedule String: "화 3,4 / 목 3"
function parseSchedule(scheduleStr) {
  const schedule = [];
  if (!scheduleStr) return schedule;
  
  // Split by slashes for multiple days
  const parts = scheduleStr.split('/');
  parts.forEach(part => {
    const trimmed = part.trim();
    if (!trimmed) return;
    
    // Format: Day name followed by period numbers (e.g. "월 1, 2" or "화 3,4" or "수 1")
    const match = trimmed.match(/^([월화수목금])\s*([0-9,\s]+)$/);
    if (match) {
      const day = match[1];
      const periods = match[2].split(',')
                              .map(p => parseInt(p.trim(), 10))
                              .filter(p => !isNaN(p) && p >= 1 && p <= 9);
      if (periods.length > 0) {
        schedule.push({ day, periods });
      }
    }
  });
  return schedule;
}

// Render Bucket List Table
function renderBucketListTable() {
  elements.tbodyBucket.innerHTML = '';
  state.bucketList.forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.dataset.id = item.id;
    if (item.completed) {
      tr.className = 'bucket-row-completed';
    }
    
    // Row index column
    const tdRowHead = document.createElement('td');
    tdRowHead.className = 'row-num-col';
    tdRowHead.innerText = idx + 1;
    tr.appendChild(tdRowHead);
    
    // Checkbox Col
    const tdCheck = document.createElement('td');
    tdCheck.className = 'text-center';
    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.className = 'bucket-checkbox';
    chk.checked = item.completed;
    chk.addEventListener('change', (e) => toggleBucketItem(idx, chk.checked));
    tdCheck.appendChild(chk);
    tr.appendChild(tdCheck);
    
    // No Col
    const tdNo = document.createElement('td');
    tdNo.className = 'text-center';
    tdNo.innerText = idx + 1;
    tr.appendChild(tdNo);
    
    // Mission Col
    const tdMission = document.createElement('td');
    tdMission.innerText = item.mission;
    tdMission.style.cursor = 'pointer';
    tdMission.addEventListener('click', () => {
      chk.checked = !chk.checked;
      toggleBucketItem(idx, chk.checked);
    });
    tr.appendChild(tdMission);
    
    // Date Col
    const tdDate = document.createElement('td');
    tdDate.className = 'text-center';
    tdDate.innerText = item.date || '-';
    tr.appendChild(tdDate);
    
    elements.tbodyBucket.appendChild(tr);
  });
}

// ----------------------------------------------------
// 3. Calculation & Stats Engines
// ----------------------------------------------------

function calculateDDay(dateStr) {
  if (!dateStr) return '-';
  const target = new Date(dateStr + 'T00:00:00');
  if (isNaN(target.getTime())) return '-';
  
  // Normalize dates to midnight
  const today = new Date();
  today.setHours(0,0,0,0);
  target.setHours(0,0,0,0);
  
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'D-Day';
  } else if (diffDays > 0) {
    return `D-${diffDays}`;
  } else {
    return `D+${Math.abs(diffDays)}`;
  }
}

// GPA Calculation logic
function calculateGpaSummary() {
  let totalCredits = 0;
  let totalGpCredits = 0;
  let weightedGpSum = 0;
  
  const is4_5Scale = state.gpaStandard === '4.5';
  
  state.gpaRows.forEach(row => {
    const credits = parseFloat(row.credits);
    if (isNaN(credits) || credits <= 0) return;
    
    totalCredits += credits;
    
    if (row.isPassFail === 'Yes' || row.grade === 'P' || row.grade === 'NP') {
      // Pass/Fail subject: skip GPA weighting, but counts towards credits if 'P'
      return;
    }
    
    const gp = parseFloat(row.gp);
    if (!isNaN(gp) && row.grade !== '') {
      totalGpCredits += credits;
      weightedGpSum += (gp * credits);
    }
  });
  
  const avgGpa = totalGpCredits > 0 ? (weightedGpSum / totalGpCredits) : 0.00;
  
  elements.gpaTotalCredits.innerText = `${totalCredits} 학점`;
  elements.gpaAvgGpa.innerText = avgGpa.toFixed(2);
  
  // Custom motivating comments
  let comment = '';
  if (avgGpa >= 4.3) {
    comment = '와우! 수석 대기 중이신가요? 대단합니다! 🌟';
  } else if (avgGpa >= 4.0) {
    comment = '매우 우수한 성적입니다. A학점 릴레이 최고! 🚀';
  } else if (avgGpa >= 3.5) {
    comment = '훌륭해요! 조금만 더 하면 전액 장학금도 가능! 🎓';
  } else if (avgGpa >= 3.0) {
    comment = '준수합니다. 한 학기 동안 열심히 달리셨네요! 👍';
  } else if (avgGpa > 0) {
    comment = '고생 많으셨어요! 신입생 첫 학기, 아직 기회는 많습니다! 💪';
  } else {
    comment = '학점 등급을 입력하여 본인의 평점을 계산해 보세요.';
  }
  elements.gpaSummaryNote.innerText = comment;
  
  // Sync to GPA KPI card
  elements.kpiGpaVal.innerText = avgGpa.toFixed(2);
  elements.kpiGpaMax.innerText = `/ ${is4_5Scale ? '4.50' : '4.30'}`;
  
  let gpaStatusText = '학점 입력 대기';
  if (avgGpa > 0) {
    gpaStatusText = avgGpa >= 3.5 ? '장학금 수혜 안정권! 🎉' : '목표 달성을 향해 전진!';
  }
  elements.kpiGpaStatus.innerText = gpaStatusText;
  if (avgGpa >= 3.5) {
    elements.kpiGpaStatus.className = 'kpi-trend positive';
  } else if (avgGpa > 0 && avgGpa < 2.0) {
    elements.kpiGpaStatus.className = 'kpi-trend negative';
    elements.kpiGpaStatus.innerText = '학사경고 주의! ⚠️';
  } else {
    elements.kpiGpaStatus.className = 'kpi-subtext';
  }
}

// Convert Letter Grade to GP Value
function convertGradeToGP(grade, is4_5Scale) {
  if (is4_5Scale) {
    switch (grade) {
      case 'A+': return 4.5;
      case 'A0': return 4.0;
      case 'B+': return 3.5;
      case 'B0': return 3.0;
      case 'C+': return 2.5;
      case 'C0': return 2.0;
      case 'D+': return 1.5;
      case 'D0': return 1.0;
      case 'F': return 0.0;
      default: return 0.0;
    }
  } else {
    // 4.3 Scale
    switch (grade) {
      case 'A+': return 4.3;
      case 'A0': return 4.0;
      case 'B+': return 3.3;
      case 'B0': return 3.0;
      case 'C+': return 2.3;
      case 'C0': return 2.0;
      case 'D+': return 1.3;
      case 'D0': return 1.0;
      case 'F': return 0.0;
      default: return 0.0;
    }
  }
}

// Update all indicators on the top dashboard
function updateDashboard() {
  // 1. GPA Update (already handled by calculateGpaSummary, but triggers it just in case)
  calculateGpaSummary();
  
  // 2. Credits Update
  let totalCredits = 0;
  // Use GPA table's credits as source of truth for enrolled subjects
  state.gpaRows.forEach(row => {
    const cr = parseFloat(row.credits);
    if (!isNaN(cr)) totalCredits += cr;
  });
  elements.kpiCreditsVal.innerText = totalCredits;
  const target = state.profile.targetCredits || 18;
  if (document.activeElement !== elements.kpiCreditsTarget) {
    elements.kpiCreditsTarget.innerText = `/ ${target} 학점`;
  }
  const creditPct = Math.min(100, Math.round((totalCredits / target) * 100));
  elements.kpiCreditsProgress.style.width = `${creditPct}%`;
  
  // 3. Task Progress
  const totalTasks = state.syllabusRows.length;
  const completedTasks = state.syllabusRows.filter(r => r.status === '완료').length;
  const taskPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  elements.kpiTasksPct.innerText = `${taskPct}%`;
  elements.kpiTasksRatio.innerText = `(${completedTasks}/${totalTasks} 완료)`;
  elements.kpiTasksProgress.style.width = `${taskPct}%`;
  
  // 4. Bucket List Progress
  const totalBucket = state.bucketList.length;
  const completedBucket = state.bucketList.filter(b => b.completed).length;
  const bucketPct = totalBucket > 0 ? Math.round((completedBucket / totalBucket) * 100) : 0;
  elements.kpiBucketPct.innerText = `${bucketPct}%`;
  elements.kpiBucketRatio.innerText = `(${completedBucket}/${totalBucket} 달성)`;
  
  let bucketMsg = '한번 뿐인 1학년, 즐겁게!';
  if (bucketPct >= 80) bucketMsg = '프로 신입생! 낭만 충만 🌸';
  else if (bucketPct >= 50) bucketMsg = '인싸 라이프 진행 중! 😎';
  else if (bucketPct >= 20) bucketMsg = '하나씩 달성하는 보람! 🎈';
  elements.kpiBucketMessage.innerText = bucketMsg;
  
  // 5. Welcome Banner Next D-Day
  let nextEvent = null;
  let minDiff = Infinity;
  
  state.syllabusRows.forEach(row => {
    if (!row.date || row.status === '완료') return;
    
    const targetDate = new Date(row.date + 'T00:00:00');
    if (isNaN(targetDate.getTime())) return;
    
    const today = new Date();
    today.setHours(0,0,0,0);
    targetDate.setHours(0,0,0,0);
    
    const diff = targetDate.getTime() - today.getTime();
    if (diff >= 0 && diff < minDiff) {
      minDiff = diff;
      nextEvent = row;
    }
  });
  
  if (nextEvent) {
    const days = Math.ceil(minDiff / (1000 * 60 * 60 * 24));
    const ddayStr = days === 0 ? 'D-Day' : `D-${days}`;
    elements.dashboardDday.innerHTML = `<i class="fa-solid fa-hourglass-half"></i> 가장 가까운 일정: <strong>${nextEvent.subject} - ${nextEvent.task} (${ddayStr})</strong>`;
    elements.dashboardDday.style.backgroundColor = '#fde7e9';
    elements.dashboardDday.style.color = '#a80000';
  } else {
    elements.dashboardDday.innerHTML = `<i class="fa-solid fa-calendar-check"></i> 다가오는 학업 일정이 없습니다.`;
    elements.dashboardDday.style.backgroundColor = '#dff6dd';
    elements.dashboardDday.style.color = '#107c41';
  }
}

// ----------------------------------------------------
// 4. Excel Cell Interactive Editing Logic
// ----------------------------------------------------

function selectCell(tableId, element, rowIndex, colIndex) {
  // Clear old selection
  if (selectedCell) {
    selectedCell.element.classList.remove('selected');
  }
  
  // Set new selection
  selectedCell = {
    tableId,
    rowIndex,
    colIndex,
    element
  };
  
  element.classList.add('selected');
  
  // Calculate Excel Cell ID (e.g. B2)
  const colLetter = String.fromCharCode(65 + colIndex); // 0 = A, 1 = B
  const excelId = `${colLetter}${rowIndex + 1}`;
  elements.activeCellId.innerText = excelId;
  
  // Update Formula Bar text
  let cellText = '';
  const fieldName = element.dataset.field;
  
  if (tableId === 'table-syllabus') {
    cellText = state.syllabusRows[rowIndex][fieldName] || '';
  } else if (tableId === 'table-gpa') {
    cellText = state.gpaRows[rowIndex][fieldName] || '';
  }
  
  elements.formulaInput.value = cellText;
  elements.formulaInput.removeAttribute('readonly');
}

function startEditingCell(td) {
  if (td.classList.contains('editing')) return;
  
  const field = td.dataset.field;
  if (field === 'No' || field === 'dday' || field === 'gp') return; // Read-only cols
  
  td.classList.add('editing');
  
  const tableId = selectedCell.tableId;
  const rowIdx = selectedCell.rowIndex;
  let val = '';
  
  if (tableId === 'table-syllabus') {
    val = state.syllabusRows[rowIdx][field];
  } else if (tableId === 'table-gpa') {
    val = state.gpaRows[rowIdx][field];
  }
  
  td.innerHTML = '';
  
  let inputElement;
  
  // Match Dropdowns or date pickers depending on field
  if (field === 'type') {
    // Subject Type selector
    inputElement = document.createElement('select');
    const options = ['전공필수', '전공선택', '교양필수', '교양선택', '일반선택'];
    options.forEach(opt => {
      const o = document.createElement('option');
      o.value = opt;
      o.innerText = opt;
      if (opt === val) o.selected = true;
      inputElement.appendChild(o);
    });
  } else if (field === 'status') {
    // Task Status
    inputElement = document.createElement('select');
    const options = ['미시작', '진행중', '완료', '시험'];
    options.forEach(opt => {
      const o = document.createElement('option');
      o.value = opt;
      o.innerText = opt;
      if (opt === val) o.selected = true;
      inputElement.appendChild(o);
    });
  } else if (field === 'grade') {
    // Grade Letter
    inputElement = document.createElement('select');
    const options = ['A+', 'A0', 'B+', 'B0', 'C+', 'C0', 'D+', 'D0', 'F', 'P', 'NP', ''];
    options.forEach(opt => {
      const o = document.createElement('option');
      o.value = opt;
      o.innerText = opt || '(성적 선택)';
      if (opt === val) o.selected = true;
      inputElement.appendChild(o);
    });
  } else if (field === 'isPassFail') {
    // Pass/Fail marker
    inputElement = document.createElement('select');
    const options = ['No', 'Yes'];
    options.forEach(opt => {
      const o = document.createElement('option');
      o.value = opt;
      o.innerText = opt;
      if (opt === val) o.selected = true;
      inputElement.appendChild(o);
    });
  } else if (field === 'date') {
    // Date picker
    inputElement = document.createElement('input');
    inputElement.type = 'date';
    inputElement.value = val || '';
  } else if (field === 'credits' || field === 'weight' || field === 'score') {
    // Numeric inputs
    inputElement = document.createElement('input');
    inputElement.type = 'number';
    inputElement.value = val;
  } else {
    // Normal Text
    inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = val || '';
  }
  
  td.appendChild(inputElement);
  inputElement.focus();
  
  // Event listeners for finishing edit
  inputElement.addEventListener('blur', () => finishEditingCell(td, inputElement.value));
  inputElement.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      finishEditingCell(td, inputElement.value);
    } else if (e.key === 'Escape') {
      // Cancel changes
      td.classList.remove('editing');
      td.innerHTML = '';
      if (tableId === 'table-syllabus') {
        if (field === 'status') {
          const badge = document.createElement('span');
          badge.className = `status-badge ${getStatusClass(val)}`;
          badge.innerText = val || '미시작';
          td.appendChild(badge);
        } else {
          td.innerText = val !== undefined ? val : '';
        }
      } else if (tableId === 'table-gpa') {
        td.innerText = val !== undefined ? val : '';
      }
    }
  });
}

function finishEditingCell(td, newValue) {
  if (!td.classList.contains('editing')) return;
  td.classList.remove('editing');
  
  const field = td.dataset.field;
  const tableId = selectedCell.tableId;
  const rowIdx = selectedCell.rowIndex;
  
  // Format numeric values
  let formattedValue = newValue;
  if (field === 'credits' || field === 'weight' || field === 'score') {
    formattedValue = newValue === '' ? '' : Number(newValue);
  }
  
  // Save to state
  if (tableId === 'table-syllabus') {
    state.syllabusRows[rowIdx][field] = formattedValue;
    
    // Auto-update GP calculation if credit has changed in GPA table (if synced)
    // For now, let's render the changes
    renderSyllabusTable();
    
    // Auto-render Timetable if schedule is modified
    if (field === 'schedule' || field === 'subject' || field === 'professor') {
      renderTimetable();
    }
  } else if (tableId === 'table-gpa') {
    state.gpaRows[rowIdx][field] = formattedValue;
    
    // If grade is changed, auto-calculate Grade Point (GP)
    if (field === 'grade') {
      const gp = convertGradeToGP(formattedValue, state.gpaStandard === '4.5');
      state.gpaRows[rowIdx].gp = gp;
    }
    renderGpaTable();
  }
  
  saveData();
  updateDashboard();
  
  // Re-select cell to maintain formula bar & focus visual
  // Find the exact cell element again because table was re-rendered
  const updatedTable = document.getElementById(tableId);
  const updatedTd = updatedTable.querySelector(`tbody tr[data-index="${rowIdx}"] td[data-field="${field}"]`);
  if (updatedTd) {
    selectCell(tableId, updatedTd, rowIdx, selectedCell.colIndex);
  }
}

// ----------------------------------------------------
// 5. App Event Handlers
// ----------------------------------------------------

function setupEventListeners() {
  // Profile Editable Fields Event Listeners
  if (elements.welcomeAvatar) {
    elements.welcomeAvatar.addEventListener('click', () => {
      const currentEmoji = state.profile ? state.profile.emoji : '🌸';
      const newEmoji = prompt('새로운 프로필 이모지를 입력해 주세요 (한 글자):', currentEmoji);
      if (newEmoji && newEmoji.trim() !== '') {
        const char = Array.from(newEmoji.trim())[0];
        if (!state.profile) state.profile = {};
        state.profile.emoji = char;
        saveData();
        renderProfile();
        updateDashboard();
      }
    });
    
    elements.welcomeAvatar.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        elements.welcomeAvatar.click();
      }
    });
  }

  const makeProfileFieldEditable = (element, fieldName) => {
    if (!element) return;
    element.addEventListener('blur', () => {
      if (!state.profile) state.profile = {};
      state.profile[fieldName] = element.innerText.trim();
      saveData();
      updateDashboard();
    });
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        element.blur();
      }
    });
  };

  makeProfileFieldEditable(elements.profileDept, 'dept');
  makeProfileFieldEditable(elements.profileName, 'name');
  makeProfileFieldEditable(elements.profileQuote, 'quote');

  if (elements.kpiCreditsTarget) {
    elements.kpiCreditsTarget.addEventListener('focus', () => {
      elements.kpiCreditsTarget.innerText = state.profile.targetCredits || 18;
    });
    elements.kpiCreditsTarget.addEventListener('blur', () => {
      const raw = elements.kpiCreditsTarget.innerText.trim();
      const parsed = parseInt(raw, 10);
      if (!isNaN(parsed) && parsed > 0) {
        if (!state.profile) state.profile = {};
        state.profile.targetCredits = parsed;
      }
      saveData();
      updateDashboard();
    });
    elements.kpiCreditsTarget.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        elements.kpiCreditsTarget.blur();
      }
    });
  }

  // Theme selection change
  elements.themeSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
  });
  
  // GPA Standard Scale change
  elements.gpaStandard.addEventListener('change', (e) => {
    state.gpaStandard = e.target.value;
    
    // Re-evaluate GP for all GPA rows
    state.gpaRows.forEach(row => {
      row.gp = convertGradeToGP(row.grade, state.gpaStandard === '4.5');
    });
    
    saveData();
    renderGpaTable();
  });
  
  // Tab Switching
  elements.tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;
      
      // Update Tab class
      elements.tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update Sheet View class
      elements.contents.forEach(c => c.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');
      
      // Clear active selection
      if (selectedCell) {
        selectedCell.element.classList.remove('selected');
        selectedCell = null;
      }
      elements.activeCellId.innerText = 'A1';
      elements.formulaInput.value = '';
      elements.formulaInput.setAttribute('readonly', 'true');
    });
    
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        tab.click();
      }
    });
  });
  
  // Edit Formula Bar event
  elements.formulaInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && selectedCell) {
      const td = selectedCell.element;
      finishEditingCell(td, elements.formulaInput.value);
      elements.formulaInput.blur();
    }
  });
  
  // Syllabus Action Buttons
  elements.btnAddSyllabusRow.addEventListener('click', () => {
    const nextId = state.syllabusRows.length > 0 ? Math.max(...state.syllabusRows.map(r => r.id)) + 1 : 1;
    state.syllabusRows.push({
      id: nextId,
      subject: '새 수강 과목',
      type: '교양선택',
      credits: 3,
      schedule: '',
      professor: '',
      task: '과제 1',
      weight: 10,
      date: '',
      status: '미시작',
      score: '',
      notes: ''
    });
    saveData();
    renderSyllabusTable();
    updateDashboard();
  });
  
  elements.btnDeleteSyllabusRow.addEventListener('click', () => {
    if (!selectedCell || selectedCell.tableId !== 'table-syllabus') {
      alert('삭제할 행의 셀을 클릭하여 선택해 주세요.');
      return;
    }
    const idx = selectedCell.rowIndex;
    state.syllabusRows.splice(idx, 1);
    
    selectedCell = null;
    saveData();
    renderSyllabusTable();
    renderTimetable();
    updateDashboard();
  });
  
  // GPA Action Buttons
  elements.btnAddGpaRow.addEventListener('click', () => {
    const nextId = state.gpaRows.length > 0 ? Math.max(...state.gpaRows.map(r => r.id)) + 1 : 1;
    state.gpaRows.push({
      id: nextId,
      subject: '새 수강 과목',
      type: '교양필수',
      credits: 3,
      grade: '',
      gp: 0,
      isPassFail: 'No',
      notes: ''
    });
    saveData();
    renderGpaTable();
    updateDashboard();
  });
  
  elements.btnDeleteGpaRow.addEventListener('click', () => {
    if (!selectedCell || selectedCell.tableId !== 'table-gpa') {
      alert('삭제할 행의 셀을 클릭하여 선택해 주세요.');
      return;
    }
    const idx = selectedCell.rowIndex;
    state.gpaRows.splice(idx, 1);
    
    selectedCell = null;
    saveData();
    renderGpaTable();
    updateDashboard();
  });
  
  // TimeTable Sync Button
  elements.btnSyncTimetable.addEventListener('click', () => {
    renderTimetable();
    alert('계획표 시트의 강의 데이터를 시간표와 다시 동기화했습니다!');
  });
  
  // Notes Auto-save logic
  let notesTimeout;
  elements.freeNotes.addEventListener('input', () => {
    elements.notesSaveStatus.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 저장 중...';
    elements.notesSaveStatus.style.color = '#e74c3c';
    
    clearTimeout(notesTimeout);
    notesTimeout = setTimeout(() => {
      state.notes = elements.freeNotes.value;
      saveData();
      elements.notesSaveStatus.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> 자동 저장됨';
      elements.notesSaveStatus.style.color = 'var(--excel-green)';
    }, 1000);
  });
  
  // Reset Button
  elements.btnReset.addEventListener('click', () => {
    if (confirm('정말로 플래너를 리셋하시겠습니까?\n작성 중이던 모든 데이터가 지워지고 신입생 기본 템플릿으로 초기화됩니다.')) {
      loadDefaults();
      init();
    }
  });
  
  // Print Button
  elements.btnPrint.addEventListener('click', () => {
    window.print();
  });
  
  // Export CSV Action
  elements.btnExportCsv.addEventListener('click', () => {
    // Find active content
    const activeTab = document.querySelector('.sheet-tab.active');
    const target = activeTab.dataset.target;
    
    let csvContent = '\uFEFF'; // UTF-8 BOM
    let filename = 'college_planner.csv';
    
    if (target === 'sheet-syllabus') {
      filename = '수강과목_및_평가계획.csv';
      const headers = ['No', '과목명', '이수구분', '학점', '요일 및 교시', '교수명', '평가/과제 항목', '반영비율(%)', '일정/마감일', '진행상황', '취득점수', '비고'];
      csvContent += headers.map(h => `"${h}"`).join(',') + '\n';
      
      state.syllabusRows.forEach((row, i) => {
        const rowData = [
          i + 1,
          row.subject || '',
          row.type || '',
          row.credits || 0,
          row.schedule || '',
          row.professor || '',
          row.task || '',
          row.weight || 0,
          row.date || '',
          row.status || '미시작',
          row.score || '',
          row.notes || ''
        ];
        csvContent += rowData.map(val => `"${val}"`).join(',') + '\n';
      });
    } else if (target === 'sheet-gpa') {
      filename = '예상_학점_계산기.csv';
      const headers = ['No', '과목명', '이수구분', '학점', '성적등급', '평점', 'Pass/Fail 여부', '비고'];
      csvContent += headers.map(h => `"${h}"`).join(',') + '\n';
      
      state.gpaRows.forEach((row, i) => {
        const rowData = [
          i + 1,
          row.subject || '',
          row.type || '',
          row.credits || 0,
          row.grade || '',
          row.gp !== undefined ? Number(row.gp).toFixed(2) : '0.00',
          row.isPassFail || 'No',
          row.notes || ''
        ];
        csvContent += rowData.map(val => `"${val}"`).join(',') + '\n';
      });
    } else if (target === 'sheet-checklist') {
      filename = '새내기_버킷리스트.csv';
      const headers = ['No', '달성여부', '미션내용', '달성일자'];
      csvContent += headers.map(h => `"${h}"`).join(',') + '\n';
      
      state.bucketList.forEach((item, i) => {
        const rowData = [
          i + 1,
          item.completed ? '완료' : '미완료',
          item.mission || '',
          item.date || ''
        ];
        csvContent += rowData.map(val => `"${val}"`).join(',') + '\n';
      });
    } else {
      alert('이 시트는 CSV 내보내기를 지원하지 않습니다.');
      return;
    }
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
  
  // Backup JSON Download
  elements.btnExportJson = document.getElementById('btn-export-json');
  elements.btnExportJson.addEventListener('click', () => {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `freshman_planner_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
  
  // Backup JSON Upload triggers
  elements.btnImportJson.addEventListener('click', () => {
    elements.fileInputJson.click();
  });
  
  elements.fileInputJson.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(evt) {
      try {
        const importedData = JSON.parse(evt.target.result);
        
        // Simple validation checks
        if (Array.isArray(importedData.syllabusRows) && Array.isArray(importedData.gpaRows) && Array.isArray(importedData.bucketList)) {
          // Open Modal for Confirmation
          elements.modalImport.classList.add('active');
          
          // Store pending import data temporarily on modal box
          elements.modalImport.dataset.pendingData = evt.target.result;
        } else {
          alert('가져오기 실패: 올바른 플래너 백업 파일 형식이 아닙니다.');
        }
      } catch (err) {
        alert('파일을 읽는 도중 오류가 발생했습니다. 올바른 JSON 형식인지 확인해 주세요.');
      }
    };
    reader.readAsText(file);
    
    // Reset file input value to allow triggering change on same file
    elements.fileInputJson.value = '';
  });
  
  // Modal Actions
  elements.btnImportConfirm.addEventListener('click', () => {
    const jsonStr = elements.modalImport.dataset.pendingData;
    if (jsonStr) {
      state = JSON.parse(jsonStr);
      saveData();
      init();
      elements.modalImport.classList.remove('active');
      delete elements.modalImport.dataset.pendingData;
      alert('성공적으로 데이터를 복원했습니다!');
    }
  });
  
  elements.btnImportCancel.addEventListener('click', () => {
    elements.modalImport.classList.remove('active');
    delete elements.modalImport.dataset.pendingData;
  });
  
  // Close modals when clicking outside the box
  elements.modalImport.addEventListener('click', (e) => {
    if (e.target === elements.modalImport) {
      elements.modalImport.classList.remove('active');
      delete elements.modalImport.dataset.pendingData;
    }
  });
  
  // Keyboard listeners for cell navigation
  document.addEventListener('keydown', (e) => {
    // Alt + 1/2/3/4 to switch tabs
    if (e.altKey && e.key >= '1' && e.key <= '4') {
      const tabIdx = parseInt(e.key, 10) - 1;
      if (elements.tabs[tabIdx]) {
        e.preventDefault();
        elements.tabs[tabIdx].click();
        elements.tabs[tabIdx].focus();
      }
      return;
    }

    // Don't intercept keyboard navigation inside inputs, textareas or contenteditable profile cards
    if (document.activeElement && (
        document.activeElement.tagName === 'INPUT' || 
        document.activeElement.tagName === 'TEXTAREA' || 
        document.activeElement.contentEditable === 'true')) {
      return;
    }

    if (!selectedCell || document.querySelector('.editing')) return;
    
    const tableId = selectedCell.tableId;
    const rowIdx = selectedCell.rowIndex;
    const colIdx = selectedCell.colIndex;
    
    let nextRow = rowIdx;
    let nextCol = colIdx;
    
    let maxRows = 0;
    let maxCols = 0;
    let colsArray = [];
    
    if (tableId === 'table-syllabus') {
      maxRows = state.syllabusRows.length;
      maxCols = syllabusCols.length - 1;
      colsArray = syllabusCols;
    } else if (tableId === 'table-gpa') {
      maxRows = state.gpaRows.length;
      maxCols = gpaCols.length - 1;
      colsArray = gpaCols;
    } else {
      return;
    }
    
    if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey) {
        // Shift + Tab -> Go Left
        nextCol = colIdx - 1;
        if (nextCol < 1) { // col 0 is row header
          nextCol = maxCols;
          nextRow = rowIdx - 1;
          if (nextRow < 0) nextRow = maxRows - 1;
        }
      } else {
        // Tab -> Go Right
        nextCol = colIdx + 1;
        if (nextCol > maxCols) {
          nextCol = 1;
          nextRow = rowIdx + 1;
          if (nextRow >= maxRows) nextRow = 0;
        }
      }
    } else if (e.key === 'ArrowUp') {
      nextRow = Math.max(0, rowIdx - 1);
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      nextRow = Math.min(maxRows - 1, rowIdx + 1);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      nextCol = Math.max(1, colIdx - 1);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      nextCol = Math.min(maxCols, colIdx + 1);
      e.preventDefault();
    } else if (e.key === 'Enter' || e.key === 'F2') {
      // Direct typing shortcut
      const cell = selectedCell.element;
      startEditingCell(cell);
      e.preventDefault();
      return;
    } else {
      return;
    }
    
    if (nextRow !== rowIdx || nextCol !== colIdx) {
      const table = document.getElementById(tableId);
      const field = colsArray[nextCol];
      const targetCell = table.querySelector(`tbody tr[data-index="${nextRow}"] td[data-field="${field}"]`);
      if (targetCell) {
        selectCell(tableId, targetCell, nextRow, nextCol);
      }
    }
  });
}

function applyTheme(themeName) {
  document.body.className = '';
  document.body.classList.add(themeName);
  state.theme = themeName;
  saveData();
}

function toggleBucketItem(index, isCompleted) {
  state.bucketList[index].completed = isCompleted;
  
  if (isCompleted) {
    // Set completion date to today
    const todayStr = new Date().toISOString().slice(0, 10);
    state.bucketList[index].date = todayStr;
  } else {
    state.bucketList[index].date = '';
  }
  
  saveData();
  renderBucketListTable();
  updateDashboard();
}

// Start application
window.addEventListener('DOMContentLoaded', init);
