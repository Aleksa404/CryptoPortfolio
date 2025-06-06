using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Comment;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly ICoinRepository _coinRepo;
        private readonly UserManager<AppUser> _userManager;

        public CommentController(ICommentRepository commentrepo, ICoinRepository coinRepo, UserManager<AppUser> userManager)
        {
            _commentRepo = commentrepo;
            _coinRepo = coinRepo;
            _userManager = userManager;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comments = await _commentRepo.GetAllAsync();
            var commentDto = comments.Select(s => s.ToCommentDto());

            return Ok(commentDto);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByCoinId([FromRoute] string id, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);


            var comments = await _commentRepo.GetByCoinIdAsync(id, page, pageSize);
            if (comments == null)
            {
                return NotFound();
            }
            return Ok(comments);
        }
        [Authorize]
        [HttpPost("{name}")]
        public async Task<IActionResult> Create([FromRoute] string name, [FromBody] CreateCommentDTO commentDto)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!await _coinRepo.CoinExists(name))
            {
                return BadRequest("coin does not exist");
            }

            var username = User.GetUsernameFromClaim();
            var appUser = await _userManager.FindByNameAsync(username);

            var commentModel = commentDto.ToCommentFromCreate(name);
            if (appUser == null)
            {
                return Unauthorized("User not found");
            }
            commentModel.AppUserId = appUser.Id;

            var coin = await _coinRepo.GetByNameAsync(name);


            commentModel.CoinId = coin?.Id;

            await _commentRepo.CreateAsync(commentModel);

            return CreatedAtAction(nameof(GetByCoinId), new { id = commentModel.Id }, commentModel.ToCommentDto());
        }
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentDTO updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comment = await _commentRepo.UpdateAsync(id, updateDto.ToCommentFromUpdate());
            if (comment == null)
            {
                return NotFound("Comment not found");
            }
            return Ok(comment.ToCommentDto());
        }
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var commentModel = await _commentRepo.DeleteAsync(id);
            if (commentModel == null)
            {
                return NotFound("Comment not found");
            }
            return Ok("Comment deleted");

        }
    }
}