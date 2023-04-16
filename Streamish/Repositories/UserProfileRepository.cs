﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Streamish.Models;
using Streamish.Utils;

namespace Streamish.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT up.Id, up.[NAME], up.Email, up.ImageUrl, up.DateCreated
                       
                 FROM UserProfile up 
                     
             ORDER BY DateCreated
            ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var userProfiles = new List<UserProfile>();
                        while (reader.Read())
                        {
                            userProfiles.Add(new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            });

                        }

                        return userProfiles;
                    }
                }
            }
        }

        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT up.Id, up.[NAME], up.Email, up.ImageUrl, up.DateCreated
                       
                 FROM UserProfile up 
                      
                           WHERE up.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        UserProfile userProfile = null;
                        if (reader.Read())
                        {
                            userProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Email = DbUtils.GetString(reader, "Email"),
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                            };
                        }

                        return userProfile;
                    }
                }
            }
        }


        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO UserProfile (Name, Email, ImageUrl, DateCreated)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Email, @ImageUrl, @DateCreated)";

                    DbUtils.AddParameter(cmd, "@Name", userProfile.Name);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@ImageUrl", userProfile.ImageUrl);
                    DbUtils.AddParameter(cmd, "@DateCreated", userProfile.DateCreated);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<UserProfile> GetUsersWithVideos()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT
                       up.Id AS UserId, up.Name, up.Email, up.DateCreated AS UserProfileDateCreated,
                       up.ImageUrl AS UserProfileImageUrl,

                 v.Id AS VideoId, v.Title, v.Description, v.Url, 
                       v.DateCreated AS VideoDateCreated, v.UserProfileId As VideoUserProfileId
                  FROM UserProfile up
                       JOIN Video v ON v.UserProfileId = up.Id
            ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var users = new List<UserProfile>();
                        while (reader.Read())
                        {
                            var userId = DbUtils.GetInt(reader, "userId");

                            var existingUser = users.FirstOrDefault(p => p.Id == userId);
                            if (existingUser == null)
                            {
                                existingUser = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "VideoUserProfileId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    DateCreated = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
                                    ImageUrl = DbUtils.GetString(reader, "UserProfileImageUrl"),
                                    Videos = new List<Video>()
                                };
                                users.Add(existingUser);
                            }

                                if (DbUtils.IsNotDbNull(reader, "VideoId"))
                                {
                                    existingUser.Videos.Add(new Video()
                                    {
                                        Id = DbUtils.GetInt(reader, "VideoId"),
                                        Title = DbUtils.GetString(reader, "Title"),
                                        Description = DbUtils.GetString(reader, "Description"),
                                        DateCreated = DbUtils.GetDateTime(reader, "VideoDateCreated"),
                                        Url = DbUtils.GetString(reader, "Url"),
                                        UserProfileId = DbUtils.GetInt(reader, "VideoUserProfileId"),
                                    });
                                }
                    
                          };


                        return users;
                    }
                }
            }
        }

        public UserProfile GetUserByIdWithVideos(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT  up.Id AS UserId, up.Name, up.Email, up.DateCreated AS UserProfileDateCreated,
                       up.ImageUrl AS UserProfileImageUrl,

                 v.Id AS VideoId, v.Title, v.Description, v.Url, 
                       v.DateCreated AS VideoDateCreated, v.UserProfileId As VideoUserProfileId
                  FROM UserProfile up
                       JOIN Video v ON v.UserProfileId = up.Id 
                      
                           WHERE up.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        UserProfile userProfile = null;
                        while (reader.Read())
                        {
                            var userId = DbUtils.GetInt(reader, "UserId");

                            if (userProfile == null)
                            {
                                userProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "userId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    DateCreated = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
                                    Videos = new List<Video>(),
                                };
                            }

                            if (DbUtils.IsNotDbNull(reader, "VideoId"))
                            {
                                userProfile.Videos.Add(new Video()
                                {
                                    Id = DbUtils.GetInt(reader, "VideoId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    DateCreated = DbUtils.GetDateTime(reader, "VideoDateCreated"),
                                    Url = DbUtils.GetString(reader, "Url"),
                                    UserProfileId = DbUtils.GetInt(reader, "VideoUserProfileId"),
                                });
                            }
                        }

                        return userProfile;
                    }
                }
            }
        }

        //public UserProfile GetUserByIdWithVideosAndComments(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"SELECT up.Id AS UserId, up.Name, up.Email, up.DateCreated AS UserProfileDateCreated, up.ImageUrl AS UserProfileImageUrl,
        //                                v.Id AS VideoId, v.Title, v.Description, v.Url, v.DateCreated AS VideoDateCreated, v.UserProfileId As VideoUserProfileId,
        //                                c.Id AS CommentId, c.Message, c.UserProfileId AS CommentUserProfileId, c.VideoId AS CommentVideoId
        //                                FROM UserProfile up
        //                                JOIN Video v ON v.UserProfileId = up.Id
        //                                LEFT JOIN Comment c on c.VideoId = v.id
        //                                WHERE up.Id = @Id";

        //            DbUtils.AddParameter(cmd, "@Id", id);

        //            using (SqlDataReader reader = cmd.ExecuteReader())
        //            {
        //                UserProfile user = null;
        //                while (reader.Read())
        //                {
        //                    var userId = DbUtils.GetInt(reader, "UserId");
        //                    if (user == null)
        //                    {
        //                        user = new UserProfile()
        //                        {
        //                            Id = DbUtils.GetInt(reader, "UserId"),
        //                            Name = DbUtils.GetString(reader, "Name"),
        //                            Email = DbUtils.GetString(reader, "Email"),
        //                            ImageUrl = DbUtils.GetString(reader, "UserProfileImageUrl"),
        //                            DateCreated = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
        //                            Videos = new List<Video>(),
        //                            Comments = new List<Comment>()
        //                        };
        //                    }
        //                    if (DbUtils.IsNotDbNull(reader, "VideoId"))
        //                    {
        //                        user.Videos.Add(new Video()
        //                        {
        //                            Id = DbUtils.GetInt(reader, "VideoId"),
        //                            Title = DbUtils.GetString(reader, "Title"),
        //                            Description = DbUtils.GetString(reader, "Description"),
        //                            DateCreated = DbUtils.GetDateTime(reader, "VideoDateCreated"),
        //                            Url = DbUtils.GetString(reader, "Url"),
        //                            UserProfileId = DbUtils.GetInt(reader, "VideoUserProfileId"),
        //                        });
        //                    }
        //                    if (DbUtils.IsNotDbNull(reader, "CommentId"))
        //                    {
        //                        user.Comments.Add(new Comment()
        //                        {
        //                            Id = DbUtils.GetInt(reader, "CommentId"),
        //                            Message = DbUtils.GetString(reader, "Message"),
        //                            VideoId = DbUtils.GetInt(reader, "CommentVideoId"),
        //                            UserProfileId = DbUtils.GetInt(reader, "CommentUserProfileId")
        //                        });
        //                    }

        //                }
        //                return user;
        //            }
        //        }
        //    }
        //}


    }
}
