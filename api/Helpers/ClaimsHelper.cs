using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace api.Helpers
{
    public static class ClaimsHelper
    {
        public static string GetUsernameFromClaim(this ClaimsPrincipal user){
            return user.FindFirst(ClaimTypes.GivenName).Value;
        }
    }
}