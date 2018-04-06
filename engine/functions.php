<?php

function connect($ip, $user, $password, $database){
    $con = mysqli_connect($ip, $user, $password, $database) or die('try again in some minutes, please');
    if (!$con)
        printf("Connect failed: %s\n", mysqli_connect_error());
    //exit();
    else
        return $con;
}
function encrypt($username, $password)
{
    $password = sha1(strtoupper($username) . ":" . strtoupper($password));
    $password = strtoupper($password);
    return $password;
}
function check_user_exist($username){
    global $db_ip, $db_user, $db_password, $db_auth;
    $con = connect($db_ip, $db_user, $db_password, $db_auth);
    $stmt = $con->prepare("SELECT * FROM account WHERE `username`=?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    return $stmt->num_rows;
    $stmt->close();
    $con->close();
}
function check_email_exist($email){
    global $db_ip, $db_user, $db_password, $db_auth;
    $con = connect($db_ip, $db_user, $db_password, $db_auth);
    $stmt = $con->prepare("SELECT * FROM account WHERE `email`=?");
    $stmt->bind_param("s",$email);
    $stmt->execute();
    $stmt->store_result();
    return $stmt->num_rows;
    $stmt->close();
    $con->close();
}
function validate_email($email){
    if (strlen($email) > 30){
        return false;
    }
    else
        return filter_var($email, FILTER_VALIDATE_EMAIL);
}
function clean($string) {
    $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.

    return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
}
function register_user($username, $email, $password, $repassword){
    if ($password != $repassword)
        return "Passwords does not match!";
    else
        $new_password = encrypt($username,$password);

    $sql = "INSERT INTO `account` (`username`, `sha_pass_hash`, `email`) VALUES (?,?,?)";
    global $db_ip, $db_user, $db_password, $db_auth;
    $con = connect($db_ip, $db_user, $db_password, $db_auth);
    if (check_user_exist($username) > 0)
        return "Este username já foi utilizado!";
    if (check_email_exist($email) > 0)
        return "Este email já foi utilizado!";
    if (validate_email($email) == false)
        return "This email is not valid, using a valid email will help us to aid you in case of a problem related to your account!";
    else {
        if (check_user_exist($username) == 0 && check_email_exist($email) == 0) {
            if ($stmt = $con->prepare($sql)) {
                $stmt->bind_param("sss", $username, $new_password, $email);
                $stmt->execute();
                $stmt->close();
                return "$username criado com sucesso!";
            }
        }
        else
            return "Please fix the errors and try again!";
    }
    $con->close();
}

function getNumUsersOnline(){
    global $db_ip, $db_user, $db_password, $db_auth;
    $con  = connect($db_ip, $db_user, $db_password, "characters");
    $online = $con->query("SELECT COUNT(*) FROM characters WHERE online > 0;");
    $row = $online->fetch_row();
    $number = $row[0];
    return $number;
}

function getCharactersOnline(){
    global $db_ip, $db_user, $db_password, $db_auth;
    $con  = connect($db_ip, $db_user, $db_password, "characters");
    $online = $con->query("SELECT name, race, level, class, gender, latency  FROM characters WHERE online > 0 order by name;");
    $row = $online->fetch_all(MYSQLI_NUM);
    return $row;
}
