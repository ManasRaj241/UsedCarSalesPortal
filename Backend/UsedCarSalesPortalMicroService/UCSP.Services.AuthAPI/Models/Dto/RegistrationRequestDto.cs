﻿namespace UCSP.Services.AuthAPI.Models.Dto
{
    public class RegistrationRequestDto
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Password {  get; set; }
        public string? Role {  get; set; }
    }
}
