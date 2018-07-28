let todo = (function(d, ls){

    // get content container
    let container = d.querySelector("#todocontent");

    // get textbox
    let txt = d.querySelector("#todotxt");


    // reload saved todos
    let savedTodo = JSON.parse(ls.getItem("todos")) || []; // change itemname accordingl to login name or login username /ID 
    if(savedTodo.length > 0){
        loadTodos();
    }

    

    // bind enter key in textbox
    txt.addEventListener("keydown", function(evt){
        console.log(evt , "got event");

        // if enter - add and clear
        if(evt.keyCode===13){
            evt.preventDefault();
            if(txt.value.trim() != ""){

                let obj = {
                    text : txt.value.trim(),
                    checked : false,
                    id : Math.random()
                };

                add(obj);
                

                //store it
                savedTodo.push(obj);
                ls.setItem("todos", JSON.stringify(savedTodo));

                txt.value = "";
            }
        }

    });

    function loadTodos(){
        for (let i = 0; i < savedTodo.length; i++) {
            const todo = savedTodo[i];
            add(todo);
        }
    }

    function add(o){
        let listdiv = d.createElement("div");
        listdiv.classList.add("list");
        listdiv.appendChild(chkBoxDiv());
        listdiv.appendChild(contentDiv(o.text));
        listdiv.appendChild(deleteDiv(o.id));
        container.appendChild(listdiv);
    }

    function remove(nodeid){}

    function chkBoxDiv(){
        let div = d.createElement("div");

        let chkbox = d.createElement("input");
        chkbox.type = "checkbox"; chkbox.id = "chk_"+savedTodo.length;

        let lbl = d.createElement("label");
        lbl.for = chkbox.id;

        div.appendChild(chkbox); div.appendChild(lbl);

        return div;
    }

    function contentDiv(txt){
        let div = d.createElement("div");
        div.innerHTML = txt;
        return div;
    }

    function deleteDiv(id){
        let div = d.createElement("div");
        let img = d.createElement("img");
        img.src = "delete.svg";
        img.dataset.Delete = id;
        div.appendChild(img);
        return div;
    }

    return{
        add : add,
        remove: remove
    };
})(document, localStorage);