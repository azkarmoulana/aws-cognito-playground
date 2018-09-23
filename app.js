

function signIn(){
    let username = $('#sign_in_username').val();
    let password = $('#sign_in_password').val();
    
    //sign in user
    var authenticationData = {
        Username : username,
        Password : password,
    };
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    var poolData = {
        UserPoolId : 'us-east-2_0Ze8nOqyW', // Your user pool id here
        ClientId : '5sg7ohrdk6o1i82nfcdg76trvf' // Your client id here
    };
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    var userData = {
        Username : username,
        Pool : userPool
    };
    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            window.location.href = "E:/Dev/AWS/cognito/welcome.html";

        },

        onFailure: function(err) {
            alert(err);
        },

    });
}





function register(){
    let username = $('#registration_username').val();
    let password  = $('#registration_password').val();
    let email = $('#registration_email').val();
    
    //registering user
    var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

    var poolData = {
        UserPoolId : 'us-east-2_0Ze8nOqyW', // Your user pool id here
        ClientId : '5sg7ohrdk6o1i82nfcdg76trvf' // Your client id here
    };

    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name : 'email',
        Value : email
    };

    var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    userPool.signUp( username , password , attributeList, null, function(err, result){
        if (err) {
            alert(err);
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
        window.location.href = "E:/Dev/AWS/cognito/verify.html";
    });
}






function validate(){
    let username = $('#code_username').val();
    let code = $('#code_code').val();
   
    // confirming the mail
    var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

    var poolData = {
        UserPoolId : 'us-east-2_0Ze8nOqyW', // Your user pool id here
        ClientId : '5sg7ohrdk6o1i82nfcdg76trvf' // Your client id here
    };

    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    var userData = {
        Username : username,
        Pool : userPool
    };

    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    cognitoUser.confirmRegistration( code , true, function(err, result) {
        if (err) {
            alert(err);
            return;
        }
        console.log('call result: ' + result);
        window.location.href = "E:/Dev/AWS/cognito/index.html";
    });
}






function signOut(){
    
    var poolData = {
        UserPoolId : 'us-east-2_0Ze8nOqyW', // Your user pool id here
        ClientId : '5sg7ohrdk6o1i82nfcdg76trvf' // Your client id here
    };
    
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if(cognitoUser !== null){
        cognitoUser.signOut();
    }
    window.location.href = "E:/Dev/AWS/cognito/index.html";
   
}



function setWelcome(){
    
    var poolData = {
        UserPoolId : 'us-east-2_0Ze8nOqyW', // Your user pool id here
        ClientId : '5sg7ohrdk6o1i82nfcdg76trvf' // Your client id here
    };
    
    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
            if (err) {
                alert(err);
                return;
            }
            console.log('session validity: ' + session.isValid());
            $('#username').html(cognitoUser.username);

        


        });
    }

}