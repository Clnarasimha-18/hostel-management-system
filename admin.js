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

function addStudent() {
    const student = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        room_id: document.getElementById("room").value,
        fee_status: document.getElementById("fee").value
    };

    if (!student.id || !student.name) {
        alert("Enter student ID and name");
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

    document.getElementById("editIndex").value = index;
    document.getElementById("id").value = s.id;
    document.getElementById("name").value = s.name;
    document.getElementById("email").value = s.email;
    document.getElementById("room").value = s.room_id;
    document.getElementById("fee").value = s.fee_status;
}

function updateStudent() {
    const index = document.getElementById("editIndex").value;

    if (index === "") {
        alert("Click Edit first");
        return;
    }

    students[index] = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        room_id: document.getElementById("room").value,
        fee_status: document.getElementById("fee").value
    };

    localStorage.setItem("students", JSON.stringify(students));

    clearStudentForm();
    displayStudents();

    alert("Student updated successfully");
}

function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    }
}

function clearStudentForm() {
    document.getElementById("editIndex").value = "";
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("room").value = "";
    document.getElementById("fee").value = "";
}

function generateStudents() {
    if (students.length > 0) {
        alert("Students already exist!");
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

    alert("200 Students Generated Successfully");
}

function addRoom() {
    rooms.push({
        room_id: document.getElementById("room_id").value,
        capacity: document.getElementById("capacity").value,
        occupied: document.getElementById("occupied").value
    });

    localStorage.setItem("rooms", JSON.stringify(rooms));
    displayRooms();
}

function displayRooms() {
    const list = document.getElementById("roomList");
    if (!list) return;

    list.innerHTML = "";

    rooms.forEach(r => {
        list.innerHTML += `
            <li>Room ${r.room_id} | Capacity: ${r.capacity} | Occupied: ${r.occupied}</li>
        `;
    });
}

function addFee() {
    fees.push({
        student_id: document.getElementById("student_id_fee").value,
        amount: document.getElementById("amount").value,
        status: document.getElementById("status_fee").value
    });

    localStorage.setItem("fees", JSON.stringify(fees));
    displayFees();
}

function displayFees() {
    const list = document.getElementById("feeList");
    if (!list) return;

    list.innerHTML = "";

    fees.forEach(f => {
        list.innerHTML += `
            <li>${f.student_id} - ₹${f.amount} - ${f.status}</li>
        `;
    });
}

function addComplaint() {
    complaints.push({
        student_id: document.getElementById("student_id_comp").value,
        message: document.getElementById("message").value,
        status: document.getElementById("status_comp").value
    });

    localStorage.setItem("complaints", JSON.stringify(complaints));
    displayComplaints();
}

function displayComplaints() {
    const list = document.getElementById("complaintList");
    if (!list) return;

    list.innerHTML = "";

    complaints.forEach(c => {
        list.innerHTML += `
            <li>${c.student_id} - ${c.message} - ${c.status}</li>
        `;
    });
}

function searchStudent() {
    const searchId = document.getElementById("searchId").value;

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