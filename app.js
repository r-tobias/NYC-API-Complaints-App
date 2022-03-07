BASE_URL = "https://data.cityofnewyork.us/resource/erm2-nwe9.json?";
const complaintsDiv = document.getElementById("complaints-div");

const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener('click', async () => {
        const numComplaintsInput = document.querySelector("input");
        let numComplaints = numComplaintsInput.value;
        let boroughName = button.id;
        try {
            let response = await axios.get(`${BASE_URL}borough=${boroughName}&agency=NYPD`);
            let allData = response.data;
            // console.log(allData)
            if (numComplaints == "" || numComplaints == 0 || isNaN(numComplaints)) {
                numComplaints = 10;
            }
            // console.log(numComplaints)
            renderList(allData, numComplaints);
        }
        catch (error) {
            console.log(error)
        }
    })
})

const renderList = (arr, n) => {

    for (let i = 0; i < arr.length && i < n; i++) {
        let newP = document.createElement("p")
        newP.innerHTML = arr[i].descriptor;
        let viewMoreButton = document.createElement("button")
        viewMoreButton.className = "viewMoreButton"
        viewMoreButton.textContent = "WHAT DID THE POLICE DO?"
        let infoDiv = document.createElement("div")

        newP.appendChild(viewMoreButton);
        complaintsDiv.appendChild(newP)
        complaintsDiv.append(infoDiv)

        viewMoreButton.addEventListener('click', function () {
            infoDiv.innerHTML = arr[i].resolution_description;

        })

        
    }


}

