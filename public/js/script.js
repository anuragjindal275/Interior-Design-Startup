document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let message = document.getElementById('message').value;

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/contact', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.status === 200) {
            alert('Your query has been submitted successfully.');
            document.getElementById('contactForm').reset();
        }
    };
    xhr.send(`name=${name}&email=${email}&phone=${phone}&message=${message}`);
});
