const appConfig = require('../functions/appConfig')

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
}

async function updateRoomTypes(){
    let startDate = $("#inDate").val();
    let endDate = $("#outDate").val();
    let type = $("input[name=type]:checked").val();
    let url = `http://localhost:3000/reservation/updateAvailabilityInfo?start=${startDate}&end=${endDate}&type=${type}`
    setAvailableRooms(await appConfig.getData(url))
}

$("#updateRoomTypes").on("click", updateRoomTypes);