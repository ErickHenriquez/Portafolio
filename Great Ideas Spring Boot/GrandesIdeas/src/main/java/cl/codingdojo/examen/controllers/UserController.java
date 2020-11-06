package cl.codingdojo.examen.controllers;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import cl.codingdojo.examen.models.User;
import cl.codingdojo.examen.services.ProjectService;
import cl.codingdojo.examen.validators.UserValidator;



@Controller
public class UserController {

	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private UserValidator userValidator;
	
	@GetMapping("")
	public String index(@ModelAttribute("user") User user) {
		return "/pages/index.jsp";
	}

	@PostMapping("/registration")
	public String registerUser(@Valid @ModelAttribute("user") User user, BindingResult result, HttpSession session, Model model) {
		this.userValidator.validate(user, result);
		if (result.hasErrors()) {
			return "/pages/index.jsp";
		}
		
		User u = this.projectService.registerUser(user);
		session.setAttribute("user", u);
		return "redirect:/";
	}

	@PostMapping("/login")
	public String loginUser(@ModelAttribute("user") User user, @RequestParam("email") String email, @RequestParam("password") String password, Model model,
			HttpSession session) {
		if (this.projectService.authenticateUser(email, password)) {
			session.setAttribute("user", this.projectService.findByEmail(email));
			return "redirect:/ideas";
		}
		model.addAttribute("error", "Invalid credentials. Please try again");
		return "/pages/index.jsp";
	}

	@RequestMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:";
	}
}
