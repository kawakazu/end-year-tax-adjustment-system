using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

using myapp.Models;

namespace myapp.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly SampleAPIContext _context;

        public AuthController(SampleAPIContext context)
        {
            _context = context;
        }
        public class LoginRequest
        {
            public string login_id { get; set; }
            public string password { get; set; }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<ApplicationUser>> Login(LoginRequest request)
        {
            var applicationUser =  _context.ApplicationUser.
                Where(m => m.Email == request.login_id && m.Password == request.password).First();
            if (applicationUser == null) {
                return BadRequest("アドレスまたはパスワードが違います。");
            }
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, request.login_id),
            };
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var claimsPrincipal = new ClaimsPrincipal(identity);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);

            
            return applicationUser;
        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUser>> GetAccount(int id) {
            var account = await _context.ApplicationUser.Where(m => m.ApplicationUserId  == id).FirstAsync();
            if (account == null)
            {
                return NotFound();
            }
            return account;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Create(ApplicationUser user)
        {
            user.ApplicationUserId = _context.ApplicationUser.Any() ?
                        _context.ApplicationUser.Max(p => p.ApplicationUserId) + 1 : 1;
            _context.ApplicationUser.Add(user);

            await _context.SaveChangesAsync();
            return CreatedAtAction("GetAccount", new { id = user.ApplicationUserId }, user);
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> IsLogin()
        {
            // Cookieが存在するかの処理
            var authResult = await HttpContext.AuthenticateAsync();
            if (authResult.Succeeded == false)
            {
                return Ok(false);
            }

            return Ok(true);
        }
    }
}