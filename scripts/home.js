const allBtn = document.getElementById('all-btn');
const openBtn = document.getElementById('open-btn')
const closeBtn = document.getElementById('close-btn')


const fetchAll = ()=>{
    const url= 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
    fetch(url)
    .then(res => res.json())
    .then(data=> {
        console.log(data.data);
        showAll(data.data)
      })
}

fetchAll();


const showAll = (datas) => {
  const cardContainer = document.getElementById('card-container') ;
  cardContainer.innerHTML="";
  datas.forEach(info => {
    const createE = document.createElement('div');
    createE.innerHTML=`
     <div class="py-4 px-4 bg-white rounded-b-lg drop-shadow-sm border-t-5  rounded-t-sm h-full ${info.status == 'open'? 'border-green-600' : 'border-purple-600'}">
        <div class="flex justify-between pb-4 ">
            <div>
                ${info.status == 'open'? `<img src="./assets/Open-Status.png" alt=""></img>` : `<img src="./assets/closed.png" alt=""></img>`}
            </div>
            <div>
                <p class="w-20 rounded-full py-1 text-[12px] font-medium text-center
                ${info.priority == 'high' ? 'bg-[#FEECEC]  text-[#EF4444]': '' }
                ${info.priority == 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]': '' }   ${info.priority == 'low'? 'text-[#9CA3AF] bg-[#EEEFF2]': '' }">${info.priority.toUpperCase()}</p>
            </div>
        </div>
        <div class="">
            <h2 class="text-sm font-semibold pb-2">${info.title}</h2>
            <p class="text-[#64748B] text-[12px]">${info.description}</p>
        </div>
        <div class="flex flex-wrap gap-1 pt-3">
             <p class="bg-[#FEECEC]  text-[#EF4444] px-2 rounded-full py-1 text-[12px] font-medium text-center border border-[#FECACA]"><i class="fa-solid fa-bug"></i> ${info.labels[0].toUpperCase()}</p>
             ${info.labels[1] ? `
  <p class="bg-[#FFF8DB] text-[#D97706] rounded-full py-1 text-[12px] font-medium text-center border border-[#FDE68A] px-2">
    <i class="fa-solid fa-life-ring"></i> ${info.labels[1].toUpperCase()}
  </p>` 
: ''}
             
        </div>
        <p class="border-b-2 border-gray-200 py-4"></p>
        <p class="text-[12px] text-[#64748B] pt-4 pb-2">#${info.id}
by ${info.author}</p>
        <p class="text-[12px] text-[#64748B]">${new Date(info.updatedAt).toLocaleDateString()}</p>
    </div>
    `
    cardContainer.appendChild(createE)
  });
  totalN();
allBtn.addEventListener('click', function (){
   console.log(datas);
   allSelected();
   fetchAll();
   totalN();
})
openBtn.addEventListener('click', function(){
  openSelected();
  cardContainer.innerHTML='';
    datas.forEach(info => {
    if(info.status=='open'){
    const createE = document.createElement('div');
    createE.innerHTML=`
     <div class="py-4 px-4 bg-white rounded-b-lg drop-shadow-sm border-t-5  rounded-t-sm h-full ${info.status == 'open'? 'border-green-600' : 'border-purple-600'}">
        <div class="flex justify-between pb-4 ">
            <div>
                ${info.status == 'open'? `<img src="./assets/Open-Status.png" alt=""></img>` : `<img src="./assets/closed.png" alt=""></img>`}
            </div>
            <div>
                <p class="w-20 rounded-full py-1 text-[12px] font-medium text-center
                ${info.priority == 'high' ? 'bg-[#FEECEC]  text-[#EF4444]': '' }
                ${info.priority == 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]': '' }   ${info.priority == 'low'? 'text-[#9CA3AF] bg-[#EEEFF2]': '' }">${info.priority.toUpperCase()}</p>
            </div>
        </div>
        <div class="">
            <h2 class="text-sm font-semibold pb-2">${info.title}</h2>
            <p class="text-[#64748B] text-[12px]">${info.description}</p>
        </div>
        <div class="flex flex-wrap gap-1 pt-3">
             <p class="bg-[#FEECEC]  text-[#EF4444] px-2 rounded-full py-1 text-[12px] font-medium text-center border border-[#FECACA]"><i class="fa-solid fa-bug"></i> ${info.labels[0].toUpperCase()}</p>
             ${info.labels[1] ? `
  <p class="bg-[#FFF8DB] text-[#D97706] rounded-full py-1 text-[12px] font-medium text-center border border-[#FDE68A] px-2">
    <i class="fa-solid fa-life-ring"></i> ${info.labels[1].toUpperCase()}
  </p>` 
: ''}
             
        </div>
        <p class="border-b-2 border-gray-200 py-4"></p>
        <p class="text-[12px] text-[#64748B] pt-4 pb-2">#${info.id}
by ${info.author}</p>
        <p class="text-[12px] text-[#64748B]">${new Date(info.updatedAt).toLocaleDateString()}</p>
    </div>
    `
    cardContainer.appendChild(createE)
    }
     totalN();
  });
})
closeBtn.addEventListener('click', function(){
  closeSelected();
  cardContainer.innerHTML='';
    datas.forEach(info => {
    if(info.status!=='open'){
    const createE = document.createElement('div');
    createE.innerHTML=`
     <div class="py-4 px-4 bg-white rounded-b-lg drop-shadow-sm border-t-5  rounded-t-sm h-full ${info.status == 'open'? 'border-green-600' : 'border-purple-600'}">
        <div class="flex justify-between pb-4 ">
            <div>
                ${info.status == 'open'? `<img src="./assets/Open-Status.png" alt=""></img>` : `<img src="./assets/closed.png" alt=""></img>`}
            </div>
            <div>
                <p class="w-20 rounded-full py-1 text-[12px] font-medium text-center
                ${info.priority == 'high' ? 'bg-[#FEECEC]  text-[#EF4444]': '' }
                ${info.priority == 'medium' ? 'bg-[#FFF6D1] text-[#F59E0B]': '' }   ${info.priority == 'low'? 'text-[#9CA3AF] bg-[#EEEFF2]': '' }">${info.priority.toUpperCase()}</p>
            </div>
        </div>
        <div class="">
            <h2 class="text-sm font-semibold pb-2">${info.title}</h2>
            <p class="text-[#64748B] text-[12px]">${info.description}</p>
        </div>
        <div class="flex flex-wrap gap-1 pt-3">
             <p class="bg-[#FEECEC]  text-[#EF4444] px-2 rounded-full py-1 text-[12px] font-medium text-center border border-[#FECACA]"><i class="fa-solid fa-bug"></i> ${info.labels[0].toUpperCase()}</p>
             ${info.labels[1] ? `
  <p class="bg-[#FFF8DB] text-[#D97706] rounded-full py-1 text-[12px] font-medium text-center border border-[#FDE68A] px-2">
    <i class="fa-solid fa-life-ring"></i> ${info.labels[1].toUpperCase()}
  </p>` 
: ''}
             
        </div>
        <p class="border-b-2 border-gray-200 py-4"></p>
        <p class="text-[12px] text-[#64748B] pt-4 pb-2">#${info.id}
by ${info.author}</p>
        <p class="text-[12px] text-[#64748B]">${new Date(info.updatedAt).toLocaleDateString()}</p>
    </div>
    `
    cardContainer.appendChild(createE)
    }
     totalN();
  });
})
}

function allSelected (){
  allBtn.classList.add('text-white', 'bg-[#4A00FF]')
  openBtn.classList.remove('text-white', 'bg-[#4A00FF]')
  closeBtn.classList.remove('text-white', 'bg-[#4A00FF]')
  
}
function openSelected (){
  allBtn.classList.remove('text-white', 'bg-[#4A00FF]')
  allBtn.classList.add('text-[#64748B]')
  openBtn.classList.add('text-white', 'bg-[#4A00FF]')
  closeBtn.classList.remove('text-white', 'bg-[#4A00FF]')
  
}
function closeSelected (){
  allBtn.classList.remove('text-white', 'bg-[#4A00FF]')
  allBtn.classList.add('text-[#64748B]')
  openBtn.classList.remove('text-white', 'bg-[#4A00FF]')
  closeBtn.classList.add('text-white', 'bg-[#4A00FF]')
  
}
const cardContainer = document.getElementById('card-container') ;
const total = document.getElementById('total');

function totalN(){
  total.innerText = cardContainer.children.length;
}
