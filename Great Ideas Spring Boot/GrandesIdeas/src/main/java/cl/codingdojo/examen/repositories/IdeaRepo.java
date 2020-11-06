package cl.codingdojo.examen.repositories;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import cl.codingdojo.examen.models.Idea;

@Repository
public interface IdeaRepo extends CrudRepository<Idea, Long>{
	
	List<Idea> findAll();
	
	//Este método recupera las ideas en forma descendente de mayor a menos cantidad de likes
    //List<Idea> findByOrderByCountIdeasLikeDesc();
    
    //Este método recupera las ideas en forma ascendente de menor a mayor cantidad de likes
    //List<Idea> findByOrderByCountIdeasLikeAsc();
	
	// Consultas nativas para el orden de las ideas segun cantidad de Likes
	
	@Query(value=
			"SELECT idea_id\r\n" + 
			"FROM ideas.user_likes_idea \r\n" + 
			"GROUP BY idea_id\r\n" + 
			"ORDER BY COUNT(user_id) ASC"
			, nativeQuery=true)
    List<Long> findAllIdsIdeasOrderByCountLikesAsc();
	
	@Query(value=
			"SELECT idea_id\r\n" + 
			"FROM ideas.user_likes_idea \r\n" + 
			"GROUP BY idea_id\r\n" + 
			"ORDER BY COUNT(user_id) DESC"
			, nativeQuery=true)
    List<Long> findAllIdsIdeasOrderByCountLikesDesc();
	
	List<Idea> findByIdNotIn(Collection<Long> ListId);

}
