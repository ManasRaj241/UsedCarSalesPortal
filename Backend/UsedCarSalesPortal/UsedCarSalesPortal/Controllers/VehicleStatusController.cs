using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UsedCarSalesPortal.DatabaseContext;
using UsedCarSalesPortal.Model;

namespace UsedCarSalesPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleStatusController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public VehicleStatusController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/VehicleStatus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleStatus>>> GetVehicleStatuses()
        {
          if (_context.VehicleStatuses == null)
          {
              return NotFound();
          }
            return await _context.VehicleStatuses.ToListAsync();
        }

        // GET: api/VehicleStatus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleStatus>> GetVehicleStatus(int id)
        {
          if (_context.VehicleStatuses == null)
          {
              return NotFound();
          }
            var vehicleStatus = await _context.VehicleStatuses.FindAsync(id);

            if (vehicleStatus == null)
            {
                return NotFound();
            }

            return vehicleStatus;
        }

        // PUT: api/VehicleStatus/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVehicleStatus(int id, VehicleStatus vehicleStatus)
        {
            if (id != vehicleStatus.Id)
            {
                return BadRequest();
            }

            _context.Entry(vehicleStatus).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleStatusExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/VehicleStatus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VehicleStatus>> PostVehicleStatus(VehicleStatus vehicleStatus)
        {
          if (_context.VehicleStatuses == null)
          {
              return Problem("Entity set 'ApplicationDBContext.VehicleStatuses'  is null.");
          }
            _context.VehicleStatuses.Add(vehicleStatus);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVehicleStatus", new { id = vehicleStatus.Id }, vehicleStatus);
        }

        // DELETE: api/VehicleStatus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicleStatus(int id)
        {
            if (_context.VehicleStatuses == null)
            {
                return NotFound();
            }
            var vehicleStatus = await _context.VehicleStatuses.FindAsync(id);
            if (vehicleStatus == null)
            {
                return NotFound();
            }

            _context.VehicleStatuses.Remove(vehicleStatus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VehicleStatusExists(int id)
        {
            return (_context.VehicleStatuses?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
