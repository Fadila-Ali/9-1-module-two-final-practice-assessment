const URL = "https://ghibliapi.herokuapp.com/people";

let people;
const div = document.querySelector("#info");
const body = document.querySelector("body");
fetch(URL)
  .then((res) => res.json())
  .then((resJson) => {
    // console.log(resJson);
    people = resJson;
    for (let i = 0; i < resJson.length; i++) {
      const person = resJson[i].name;
      const option = document.createElement("option");
      option.innerHTML = person;
      option.value = person;
      select.append(option);
    }
  })
  .catch((err) => console.log(err));

const select = document.querySelector("select");
select.addEventListener("change", () => {
  //   console.log(select.value);

  const peopleFunction = people.find((el) => el.name === `${select.value}`);
  div.innerHTML = "";
  //   console.log(peopleFunction);

  // get name, age, eye and hair color
  // Name
  const h4 = document.createElement("h4");
  h4.innerHTML = `Name: ${peopleFunction.name}`;
  //   div.append(h4);

  // Age
  const ageP = document.createElement("p");
  ageP.innerHTML = `Age: ${peopleFunction.age}`;
  //   div.append(ageP);

  // Eye Color
  const eyeColor = document.createElement("p");
  eyeColor.innerHTML = `Eye Color: ${peopleFunction.eye_color}`;
  //   div.append(eyeColor);

  // Hair Color
  const hairColor = document.createElement("p");
  hairColor.innerHTML = `Hair color: ${peopleFunction.hair_color}`;
  div.append(h4, ageP, eyeColor, hairColor);
});

// SHOUTOUTS
const shout = document.querySelector("#shoutout");
const form = document.querySelector("form");
const ul = document.querySelector("ul");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let value = shout.value;
  let selectedName = `${select.value}`;

  //   ul.innerHTML = "";
  const li = document.createElement("li");
  li.innerHTML = `<strong>${selectedName}</strong>- ${value}`;
  ul.append(li);

  form.reset();
  // ERROR MESSAGE
  const error1 = document.createElement("p");
  error1.classList.add("error1");
  //   error1.innerHTML = "";
  error1.innerHTML = "Please select a name first!";

  if (!`${selectedName}`) {
    error1.style.display = "block";
    form.append(error1);
    select.addEventListener("click", () => {
      error1.innerHTML = "";
    });
    return;
  }

  const error2 = document.createElement("p");
  error2.classList.add("error2");
  //   error2.innerHTML = "";
  error2.innerHTML = `Please add a shoutout to ${selectedName}`;
  //   form.append(error2);
  if (!value) {
    error2.style.display = "block";
    form.append(error2);
    shout.addEventListener("click", () => {
      error2.innerHTML = "";
    });
    return;
  }
});

const resetButton = document.createElement("button");
resetButton.setAttribute("id", "reset-shoutouts");
resetButton.innerHTML = "Remove Shoutouts";
body.append(resetButton);
resetButton.addEventListener("click", () => {
  ul.innerHTML = "";
});
