let workers = [];

function signInWorker() {
    const workerName = document.getElementById('worker-name').value;
    const classDept = document.getElementById('class').value;
    const date = document.getElementById('date').value;
    const academicYear = document.getElementById('academic-year').value;
    const signInTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (!workerName || !classDept || !date || !academicYear) {
        alert('Please fill out all fields');
        return;
    }

    const worker = {
        workerName,
        classDept,
        date,
        academicYear,
        signInTime,
        signOutTime: null,
        totalHours: null
    };

    workers.push(worker);

    document.getElementById('sign-in-form').reset();
    alert('Worker signed in successfully');
    updateSignInTable();
}

function signOutWorker(index) {
    const signOutTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    workers[index].signOutTime = signOutTime;

    const signInTime = new Date(`01/01/1970 ${workers[index].signInTime}`);
    const signOutDateTime = new Date(`01/01/1970 ${signOutTime}`);
    const totalHours = (signOutDateTime - signInTime) / (1000 * 60 * 60); // Convert milliseconds to hours

    workers[index].totalHours = totalHours.toFixed(2); // Rounded to 2 decimal places

    updateSignInTable();
}

function updateSignInTable() {
    const signInTableBody = document.querySelector('#sign-in-table tbody');
    signInTableBody.innerHTML = '';  // Clear existing records

    workers.forEach((worker, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${worker.workerName}</td>
            <td>${worker.classDept}</td>
            <td>${worker.date}</td>
            <td>${worker.academicYear}</td>
            <td>${worker.signInTime}</td>
            <td>
                ${worker.signOutTime ? worker.signOutTime : `<button onclick="signOutWorker(${index})">Sign Out</button>`}
            </td>
            <td>${worker.totalHours ? worker.totalHours : ''}</td>
        `;
        signInTableBody.appendChild(row);
    });
}

function saveToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("School Sign-In Records", 20, 10);
    doc.autoTable({ html: '#sign-in-table' });

    doc.save('sign_in_records.pdf');
}
