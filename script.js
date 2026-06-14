console.log("Script Loaded");

emailjs.init("H14oFRtEDJkBGfwQD");

let startTime = null;
let timerInterval = null;
let elapsedPausedTime = 0;

// Faculty Login and Student Login Toggle
function showFacultyLogin(){

    document.getElementById("studentForm")
    .classList.remove("active-form");

    document.getElementById("facultyForm")
    .classList.add("active-form");


    document.getElementById("studentContent")
    .classList.remove("active-left");

    document.getElementById("facultyContent")
    .classList.add("active-left");

}



function showStudentLogin(){

    document.getElementById("facultyForm")
    .classList.remove("active-form");

    document.getElementById("studentForm")
    .classList.add("active-form");


    document.getElementById("facultyContent")
    .classList.remove("active-left");

    document.getElementById("studentContent")
    .classList.add("active-left");

}


// Student Login Function
async function studentLogin(){

    document.getElementById("studentError").textContent = "";

    const loginBtn =
    document.getElementById("studentLoginBtn");

    try {

        loginBtn.innerText = "Checking...";
        loginBtn.disabled = true;

        const scholar =
        document.getElementById("studentScholar").value;

        const pc =
        document.getElementById("studentPC").value;

        const password =
        document.getElementById("studentPassword").value;

        if(scholar === "" || pc === "" || password === ""){

            document.getElementById("studentError").innerText = "Please fill all fields";
            resetStudentBtn();

            return;
        }

        const studentsRef = collection(db,"students");

        const q = query(
            studentsRef,
            where("scholarNo","==",scholar),
            where("pcNo","==",pc),
            where("password","==",password)
        );

        const querySnapshot = await getDocs(q);

        if(querySnapshot.empty){

            document.getElementById("studentError").innerText = "Invalid Credentials";

            resetStudentBtn();

            return;
        }

            querySnapshot.forEach((docSnap) => {

            const data = docSnap.data();

            localStorage.setItem(
                "studentDocId",
                docSnap.id
            );

            if(data.firstLogin){
                resetStudentBtn();
                showStudentPopup();

            } else {

                resetStudentBtn();
                window.location.href = "student.html";
            }
        });

    } catch (error) {

        console.log(error);

        alert("Server error. Try again.");

        resetStudentBtn();
    }
}


function resetStudentBtn(){
    const btn = document.getElementById("studentLoginBtn");
    btn.innerText = "Login";
    btn.disabled = false;
}


function showStudentPopup(){
    resetStudentBtn();
    document.getElementById("passwordPopup").style.display = "flex";
}


// Save New Password for Student
async function saveNewPassword(){

    const newPass =
    document.getElementById(
        "newPassword"
    ).value;


    const confirmPass =
    document.getElementById(
        "confirmPassword"
    ).value;



    if(newPass === "" || confirmPass === ""){

        document.getElementById("studentError").innerText = "Please fill all fields";

        return;

    }



    if(newPass !== confirmPass){

        document.getElementById("studentError").innerText = "Passwords do not match";

        return;

    }



    const docId =
    localStorage.getItem(
        "studentDocId"
    );



    const studentRef =
    doc(db,"students",docId);



    await updateDoc(studentRef,{

        password:newPass,

        firstLogin:false

    });



    alert(
        "Password Updated Successfully"
    );



    window.location.href =
    "student.html";

}



// Faculty Login Function
async function facultyLogin(){

    document.getElementById("facultyError").textContent = "";

    const loginBtn =
    document.getElementById("facultyLoginBtn");

    try {

        loginBtn.innerText = "Checking...";
        loginBtn.disabled = true;

        const username =
        document.getElementById("facultyUsername").value;

        const password =
        document.getElementById("facultyPassword").value;

        if(username === "" || password === ""){

            document.getElementById("facultyError").innerText = "Please fill all fields";

            resetFacultyBtn();

            return;
        }

        const facultyRef = collection(db,"faculty");

        const q = query(
            facultyRef,
            where("username","==",username),
            where("password","==",password)
        );

        const querySnapshot = await getDocs(q);

        if(querySnapshot.empty){

            document.getElementById("facultyError").innerText = "Invalid Credentials";

            resetFacultyBtn();

            return;
        }

        querySnapshot.forEach((docSnap) => {

            const data = docSnap.data();

            localStorage.setItem(
                "facultyDocId",
                docSnap.id
            );

            if(data.firstLogin){

                resetFacultyBtn();

                showFacultyPopup()

            } else {

                resetFacultyBtn();

                window.location.href = "faculty.html";
            }
        });

    } catch (error) {

        console.log(error);

        alert("Server error. Try again.");

        resetFacultyBtn();
    }
}


function resetFacultyBtn(){
    const btn = document.getElementById("facultyLoginBtn");
    btn.innerText = "Login";
    btn.disabled = false;
}


function showFacultyPopup(){
    resetFacultyBtn();
    document.getElementById("facultyPopup").style.display = "flex";
}


// Save New Credentials for Faculty
async function saveFacultyCredentials(){

    const username =
    document.getElementById(
        "newFacultyUsername"
    ).value;

    const password =
    document.getElementById(
        "newFacultyPassword"
    ).value;

    const confirm =
    document.getElementById(
        "confirmFacultyPassword"
    ).value;



    if(
        username === "" ||
        password === "" ||
        confirm === ""
    ){

        document.getElementById("facultyError").innerText = "Please fill all fields";

        return;

    }



    if(password !== confirm){

        document.getElementById("facultyError").innerText = "Passwords do not match";

        return;

    }



    const docId =
    localStorage.getItem(
        "facultyDocId"
    );



    const facultyRef =
    doc(
        db,
        "faculty",
        docId
    );



    await updateDoc(
        facultyRef,
        {

            username:username,

            password:password,

            firstLogin:false

        }
    );



    alert(
        "Credentials Updated Successfully"
    );



    window.location.href =
    "faculty.html";

}



// Toggle Password Visibility
function togglePassword(inputId, button){

    const input =
    document.getElementById(inputId);

    const icon =
    button.querySelector("i");



    if(input.type === "password"){

        input.type = "text";

        icon.classList.remove("bi-eye");

        icon.classList.add("bi-eye-slash");

    }

    else{

        input.type = "password";

        icon.classList.remove("bi-eye-slash");

        icon.classList.add("bi-eye");

    }

}



// Load Student Data on Student Page
async function loadStudentData(){

    const studentId =
    localStorage.getItem("studentDocId");

    if(!studentId){
        return;
    }

    try{

        const studentRef =
        doc(db,"students",studentId);

        const studentSnap =
        await getDoc(studentRef);

        if(studentSnap.exists()){

            const data =
            studentSnap.data();

            document.getElementById("studentName").innerText =
            data.studentName;

            document.getElementById("studentScholar").innerText =
            data.scholarNo;

            document.getElementById("studentPC").innerText =
            data.pcNo;

            document.getElementById("studentCourse").innerText =
            data.course;
        }

    }

    catch(error){

        console.log(error);

    }

}

if(window.location.pathname.includes("student.html")){

    loadStudentData();

}


// Logout Function
function logout(){

    localStorage.removeItem(
        "studentDocId"
    );

    localStorage.removeItem(
        "facultyDocId"
    );

    window.location.href =
    "index.html";
}



// Timer Functions
async function startTimer(){

    if(timerInterval){
        alert("Task already running");
        return;
    }

    startTime = new Date();

    localStorage.setItem(
        "sessionStartTime",
        startTime
    );

    const studentId =
    localStorage.getItem("studentDocId");

    const studentRef =
    doc(db,"students",studentId);

    const snap =
    await getDoc(studentRef);

    const student =
    snap.data();

    const sessionRef = await addDoc(
        collection(db,"activeSessions"),
        {
            studentName: student.studentName,
            scholarNo: student.scholarNo,
            pcNo: student.pcNo,
            startTime: startTime.toISOString(),
            status: "ACTIVE",
            currentTask:""
        }
    );

    localStorage.setItem(
        "activeSessionId",
        sessionRef.id
    );

    updateTimer();

    timerInterval =
    setInterval(updateTimer,1000);
}



// Active Students Function
function loadActiveStudents(){

    const table =
    document.getElementById("ActiveStudentsTable");

    if(!table) return;

    onSnapshot(
        collection(db,"activeSessions"),
        (snapshot)=>{

            table.innerHTML = "";

            snapshot.forEach((docSnap)=>{

                const data = docSnap.data();

                const start = new Date(data.startTime);
                const now = new Date();

                const diff = now - start;

                const hours = Math.floor(diff / 3600000);
                const minutes = Math.floor((diff % 3600000) / 60000);

                table.innerHTML += `
                <tr>
                <td>${data.studentName}</td>
                <td>${data.scholarNo}</td>
                <td>${data.pcNo}</td>
                <td>${data.currentTask || "No Task"}</td>
                <td>${data.status}</td>
                <td>${hours}h ${minutes}m</td>
                </tr>
                `;
            });
        }
    );
}




// Update Current Task Function
async function updateCurrentTask(){

    const task =
    document.getElementById("currentTask").value;

    const studentId =
    localStorage.getItem("studentDocId");

    const sessionId =
    localStorage.getItem("activeSessionId");

    if(!studentId) return;

    try{




        // Update student document
        await updateDoc(
            doc(db,"students",studentId),
            {
                currentTask: task
            }
        );



        // Update active session document
        if(sessionId){

            await updateDoc(
                doc(db,"activeSessions",sessionId),
                {
                    currentTask: task
                }
            );
        }

    }

    catch(error){

        console.log(error);

    }
}



// Update Timer Function
function updateTimer(){

    const now = new Date();
    const diff = now - new Date(startTime);

    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    document.getElementById("timer").innerText =
    `${hours.toString().padStart(2,'0')} :
     ${minutes.toString().padStart(2,'0')} :
     ${seconds.toString().padStart(2,'0')}`;
}



// End Task Function
function showReport(){

    document.getElementById("reportBox").style.display = "block";

}




// Submit Report Function
async function submitReport(){

    const report =
    document.querySelector("textarea").value;

    const task =
    document.getElementById("currentTask").value;

    if(report === "" || task === ""){

        alert("Please fill report and task");
        return;
    }

    const endTime = new Date();

    const start =
    new Date(
        localStorage.getItem("sessionStartTime")
    );

    clearInterval(timerInterval);

    const durationMs =
    endTime - start;

    const hours =
    Math.floor(durationMs / 3600000);

    const minutes =
    Math.floor(
        (durationMs % 3600000) / 60000
    );

    const duration =
    `${hours}h ${minutes}m`;

    const sessionId =
    localStorage.getItem("activeSessionId");

    if(sessionId){

        await deleteDoc(
            doc(db, "activeSessions", sessionId)
        );

        localStorage.removeItem("activeSessionId");
    }

    await addDoc(
        collection(db,"sessionHistory"),
        {
            studentId:
            localStorage.getItem("studentDocId"),

            taskName: task,

            report: report,

            startTime:
            start.toISOString(),

            endTime:
            endTime.toISOString(),

            duration: duration,

            createdAt:
            serverTimestamp()
        }
    );

    document.getElementById("timer").innerText ="00 : 00 : 00";

    document.querySelector("textarea").value = "";

    document.getElementById("currentTask").value = "";

    document.getElementById("reportBox").style.display = "none";

    alert("Report Submitted Successfully");
}




// Email Report Function
async function sendReportEmail(
    reportText,
    taskName,
    startTime,
    endTime,
    duration
){

    const studentId =
    localStorage.getItem("studentDocId");

    const studentRef =
    doc(db,"students",studentId);

    const snap =
    await getDoc(studentRef);

    const data =
    snap.data();

    const templateParams = {

        student_name:
        data.studentName,

        scholar_no:
        data.scholarNo,

        course:
        data.course,

        task_name:
        taskName,

        start_time:
        startTime,

        end_time:
        endTime,

        duration:
        duration,

        report:
        reportText

    };

    return emailjs.send(
        "service_abc123",
        "template_llts",
        templateParams
    );
}




// Load Session History for Student
async function loadHistory(){

    const studentId =
    localStorage.getItem("studentDocId");

    if(!studentId) return;

    const historyRef =
    collection(db,"sessionHistory");

    const q =
    query(
        historyRef,
        where("studentId","==",studentId)
    );

    const snapshot =
    await getDocs(q);

    const table =
    document.getElementById("historyTable");

    table.innerHTML = "";

    snapshot.forEach((docSnap)=>{

        const data = docSnap.data();

        table.innerHTML += `
        <tr>
            <td>${data.date}</td>
            <td>${data.startTime}</td>
            <td>${data.endTime}</td>
            <td>${data.duration}</td>
            <td>${data.taskName}</td>
        </tr>
        `;
    });

}


// Load Active Students on Faculty Page
if(
    window.location.pathname
    .includes("faculty.html")
){
    loadActiveStudents();
}



// Load Session History on History Page
if(
window.location.pathname
.includes("history.html")
){
    loadHistory();
}