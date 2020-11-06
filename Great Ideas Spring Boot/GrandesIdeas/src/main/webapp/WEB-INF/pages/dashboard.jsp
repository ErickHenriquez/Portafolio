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
</head>
<body>

	
	<div class="container mt-5 justify-content-center ">
		<h1>Welcome, ${user.name}</h1>
	
		<div class="d-flex justify-content-between">
			<div>
				<h2>Ideas</h2>
			</div>
			
			<div class="topside">
				<a class="mr-3" href="/ideas/low">Low Likes</a>
				<a href="/ideas/high">High Likes</a>		
			</div>
		</div>
		
		<div class="table-responsive mt-5 border border-white">
			<table class="table">
				<thead>
					<tr>
						<th>Idea</th>
						<th>Created By:</th>
						<th>Likes</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach var="idea" items="${ideas}">
						<tr>
			    			<td><a href="/ideas/<c:out value="${idea.id}"/>"><c:out value="${idea.name}"/></a></td>
			    			<td><c:out value="${idea.user.name}"/></td>
			    			<td><c:out value="${idea.userLikes.size()}"/></td>

			    			<td>
			    				<c:choose>
			    					<c:when test="${idea.findLike(user)}">
			    						<a href="/ideas/unlike/<c:out value="${idea.id}"/>">Unlike</a>
			    					</c:when>
			    					<c:otherwise>
			    						<a href="/ideas/like/<c:out value="${idea.id}"/>">Like</a>
			    					</c:otherwise>
								</c:choose>
							</td>
			    		</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
		
		<form action="/ideas/new" method="GET">
			<input type="submit" value="Create an Idea">
		</form>
		
	</div>
	
	<script src="/webjars/jquery/3.4.1/dist/jquery.min.js"></script>
	<script src="/webjars/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</body>
</html>