using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Alert;
using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces
{
    public interface IAlertRepository
    {
        Task<bool> CreateAlert(AlertDto alertDto);
    }
}