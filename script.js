const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".video-slide");
const contents = document.querySelectorAll(".content");


var sliderNav = function(manual){

    btns.forEach((btns)=>{
        btns.classList.remove("active");
    });

    slides.forEach((slide)=>{
        slide.classList.remove("active");
    });

    contents.forEach((content)=>{
        content.classList.remove("active");
    });


    btns[manual].classList.add("active");
    slides[manual].classList.add("active");
    contents[manual].classList.add("active");
    
    
}

btns.forEach((btns,i) =>{
    btns.addEventListener("click", ()=> {
        sliderNav(i);
    });
});

async function getDestinations() {
  const res = await fetch('http://localhost:5000/api/destinations');
  const data = await res.json();

  const list = document.getElementById('destination-list');
  list.innerHTML = '';
  data.forEach(dest => {
    const li = document.createElement('li');
    li.textContent = `${dest.name} (${dest.location})`;
    list.appendChild(li);
  });
}


window.onload = getDestinations;


document.getElementById('destinationForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const location = document.getElementById('location').value;
  const description = document.getElementById('description').value;

  const res = await fetch('http://localhost:5000/api/destinations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, location, description })
  });

  const data = await res.json();
  console.log('Destination added:', data);

  getDestinations();
});

