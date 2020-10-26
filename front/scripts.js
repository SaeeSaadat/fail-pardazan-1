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