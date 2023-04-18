using System;
using Microsoft.AspNetCore.Mvc;
using Streamish.Repositories;
using Streamish.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Streamish.Controllers
{
    [Authorize]
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


        [HttpGet("{firebaseUserId}")]
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
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



        //[HttpPost]
        //public IActionResult Post(UserProfile userProfile)
        //{
        //    _userProfileRepository.Add(userProfile);
        //    return CreatedAtAction("Get", new { id = userProfile.Id }, userProfile);
        //}


        [HttpGet("Me")]
        public IActionResult Me()
        {
            var userProfile = GetCurrentUserProfile();
            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult Register(UserProfile userProfile)
        {
            // All newly registered users start out as a "user" user type (i.e. they are not admins)
            //userProfile.UserTypeId = UserType.USER_TYPE_ID;
            userProfile.DateCreated = DateTime.Now;
            _userProfileRepository.Add(userProfile);

            return CreatedAtAction(
                nameof(GetByFirebaseUserId), new { firebaseUserId = userProfile.FirebaseUserId }, userProfile);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }

}
