// STUDENT LOGIN
function studentLogin() {
    const user = document.getElementById("studentUser").value;
    const pass = document.getElementById("studentPass").value;

    if (user === "" || pass === "") {
        document.getElementById("studentError").innerText = "Enter Student ID and Password";
        return;
    }

    if (pass === "1234") {
        localStorage.setItem("student", user);
        window.location.href = "student.html";
    } else {
        document.getElementById("studentError").innerText = "Invalid Student Login";
    }
}

// STUDENT DASHBOARD
if (location.pathname.includes("student.html")) {

    const studentId = localStorage.getItem("student");

    if (!studentId) {
        window.location.href = "index.html";
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];
    let rooms = JSON.parse(localStorage.getItem("rooms")) || [];
    let fees = JSON.parse(localStorage.getItem("fees")) || [];
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    const s = students.find(x => x.id === studentId);
    const r = rooms.find(x => x.room_id === s?.room_id);
    const f = fees.find(x => x.student_id === studentId);
    const c = complaints.filter(x => x.student_id === studentId);

    if (s) {
        document.getElementById("profile").innerHTML = `
            <p><b>ID:</b> ${s.id}</p>
            <p><b>Name:</b> ${s.name}</p>
            <p><b>Email:</b> ${s.email}</p>
            <p><b>Room ID:</b> ${s.room_id}</p>
            <p><b>Fee Status:</b> ${s.fee_status}</p>
        `;
    } else {
        document.getElementById("profile").innerHTML = "Student details not found";
    }

    document.getElementById("roomDetails").innerHTML = `
        <p><b>Room ID:</b> ${r?.room_id || "N/A"}</p>
        <p><b>Capacity:</b> ${r?.capacity || "N/A"}</p>
        <p><b>Occupied:</b> ${r?.occupied || "N/A"}</p>
    `;

    document.getElementById("feeDetails").innerHTML = `
        <p><b>Amount:</b> ₹${f?.amount || "N/A"}</p>
        <p><b>Status:</b> ${f?.status || "N/A"}</p>
    `;

    document.getElementById("complaints").innerHTML =
        c.length
        ? c.map(x => `<p>${x.message} - ${x.status}</p>`).join("")
        : "No complaints";
}

// LOGOUT
function logoutStudent() {
    localStorage.removeItem("student");
    window.location.href = "index.html";
}