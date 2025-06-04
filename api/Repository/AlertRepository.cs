using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTO.Alert;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace api.Repository
{
    public class AlertRepository : IAlertRepository
    {
        private readonly AppDbContext _context;
        public AlertRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateAlert(AlertDto alertDto)
        {
            var userId = _context.Users.Where(u => u.Email == alertDto.Email)
                .Select(u => u.Id)
                .FirstOrDefault();
            if (userId == null) return false;
            var alert = new PriceAlert
            {
                UserId = userId,
                CoinId = alertDto.CoinId,
                TargetPrice = alertDto.TargetPrice,
                Email = alertDto.Email,
                IsTriggered = false
            };

            try
            {
                _context.PriceAlerts.Add(alert);
                await _context.SaveChangesAsync();

                return true;

            }
            catch (Exception ex)
            {
                // Log the exception (ex) if needed
                return false;
            }
        }
    }



}