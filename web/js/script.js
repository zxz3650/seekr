let data;
let accData;
const element = document.getElementById("searchbar");

function delay(time) { // Because there is no default sleep function
  return new Promise(resolve => setTimeout(resolve, time));
}

async function main() {
  const res = await fetch("http://localhost:8080/people")

  data = await res.json();

  console.log(data);
  

  element.addEventListener("keyup", search_users);
  search_users();


  function search_users() {
    let input = document.getElementById('searchbar').value;
    input = input.toLowerCase();
    let x = document.querySelector('#list-holder');
    x.innerHTML = ""

    for (const [i, _] of Object.entries(data)) {
      let obj = data[i];

      if (obj.name.toLowerCase().includes(input)) {

        // Create Cards For Each Person

        const base_div = document.createElement("div"); // Outer div
        base_div.className = "chip";

        const p_icon_div = document.createElement("div"); // Icon div
        p_icon_div.className = "chip-icon";

        const p_icon = document.createElement("ion-icon"); // Person icon
        p_icon.className = "icon"
        p_icon.setAttribute("name", "person");

        const txt_div = document.createElement("div"); // Text container
        txt_div.className = "text-container";

        const name_p = document.createElement("p"); // Name paragraph
        name_p.className = "card-text";

        const v_icon_div = document.createElement("div"); // Icon div
        v_icon_div.className = "chip-view";

        // View

        v_icon_div.onclick = async function () {
          document.querySelector('.main').style.display = "none";
          document.querySelector('.container').style.display = "flex";

          document.querySelector(".name-tag").innerHTML = obj.name;

          document.querySelector(".age").innerHTML = "Age: " + obj.age;
          document.querySelector(".bday").innerHTML = "Birthdate: " + obj.bday;
          document.querySelector(".address").innerHTML = "Address: " + obj.address;
          document.querySelector(".phone").innerHTML = "Phone: " + obj.phone;
          document.querySelector(".civilstatus").innerHTML = "Civil stand: " + obj.civilstatus;
          document.querySelector(".kids").innerHTML = "Kids: " + obj.kids;
          document.querySelector(".hobbies").innerHTML = "Hobbies: " + obj.hobbies;
          document.querySelector(".email").innerHTML = "E-Mail: " + obj.email;
          document.querySelector(".occupation").innerHTML = "Occupation: " + obj.occupation;
          document.querySelector(".prev-occupation").innerHTML = "Previous Occupation: " + obj.prevoccupation;
          document.querySelector(".military").innerHTML = "Military: " + obj.military;
          document.querySelector(".club").innerHTML = "Club: " + obj.club;
          document.querySelector(".legal").innerHTML = "Legal: " + obj.legal;
          document.querySelector(".political").innerHTML = "Political: " + obj.political;
          document.querySelector(".notes").innerHTML = "Notes: " + obj.notes;

          // Accounts

          if (obj.accounts != null) {
            for (const [i, _] of Object.entries(obj.accounts)) {
              let accObj = obj.accounts[i];
  
              console.log(accObj);

              // Creating elements

              const base_div = document.createElement("div"); // Outer div
              base_div.className = "acc-chip";

              const pfp_img = document.createElement("img"); // Pfp img
              pfp_img.className = "userPfp";

              if (accObj.profilePicture != null) {
                pfp_img.src = "data:image/png;base64," + accObj.profilePicture[0];
              } else {
                pfp_img.src = "https://as2.ftcdn.net/v2/jpg/03/32/59/65/1000_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
              }

              const info_div = document.createElement("div"); // Info div
              info_div.className = "info-container";

              const service_p = document.createElement("p");
              service_p.className = "serviceName";
              service_p.innerHTML = accObj.service;

              const name_p = document.createElement("p");
              name_p.className = "userName";
              name_p.innerHTML = accObj.username;


              document.querySelector(".accounts").appendChild(base_div);
              base_div.appendChild(pfp_img);
              base_div.appendChild(info_div);
              info_div.appendChild(service_p);
              info_div.appendChild(name_p);

              if (accObj.bio != null) {
                const bio_p = document.createElement("p");
                bio_p.className = "userBio";
                bio_p.innerHTML = accObj.bio[0];

                info_div.appendChild(bio_p);
              }
            }
          }
        }

        const v_icon = document.createElement("ion-icon"); // View icon
        v_icon.className = "icon";
        v_icon.setAttribute("name", "eye-outline");

        const e_icon_div = document.createElement("div"); // Icon div
        e_icon_div.className = "chip-edit";

        e_icon_div.onclick = function () {
          document.querySelector('.main').style.display = "none";
          document.querySelector('.edit-container').style.display = "flex";

          document.querySelector("#e-showid").innerHTML = obj.id;

          document.querySelector(".e-name-tag").innerHTML = obj.name;

          document.querySelector(".e-age").innerHTML = obj.age;
          document.querySelector(".e-bday").innerHTML = obj.bday;
          document.querySelector(".e-address").innerHTML = obj.address;
          document.querySelector(".e-phone").innerHTML = obj.phone;
          document.querySelector(".e-civilstatus").innerHTML = obj.civilstatus;
          document.querySelector(".e-kids").innerHTML = obj.kids;
          document.querySelector(".e-hobbies").innerHTML = obj.hobbies;
          document.querySelector(".e-email").innerHTML = obj.email;
          document.querySelector(".e-occupation").innerHTML = obj.occupation;
          document.querySelector(".e-prev-occupation").innerHTML = obj.prevoccupation;
          document.querySelector(".e-military").innerHTML = obj.military;
          document.querySelector(".e-club").innerHTML = obj.club;
          document.querySelector(".e-legal").innerHTML = obj.legal;
          document.querySelector(".e-political").innerHTML = obj.political;
          document.querySelector(".e-notes").innerHTML = obj.notes;
        }

        const e_icon = document.createElement("ion-icon"); // Edit icon
        e_icon.className = "icon"
        e_icon.setAttribute("name", "create-outline");


        base_div.appendChild(p_icon_div);
        base_div.appendChild(txt_div);
        txt_div.appendChild(name_p);

        base_div.appendChild(v_icon_div);
        base_div.appendChild(e_icon_div);
        p_icon_div.appendChild(p_icon);
        v_icon_div.appendChild(v_icon);
        e_icon_div.appendChild(e_icon);



        name_p.innerHTML = `${obj.name}`
        x.appendChild(base_div)
      }
    }
  }

  document.getElementById("backbtn").onclick = function () { // back button in view ig
    console.log("pressed back button from view")
    document.querySelector('.main').style.display = "flex";
    document.querySelector('.container').style.display = "none";

    var elements = document.getElementsByClassName("acc-chip");

    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  document.getElementById("newbtn").onclick = function () {
    document.querySelector('.main').style.display = "none";
    document.querySelector('.create-container').style.display = "flex";
  }

  document.getElementById("e-backbtn").onclick = function () {
    document.querySelector('.main').style.display = "flex";
    document.querySelector('.edit-container').style.display = "none";
  }

  document.getElementById("e-backbtn").onclick = function () {
    document.querySelector('.main').style.display = "flex";
    document.querySelector('.edit-container').style.display = "none";
  }

  document.getElementById("c-accbtn").onclick = function () { // account button
    document.querySelector('.create-container').style.display = "none";
    document.querySelector('.acc-container').style.display = "flex";
  }

  document.getElementById("c-backbtn").onclick = function () {
    document.querySelector('.main').style.display = "flex";
    document.querySelector('.create-container').style.display = "none";
  }

  document.getElementById("acc-backbtn").onclick = function () { // account back button
    document.querySelector('.create-container').style.display = "flex";
    document.querySelector('.acc-container').style.display = "none";
  }



  document.getElementById("acc-savebtn").onclick = function () { // account menu save button
    console.log("account save button pressed")
    document.getElementById("c-savebtn-p").innerHTML = "Saved!";
    delay(1000).then(() => document.getElementById("c-savebtn-p").innerHTML = "Save");
    document.querySelector('.create-container').style.display = "flex";
    document.querySelector('.acc-container').style.display = "none";
  }

  // CREATE

  document.getElementById("c-savebtn").onclick = function () { // new document save button
    console.log("Save data to db (new)");

    let totalIds = Object.keys(data).length;

    let id = String(totalIds + 1);

    let name = document.querySelector(".c-name-tag").innerHTML;

    let age = parseInt(document.querySelector(".c-age").innerHTML);
    let bday = document.querySelector(".c-bday").innerHTML;
    let address = document.querySelector(".c-address").innerHTML;
    let phone = document.querySelector(".c-phone").innerHTML;
    let civilstatus = document.querySelector(".c-civilstatus").innerHTML;
    let kids = document.querySelector(".c-kids").innerHTML;
    let hobbies = document.querySelector(".c-hobbies").innerHTML;
    let email = document.querySelector(".c-email").innerHTML;
    let occupation = document.querySelector(".c-occupation").innerHTML;
    let prevoccupation = document.querySelector(".c-prev-occupation").innerHTML;
    let military = document.querySelector(".c-military").innerHTML;
    let club = document.querySelector(".c-club").innerHTML;
    let legal = document.querySelector(".c-legal").innerHTML;
    let political = document.querySelector(".c-political").innerHTML;
    let notes = document.querySelector(".c-notes").innerHTML;

    fetch('http://localhost:8080/people', {
      method: 'POST',
      body: JSON.stringify({ "id": id, "name": name, "age": age, "bday": bday, "address": address, "phone": phone, "civilstatus": civilstatus, "kids": kids, "hobbies": hobbies, "email": email, "occupation": occupation, "prevoccupation": prevoccupation, "military": military, "club": club, "legal": legal, "political": political, "notes": notes })
    });

    document.getElementById("c-savebtn-p").innerHTML = "Saved!";
    delay(1000).then(() => document.getElementById("c-savebtn-p").innerHTML = "Save");
    document.querySelector('.main').style.display = "flex";
    document.querySelector('.create-container').style.display = "none";
  }

  // EDIT

  document.getElementById("e-savebtn").onclick = function () {
    console.log("Save data to db (edit)");

    let id = document.querySelector("#e-showid").innerHTML;

    let name = document.querySelector(".e-name-tag").innerHTML;

    let age = parseInt(document.querySelector(".e-age").innerHTML);
    let bday = document.querySelector(".e-bday").innerHTML;
    let address = document.querySelector(".e-address").innerHTML;
    let phone = document.querySelector(".e-phone").innerHTML;
    let civilstatus = document.querySelector(".e-civilstatus").innerHTML;
    let kids = document.querySelector(".e-kids").innerHTML;
    let hobbies = document.querySelector(".e-hobbies").innerHTML;
    let email = document.querySelector(".e-email").innerHTML;
    let occupation = document.querySelector(".e-occupation").innerHTML;
    let prevoccupation = document.querySelector(".e-prev-occupation").innerHTML;
    let military = document.querySelector(".e-military").innerHTML;
    let club = document.querySelector(".e-club").innerHTML;
    let legal = document.querySelector(".e-legal").innerHTML;
    let political = document.querySelector(".e-political").innerHTML;
    let notes = document.querySelector(".e-notes").innerHTML;


    fetch('http://localhost:8080/people', {
      method: 'POST',
      body: JSON.stringify({ "id": id, "name": name, "age": age, "bday": bday, "address": address, "phone": phone, "civilstatus": civilstatus, "kids": kids, "hobbies": hobbies, "email": email, "occupation": occupation, "prevoccupation": prevoccupation, "military": military, "club": club, "legal": legal, "political": political, "notes": notes })
    });

    document.getElementById("e-savebtn-p").innerHTML = "Saved!";
    delay(1000).then(() => document.getElementById("e-savebtn-p").innerHTML = "Save");
    document.querySelector('.main').style.display = "flex";
    document.querySelector('.edit-container').style.display = "none";
  }
}

main()
