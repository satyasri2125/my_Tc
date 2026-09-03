let studentDatabase = JSON.parse(localStorage.getItem('adityaStudents')) || [];

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  
  if (isLoggedIn === 'true') {
    unlockApp();
  } else {
    lockApp();
  }
});

function handleLogin(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();

  if (user === "admin" && pass === "1234") {
    sessionStorage.setItem('isLoggedIn', 'true');
    document.getElementById('loginUser').value = '';
    document.getElementById('loginPass').value = '';
    unlockApp();
  } else {
    alert("Invalid Username or Password!");
  }
}

function lockApp() {
  document.querySelector('.layout').classList.add('locked');
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('loginSection').classList.add('active');
  
  const uField = document.getElementById('loginUser');
  const pField = document.getElementById('loginPass');
  if (uField) uField.value = '';
  if (pField) pField.value = '';
}

function unlockApp() {
  document.querySelector('.layout').classList.remove('locked');
  document.getElementById('loginSection').classList.remove('active');
  showSection('dashboard', document.querySelector('.sidebar li'));
  updateDashboardCount();
  populateDropdowns();
}

function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    sessionStorage.clear();
    localStorage.removeItem('isLoggedIn');
    lockApp();
  }
}

function showSection(id, element) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sidebar li').forEach(l => l.classList.remove('active'));

  const activePage = document.getElementById(id);
  if (activePage) {
    activePage.classList.add('active');
  }
  
  if (element) {
    element.classList.add('active');
  }

  if (id === 'records') {
    renderTable();
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const editIdx = parseInt(document.getElementById('editIndex').value);

  const studentData = {
    tcNo: editIdx >= 0 ? studentDatabase[editIdx].tcNo : 'TC-' + Math.floor(10000 + Math.random() * 90000),
    name: document.getElementById('name').value,
    roll: document.getElementById('roll').value,
    father: document.getElementById('father').value,
    mother: document.getElementById('mother').value,
    religion: document.getElementById('religion').value,
    caste: document.getElementById('caste').value,
    dob: document.getElementById('dob').value,
    course: document.getElementById('course').value,
    admission: document.getElementById('admission').value,
    leaving: document.getElementById('leaving').value,
    reason: document.getElementById('reason').value,
    conduct: document.getElementById('conduct').value,
    dues: document.getElementById('dues').value
  };

  if (editIdx >= 0) {
    studentDatabase[editIdx] = studentData;
    document.getElementById('editIndex').value = "-1";
    document.getElementById('formTitle').innerText = "Add Student Details";
    document.getElementById('saveBtn').innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Student Details';
  } else {
    studentDatabase.push(studentData);
  }

  localStorage.setItem('adityaStudents', JSON.stringify(studentDatabase));

  document.getElementById('studentForm').reset();
  updateDashboardCount();
  populateDropdowns();

  displaySelectedStudentTC(studentData.roll);
  showSection('tcSection', document.querySelectorAll('.sidebar li')[2]);
}

function updateDashboardCount() {
  const totalStudentsEl = document.getElementById('totalStudents');
  const totalCertsEl = document.getElementById('totalCerts');
  
  if (totalStudentsEl) totalStudentsEl.innerText = studentDatabase.length;
  if (totalCertsEl) totalCertsEl.innerText = studentDatabase.length * 3;
}

function populateDropdowns() {
  const dropdowns = [
    document.getElementById('tcStudentDropdown'),
    document.getElementById('studyStudentDropdown'),
    document.getElementById('conductStudentDropdown')
  ];

  dropdowns.forEach(dropdown => {
    if (!dropdown) return;
    dropdown.innerHTML = '<option value="">-- Select Student --</option>';
    studentDatabase.forEach(st => {
      dropdown.innerHTML += `<option value="${st.roll}">${st.roll} - ${st.name}</option>`;
    });
  });
}

function getTodayDate() {
  const today = new Date();
  return today.toLocaleDateString('en-GB');
}

function resetDropdown(selectBoxId, headerTitleId) {
  document.getElementById(selectBoxId).style.display = 'block';
  document.getElementById(headerTitleId).style.display = 'none';
}

function displaySelectedStudentTC(rollNo) {
  if (!rollNo) return;
  const st = studentDatabase.find(s => s.roll === rollNo);
  if (!st) return;

  document.getElementById('tcNo').innerText = st.tcNo || '';
  document.getElementById('tcName').innerText = st.name || '';
  document.getElementById('tcRoll').innerText = st.roll || '';
  document.getElementById('tcFather').innerText = st.father || '';
  document.getElementById('tcMother').innerText = st.mother || '';
  document.getElementById('tcReligion').innerText = st.religion || '';
  document.getElementById('tcCaste').innerText = st.caste || '';
  document.getElementById('tcDob').innerText = st.dob || '';
  document.getElementById('tcCourse').innerText = st.course || '';
  document.getElementById('tcAdmission').innerText = st.admission || '';
  document.getElementById('tcLeaving').innerText = st.leaving || '';
  document.getElementById('tcReason').innerText = st.reason || '';
  document.getElementById('tcConduct').innerText = st.conduct || '';
  document.getElementById('tcDues').innerText = st.dues || '';
  document.getElementById('tcDate').innerText = getTodayDate();

  document.getElementById('tcSelectBox').style.display = 'none';
  document.getElementById('tcHeadingText').innerText = `${st.name} (${st.roll})`;
  document.getElementById('tcHeaderTitle').style.display = 'flex';
}

function displaySelectedStudentStudy(rollNo) {
  if (!rollNo) return;
  const st = studentDatabase.find(s => s.roll === rollNo);
  if (!st) return;

  document.getElementById('stName').innerText = st.name || '';
  document.getElementById('stRoll').innerText = st.roll || '';
  document.getElementById('stFather').innerText = st.father || '';
  document.getElementById('stCourse').innerText = st.course || '';
  document.getElementById('stAdmission').innerText = st.admission || '';
  document.getElementById('stLeaving').innerText = st.leaving || '';
  document.getElementById('stDate').innerText = getTodayDate();

  document.getElementById('studySelectBox').style.display = 'none';
  document.getElementById('studyHeadingText').innerText = `${st.name} (${st.roll})`;
  document.getElementById('studyHeaderTitle').style.display = 'flex';
}

function displaySelectedStudentConduct(rollNo) {
  if (!rollNo) return;
  const st = studentDatabase.find(s => s.roll === rollNo);
  if (!st) return;

  document.getElementById('cdName').innerText = st.name || '';
  document.getElementById('cdRoll').innerText = st.roll || '';
  document.getElementById('cdCourse').innerText = st.course || '';
  document.getElementById('cdConduct').innerText = st.conduct || '';
  document.getElementById('cdDate').innerText = getTodayDate();

  document.getElementById('conductSelectBox').style.display = 'none';
  document.getElementById('conductHeadingText').innerText = `${st.name} (${st.roll})`;
  document.getElementById('conductHeaderTitle').style.display = 'flex';
}

function renderTable() {
  const tbody = document.getElementById('recordsBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  studentDatabase.forEach((st, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${st.roll}</td>
        <td>${st.name}</td>
        <td>${st.course}</td>
        <td>${st.conduct}</td>
        <td>
          <div class="btn-container">
            <button class="btn-view" onclick="viewStudentTC('${st.roll}')"><i class="fa-solid fa-eye"></i> View TC</button>
            <button class="btn-edit" onclick="editStudent(${index})"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="btn-delete" onclick="deleteStudent(${index})"><i class="fa-solid fa-trash"></i> Delete</button>
          </div>
        </td>
      </tr>
    `;
  });
}

function viewStudentTC(rollNo) {
  displaySelectedStudentTC(rollNo);
  showSection('tcSection', document.querySelectorAll('.sidebar li')[2]);
}

function editStudent(index) {
  const st = studentDatabase[index];

  document.getElementById('editIndex').value = index;
  document.getElementById('name').value = st.name;
  document.getElementById('roll').value = st.roll;
  document.getElementById('father').value = st.father;
  document.getElementById('mother').value = st.mother;
  document.getElementById('religion').value = st.religion;
  document.getElementById('caste').value = st.caste;
  document.getElementById('dob').value = st.dob;
  document.getElementById('course').value = st.course;
  document.getElementById('admission').value = st.admission;
  document.getElementById('leaving').value = st.leaving;
  document.getElementById('reason').value = st.reason;
  document.getElementById('conduct').value = st.conduct;
  document.getElementById('dues').value = st.dues;

  document.getElementById('formTitle').innerText = "Edit Student Details";
  document.getElementById('saveBtn').innerHTML = '<i class="fa-solid fa-rotate"></i> Update Student Details';

  showSection('addStudent', document.querySelectorAll('.sidebar li')[1]);
}

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student record?")) {
    studentDatabase.splice(index, 1);
    localStorage.setItem('adityaStudents', JSON.stringify(studentDatabase));
    updateDashboardCount();
    populateDropdowns();
    renderTable();
  }
}

function filterTable() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const rows = document.getElementById('recordsBody').getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    const roll = rows[i].getElementsByTagName('td')[0].innerText.toLowerCase();
    const name = rows[i].getElementsByTagName('td')[1].innerText.toLowerCase();

    if (roll.includes(input) || name.includes(input)) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}