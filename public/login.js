const log = document.getElementById("loginButton")
const register = document.getElementById("register")

log.addEventListener("click", async () => {
    const username = document.getElementById("loginUsername").value
    const password = document.getElementById("loginPassword").value
    console.log(username, password)

    const result = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    }).then((res) => res.json())
    // console.log(result.username)
    if (result.biscuitStatus == 'loggedin') {
        localStorage.setItem('username', result.username)
        window.location.replace("/index.html")
    }
    
})

