using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.Comment
{
    public class UpdateCommentDTO
    {
        [Required]
        [MinLength(5, ErrorMessage ="Title min lenght is 5 characters")]
        [MaxLength(100, ErrorMessage ="Title max lenght is 100 characters")]
        public string Title { get; set;} =string.Empty;
        [Required]
        [MinLength(5, ErrorMessage ="Content min lenght is 5 characters")]
        [MaxLength(200, ErrorMessage ="Content max lenght is 100 characters")]
        public string Content { get; set; } = string.Empty;
    }
}