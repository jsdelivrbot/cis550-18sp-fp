// Insert the following code snippet directly after the opening `<body>` tag on each page you want to use Facebook Analytics.
// Replace `{your-app-id}` with the App ID and `{latest-api-version}` with the SDK version
window.fbAsyncInit = function () {
    FB.init({
        appId: '2075755972705489',
        cookie: true,
        xfbml: true,
        version: 'v2.12'
    });
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
    FB.AppEvents.logPageView();
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        selELements(true);
        testAPI();
        console.log('Logged in');
    } else {
        selELements(false);
        console.log('Not authenticated');
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
        // console.log(response);
    });
}

function testAPI() {
    FB.api('/me?fields=name,email,birthday,location', function (response) {
        if (response && !response.error) {
            console.log(response);
            buildProfile(response);
            // $window.sessionStorage.location = ${user.location};
            console.log(response.location);
        }
    })
}

function buildProfile(user) {
    let profile = `
                <h3>${user.name}</h3>
                <ul class = "list-group">
                    <li class = "list-group-item">User ID: ${user.id}</li>
                    <li class = "list-group-item">Email: ${user.email}</li>
                    <li class = "list-group-item">Location: ${user.location.name}</li>
                </ul>
            `;
    var a = user.location.name.split(",")[1];
    a = a.substring(1);
    console.log(a);
    window.sessionStorage.state = a;
    $("#profile").html(profile);
    $(".list-group").css("background-color", "white");
    $(".list-group-item").css("background-color", "white");
    $(".list-group-item").css("font-size", "10px");
    $(".list-group-item").css("color", "rgba(50,20,130,0.5)");
}

function selELements(isLoggedIn) {
    if (isLoggedIn) {
        document.getElementById('profile').style.display = 'block';
        document.getElementById('fb-btn').style.display = 'none';
        document.getElementById('logout').style.display = 'block';
    } else {
        document.getElementById('profile').style.display = 'none';
        document.getElementById('fb-btn').style.display = 'block';
        document.getElementById('logout').style.display = 'none';
    }
}

function logout() {
    FB.logout(function (response) {
        selELements(false);
    });
}
