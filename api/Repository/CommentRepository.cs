using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTO.Comment;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly AppDbContext _context;
        public CommentRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Comment>> GetAllAsync()
        {
            return await _context.Comments.Include(a => a.AppUser).ToListAsync();
        }

        public async Task<PaginatedResult<CommentDTO?>> GetByCoinIdAsync(string id, int page = 1, int pageSize = 10)
        {

            var coin = await _context.Coins.FirstOrDefaultAsync(x => x.CoinName.ToLower() == id.ToLower());
            //  var comments = await _context.Comments.Include(a => a.AppUser).Where(x => x.CoinId == coin.Id).OrderByDescending(x => x.CreatedOn).Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            if (coin == null)
            {
                return null;
            }
            var query = _context.Comments
                .Include(a => a.AppUser)
                .Where(x => x.CoinId == coin.Id);

            var totalCount = await query.CountAsync();


            var comments = await query
                .OrderByDescending(x => x.CreatedOn)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();


            var commentDtos = comments.Select(c => c.ToCommentDto()).ToList();

            return new PaginatedResult<CommentDTO?>
            {
                Items = commentDtos,
                TotalCount = await _context.Comments.CountAsync(x => x.CoinId == coin.Id),
                Page = page,
                PageSize = pageSize
            };
        }
        public async Task<Comment> CreateAsync(Comment commentModel)
        {
            await _context.Comments.AddAsync(commentModel);
            await _context.SaveChangesAsync();
            return commentModel;
        }

        public async Task<Comment?> UpdateAsync(int id, Comment commentModel)
        {
            var existingComment = await _context.Comments.FindAsync(id);
            if (existingComment == null)
            {
                return null;
            }
            existingComment.Title = commentModel.Title;
            existingComment.Content = commentModel.Content;
            await _context.SaveChangesAsync();

            return existingComment;

        }

        public async Task<Comment?> DeleteAsync(int id)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(x => x.Id == id);
            if (comment == null)
            {
                return null;
            }
            _context.Remove(comment);
            await _context.SaveChangesAsync();
            return comment;

        }


    }
}