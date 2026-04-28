// ===== ADMIN LOGIN =====
function adminLogin() {
    const user = document.getElementById("adminUser").value;
    const pass = document.getElementById("adminPass").value;

    if (user === "admin" && pass === "1234") {
        localStorage.setItem("admin", "true");
        window.location.href = "admin.html";
    } else {
        document.getElementById("error").innerText = "Invalid Username or Password";
    }
}
// ===== LOAD DATA =====
let students = JSON.parse(localStorage.getItem("students")) || [];

// ===== ADD STUDENT =====
function addStudent() {

    const student = {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        room_id: document.getElementById("room").value,
        fee_status: document.getElementById("fee").value
    };

    // validation
    if (!student.id || !student.name) {
        alert("Please fill all required fields");
        return;
    }

    students.push(student);

    // STORE IN LOCAL STORAGE
    localStorage.setItem("students", JSON.stringify(students));

    // CLEAR INPUTS
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("room").value = "";
    document.getElementById("fee").value = "";

    displayStudents();
}

// ===== DISPLAY STUDENTS =====
function displayStudents() {
    const list = document.getElementById("studentList");

    if (!list) return; // prevents error on login page

    list.innerHTML = "";

    students.forEach(s => {
        list.innerHTML += `
            <li>
                <b>${s.id}</b> - ${s.name} - ${s.email} - Room: ${s.room_id} - Fee: ${s.fee_status}
            </li>
        `;
    });
}

// ===== LOAD ON PAGE OPEN =====
displayStudents();

// STORAGE
let rooms = JSON.parse(localStorage.getItem("rooms")) || [];
let fees = JSON.parse(localStorage.getItem("fees")) || [];
let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

// ADD ROOM
function addRoom() {
    rooms.push({
        room_id: room_id.value,
        capacity: capacity.value,
        occupied: occupied.value
    });
    localStorage.setItem("rooms", JSON.stringify(rooms));
    displayRooms();
}

// ADD FEE
function addFee() {
    fees.push({
        student_id: student_id_fee.value,
        amount: amount.value,
        status: status_fee.value
    });
    localStorage.setItem("fees", JSON.stringify(fees));
    displayFees();
}

// ADD COMPLAINT
function addComplaint() {
    complaints.push({
        student_id: student_id_comp.value,
        message: message.value,
        status: status_comp.value
    });
    localStorage.setItem("complaints", JSON.stringify(complaints));
    displayComplaints();
}

// DISPLAY
function displayRooms() {
    roomList.innerHTML = rooms.map(r => `<li>${r.room_id} (${r.occupied}/${r.capacity})</li>`).join("");
}

function displayFees() {
    feeList.innerHTML = fees.map(f => `<li>${f.student_id} - ₹${f.amount}</li>`).join("");
}

function displayComplaints() {
    complaintList.innerHTML = complaints.map(c => `<li>${c.student_id}: ${c.message}</li>`).join("");
}

// SEARCH FULL DETAILS
function searchStudent() {
    const s = students.find(x => x.id === searchId.value);
    const r = rooms.find(x => x.room_id === s?.room_id);
    const f = fees.find(x => x.student_id === searchId.value);
    const c = complaints.filter(x => x.student_id === searchId.value);

    if (s) {
        result.innerHTML = `
        <h3>${s.name}</h3>
        <p>Email: ${s.email}</p>
        <p>Room: ${s.room_id}</p>
        <p>Fee Status: ${s.fee_status}</p>
        <p>Room Capacity: ${r?.capacity || "N/A"}</p>
        <p>Fee Amount: ${f?.amount || "N/A"}</p>
        ${c.map(x => `<p>Complaint: ${x.message}</p>`).join("")}
        `;
    } else {
        result.innerHTML = "Student not found";
    }
}
function logout() {
    localStorage.removeItem("admin");
    window.location.href = "index.html";
}
// GENERATE RANDOM STUDENTS
function generateStudents() {

    let students = JSON.parse(localStorage.getItem("students")) || [];

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

    alert("200 Students Generated Successfully ✅");
if (location.pathname.includes("admin.html")) {
    displayStudents();
}
; // refresh UI
}

// LOAD ALL
displayRooms();
displayFees();
displayComplaints();