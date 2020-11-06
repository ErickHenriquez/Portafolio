<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
	rel="stylesheet">
</head>
<body>

	<div class="container mt-5 justify-content-center ">
	
		<div class="d-flex flex-row-reverse mt-3">
			<a href="/ideas">Dashboard</a>
		</div>
	
		<h1 class="mb-3 font-italic">Edit <c:out value="${idea.name}"/></h1>
		
		<form action="/ideas/${idea.id}" method="post">
			<input type="hidden" name="_method" value="put">
			<label>Content:</label>
			<input type="text" name="ideaName" placeholder="<c:out value="${idea.name}"/>">
			<p class="text-danger">
				<c:out value="${error}" />
			</p>
			<input class="d-block mt-5 mb-4" type="submit" value="Update">
		</form>		
		
		<form action="/ideas/${idea.id}" method="post">
			<input type="hidden" name="_method" value="delete">
			<input type="submit" value="Delete">
		</form>

		
	</div>
	
	
	<script src="/webjars/jquery/3.4.1/dist/jquery.min.js"></script>
	<script src="/webjars/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</body>
</html>