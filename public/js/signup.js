//request for signup
const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({username, email, password }),
            headers: {'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        }else {
            alert('Failed to sign up.');

        }
    }
};

//followings adds event listener
const signupForm = document.querySelector('#signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', signupFormHandler);
    
}