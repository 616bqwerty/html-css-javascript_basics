const recipelist=document.querySelector('#recipe-list');
const form=document.querySelector('#add-recipe-form');

function renderCookbook(doc){
    let li=document.createElement('li');
    let name=document.createElement('span');
    let spice=document.createElement('span');
    let del=document.createElement('div');

    li.setAttribute('data-id',doc.id);
    name.textContent=doc.data().Name;
    spice.textContent=doc.data().Spice;
    del.textContent="X";

    li.appendChild(name);
    li.appendChild(spice);
    li.appendChild(del);
    recipelist.appendChild(li);

    //delete a recipe
    del.addEventListener('click',(e)=>{
        e.stopPropagation();
        let id=e.target.parentElement.getAttribute('data-id');
        db.collection('recipes').doc(id).delete();
    });
}

//add new recipe to database
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(form.name.value==""||form.spice.value=="")
        alert("Please enter data!!");
    else{
        db.collection('recipes').add({
            Name: form.name.value ,
            Spice: form.spice.value
        });    
        form.name.value="";
        form.spice.value="";
    }
});

//real-time data adding
db.collection('recipes').orderBy('Name').onSnapshot(snapshot=>{
    let changes=snapshot.docChanges();
    changes.forEach(change => {
        if(change.type=="added")
            renderCookbook(change.doc);
        else if(change.type=="removed")
        {
            let li=document.querySelector('[data-id='+change.doc.id+']');
            recipelist.removeChild(li);

        }
    });
});