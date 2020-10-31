var hostip = window.location.hostname;

function post() {
    let post_form = document.getElementById("post-form")
    let get_form = document.getElementById("get-form")
    post_form.style.display = "block"
    get_form.style.display = "none"
}

function get() {
    let post_form = document.getElementById("post-form")
    let get_form = document.getElementById("get-form")
    post_form.style.display = "none"
    get_form.style.display = "block"
}


document.getElementById('post_node_btn').addEventListener('click', event => {
    event.preventDefault()
    let numebr_A = document.getElementById('number_A').value
    let numebr_B = document.getElementById('number_B').value   
    data = {a: numebr_A, b: numebr_B}
    fetch(`http://${hostip}/nodejs/sha256` , {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
        res.json().then(res => {
            document.getElementById('result').innerHTML = res.c
        }).catch(error => { /* handle */ })
    }).catch(error => { /* handle */ })
    console.log(JSON.stringify({a: numebr_A, b: numebr_B}))
})



document.getElementById('post_go_btn').addEventListener('click', event => {
    event.preventDefault()
    let numebr_A = document.getElementById('number_A').value
    let numebr_B = document.getElementById('number_B').value   
    data = {A: numebr_A, B: numebr_B}
    fetch(`http://${hostip}/go/sha256` , {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => {
        res.json().then(res => {
            document.getElementById('result').innerHTML = res.Result
        }).catch(error => {
            // handle 
        })
    }).catch(error => {
        // handle
    })
})


document.getElementById('get_node_btn').addEventListener('click' , event => {
    event.preventDefault()
    let line_numebr = document.getElementById('input-line').value
    let request = new XMLHttpRequest()
    path = `http://${hostip}/nodejs/write?line=${line_numebr}`
    request.open('GET', path, true)

    request.onload = function(){
        document.getElementById('result').innerHTML = this.responseText
    }

    request.send()
})

document.getElementById('get_go_btn').addEventListener('click' , event => {
    event.preventDefault()
    let line_numebr = document.getElementById('input-line').value
    let request = new XMLHttpRequest()
    path = `http://${hostip}/go/write?line=${line_numebr}`
    request.open('GET', path, true)

    request.onload = function(){
        document.getElementById('result').innerHTML = this.responseText
    }

    request.send()
})