// Lay ngay hien tai
let today = new Date();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

let selectedDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
);

// Tao danh sach nam
let yearSelect = document.getElementById("year");

for(let i=1900;i<=2100;i++){
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
}

// Hien thi lich
function renderCalendar(){

    let dates = document.getElementById("dates");

    dates.innerHTML = "";

    // Lay ngay dau tien cua thang
    let firstDay = new Date(
        currentYear,
        currentMonth,
        1
    ).getDay();

    // Chuyen Chu Nhat tu 0 thanh 7
    if(firstDay === 0){
        firstDay = 7;
    }

    // So ngay trong thang
    let totalDays = new Date(
        currentYear,
        currentMonth + 1,
        0
    ).getDate();

    // Tao cac o trong truoc ngay dau tien
    for(let i=1;i<firstDay;i++){
        let empty = document.createElement("div");
        empty.classList.add("empty");
        dates.appendChild(empty);
    }

    // Tao cac ngay trong thang
    for(let day=1;day<=totalDays;day++){

        let date = document.createElement("div");

        date.textContent = day;

        // Kiem tra ngay hom nay
        if(
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        ){
            date.classList.add("today");
        }

        // Kiem tra ngay dang chon
        if(
            day === selectedDate.getDate() &&
            currentMonth === selectedDate.getMonth() &&
            currentYear === selectedDate.getFullYear()
        ){
            date.classList.add("selected");
        }

        // Su kien khi nhan vao ngay
        date.onclick = function(){
            selectedDate = new Date(
                currentYear,
                currentMonth,
                day
            );

            updateDetail();
            renderCalendar();
        };

        dates.appendChild(date);
    }

    // Cap nhat thang va nam tren select
    document.getElementById("month").value = currentMonth;
    document.getElementById("year").value = currentYear;
}

// Chuyen thang
function changeMonth(value){

    currentMonth += value;

    if(currentMonth > 11){
        currentMonth = 0;
        currentYear++;
    }

    if(currentMonth < 0){
        currentMonth = 11;
        currentYear--;
    }

    renderCalendar();
}

// Chon thang
function selectMonth(){

    currentMonth = Number(
        document.getElementById("month").value
    );

    renderCalendar();
}

// Chon nam
function selectYear(){

    currentYear = Number(
        document.getElementById("year").value
    );

    renderCalendar();
}

// Quay ve ngay hom nay
function goToday(){

    currentMonth = today.getMonth();
    currentYear = today.getFullYear();

    selectedDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    updateDetail();
    renderCalendar();
}

// Cap nhat thong tin ngay duoc chon
function updateDetail(){

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    document.getElementById("day").textContent =
        selectedDate.getDate();

    document.getElementById("fullDate").textContent =
        days[selectedDate.getDay()] +
        ", " +
        selectedDate.getDate() +
        "/" +
        (selectedDate.getMonth()+1) +
        "/" +
        selectedDate.getFullYear();
}

// Khoi tao lich
renderCalendar();
updateDetail();
