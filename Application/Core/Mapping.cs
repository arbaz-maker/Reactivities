using AutoMapper;
using Domain;

namespace Application.Core
{
    public class Mapping:Profile
    {
        public Mapping(){
            CreateMap<Activity,Activity>();
        }


    }
}