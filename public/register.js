
register.addEventListener("click", async () => {
    const username = document.getElementById("registerUsername").value
    const password = document.getElementById("registerPassword").value
    const result = await fetch("/api/user/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    }).then((res) => res.json())
    if (result.biscuitStatus == 'loggedin') {
        localStorage.setItem('username', result.username)
        window.location.replace("/index.html")
    }
    if (localStorage.getItem('username')) {
        window.location.replace("/index.html")
    } 
   

})