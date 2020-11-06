package cl.codingdojo.examen.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.codingdojo.examen.models.Idea;
import cl.codingdojo.examen.models.User;
import cl.codingdojo.examen.repositories.IdeaRepo;
import cl.codingdojo.examen.repositories.UserRepo;


@Service
public class ProjectService {

	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private IdeaRepo ideaRepo;
	
	// register user and hash their password
	public User registerUser(User user) {
		String hashed = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
		user.setPassword(hashed);
		return userRepo.save(user);
	}
	
	// find user by email
	public User findByEmail(String email) {
		return userRepo.findByEmail(email);
	}
	
	// find user by id
	public User findUserById(Long id) {
		Optional<User> u = userRepo.findById(id);
		if (u.isPresent()) {
			return u.get();
		} 
		else{
			return null;
		}
	}
	
	// authenticate user
	public boolean authenticateUser(String email, String password) {
		// first find the user by email
		User user = userRepo.findByEmail(email);
		// if we can't find it by email, return false
		if (user == null) {
			return false;
		}
		// if the passwords match, return true, else, return false
		return BCrypt.checkpw(password, user.getPassword());
	}
	
	public List<Idea> findAllIdeas() {
		return ideaRepo.findAll();
	}
	
	public List<Idea> findAllIdeasLowFirst() {
		List<Long> listaDeIds = ideaRepo.findAllIdsIdeasOrderByCountLikesAsc();
		List<Idea> listaOrdenada = new ArrayList<>();
		for (Idea valor: ideaRepo.findByIdNotIn(listaDeIds)) {
			listaOrdenada.add(valor);
		}
		for(Long valor: listaDeIds) {
			listaOrdenada.add(findIdeaById(valor));
		}
		return listaOrdenada;
	}
	
	public List<Idea> findAllIdeasHighFirst() {
		List<Long> listaDeIds = ideaRepo.findAllIdsIdeasOrderByCountLikesDesc();
		List<Idea> listaOrdenada = new ArrayList<>();
		for(Long valor: listaDeIds) {
			listaOrdenada.add(findIdeaById(valor));
		}
		for (Idea valor: ideaRepo.findByIdNotIn(listaDeIds)) {
			listaOrdenada.add(valor);
		}
		return listaOrdenada;
	}	
	
	public Idea createIdea(Idea idea) {
		return ideaRepo.save(idea);	
	}
	
	// find user by id
	public Idea findIdeaById(Long id) {
		Optional<Idea> i = ideaRepo.findById(id);
		if (i.isPresent()) {
			return i.get();
		} 
		else{
			return null;
		}
	}
	
	public void deleteIdea(Idea idea) {
		ideaRepo.delete(idea);
	}
}
