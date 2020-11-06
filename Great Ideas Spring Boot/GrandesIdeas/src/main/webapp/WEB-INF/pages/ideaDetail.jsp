<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Ideas</title>
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
	rel="stylesheet">
<style type="text/css">
	.enlinea{
		display: inline-block;
	}
</style>
</head>
<body>
	
	<div class="container mt-5 justify-content-center ">
	
		<div class="d-flex flex-row-reverse mt-3">
			<a href="/ideas">Dashboard</a>
		</div>

		<h1 class="mb-3 font-italic"><c:out value="${idea.name}"/></h1>
		
		<div class="enlinea"> 
			<h3>Created by:  </h3> 
		</div>
		<div class="enlinea ml-2">
			<h1 class="font-weight-light"><c:out value="${idea.user.name}"/></h1> 
		</div>
		
		<h2 class="mt-4">Users who liked your idea: </h2>
	
		<div class="table-responsive mt-5 border">
			<table class="table">
				<thead>
					<tr>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach var="user" items="${idea.userLikes}">
						<tr>
							<td><c:out value="${user.name}"/></td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
		
      	<c:if test="${idea.user.id == user.id}">
		
			<form action="/ideas/<c:out value="${idea.id}"/>/edit" method="GET">
				<input class="mt-4" type="submit" value="edit">
			</form>
		
		</c:if>
		
	</div>

	<script src="/webjars/jquery/3.4.1/dist/jquery.min.js"></script>
	<script src="/webjars/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</body>
</html>