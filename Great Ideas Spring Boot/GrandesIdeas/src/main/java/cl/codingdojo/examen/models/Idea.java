package cl.codingdojo.examen.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name="ideas")
public class Idea {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty(message="El nombre no debe estar vacio")
	private String name;
	
	@Column(updatable = false)
	private Date createdAt;
	private Date updatedAt;
	
	// Relacion ManyToOne hacia User
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;
	
	// Relacion ManyToManye hacia User para los likes que tendra esta idea
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
	        name = "user_likes_idea", 
	        joinColumns = @JoinColumn(name = "idea_id"), 
	        inverseJoinColumns = @JoinColumn(name = "user_id")
	    )
	@JsonIgnore
	private List<User> userLikes;
	
	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}

	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}
	
	// Constructor
	public Idea() {
	}
	
	public Idea(String name, User user) {
		this.name = name;
		this.user = user;
	}
	
	// Metodos
	
	public Boolean findLike(User user) {
		for(User valor : this.userLikes) {
			if (valor.getId() == user.getId()) {
				return true;
			}
		}
		return false;
	}
	
	public void addUserLike(User user) {
		this.userLikes.add(user);
	}
	
	public void deleteUserLike(User user) {
		for(int i=0; i<this.userLikes.size(); i++) {
			if (this.userLikes.get(i).getId() == user.getId()) {
				this.userLikes.remove(i);
			}
		}
	}
	
	public void deleteUsersLikes() {
		for(int i=0; i<this.userLikes.size(); i++) {
			this.userLikes.remove(i);
		}
	}
	
	// Getters and Setters

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<User> getUserLikes() {
		return userLikes;
	}

	public void setUserLikes(List<User> userLikes) {
		this.userLikes = userLikes;
	}
	

}
