﻿using Microsoft.AspNetCore.Mvc;
using Streamish.Models;
using System;
using System.Collections.Generic;

namespace Streamish.Repositories
{
    public interface IVideoRepository
    {
        void Add(Video video);
        void Delete(int id);
        List<Video> GetAll();
        Video GetById(int id);
        void Update(Video video);
        public List<Video> GetAllWithComments();

        Video GetVideoByIdWithComments(int id);

        public List<Video> Search(string criterion, bool sortDescending);

        public List<Video> Hottest(DateTime date);
    }
}