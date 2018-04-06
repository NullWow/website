<?php
foreach (glob("engine/*.php") as $filename)
{
    include $filename;
}

if(isset($_POST['gResponse'])) {
	$ip = $_SERVER['REMOTE_ADDR'];
	$response = $_POST['gResponse'];
	if(validateCaptcha($response, $ip)){
		$response = "captcha validado com sucesso!";
		if(isset($_POST['doRegister'])){
			$email = $_POST['email'];
			$pass = $_POST['password'];
			$pass2 = $_POST['passwordConfirm'];
			$username = $_POST['username']; 
			
			$response = register_user(clean($username), $email, $pass, $pass2);
		}
	} else {
		$response = "Erro no captcha! clique <a href=\"./index.html\">aqui</a> e tente novamente!";
	}
} else {
	$response = "Erro no captcha! clique <a href=\"./index.html\">aqui</a> e tente novamente!";
}

?>
<script>
    var responseText = "<?php echo $response;?>"
</script>

<html lang="pt-br">
<head>
	<link rel="shortcut icon" type="image/png" href="img/favicon.png"/>			
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/1000hz-bootstrap-validator/0.11.9/validator.min.js"></script>		
	<script src="js/load.js"></script>
	<script src="js/onlinePlayers.js"></script>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="WOTLK BR sem donate!">
	<meta name="keywords" content="WOTLK, Wotlk, wow, wow 3.3.5, 3.3.5, 3.3.5a, World of Warcraft, WOW, Warcraft, Litch, Litch King, King, Server, Server wow">

	<script>
		$(document).ready(function(){
			$('#header').load('components/header.html');
			$('#navbar').load('components/navbar.html');
			$('#content').load('components/content/register.html');
		});
	</script>

	<title>NullWoW - WoW de verdade!</title>
</head>

<body class="container-fluid" style="background-color: rgba(25, 36, 37, .9);">
	<div id="header" class="container-max-width"></div>
	<div id="navbar" class="container-max-width"></div>
	<div id="content" class="container"></div>
	<div id="bottom" class="container"></div>
</body>
</html>
