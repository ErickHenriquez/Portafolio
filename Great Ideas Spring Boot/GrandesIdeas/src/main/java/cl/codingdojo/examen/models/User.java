package cl.codingdojo.examen.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.JoinColumn;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name="users")
public class User {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty(message="El nombre no debe estar vacio")
	private String name;
	@NotEmpty(message="El correo no debe estar vacio")
	@Email(message="Email debe ser valido")
	private String email;
	
	@Size(min=8, message="La contraseña debe tener al menso 8 caracteres")
	private String password;
	@Transient
	private String passwordConfirm;
	
	@Column(updatable = false)
	private Date createdAt;
	private Date updatedAt;
	
	// Relacion OneToMany hacia Idea
	
	@OneToMany(mappedBy="user", fetch = FetchType.LAZY)
    private List<Idea> ideas;
	
	// Relacion ManytoMany hacia Idea para los likes
	
	@ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_likes_idea", 
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "idea_id")
    )
	@JsonIgnore
    private List<Idea> ideasLike;
	
	
	@PrePersist
	protected void onCreate() {
		this.createdAt = new Date();
	}

	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}
	
	// Constructor
	public User() {	
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPasswordConfirm() {
		return passwordConfirm;
	}

	public void setPasswordConfirm(String passwordConfirm) {
		this.passwordConfirm = passwordConfirm;
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

	public List<Idea> getIdeas() {
		return ideas;
	}

	public void setIdeas(List<Idea> ninjas) {
		this.ideas = ninjas;
	}

	public List<Idea> getIdeasLike() {
		return ideasLike;
	}

	public void setIdeasLike(List<Idea> ideasLike) {
		this.ideasLike = ideasLike;
	}

}
