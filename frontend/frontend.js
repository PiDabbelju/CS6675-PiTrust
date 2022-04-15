// Process click on rateButton
$("#rateButton").click(function () {
    var ratingOutput = document.getElementById("ratingOutput")
    var address = document.getElementById("ratingAddress").value
    var rating = document.getElementById("rating").value
    var ratingTopic = document.getElementById("ratingTopic").value
    // Send message to smart contract
    sendRating(address, ratingTopic, rating).then(overallRating => {
        // Output result
            console.log(overallRating)
            ratingOutput.innerHTML = "<br /><b>Rating added for:</b><br /> ".
            concat("Address: ", address, "<br /> \
                Rating: ", rating , "<br /> \
                Topic: ", ratingTopic, "<br \> \
                Overall rating: ", overallRating)
        })
});

// Process click on queryButton
$("#queryButton").click(function () {
    var address = document.getElementById("queryAddress").value;
    queryAddress(address).then(results => {
        output = "<br /><b>Results for address</b> " + address + "<br /> Token Balance: " + results.balance + "<br />Topics: <br />"
        for (topic in results.topics)
        {
            var line = topic + ": " + results.topics[topic] + "<br />"
            output += line
        }
        queryOutput.innerHTML = output
    })
});

// Process click on listButton
$("#listButton").click(function () {
    var topic = document.getElementById("topic");
    listExperts(topic.value)
    listOutput.innerHTML = "<br /><b>Top experts for topic</b> " + topic.value + "<br />"
    // Slightly dirty: Subsequent calls in backend will require callbacks from there rather than "batch processing" as for the queryButton action)
});

// Process click on addButton
$("#addButton").click(function () {
    var address = document.getElementById("addAddress");
    addFunds(address.value)
    fundingOutput.innerHTML = "<br /><b>Funds added to:</b> " + address.value + "<br />"
});

// Process click on approveButton
$("#approveButton").click(function () {
    approve()
    approveOutput.innerHTML = "<br /><b>PiTrust usage approved for</b> " + web3.eth.Contract.defaultAccount + "<br />"
});

// Update cleartext value for slider (derived from from https://www.w3schools.com/howto/howto_js_rangeslider.asp)
var slider = document.getElementById("rating");
var ratingValue = document.getElementById("ratingValue");
slider.oninput = function() {
    ratingValue.innerHTML = this.value;
}