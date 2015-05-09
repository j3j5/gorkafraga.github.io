<?php
if(isset($_POST['email'])) {

	// CHANGE THE TWO LINES BELOW
	$email_to = "email@domain.com";

	$email_subject = "Email subject";

	function died($error) {
		// your error code can go here
		echo "We are very sorry, but there were error(s) found in the form you submitted.";
		die();
	}

	// validation expected data exists
	if(!isset($_POST['name']) ||
		!isset($_POST['email']) ||
		!isset($_POST['message'])) {
		died('We are sorry, but there appears to be a problem with the form you submitted.');       
	}

	$first_name = $_POST['name']; // required
	$email_from = $_POST['email']; // required
	$message = $_POST['message']; // required

	$error_message = "";
	$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
	if(!preg_match($email_exp,$email_from)) {
	$error_message .= 'The email you entered does not appear to be valid.<br />';
	}
	$string_exp = "/^[A-Za-z .'-]+$/";
	if(!preg_match($string_exp,$first_name)) {
	$error_message .= 'The name you entered does not appear to be valid.<br />';
	}
	if(strlen($message) < 2) {
	$error_message .= 'The message you entered do not appear to be valid.<br />';
	}
	if(strlen($error_message) > 0) {
	died($error_message);
	}
	$email_message = "Form details below.\n\n";

	function clean_string($string) {
		$bad = array("content-type","bcc:","to:","cc:","href");
		return str_replace($bad,"",$string);
	}

	$email_message .= "Name: ".clean_string($first_name)."\n";
	$email_message .= "Email: ".clean_string($email_from)."\n";
	$email_message .= "Comments: ".clean_string($message)."\n";

// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);  
?>

<!-- place your own success html below -->

Thank you for contacting us. We will be in touch with you very soon.

<?php
}
die();
?>