<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Ideas</title>
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
	rel="stylesheet">
</head>
<body>
	<div class="container">
		<h1 class="p-3 mb-2 text-success">Welcome to Great Ideas</h1>
		<div class="row">
			<div class="col-md-5">
				<h2>Register</h2>

				<p>
					<form:errors path="user.*" />
				</p>

				<form:form method="POST" action="/registration"
					modelAttribute="user">

					<div class="form-group">
						<form:input path="name" class="form-control"
							placeholder="Name" />
					</div>

					<div class="form-group">
						<form:input path="email" class="form-control" placeholder="Email"
							type="Email" />
					</div>
					
					<div class="form-group">
						<form:password path="password" class="form-control"
							placeholder="Password" />
					</div>
					<div class="form-group">
						<form:password path="passwordConfirm" class="form-control"
							placeholder="Password Confirmation" />
					</div>
					
					<div class="form-group">
						<input type="submit" value="Register!" />
					</div>
				</form:form>
			</div>
			<div class="col-md-2"></div>
			<div class="col-md-5">
				<fieldset>
					<legend>Login</legend>

					<form method="post" action="/login">
						<div class="form-group">
							<input id="email" type="text" class="form-control" name="email"
								placeholder="Email">
						</div>
						<div class="form-group">
							<input id="password" type="password" class="form-control"
								name="password" placeholder="Password">
						</div>
						<p class="text-danger">
							<c:out value="${error}" />
						</p>
						<input type="submit" value="Login!" />
					</form>
				</fieldset>
			</div>
		</div>
	</div>
	<script src="/webjars/jquery/3.4.1/dist/jquery.min.js"></script>
	<script src="/webjars/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</body>
</html>