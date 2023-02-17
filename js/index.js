document.addEventListener("DOMContentLoaded", () => {
    let createMonster = document.getElementById("create-monster");
    let div2 = document.createElement("div");
    div2.id = "create-monster";
    let form = document.createElement("form");
    let nameInput = document.createElement("input");
    nameInput.id = "name";
    nameInput.placeholder = "name...";
    let ageInput = document.createElement("input");
    ageInput.id = "id";
    ageInput.placeholder = "age..."
    let descriptionInput = document.createElement("input");
    descriptionInput.id = "description";
    descriptionInput.placeholder = "description...";
    let button = document.createElement("button");
    button.textContent = "Create";
    button.id = "create-btn";
    createMonster.appendChild(form);
    form.appendChild(nameInput);
    form.appendChild(ageInput);
    form.appendChild(descriptionInput);
    form.appendChild(button);

    let monsterContainer = document.getElementById("monster-container")
    let ul = document.createElement("ul");
    monsterContainer.appendChild(ul);

    let forward = document.getElementById("forward");
    let back = document.getElementById("back");

    let pgNum = 1;

    fetch(`http://localhost:3000/monsters/?_limit=50&_page=1`)
        .then((resp) => resp.json())
        .then((data) =>{
            data.forEach((e) => {
                let li = document.createElement("li");
                li.style.listStyleType = "none";
                li.innerHTML = `<h3>${e.name}</h3>
                <h4>Age: ${e.age}</h4>
                <p>Bio: ${e.description}</p>`;
                ul.appendChild(li);
                function goForward() {
                    li.innerHTML = "";
                    fetch(`http://localhost:3000/monsters/?_limit50&_page=${pgNum++}`)
                        .then((resp) => resp.json())
                        .then((data2) => {
                            data2.forEach((e2) => {
                                li.innerHTML = `<h3>${e2.name}</h3>
                                <h4>Age: ${e2.age}</h4>
                                <p>Bio: ${e2.description}</p>`;
                            })
                        })
                }
                function goBack() {
                    li.innerHTML = "";
                    fetch(`http://localhost:3000/monsters/?_limit50&_page=${pgNum--}`)
                        .then((resp) => resp.json())
                        .then((data2) => {
                            data2.forEach((e2) => {
                                li.innerHTML = `<h3>${e2.name}</h3>
                                <h4>Age: ${e2.age}</h4>
                                <p>Bio: ${e2.description}</p>`;
                            })
                        })
                }
                forward.addEventListener("click", goForward);
                back.addEventListener("click", goBack);

                function createNew(e) {
                    e.preventDefault;
                    const monsterObj = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            name: nameInput.value,
                            age: Number(ageInput.value),
                            description: descriptionInput.value
                        })
                    }
                    fetch(`http://localhost:3000/monsters`, monsterObj)
                        .then((resp) => resp.json())
                        .then((data) => data)
                }
                button.addEventListener("click", createNew);
            })
        })
})