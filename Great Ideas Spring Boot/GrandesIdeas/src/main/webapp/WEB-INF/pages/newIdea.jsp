<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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

	<div class="container mt-5 justify-content-center ">
	
		<div class="d-flex flex-row-reverse mt-3">
			<a href="/ideas">Dashboard</a>
		</div>
	
		<h2 class="mb-5">Create an Idea</h2>
		
		<form:form action="/ideas/new" method="POST" modelAttribute="idea">
			
			<div class="form-group">
				<form:label path="name">Content:</form:label>
	            <form:input path="name" placeholder="An Idea"/>
	            <br>
	            <form:errors class="error" path="name"/>
            </div>
            <div class="form-group">
				<input type="submit" value="Create">
			</div>
		</form:form>
	</div>
	
	<script src="/webjars/jquery/3.4.1/dist/jquery.min.js"></script>
	<script src="/webjars/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</body>
</html>