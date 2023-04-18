using Streamish.Models;
using System.Collections.Generic;

namespace Streamish.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();

        //UserProfile GetById(int id);

        public void Add(UserProfile userProfile);

        public List<UserProfile> GetUsersWithVideos();

        public UserProfile GetUserByIdWithVideos(int id);

        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}