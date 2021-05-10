let submitForm = $("#submitForm")
submitForm.css({"display":"none"});


async function getData(url){
    let response = await fetch(url);
    return await response.json();
}

function hideInputs(rooms){
    let singleCheck = $("#Single")
    let doubleCheck = $("#Double")
    let treeCheck = $("#Tree")
    let villaCheck = $("#Villa")
    for (let roomKey in rooms){
        if (rooms.hasOwnProperty(roomKey)) {
            if (rooms[roomKey] < 1){
                if (roomKey === "single"){
                    singleCheck.css({"display":"none"})
                } else if (roomKey === "double"){
                    doubleCheck.css({"display":"none"})
                } else if (roomKey === "tree"){
                    treeCheck.css({"display":"none"})
                } else if (roomKey === "villa"){
                    villaCheck.css({"display":"none"})
                }
            }
        }
    }
}

function setAvailableRooms(freeRooms){
    let rooms = {
        "single": 0,
        "double": 0,
        "tree": 0,
        "villa": 0
    }
    console.log(freeRooms)
    for (let room of freeRooms){
        if (room.type === "Single"){
            rooms.single++
        } else if (room.type === "Double"){
            rooms.double++
        } else if (room.type === "Tree"){
            rooms.tree++
        } else if (room.type === "Villa"){
            rooms.villa++
        }
    }
    $("#roomsAvailability").html(
        `
        <p>Single: ${rooms.single}</p>
        <p>Double: ${rooms.double}</p>
        <p>Tree: ${rooms.tree}</p>
        <p>Villa: ${rooms.villa}</p>
        `
    )
    hideInputs(rooms)
    submitForm.css({"display":"block"});
}

async function updateRoomTypes(){
    let startDate = $("#inDate").val();
    let endDate = $("#outDate").val();
    // let type = $("input[name=type]:checked").val();
    if (startDate.length > 0 && endDate.length > 0){
        let url = `http://localhost:3000/reservation/updateAvailabilityInfo?start=${startDate}&end=${endDate}`
        setAvailableRooms(await getData(url))
    } else {
        window.alert("Enter dates!");
    }
}

$("#updateRoomTypes").on("click", updateRoomTypes);