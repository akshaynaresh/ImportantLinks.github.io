let myLeads = []
const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if(Boolean(leadsFromLocalStorage)) {
	myLeads = leadsFromLocalStorage
	render(myLeads)
}

tabBtn.addEventListener("click", function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		myLeads.push(tabs[0].url)
		localStorage.setItem("myLeads", JSON.stringify(myLeads))
		render(myLeads)
	})
})

function render(leads) {
	let listItems = ""
	for( let i = 0; i < leads.length; i++) {
		// listItems += "<li><a href='" + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</a></li>"
		listItems += `
			<li>
				<a href="${leads[i]}" target="_blank">
					${leads[i]}
				</a>
			</li>
		`
		// ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"
		// create elemnent
		// set text conetent
		// append to ul
		// const li = document.createElement("li")
		// li.textContent = myLeads[i]
		// ulEl.append(li)
	}
	ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function() {
	localStorage.clear()
	myLeads = []
	render(myLeads)
})

inputBtn.addEventListener("click", function() {
	myLeads.push(inputEl.value)
	inputEl.value = ""
	// console.log(myLeads)
	localStorage.setItem("myLeads", JSON.stringify(myLeads))
	render(myLeads)
})

