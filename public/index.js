if (!localStorage.getItem('username')) {
    window.location.replace("/login.html")
}
document.getElementById('username').innerHTML = localStorage.getItem('username')
document.getElementById('logout').addEventListener('click', async () => {
    console.log('clicked')
    const result = await fetch("/api/auth/logout", {
        method: "POST"
    }).then((res) => res.json());
    if (!localStorage.getItem('username')) {
        window.location.replace("/login.html")
    }
    if (result.biscuitStatus == 'loggedout') {
        localStorage.clear()
        window.location.replace("/login.html")
    }
})


