using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Alert;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    [Route("api/alerts")]
    public class AlertsController : ControllerBase
    {
        private readonly IAlertRepository _alertRepository;

        public AlertsController(IAlertRepository alertRepository)
        {
            _alertRepository = alertRepository;
        }
        [HttpPost]
        public async Task<IActionResult> CreateAlert([FromBody] AlertDto dto)
        {
            if (await _alertRepository.CreateAlert(dto))
            {
                return Ok(new { message = "Alert created successfully" });
            }
            else
            {
                return BadRequest(new { message = "Failed to create alert" });
            }

        }


    }
}