const signIn = document.getElementById('signIn')
const userName = document.getElementById('user')
const password = document.getElementById('pass')

signIn.addEventListener('click', function (){
    if(userName.value=='admin'&& password.value == 'admin123'){
        alert('Login Successful')
        window.location.assign('./home.html')
    }
    else{
        alert('Login Failed');
        return;
    }
})