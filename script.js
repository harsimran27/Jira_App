let addBtn = document.querySelector(".add");
let body = document.querySelector("body");
let grid = document.querySelector(".grid");

let deleteBtn = document.querySelector(".delete");

let deleteMode = false;

let colors = ["pink", "blue", "green", "black"];

if (localStorage.getItem("allTickets") == undefined) {

    let allTickets = {};

    allTickets = JSON.stringify(allTickets);

    localStorage.setItem("AllTickets", allTickets);
}

deleteBtn.addEventListener("click", function (e) {
    if (e.currentTarget.classList.contains("delete-selected")) {
        e.currentTarget.classList.remove("delete-selected");
        deleteMode = false;
    } else {
        e.currentTarget.classList.add("delete-selected");
        deleteMode = true;
    }
})

addBtn.addEventListener("click", function () {

    deleteBtn.classList.remove("delete-selected")
    deleteMode = false

    let preModal = document.querySelector(".modal");

    if (preModal != null) return;

    let div = document.createElement("div");
    div.classList.add("modal");

    div.innerHTML = `<div class="modal-text-container">
                    <div class="modal-inner-type-container" contenteditable="true"></div>
                </div>
                <div class="modal-filter-container">
                    <div class="modal-filter-section">
                        <div class="modal-filter pink"></div>
                        <div class="modal-filter green"></div>
                        <div class="modal-filter blue"></div>
                        <div class="modal-filter black selected"></div>
                    </div>
                </div>`;

    let ticketColor = "black";

    let allModalPriority = div.querySelectorAll(".modal-filter");

    for (let i = 0; i < allModalPriority.length; i++) {
        allModalPriority[i].addEventListener("click", function (e) {


            for (let j = 0; j < allModalPriority.length; j++) {
                allModalPriority[j].classList.remove("selected")
            }

            e.currentTarget.classList.add("selected");
            ticketColor = e.currentTarget.classList[1];

        });
    }

    let taskInnerContainer = div.querySelector(".modal-inner-type-container");
    taskInnerContainer.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            let id = uid();
            let task = e.currentTarget.innerText;

            let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

            let ticketObj = {
                color: ticketColor,
                taskValue: task,
            }

            allTickets[id] = ticketObj;

            localStorage.setItem("AllTickets", JSON.stringify(allTickets));

            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("ticket");


            ticketDiv.innerHTML = `<div class="ticket-color ${ticketColor}"></div>
                <div class="ticket-id">${id}</div>
                <div class="actual-task">${task}</div>`;

            let ticketColorDiv = ticketDiv.querySelector(".ticket-color");

            ticketColorDiv.addEventListener("click", function (e) {
                // let colors = ["pink", "blue", "green", "black"];

                let currColor = e.currentTarget.classList[1]; //green

                let index = -1;
                for (let i = 0; i < colors.length; i++) {
                    if (colors[i] == currColor) index = i;
                }

                index++;
                index = index % 4;

                let newColor = colors[index];

                ticketColorDiv.classList.remove(currColor);
                ticketColorDiv.classList.add(newColor);
            });

            ticketDiv.addEventListener("click", function (e) {
                if (deleteMode) {
                    e.currentTarget.remove();
                }
            });

            grid.append(ticketDiv);
            div.remove();
        }
    })

    body.append(div);
})