using System;
using Microsoft.AspNetCore.Mvc;
using Streamish.Repositories;
using Streamish.Models;

namespace Streamish.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var userProfile = _userProfileRepository.GetById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet("GetUsersWithVideos")]
        public IActionResult GetWithVideos()
        {
            var userProfile = _userProfileRepository.GetUsersWithVideos();
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }


        [HttpGet("GetUserByIdWithVideos/{id}")]
        public IActionResult GetUserWithVideos(int id)
        {
            var userProfile = _userProfileRepository.GetUserByIdWithVideos(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }



        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction("Get", new { id = userProfile.Id }, userProfile);
        }

    }
}
