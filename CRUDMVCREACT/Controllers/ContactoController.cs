using CRUDMVCREACT.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDMVCREACT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {
        private readonly CrudreactmvcContext _dbContext;
        

        public ContactoController(CrudreactmvcContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("lista")]
        public async Task <IActionResult> lista()
        {
            List<Contacto> lista = await _dbContext.Contactos.OrderByDescending(c => c.IdContacto).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("guardar")]
        public async Task<IActionResult> guardar([FromBody] Contacto request)
        {
            await _dbContext.Contactos.AddAsync(request);
            await _dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPut]
        [Route("editar")]
        public async Task<IActionResult> editar([FromBody] Contacto request)
        {
            _dbContext.Contactos.Update(request);
            await _dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("eliminar/{id:int}")]
        public async Task<IActionResult> eliminar(int id)
        {
            Contacto contacto = _dbContext.Contactos.Find(id)!;
            if (contacto == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, "No encontrado");

            }
            _dbContext.Contactos.Remove(contacto);
            await _dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");

        }

    }
}
