function adminLogin() {
    const user = document.getElementById("adminUser").value;
    const pass = document.getElementById("adminPass").value;

    if (user === "admin" && pass === "1234") {
        localStorage.setItem("admin", "true");
        window.location.href = "admin.html";
    } else {
        document.getElementById("adminError").innerText = "Invalid Admin Login";
    }
}

if (location.pathname.includes("admin.html")) {
    if (localStorage.getItem("admin") !== "true") {
        window.location.href = "admin-login.html";
    }
}

let students = JSON.parse(localStorage.getItem("students")) || [];
let rooms = JSON.parse(localStorage.getItem("rooms")) || [];
let fees = JSON.parse(localStorage.getItem("fees")) || [];
let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

/* STUDENTS */
function addStudent() {
    const student = {
        id: document.getElementById("id").value.trim(),
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        room_id: document.getElementById("room").value.trim(),
        fee_status: document.getElementById("fee").value.trim()
    };

    if (!student.id || !student.name) {
        alert("Enter Student ID and Name");
        return;
    }

    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    clearStudentForm();
    displayStudents();
}

function displayStudents() {
    const list = document.getElementById("studentList");
    if (!list) return;

    list.innerHTML = "";

    students.forEach((s, index) => {
        list.innerHTML += `
            <li>
                <b>${s.id}</b> - ${s.name} - ${s.email} - Room: ${s.room_id} - Fee: ${s.fee_status}
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </li>
        `;
    });
}

function editStudent(index) {
    const s = students[index];

    document.getElementById("studentEditIndex").value = index;
    document.getElementById("id").value = s.id;
    document.getElementById("name").value = s.name;
    document.getElementById("email").value = s.email;
    document.getElementById("room").value = s.room_id;
    document.getElementById("fee").value = s.fee_status;
}

function updateStudent() {
    const index = document.getElementById("studentEditIndex").value;

    if (index === "") {
        alert("Click Edit first");
        return;
    }

    students[index] = {
        id: document.getElementById("id").value.trim(),
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        room_id: document.getElementById("room").value.trim(),
        fee_status: document.getElementById("fee").value.trim()
    };

    localStorage.setItem("students", JSON.stringify(students));
    clearStudentForm();
    displayStudents();
    alert("Student updated successfully");
}

function deleteStudent(index) {
    if (confirm("Delete this student?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    }
}

function clearStudentForm() {
    document.getElementById("studentEditIndex").value = "";
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("room").value = "";
    document.getElementById("fee").value = "";
}

function generateStudents() {
    if (students.length > 0) {
        alert("Students already exist");
        return;
    }

    const names = ["Rahul", "Amit", "Kiran", "Sneha", "Priya", "Arjun", "Ravi", "Meena"];

    for (let i = 1; i <= 200; i++) {
        students.push({
            id: "S" + (1000 + i),
            name: names[Math.floor(Math.random() * names.length)] + " " + i,
            email: "student" + i + "@gmail.com",
            room_id: "R" + ((i % 20) + 1),
            fee_status: Math.random() > 0.5 ? "Paid" : "Pending"
        });
    }

    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
    alert("200 students generated");
}

/* ROOMS */
function addRoom() {
    const room = {
        room_id: document.getElementById("room_id").value.trim(),
        capacity: document.getElementById("capacity").value.trim(),
        occupied: document.getElementById("occupied").value.trim()
    };

    if (!room.room_id) {
        alert("Enter Room ID");
        return;
    }

    rooms.push(room);
    localStorage.setItem("rooms", JSON.stringify(rooms));
    clearRoomForm();
    displayRooms();
}

function displayRooms() {
    const list = document.getElementById("roomList");
    if (!list) return;

    list.innerHTML = "";

    rooms.forEach((r, index) => {
        list.innerHTML += `
            <li>
                Room ${r.room_id} | Capacity: ${r.capacity} | Occupied: ${r.occupied}
                <button onclick="editRoom(${index})">Edit</button>
                <button onclick="deleteRoom(${index})">Delete</button>
            </li>
        `;
    });
}

function editRoom(index) {
    const r = rooms[index];

    document.getElementById("roomEditIndex").value = index;
    document.getElementById("room_id").value = r.room_id;
    document.getElementById("capacity").value = r.capacity;
    document.getElementById("occupied").value = r.occupied;
}

function updateRoom() {
    const index = document.getElementById("roomEditIndex").value;

    if (index === "") {
        alert("Click Edit first");
        return;
    }

    rooms[index] = {
        room_id: document.getElementById("room_id").value.trim(),
        capacity: document.getElementById("capacity").value.trim(),
        occupied: document.getElementById("occupied").value.trim()
    };

    localStorage.setItem("rooms", JSON.stringify(rooms));
    clearRoomForm();
    displayRooms();
    alert("Room updated successfully");
}

function deleteRoom(index) {
    if (confirm("Delete this room?")) {
        rooms.splice(index, 1);
        localStorage.setItem("rooms", JSON.stringify(rooms));
        displayRooms();
    }
}

function clearRoomForm() {
    document.getElementById("roomEditIndex").value = "";
    document.getElementById("room_id").value = "";
    document.getElementById("capacity").value = "";
    document.getElementById("occupied").value = "";
}

/* FEES */
function addFee() {
    const fee = {
        student_id: document.getElementById("student_id_fee").value.trim(),
        amount: document.getElementById("amount").value.trim(),
        status: document.getElementById("status_fee").value.trim()
    };

    if (!fee.student_id) {
        alert("Enter Student ID for fee");
        return;
    }

    fees.push(fee);
    localStorage.setItem("fees", JSON.stringify(fees));
    clearFeeForm();
    displayFees();
}

function displayFees() {
    const list = document.getElementById("feeList");
    if (!list) return;

    list.innerHTML = "";

    fees.forEach((f, index) => {
        list.innerHTML += `
            <li>
                ${f.student_id} - ₹${f.amount} - ${f.status}
                <button onclick="editFee(${index})">Edit</button>
                <button onclick="deleteFee(${index})">Delete</button>
            </li>
        `;
    });
}

function editFee(index) {
    const f = fees[index];

    document.getElementById("feeEditIndex").value = index;
    document.getElementById("student_id_fee").value = f.student_id;
    document.getElementById("amount").value = f.amount;
    document.getElementById("status_fee").value = f.status;
}

function updateFee() {
    const index = document.getElementById("feeEditIndex").value;

    if (index === "") {
        alert("Click Edit first");
        return;
    }

    fees[index] = {
        student_id: document.getElementById("student_id_fee").value.trim(),
        amount: document.getElementById("amount").value.trim(),
        status: document.getElementById("status_fee").value.trim()
    };

    localStorage.setItem("fees", JSON.stringify(fees));
    clearFeeForm();
    displayFees();
    alert("Fee updated successfully");
}

function deleteFee(index) {
    if (confirm("Delete this fee record?")) {
        fees.splice(index, 1);
        localStorage.setItem("fees", JSON.stringify(fees));
        displayFees();
    }
}

function clearFeeForm() {
    document.getElementById("feeEditIndex").value = "";
    document.getElementById("student_id_fee").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("status_fee").value = "";
}

/* COMPLAINTS */
function addComplaint() {
    const complaint = {
        student_id: document.getElementById("student_id_comp").value.trim(),
        message: document.getElementById("message").value.trim(),
        status: document.getElementById("status_comp").value.trim()
    };

    if (!complaint.student_id || !complaint.message) {
        alert("Enter Student ID and Complaint Message");
        return;
    }

    complaints.push(complaint);
    localStorage.setItem("complaints", JSON.stringify(complaints));
    clearComplaintForm();
    displayComplaints();
}

function displayComplaints() {
    const list = document.getElementById("complaintList");
    if (!list) return;

    list.innerHTML = "";

    complaints.forEach((c, index) => {
        list.innerHTML += `
            <li>
                ${c.student_id} - ${c.message} - ${c.status}
                <button onclick="editComplaint(${index})">Edit</button>
                <button onclick="deleteComplaint(${index})">Delete</button>
            </li>
        `;
    });
}

function editComplaint(index) {
    const c = complaints[index];

    document.getElementById("complaintEditIndex").value = index;
    document.getElementById("student_id_comp").value = c.student_id;
    document.getElementById("message").value = c.message;
    document.getElementById("status_comp").value = c.status;
}

function updateComplaint() {
    const index = document.getElementById("complaintEditIndex").value;

    if (index === "") {
        alert("Click Edit first");
        return;
    }

    complaints[index] = {
        student_id: document.getElementById("student_id_comp").value.trim(),
        message: document.getElementById("message").value.trim(),
        status: document.getElementById("status_comp").value.trim()
    };

    localStorage.setItem("complaints", JSON.stringify(complaints));
    clearComplaintForm();
    displayComplaints();
    alert("Complaint updated successfully");
}

function deleteComplaint(index) {
    if (confirm("Delete this complaint?")) {
        complaints.splice(index, 1);
        localStorage.setItem("complaints", JSON.stringify(complaints));
        displayComplaints();
    }
}

function clearComplaintForm() {
    document.getElementById("complaintEditIndex").value = "";
    document.getElementById("student_id_comp").value = "";
    document.getElementById("message").value = "";
    document.getElementById("status_comp").value = "";
}

/* SEARCH */
function searchStudent() {
    const searchId = document.getElementById("searchId").value.trim();

    const s = students.find(x => x.id === searchId);
    const r = rooms.find(x => x.room_id === s?.room_id);
    const f = fees.find(x => x.student_id === searchId);
    const c = complaints.filter(x => x.student_id === searchId);

    const result = document.getElementById("result");

    if (s) {
        result.innerHTML = `
            <h3>${s.name}</h3>
            <p><b>ID:</b> ${s.id}</p>
            <p><b>Email:</b> ${s.email}</p>
            <p><b>Room:</b> ${s.room_id}</p>
            <p><b>Fee Status:</b> ${s.fee_status}</p>

            <h4>Room Details</h4>
            <p>Capacity: ${r?.capacity || "N/A"}</p>
            <p>Occupied: ${r?.occupied || "N/A"}</p>

            <h4>Fee Details</h4>
            <p>Amount: ₹${f?.amount || "N/A"}</p>
            <p>Status: ${f?.status || "N/A"}</p>

            <h4>Complaints</h4>
            ${c.length ? c.map(x => `<p>${x.message} - ${x.status}</p>`).join("") : "No complaints"}
        `;
    } else {
        result.innerHTML = "Student not found";
    }
}

function logout() {
    localStorage.removeItem("admin");
    window.location.href = "index.html";
}

if (location.pathname.includes("admin.html")) {
    displayStudents();
    displayRooms();
    displayFees();
    displayComplaints();
}
function loadChart() {

    const students = JSON.parse(localStorage.getItem("students")) || [];
    const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
    const fees = JSON.parse(localStorage.getItem("fees")) || [];
    const complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    const ctx = document.getElementById("myChart");

    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Students', 'Rooms', 'Fees', 'Complaints'],
            datasets: [{
                label: 'Total Count',
                data: [
                    students.length,
                    rooms.length,
                    fees.length,
                    complaints.length
                ],
                backgroundColor: [
                    '#3498db',
                    '#27ae60',
                    '#f39c12',
                    '#e74c3c'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}
if (location.pathname.includes("admin.html")) {
    displayStudents();
    displayRooms();
    displayFees();
    displayComplaints();
    loadChart();   // 👈 ADD THIS
}