//............DELETE button.....................


function myrecordRemove(id){
    let url =`http://localhost:3000/employees/${id}`;


    fetch(url, {
        method: "DELETE",
        })
        alert("record deleted successfuly")
}

//..........................EDIT Bottun.............................................

function editRow(id){
    document.getElementById(`eno-${id}`).removeAttribute("readonly");
    document.getElementById(`nm-${id}`).removeAttribute("readonly");
    document.getElementById(`city-${id}`).removeAttribute("readonly");
    document.getElementById(`salary-${id}`).removeAttribute("readonly");

    document.getElementById(`edit-${id}`).style.display="none";
    document.getElementById(`save-${id}`).style.display="inline";
 

}

//.......................save button..............................
function saveRow(id){
    let myeno = document.getElementById(`eno-${id}`).value;
    let myName = document.getElementById(`nm-${id}`).value;
    let myCity = document.getElementById(`city-${id}`).value;
    let mySalary = document.getElementById(`salary-${id}`).value;
    

    let url = `http://localhost:3000/employees/${id}`;
    fetch(url, {
        method:"put",
        body:JSON.stringify({
            employeeno:myeno,
            name:myName,
            city: myCity,
            salary:mySalary,
        }),
        headers:{
            "Content-type": "application/json: charset=utf-8",
        }
    })
  //........................as a developer use error dekhne ke liye...................
    .then((response)=>{
        console.log(response.ok);
        if(response.ok){
            alert("Data updated successfully");
            datashow();
        }
        else{
            throw new Error("Error while updating");
        }
    })
    .catch((error)=>{
        console.log(error)
    });

}


//............table show hone ke liye createv the table.......................
async function datashow(){
    let mytable = `
    <table>
    <tr>
    <th>Employeeno</th>
    <th>Name</th>
    <th>City</th>
    <th>Salary</th>
    <th>Action</th>
    </tr>
    `;

    let url = "http://localhost:3000/employees";

    let myobj = await fetch(url);
    console.log(myobj);

    let mydata = await myobj.json();   //array of object milta he
    console.log(mydata);

    mydata.map((key)=>{
        mytable += `
        <tr>
<td> <input type="text" value = "${key.employeeno}" id = "eno-${key.id}" readonly > </td>
<td> <input type="text" value = "${key.name}" id = "nm-${key.id}" readonly > </td>
<td> <input type="text" value = "${key.city}" id = "city-${key.id}" readonly > </td>
<td> <input type="text" value = "${key.salary}" id = "salary-${key.id}" readonly > </td>
 

<td>
<a href="#" onclick = "myrecordRemove('${key.id}')" class= "button button-delete">Delete</a>
<a href="#" onclick = "editRow('${key.id}')" id="edit-${key.id}" class= "button button-edit">Edit</a>
<a href="#" onclick = "saveRow('${key.id}')" id="save-${key.id}" class= "button button-save" style="display:none">Save</a>
</td>
</tr>

`;



    });

    mytable += `</table>`
    document.getElementById("demo").innerHTML = mytable;
}
datashow();