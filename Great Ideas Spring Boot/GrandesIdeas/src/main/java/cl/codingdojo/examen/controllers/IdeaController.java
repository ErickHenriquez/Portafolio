package cl.codingdojo.examen.controllers;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import cl.codingdojo.examen.models.Idea;
import cl.codingdojo.examen.models.User;
import cl.codingdojo.examen.services.ProjectService;


@Controller
public class IdeaController {
	
	@Autowired
	private ProjectService projectService;
	
	@GetMapping("/ideas")
	public String dashboardNormal(HttpSession s, Model m) {
		User user = (User) s.getAttribute("user");
		if (user == null) {
			return "redirect:";
		}
		m.addAttribute("ideas", projectService.findAllIdeas());
		return "/pages/dashboard.jsp";
	}
	
	
	@GetMapping("/ideas/low")
	public String dashboardLow(HttpSession s, Model m) {
		User user = (User) s.getAttribute("user");
		if (user == null) {
			return "redirect:";
		}
		m.addAttribute("ideas", projectService.findAllIdeasLowFirst());
		return "/pages/dashboard.jsp";
	}
	
	@GetMapping("/ideas/high")
	public String dashboardHigh(HttpSession s, Model m) {
		User user = (User) s.getAttribute("user");
		if (user == null) {
			return "redirect:";
		}
		m.addAttribute("ideas", projectService.findAllIdeasHighFirst());
		return "/pages/dashboard.jsp";
	}
	
	
	@GetMapping("/ideas/new")
	public String newIdea(HttpSession s, @ModelAttribute("idea") Idea idea) {
		User user = (User) s.getAttribute("user");
		if (user == null) {
			return "redirect:";
		}
		return "/pages/newIdea.jsp";
	}
	
	@PostMapping("/ideas/new")
	public String createIdea(HttpSession s, @Valid @ModelAttribute("idea") Idea idea, BindingResult result) {
		User user = (User) s.getAttribute("user");
		if (user == null) {
			return "redirect:";
		}
		if (result.hasErrors()) {
			return "/pages/newIdea.jsp";
		}
		idea.setUser(user);
		projectService.createIdea(idea);
		return "redirect:/ideas/new";
	}
	
	@GetMapping("/ideas/like/{id}")
	public String like(HttpSession s, @PathVariable("id") Long idIdea) {
		User user = (User) s.getAttribute("user");
		if (user == null) {
			return "redirect:";
		}
		Idea idea = projectService.findIdeaById(idIdea);
		idea.addUserLike(user);
		projectService.createIdea(idea);
		return "redirect:/ideas";
	}
	
	@GetMapping("/ideas/unlike/{id}")
	public String unlike(HttpSession s, @PathVariable("id") Long idIdea) {
		User user = (User) s.getAttribute("user");
		if (user == null) {
			return "redirect:";
		}
		Idea idea = projectService.findIdeaById(idIdea);
		idea.deleteUserLike(user);
		projectService.createIdea(idea);
		return "redirect:/ideas";
	}
	
	//Este maping solo muestra el detalle de una idea
	@GetMapping("/ideas/{id}")
	public String detailIdea(HttpSession s, @PathVariable("id") Long idIdea, Model model) {
		User user = (User) s.getAttribute("user");
		if (user == null) {
			return "redirect:";
		}
		model.addAttribute("user", user);
		model.addAttribute("idea", projectService.findIdeaById(idIdea));
		return "/pages/ideaDetail.jsp";
	}
	
	// Actualiza el nombre de la idea
	@PutMapping("/ideas/{id}")
	public String actualizarIdea(HttpSession s, @PathVariable("id") Long idIdea, Model model, @RequestParam("ideaName") String ideaName) {
		User user = (User) s.getAttribute("user");
		if (user == null) {
			return "redirect:";
		}
		Idea idea = projectService.findIdeaById(idIdea);
		if (ideaName.equals("")) {
			model.addAttribute("error", "Can't be empty");
			model.addAttribute("idea", idea);
			return "/pages/editIdea.jsp";
		}
		idea.setName(ideaName);
		projectService.createIdea(idea);
		return "redirect:/ideas";
	}
	
	// Elimina la idea
	@DeleteMapping("/ideas/{id}")
	public String deleteIdea(HttpSession s, @PathVariable("id") Long idIdea, Model model) {
		User user = (User) s.getAttribute("user");
		if (user == null) {
			return "redirect:";
		}
		Idea idea = projectService.findIdeaById(idIdea);
		idea.deleteUsersLikes();
		projectService.deleteIdea(idea);
		return "redirect:/ideas";
	}
	
	
	@GetMapping("/ideas/{id}/edit")
	public String editIdea(HttpSession s, @PathVariable("id") Long idIdea, Model model) {
		User user = (User) s.getAttribute("user");
		if (user == null) {
			return "redirect:";
		}
		Idea idea = projectService.findIdeaById(idIdea);
		if (idea.getUser().getId() != user.getId()) {
			return "redirect:/ideas";
		}
		model.addAttribute("idea", idea);
		return "/pages/editIdea.jsp";
	}
	
	
	
	

}
