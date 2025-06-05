using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Comment;
using api.Models;

namespace api.Mappers
{
    public static class CommentMapper
    {
        public static CommentDTO ToCommentDto(this Comment commentModel)
        {
            return new CommentDTO
            {
                Id = commentModel.Id,
                Title = commentModel.Title,
                Content = commentModel.Content,
                CreatedOn = commentModel.CreatedOn,
                CoinId = commentModel.CoinId,
                CreatedBy = commentModel.AppUser.UserName
            };
        }
        public static Comment ToCommentFromDto(this CommentDTO commentDto)
        {
            return new Comment
            {
                Id = commentDto.Id,
                Title = commentDto.Title,
                Content = commentDto.Content,
                CreatedOn = commentDto.CreatedOn,
                CoinId = commentDto.CoinId,
                AppUserId = commentDto.CreatedBy
            };
        }
        public static Comment ToCommentFromCreate(this CreateCommentDTO commentDto, string name)
        {
            return new Comment
            {
                Title = commentDto.Title,
                Content = commentDto.Content,

            };
        }
        public static Comment ToCommentFromUpdate(this UpdateCommentDTO commentDto)
        {
            return new Comment
            {
                Title = commentDto.Title,
                Content = commentDto.Content,

            };
        }
    }
}