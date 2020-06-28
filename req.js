var unirest = require("unirest");

var req = unirest("GET", "https://ip-geo-location.p.rapidapi.com/ip/23.123.12.11");

req.query({
	"format": "json"
});

req.headers({
	"x-rapidapi-host": "ip-geo-location.p.rapidapi.com",
	"x-rapidapi-key": "cd4a54e568msh017b9aa717e35d3p168bf3jsnfc32d219d524",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});