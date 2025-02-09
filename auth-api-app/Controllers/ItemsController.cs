using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace auth_api_app;

[ApiController]
[Route("[controller]")]
public class ItemsController : ControllerBase
{
    private readonly List<Item> Items = new()
    {
        new Item { Id = 1, Name = "Laptop" },
        new Item { Id = 2, Name = "Smarthphone" },
        new Item { Id = 3, Name = "Tablet" },
        new Item { Id = 4, Name = "Headphones" },
    };

    [Authorize(policy: "ItemsRead")]
    [HttpGet]
    public ActionResult<List<Item>> List()
    {
        return Items;
    }
}
