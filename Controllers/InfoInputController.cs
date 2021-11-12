using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

using myapp.Models;

namespace myapp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class InfoInputController : ControllerBase
    {
        private readonly SampleAPIContext _context;

        public InfoInputController(SampleAPIContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BasicInfo>> GetBasicInfo(int id) {
            var basicInfo = await _context.BasicInfo.Where(m => m.ApplicationUserId  == id).FirstAsync();
            if (basicInfo == null)
            {
                return NotFound();
            }
            return basicInfo;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IncomeCal>> GetIncomeCal(int id) {
            var incomeCal = await _context.IncomeCal.Where(m => m.ApplicationUserId  == id).FirstAsync();
            if (incomeCal == null)
            {
                return NotFound();
            }
            return incomeCal;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IncomeAdjust>> GetIncomeAdjust(int id) {
            var incomeAdjust = await _context.IncomeAdjust.Where(m => m.ApplicationUserId  == id).FirstAsync();
            if (incomeAdjust == null)
            {
                return NotFound();
            }
            return incomeAdjust;
        }

        [HttpPost]
        public async Task<ActionResult<BasicInfo>> PostBasicInfo(BasicInfo basicInfo) {
             basicInfo.BasicInfoId = _context.BasicInfo.Any() ? 
                    _context.BasicInfo.Max(p => p.BasicInfoId) + 1 : 1;
            _context.BasicInfo.Add(basicInfo);

            await _context.SaveChangesAsync();
            return CreatedAtAction("GetBasicInfo", new { id = basicInfo.BasicInfoId }, basicInfo);
        }

        [HttpPost]
        public async Task<ActionResult<IncomeCal>> PostIncomeCal(IncomeCal incomeCal) {
             incomeCal.IncomeCalId = _context.IncomeCal.Any() ? 
                    _context.IncomeCal.Max(p => p.IncomeCalId) + 1 : 1;
            _context.IncomeCal.Add(incomeCal);

            await _context.SaveChangesAsync();
            return CreatedAtAction("GetIncomeCal", new { id = incomeCal.IncomeCalId }, incomeCal);
        }

        [HttpPost]
        public async Task<ActionResult<IncomeAdjust>> PostIncomeAdjust(IncomeAdjust incomeAdjust) {
             incomeAdjust.IncomeAdjustId = _context.IncomeAdjust.Any() ? 
                    _context.IncomeAdjust.Max(p => p.IncomeAdjustId) + 1 : 1;
            _context.IncomeAdjust.Add(incomeAdjust);

            await _context.SaveChangesAsync();
            return CreatedAtAction("GetIncomeAdjust", new { id = incomeAdjust.IncomeAdjustId }, incomeAdjust);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBasicInfo(BasicInfo basicInfo)
        {
            // var result = await _context.BasicInfo.FindAsync(basicInfo.BasicInfoId);
            // if (result == null)
            // {
            //     return NotFound();
            // }
            _context.Entry(basicInfo).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutIncomeCal(IncomeCal incomeCal)
        {
            // var result = await _context.IncomeCal.FirstOrDefaultAsync(m => m.IncomeCalId == incomeCal.IncomeCalId);
            // if (result == null)
            // {
            //     return NotFound();
            // }
            _context.Entry(incomeCal).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutIncomeAdjust(IncomeAdjust incomeAdjust)
        {
            // var result = await _context.IncomeAdjust.FindAsync(incomeAdjust.IncomeAdjustId);
            // if (result == null)
            // {
            //     return NotFound();
            // }
            _context.Entry(incomeAdjust).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
            return NoContent();
        }
        
    }
}