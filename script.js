document.addEventListener("DOMContentLoaded", function () {

    const text = ["Web Developer", "Java Programmer", "Student"];
    let index = 0;
    let charIndex = 0;
    const typing = document.getElementById("typing");

    const header = document.querySelector(".header");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.style.padding = "12px 60px";
            header.style.background = "rgba(0, 0, 0, 0.85)";
        } else {
            header.style.padding = "20px 60px";
            header.style.background = "rgba(0, 0, 0, 0.6)";
        }
    });

    function typeEffect(){
        if(charIndex < text[index].length){
            typing.textContent += text[index].charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect,100);
        }else{
            setTimeout(eraseEffect,1000);
        }
    }

    function eraseEffect(){
        if(charIndex > 0){
            typing.textContent = text[index].substring(0,charIndex-1);
            charIndex--;
            setTimeout(eraseEffect,50);
        }else{
            index = (index+1)%text.length;
            setTimeout(typeEffect,200);
        }
    }

    typeEffect();

    /* FORM VALIDATION + STORAGE */

    const form = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");
    const feedbackList = document.getElementById("feedbackList");

    if(form){
        form.addEventListener("submit", function(e){
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if(name === ""){
                alert("Name cannot be empty");
                return;
            }

            const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if(!email.match(pattern)){
                alert("Invalid Email");
                return;
            }

            const data = {name,email,message};

            let stored = JSON.parse(localStorage.getItem("feedback")) || [];
            stored.push(data);
            localStorage.setItem("feedback",JSON.stringify(stored));

            successMessage.textContent = "Message Sent Successfully 🚀";
            successMessage.style.color="#00f7ff";

            displayFeedback();
            form.reset();
        });
    }

    function displayFeedback(){
        feedbackList.innerHTML="";
        let stored = JSON.parse(localStorage.getItem("feedback")) || [];
        stored.forEach(item=>{
            let div = document.createElement("div");
            div.innerHTML = `<strong>${item.name}</strong>: ${item.message}`;
            feedbackList.appendChild(div);
        });
    }

    displayFeedback();

});
