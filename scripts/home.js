const allBtn = document.getElementById('all-btn');
const openBtn = document.getElementById('open-btn')
const closeBtn = document.getElementById('close-btn')

const manageSpinner = (stat)=>{
  if(stat == true){
    document.getElementById('card-spinner').classList.remove('hidden');
    document.getElementById('card-container').classList.add('hidden');

  }
  else{
     document.getElementById('card-spinner').classList.add('hidden');
    document.getElementById('card-container').classList.remove('hidden');
  }
}

const modalSpinner = (stat)=>{
  if(stat == true){
    document.getElementById('modal-spinner').classList.remove('hidden');
    document.getElementById('modal-container').classList.add('hidden');

  }
  else{
     document.getElementById('modal-spinner').classList.add('hidden');
    document.getElementById('modal-container').classList.remove('hidden');
  }
}


const fetchAll = ()=>{
   const url= 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
     manageSpinner(true);
    fetch(url)
    .then(res => res.json())
    .then(data=> {
        showAll(data.data);
         manageSpinner(false);
      })
}

fetchAll();

const fetchById = async (id)=>{
  const url=`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}` 
   document.getElementById('my_modal_5').showModal();
  modalSpinner(true);
  const res = await fetch(url);
  const data = await res.json();
  showById(data.data)
   modalSpinner(false)
}

const showById = (show)=>{
   const modalContainer = document.getElementById('modal-container')
   modalContainer.innerHTML=`
   <h3 class="text-2xl font-bold">${show.title}</h3>
   <div class="pb-1.5 flex gap-2 text-[12px] items-center">
    <p class="px-2 py-1 bg-green-600 text-white  rounded-full">${show.status}</p>
    <p class="border-r-2 border-l-2 border-gray-200 text-center px-1 text-[#64748B]">Opened by ${show.assignee}</p>
    <p class="text-[#64748B]">${new Date(show.createdAt).toLocaleDateString()}</p>
   </div>
   <div class="flex flex-wrap gap-1 pt-3">
             <p class="bg-[#FEECEC]  text-[#EF4444] px-2 rounded-full py-1 text-[12px] font-medium text-center border border-[#FECACA]"><i class="fa-solid fa-bug"></i> ${show.labels[0].toUpperCase()}</p>
             ${show.labels[1] ? `
  <p class="bg-[#FFF8DB] text-[#D97706] rounded-full py-1 text-[12px] font-medium text-center border border-[#FDE68A] px-2">
    <i class="fa-solid fa-life-ring"></i> ${show.labels[1].toUpperCase()}
  </p>` 
: ''}
             
        </div>
        <p class="text-[#64748B] py-6">${show.description}</p>
        <div class="flex items-center gap-20">
          <div >
            <p class="text-[#64748B]">Assignee:</p>
            <h3 class="font-semibold">${show.assignee}</h3>
          </div>
          <div>
            <p class="text-[#64748B]
            ">Priority:</p>
            <p class="bg-red-500 text-white px-2 py-1 rounded-full text-center">${show.priority}</p>
          </div>
   `
  
   
}


const showAll = (datas) => {
  const cardContainer = document.getElementById('card-container') ;
  cardContainer.innerHTML="";
  datas.forEach(info => {
    const createE = document.createElement('div');
    createE.innerHTML=`
     <div onclick="fetchById(${info.id})" class="cursor-pointer py-4 px-4 bg-white rounded-b-lg drop-shadow-sm border-t-5  rounded-t-sm h-full ${info.status == 'open'? 'border-green-600' : 'border-purple-600'}">
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
   allSelected();
   fetchAll();
   totalN();
})
openBtn.addEventListener('click', function(){
  openSelected();
  cardContainer.innerHTML='';
  const openIssue = datas.filter(info=> info.status === 'open')
  console.log(openIssue);
  showAll(openIssue);
})
closeBtn.addEventListener('click', function(){
  closeSelected();
  cardContainer.innerHTML='';
   const closeIssue = datas.filter(info=> info.status !== 'open')
  showAll(closeIssue);
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

document.getElementById('search').addEventListener('keyup',function (){
  allBtn.classList.add('text-[#64748B]')
  openBtn.classList.remove('text-white', 'bg-[#4A00FF]')
  closeBtn.classList.remove('text-white', 'bg-[#4A00FF]')
  allBtn.classList.remove('text-white', 'bg-[#4A00FF]')
 const value = document.getElementById('search').value.trim().toLowerCase();
 const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`
 manageSpinner(true);
 fetch(url)
 .then(res => res.json())
 .then(data =>{
  console.log(data);
  showAll(data.data);
  manageSpinner(false);
 })
 
})