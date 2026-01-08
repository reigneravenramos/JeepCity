using JeepCity.Data;
using JeepCity.Models;
using JeepCity.Models.Domain;
using JeepCity.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JeepCity.Controllers
{
    public class UsersController : Controller
    {
        private readonly JeepCityDbContext jeepCityDbContext;
        public UsersController(JeepCityDbContext jeepCityDbContext)
        {
            this.jeepCityDbContext = jeepCityDbContext;
        }


        [HttpGet]
        public IActionResult AddUser()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(AddUserViewModel addUserRequest)
        {
            var user = new User()
            {
                Id = Guid.NewGuid(),
                name = addUserRequest.name,
                email = addUserRequest.email,
                subject = addUserRequest.subject,
                feedback = addUserRequest.feedback
            };

            await jeepCityDbContext.Users.AddAsync(user);
            await jeepCityDbContext.SaveChangesAsync();
            return RedirectToAction("Index");
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var users = await jeepCityDbContext.Users.ToListAsync();
            return View(users);
        }

    }


}

