let todo = (function(d, ls){

    // todo list template
    // { text: "", checked: false/true, id:random }


    // get content container
    let container = d.querySelector("#todocontent");


    // all the list will be saved here - Array
    let savedLists = JSON.parse(ls.getItem("todos")) || []; // change itemname accordingl to login name or login username /ID 
    if(savedLists.length > 0){
        for (let i = 0; i < savedLists.length; i++) add(savedLists[i]);
    }


    // this function add the list in container 
    function add(list){

        // create Node
        let template = '<div> <label data-id="' + list.id +'"></label> </div>'
        +'<div>' + list.text + '</div>'
        +'<div> <img data-id="' + list.id +'" src="delete.svg"> </div>';

        let listdiv = d.createElement("div");
        listdiv.classList.add("list");
        if(list.checked) listdiv.classList.add("checked");
        listdiv.innerHTML = template;

        //add to main container
        container.appendChild(listdiv);

        // add delete event
        listdiv.querySelector("img").addEventListener("click", remove);
        
        //add check event
        listdiv.querySelector("label").addEventListener("click", checkHandler);


    }
    function save(list){
        savedLists.push(list);
        localStorage.setItem("todos", JSON.stringify(savedLists));
    }

    function remove(e){
        
        // remove node
        let listdiv = e.target.closest(".list");
        listdiv.parentNode.removeChild(listdiv);

        //remove from localstorage
        let removeindex = savedLists.findIndex(function(list){ return list.id == e.target.dataset.id});
        savedLists.splice(removeindex,1);

        localStorage.setItem("todos", JSON.stringify(savedLists));
    }

    function checkHandler(e){

        let chkbox = e.target;

        let listIndex = savedLists.findIndex(function(l){return l.id == chkbox.dataset.id});

        if(savedLists[listIndex].checked){
            e.target.closest(".list").classList.remove("checked");
            savedLists[listIndex].checked = false;
        }
        else{
            e.target.closest(".list").classList.add("checked");
            savedLists[listIndex].checked = true;
        }

        localStorage.setItem("todos", JSON.stringify(savedLists));
    }


    return{
        save: save,
        add : add
    };
})(document, localStorage);


// bind enter key in textbox
document.querySelector("#todotxt").addEventListener("keydown", function(evt){

    let txt = evt.target;

    // if enter - add and clear
    if(evt.keyCode===13){
        evt.preventDefault();
        if(txt.value.trim() != ""){
            let listDetail = {text: txt.value, checked:false, id: (Math.floor(1000 + Math.random() * 9000))};
            todo.add(listDetail);
            todo.save(listDetail);
            txt.value = "";
        }
    }

});